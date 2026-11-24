-- Hardening for the contact table, applied after 20261111_portfolio_messages.sql.
--
-- What the first migration left open, and what this one closes:
--   * `page` accepted any string, so a misconfigured client could write rows
--     that no page owns. It is now an enum-like check constraint.
--   * the rate limit counted `m.email = new.email`, which is case sensitive:
--     A@x.com and a@x.com were two different quotas. It now compares
--     lower(email), and takes a per-address advisory lock so two concurrent
--     inserts cannot both pass the count check.
--   * the count had no supporting index, so every insert scanned the table.
--   * the privacy copy promised deletion "when the conversation ends" but the
--     schema had no notion of a read message and no purge path. `read_at` plus
--     `portfolio_purge_read()` make that promise operable; the optional
--     pg_cron schedule below runs it nightly when the extension is available.

alter table public.portfolio_messages
  add constraint portfolio_page_known check (page in ('portfolio'));

alter table public.portfolio_messages
  add column if not exists read_at timestamptz;

create index if not exists portfolio_messages_email_created_idx
  on public.portfolio_messages (lower(email), created_at desc);

create index if not exists portfolio_messages_read_at_idx
  on public.portfolio_messages (read_at)
  where read_at is not null;

create or replace function public.portfolio_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Serialise inserts for the same address. Without this, two requests landing
  -- in the same millisecond both count 2 and both insert.
  perform pg_advisory_xact_lock(hashtext(lower(new.email)));

  if (
    select count(*) from public.portfolio_messages m
    where lower(m.email) = lower(new.email)
      and m.created_at > now() - interval '15 minutes'
  ) >= 3 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

-- Deletes what the privacy copy says is deleted: a conversation the owner has
-- closed (read_at set) goes after 30 days, and anything never read goes after
-- 90 days. Set read_at when you reply; the schedule below does the rest.
-- Returns the number of rows removed.
create or replace function public.portfolio_purge_read(
  read_retention interval default interval '30 days',
  unread_retention interval default interval '90 days'
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  removed integer;
begin
  delete from public.portfolio_messages
  where (read_at is not null and read_at < now() - read_retention)
     or (read_at is null and created_at < now() - unread_retention);

  get diagnostics removed = row_count;
  return removed;
end;
$$;

-- Optional nightly run. pg_cron is available on Supabase but may be disabled
-- on a self-hosted instance, so the extension is installed inside a block that
-- tolerates a privilege error, and the schedule is only created when cron is
-- actually present.
do $$
begin
  begin
    create extension if not exists pg_cron;
  exception when insufficient_privilege then
    raise notice 'pg_cron is not available; schedule portfolio_purge_read() externally';
  end;
exception when others then
  raise notice 'pg_cron is not available; schedule portfolio_purge_read() externally';
end;
$$;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    begin
      perform cron.unschedule('portfolio-purge-read');
    exception when others then
      null; -- first run: no schedule to remove
    end;
    perform cron.schedule(
      'portfolio-purge-read',
      '0 3 * * *',
      'select public.portfolio_purge_read()'
    );
  end if;
end;
$$;
