/* The one place the deployed origin is defined. Every generated URL, every
   canonical link and every feed entry imports it from here, so the site cannot
   be described at two different addresses. */
export const SITE = 'https://fellow3-1.github.io/Fellow3-1'
export const SITE_NAME = 'Felloh 3.1'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/* `2025-11-03` -> `3 November 2025`. Dates are UTC noon in the content module,
   so no time zone can push a note across a day boundary. */
export function longDate(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return iso
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}
