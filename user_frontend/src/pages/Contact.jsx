import { useMemo, useState } from 'react'
import { Container } from '../components/ui/Container'
import { getContactConfig } from '../config/contact'
import axios from 'axios'
import { BASE_URL } from '../config/api'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../utils/auth'

const linkClass =
  'text-forest font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 rounded-sm'

const ContactCard = ({ emoji, title, children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition flex flex-col items-center">
    <div className="text-2xl mb-3" aria-hidden>
      {emoji}
    </div>
    <h3 className="font-semibold text-lg text-[#1f4d36]">{title}</h3>
    <div className="text-gray-600 text-sm mt-2 flex-1 flex flex-col items-center justify-center gap-1">
      {children}
    </div>
  </div>
)

const Contact = () => {
  const navigate = useNavigate()
  const contact = useMemo(() => getContactConfig(), [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isUserLoggedIn()) {
      setStatus({ type: 'err', text: 'Please login to continue' })
      setTimeout(() => {
        navigate('/login', { state: { from: '/contact', message: 'Please login to continue' } })
      }, 1000)
      return
    }
    setStatus({ type: '', text: '' })
    setSending(true)
    try {
      await axios.post(`${BASE_URL}/api/contact`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      })
      setStatus({ type: 'ok', text: 'Thanks — we received your message and will get back to you soon.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus({
        type: 'err',
        text: err.message || 'Could not send message. Please try email or phone instead.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <main className="py-16 md:py-24 bg-background min-h-[60vh]">
      <Container>
        <div className="text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Contact Us
          </h1>
          <p className="font-body text-gray-600 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you. Reach out to our team and
            we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <ContactCard emoji="📍" title="Location">
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                {contact.locationLabel}
              </a>
              <span className="text-xs text-gray-400 mt-1">Opens in Google Maps</span>
            </ContactCard>

            <ContactCard emoji="📞" title="Phone">
              <a href={`tel:${contact.phoneTel}`} className={linkClass}>
                {contact.phoneDisplay}
              </a>
              <span className="text-xs text-gray-400 mt-1">Tap to call</span>
            </ContactCard>

            <ContactCard emoji="📧" title="Email">
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
              <span className="text-xs text-gray-400 mt-1">Opens your mail app</span>
            </ContactCard>

            <ContactCard emoji="🌐" title="Follow Us">
              <p className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1">
                {contact.socialLinks.map((s, i) => (
                  <span key={s.label} className="inline-flex items-center">
                    {i > 0 && <span className="text-gray-300 mx-1" aria-hidden>|</span>}
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {s.label}
                    </a>
                  </span>
                ))}
              </p>
              <span className="text-xs text-gray-400 mt-1">
                {contact.socialLinks.map((s) => s.label).join(' · ')}
              </span>
            </ContactCard>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-md">
          {status.type === 'ok' && (
            <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3">
              {status.text}
            </p>
          )}
          {status.type === 'err' && (
            <p className="mb-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
              {status.text}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contact-subject">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contact-message">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-[#1f4d36] text-white py-3 rounded-lg font-medium hover:bg-[#173c2b] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </Container>
    </main>
  )
}

export default Contact
