-- Contact messages for the portfolio.
-- Applied to project lguhmwcskvgpiqmexmuq on 2026-11-11 as migration
-- `portfolio_contact_messages`; kept here so the schema is reviewable and
-- reproducible.
--
-- The browser holds a publishable key. Row-level security gives that key
-- exactly one power: inserting a row. It cannot read, update or delete.
-- Messages are read by the owner in the Supabase dashboard.

create table public.portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  brief text not null,
  email text not null,
  page text not null default 'portfolio',
  constraint portfolio_name_len check (char_length(name) between 2 and 80),
  constraint portfolio_brief_len check (char_length(brief) between 4 and 800),
  constraint portfolio_email_len check (char_length(email) between 5 and 160),
  constraint portfolio_email_shape check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[a-z]{2,}$')
);

alter table public.portfolio_messages enable row level security;

create policy "visitors may submit a message"
  on public.portfolio_messages
  for insert
  to anon, authenticated
  with check (char_length(brief) >= 4);

revoke all on public.portfolio_messages from anon, authenticated;
grant insert on public.portfolio_messages to anon, authenticated;

-- three messages per address per quarter hour; a bot can rotate addresses,
-- which is what the honeypot in the form is for
create or replace function public.portfolio_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.portfolio_messages m
      where m.email = new.email
        and m.created_at > now() - interval '15 minutes') >= 3 then
    raise exception 'rate_limited' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

create trigger portfolio_rate_limit
  before insert on public.portfolio_messages
  for each row execute function public.portfolio_rate_limit();
