import { contactInfo } from '../data/navigation'

/**
 * Public contact details — override via Vite env (prefix VITE_).
 * Restart dev server after changing .env
 */
const env = import.meta.env

export function getContactConfig() {
  const locationLabel = env.VITE_CONTACT_LOCATION_LABEL || contactInfo.address
  const mapsUrl = env.VITE_CONTACT_MAPS_URL || contactInfo.mapsUrl

  const phoneDisplay = env.VITE_CONTACT_PHONE_DISPLAY || contactInfo.phone
  const phoneTelRaw =
    (env.VITE_CONTACT_PHONE_TEL && String(env.VITE_CONTACT_PHONE_TEL).trim()) ||
    phoneDisplay.replace(/\s/g, '') ||
    '+919793180013'

  const email = env.VITE_CONTACT_EMAIL || contactInfo.email

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
