import { useMemo, useState } from 'react'
import { Container } from '../components/ui/Container'
import { getContactConfig } from '../config/contact'
import axios from 'axios'
import { API } from '../config/api'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../utils/auth'
import { motion, AnimatePresence } from 'framer-motion'

const InputField = ({ id, label, type = "text", ...props }) => (
  <div className="relative group">
    {type === "textarea" ? (
      <textarea
        id={id}
        className="block w-full px-5 py-3.5 pt-6 bg-gray-50 border border-transparent rounded-[16px] focus:bg-white focus:border-[#1f4d36] focus:ring-4 focus:ring-[#1f4d36]/10 transition-all peer text-[15px] text-gray-900 outline-none resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        placeholder=" "
        {...props}
      />
    ) : (
      <input
        id={id}
        type={type}
        className="block w-full px-5 py-3.5 pt-6 bg-gray-50 border border-transparent rounded-[16px] focus:bg-white focus:border-[#1f4d36] focus:ring-4 focus:ring-[#1f4d36]/10 transition-all peer text-[15px] text-gray-900 outline-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] focus:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
        placeholder=" "
        {...props}
      />
    )}
    <label
      htmlFor={id}
      className="absolute text-[15px] text-gray-500 duration-300 transform -translate-y-3 scale-75 top-[16px] z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-medium cursor-text peer-focus:text-[#1f4d36]"
    >
      {label}
    </label>
  </div>
)

const faqs = [
  { q: "How long does delivery take?", a: "Most orders are processed within 24 hours and delivered in 3-5 business days. You can track your order directly from your profile page." },
  { q: "Do you ship internationally?", a: "Currently, we only ship within India, but we are working closely with logistics partners to expand our reach soon." },
  { q: "What is your return policy?", a: "We offer a 7-day return policy for unused products in their original, unopened packaging. Contact support to initiate a return." },
  { q: "Are your products 100% organic?", a: "Yes, all our farm products are directly sourced, certified organic, and completely free from synthetic chemicals and pesticides." }
]

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-100 last:border-0 py-4 sm:py-5">
      <button onClick={() => setOpen(!open)} type="button" className="w-full flex items-center justify-between text-left focus:outline-none group">
        <span className="font-bold text-[15px] sm:text-[16px] text-gray-900 group-hover:text-[#1f4d36] transition-colors pr-4">{faq.q}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180 bg-[#1f4d36]/10 text-[#1f4d36]' : ''}`}>
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/></svg>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-[14px] sm:text-[15px] text-gray-600 leading-relaxed pr-8">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
      await axios.post(`${API}/api/contact`, {
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
    <main className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Hero Section */}
      <div className="relative pt-16 pb-20 md:pt-28 md:pb-32 overflow-hidden bg-gradient-to-b from-[#1f4d36]/5 to-transparent border-b border-gray-100/50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#1f4d36]/5 blur-3xl" />
        <div className="absolute top-40 left-0 -ml-20 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl" />
        
        <Container className="relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 mb-6 tracking-tight"
          >
            We're here to <span className="text-[#1f4d36]">help.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-body text-[16px] md:text-[18px] text-gray-600 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Have questions about our organic products, shipping, or trade partnerships? Reach out to our team and we'll get back to you promptly.
          </motion.p>
        </Container>
      </div>

      <Container className="relative z-20 -mt-8 md:-mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT: Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <a href={`tel:${contact.phoneTel}`} className="group bg-white p-5 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#1f4d36]/20 transition-all block">
                <div className="w-12 h-12 rounded-[16px] bg-[#1f4d36]/5 text-[#1f4d36] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#1f4d36] group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <h3 className="font-bold text-gray-900 text-[16px] mb-1">Call Us</h3>
                <p className="text-[13px] text-gray-500 font-medium">Mon-Fri 8am to 5pm</p>
                <p className="text-[14px] text-[#1f4d36] font-bold mt-2 group-hover:underline">{contact.phoneDisplay}</p>
              </a>

              <a href={`mailto:${contact.email}`} className="group bg-white p-5 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#1f4d36]/20 transition-all block">
                <div className="w-12 h-12 rounded-[16px] bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <h3 className="font-bold text-gray-900 text-[16px] mb-1">Email Support</h3>
                <p className="text-[13px] text-gray-500 font-medium">Get in touch directly</p>
                <p className="text-[14px] text-amber-600 font-bold mt-2 group-hover:underline">{contact.email}</p>
              </a>

              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="group bg-white p-5 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#1f4d36]/20 transition-all block">
                <div className="w-12 h-12 rounded-[16px] bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <h3 className="font-bold text-gray-900 text-[16px] mb-1">Visit Us</h3>
                <p className="text-[13px] text-gray-500 font-medium">{contact.locationLabel}</p>
                <p className="text-[14px] text-blue-600 font-bold mt-2 group-hover:underline">Open Maps →</p>
              </a>

              <a href={contact.socialLinks.find(s => s.label === 'WhatsApp')?.url || '#'} target="_blank" rel="noopener noreferrer" className="group bg-white p-5 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#1f4d36]/20 transition-all block">
                <div className="w-12 h-12 rounded-[16px] bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <h3 className="font-bold text-gray-900 text-[16px] mb-1">WhatsApp Us</h3>
                <p className="text-[13px] text-gray-500 font-medium">Quickest replies</p>
                <p className="text-[14px] text-green-600 font-bold mt-2 group-hover:underline">Chat Now →</p>
              </a>

            </div>

            <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-5">Connect On Social</h3>
              <div className="flex flex-wrap gap-3">
                {contact.socialLinks.filter(s => s.label !== 'WhatsApp').map(social => (
                  <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 border border-gray-200 text-[13px] font-bold text-gray-700 hover:bg-white hover:shadow-md hover:border-gray-300 transition-all">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Badges Section */}
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-tight">Fast Response</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-tight">Human Support</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-tight">Secure Comms</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-tight">Farm Direct Care</span>
               </div>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.04)] border border-gray-100 h-full">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2 tracking-tight">Send us a message</h2>
              <p className="text-gray-500 text-[15px] mb-8">We usually respond within 24 hours.</p>

              {status.type === 'ok' && (
                <div className="mb-8 flex items-center gap-3 bg-green-50 border border-green-100 rounded-[16px] px-5 py-4">
                  <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <p className="text-[14px] font-bold text-green-800 leading-snug">{status.text}</p>
                </div>
              )}
              {status.type === 'err' && (
                <div className="mb-8 flex items-center gap-3 bg-red-50 border border-red-100 rounded-[16px] px-5 py-4">
                  <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  <p className="text-[14px] font-bold text-red-800 leading-snug">{status.text}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField id="name" name="name" label="Full Name" value={formData.name} onChange={handleChange} required />
                  <InputField id="email" type="email" name="email" label="Email Address" value={formData.email} onChange={handleChange} required />
                </div>
                <InputField id="subject" name="subject" label="Subject (e.g. Order #1234)" value={formData.subject} onChange={handleChange} required />
                <InputField id="message" type="textarea" name="message" label="Your Message" rows={5} value={formData.message} onChange={handleChange} required />
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-[#1f4d36] text-white py-4 rounded-[16px] font-bold text-[15px] shadow-[0_8px_20px_rgba(31,77,54,0.2)] hover:shadow-[0_12px_25px_rgba(31,77,54,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-3 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-[15px]">Quick answers to common questions about shopping with FarmyCure.</p>
          </div>
          <div className="bg-white rounded-[32px] p-6 sm:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-gray-100">
            {faqs.map((f, i) => <FAQItem key={i} faq={f} />)}
          </div>
        </div>

      </Container>
    </main>
  )
}

export default Contact
