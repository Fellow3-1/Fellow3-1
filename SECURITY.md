# Security policy

## Report a vulnerability

Email **felixodhiambo31@live.com** with the subject `portfolio security`. Please
do not open a public issue for anything that could be used to read, alter or
delete visitor messages.

## What is in scope

- The static site under `src/`, `public/` and the generated `docs/` build.
- The Supabase table `public.portfolio_messages` and the migrations in
  `supabase/migrations/`.
- The GitHub Pages workflow in `.github/workflows/`.

## What is deliberately public

The contact form ships a Supabase **publishable** key in the JavaScript bundle.
That is intended: the key is not a secret. Row-level security gives it exactly
one capability — inserting a row — and `revoke all` removes select, update and
delete at the privilege level as well. Do not replace it with a service-role key.

## What to include

A description of the issue, the affected file or endpoint, and a proof of
concept that does not expose another person's message content. If you found a
way to read rows, a single redacted row is enough to demonstrate it.

## Out of scope

- The public GitHub profile README and its third-party badge images.
- Self-hosted or forked copies of this repository.
- Issues that require physical access to the owner's machine.
