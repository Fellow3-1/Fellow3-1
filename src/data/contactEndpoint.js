/* Where the contact form posts.
   The key below is a Supabase publishable key: it is designed to be public,
   and row-level security gives it exactly one power — inserting a row into
   public.portfolio_messages. It cannot read, update or delete anything.
   Override with VITE_CONTACT_ENDPOINT / VITE_CONTACT_KEY at build time if the
   project ever moves. */

const env = import.meta.env ?? {}

export const CONTACT_ENDPOINT =
  env.VITE_CONTACT_ENDPOINT ??
  'https://lguhmwcskvgpiqmexmuq.supabase.co/rest/v1/portfolio_messages'

export const CONTACT_KEY =
  env.VITE_CONTACT_KEY ?? 'sb_publishable_3wNrO6jXH6PR1sjPbi9grQ_xIHFjHbV'

export const CONTACT_TIMEOUT = 8000
