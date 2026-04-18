/**
 * Public contact details — override via Vite env (prefix VITE_).
 * Restart dev server after changing .env
 */
const env = import.meta.env

const defaultLocation = 'Andhra Pradesh, India'

export function getContactConfig() {
  const locationLabel = env.VITE_CONTACT_LOCATION_LABEL || defaultLocation
  const mapsUrl =
    env.VITE_CONTACT_MAPS_URL ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationLabel)}`

  const phoneDisplay = env.VITE_CONTACT_PHONE_DISPLAY || '+91 98765 43210'
  const phoneTelRaw =
    (env.VITE_CONTACT_PHONE_TEL && String(env.VITE_CONTACT_PHONE_TEL).trim()) ||
    phoneDisplay.replace(/\s/g, '') ||
    '+919876543210'

  const email = env.VITE_CONTACT_EMAIL || 'support@farmycure.com'

  const instagramUrl = env.VITE_CONTACT_INSTAGRAM_URL || 'https://www.instagram.com/farmycure_naturals/'
  const linkedInUrl = env.VITE_CONTACT_LINKEDIN_URL || 'https://www.linkedin.com/in/farmycure-naturals-aa4774403'

  const socialLinks = [
    { label: 'Instagram', url: instagramUrl },
    { label: 'LinkedIn', url: linkedInUrl },
  ].filter((s) => Boolean(s.url && String(s.url).trim()))

  return {
    locationLabel,
    mapsUrl,
    phoneDisplay,
    phoneTel: phoneTelRaw.startsWith('+') ? phoneTelRaw : `+${phoneTelRaw}`,
    email,
    socialLinks,
  }
}
