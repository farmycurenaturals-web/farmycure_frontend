import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { BASE_URL } from '../config/api'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../utils/auth'

const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const timezoneOptions = [
  { value: 'Asia/Kolkata', label: 'India (IST)' },
  { value: 'America/New_York', label: 'USA (New York)' },
  { value: 'Europe/London', label: 'UK (London)' },
  { value: 'Asia/Dubai', label: 'UAE (Dubai)' },
  { value: 'Australia/Sydney', label: 'Australia (Sydney)' }
]

const Partners = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    product: '',
    quantity: '',
    timezone: timezoneOptions.some((tz) => tz.value === detectedTimezone) ? detectedTimezone : 'Asia/Kolkata',
    preferredTime: '',
    contactMethod: '',
    legalName: '',
    gst: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.contact.trim()) newErrors.contact = 'Contact Number is required'
    if (!formData.product.trim()) newErrors.product = 'Product is required'
    
    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required'
    } else if (Number(formData.quantity) < 100) {
      newErrors.quantity = 'Minimum order quantity is 100 KGs'
    }
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred contact time is required'
    if (!formData.contactMethod) newErrors.contactMethod = 'Preferred contact method is required'
    
    if (!formData.legalName.trim()) newErrors.legalName = 'Legal Trade Name is required'
    if (!formData.gst.trim()) newErrors.gst = 'GST / VAT Number is required'
    if (formData.message.length > 200) newErrors.message = 'Message must be under 200 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isUserLoggedIn()) {
      setErrors({ submit: 'Please login to continue' })
      setTimeout(() => {
        navigate('/login', { state: { from: '/partners', message: 'Please login to continue' } })
      }, 1000)
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await axios.post(`${BASE_URL}/api/trade`, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        contact: formData.contact.trim(),
        product: formData.product.trim(),
        quantity: Number(formData.quantity),
        timezone: formData.timezone,
        preferredTime: formData.preferredTime,
        contactMethod: formData.contactMethod,
        legalName: formData.legalName.trim(),
        gst: formData.gst.trim(),
        message: formData.message.trim()
      })
    } catch (err) {
      setErrors({
        submit:
          err?.response?.data?.message ||
          'Failed to submit trade request. Please try again.'
      })
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        contact: '',
        product: '',
        quantity: '',
        timezone: timezoneOptions.some((tz) => tz.value === detectedTimezone) ? detectedTimezone : 'Asia/Kolkata',
        preferredTime: '',
        contactMethod: '',
        legalName: '',
        gst: '',
        message: ''
      })
    }, 5000)
  }

  const whyFeatures = [
    {
      title: 'Bulk Supply Capability',
      description: 'Reliable large-scale sourcing of fruits, vegetables, grains, and livestock products.'
    },
    {
      title: 'Direct Farm Sourcing',
      description: 'Transparent supply chain from soil to delivery.'
    },
    {
      title: 'Custom Packaging & Private Label',
      description: 'Flexible packaging solutions tailored to your business needs.'
    },
    {
      title: 'Quality & Consistency',
      description: 'Standardized grading, processing, and quality assurance systems.'
    }
  ]

  const wholesaleCategories = [
    {
      title: 'Organic Produce',
      items: ['Fresh, Flakes, Powder formats', 'Custom bulk packaging', 'Seasonal sourcing options']
    },
    {
      title: 'Grains & Staples',
      items: ['Basmati Rice', 'Kala Namak Rice', 'Wheat', 'Soybean', '25kg / 50kg export-ready bags']
    },
    {
      title: 'Livestock & Protein',
      items: ['Dehydrated Meat Products', 'Kadaknath', 'Sonali', 'Bulk poultry supply']
    }
  ]

  const targetBusinesses = [
    'Retail Chains',
    'Supermarkets',
    'Distributors',
    'Hotels & Restaurants',
    'Exporters',
    'Food Processing Units'
  ]

  return (
    <>
      <Helmet>
        <title>FarmyCure Trade | Wholesale & Business Collaboration</title>
        <meta name="description" content="Trade with FarmyCure for bulk organic produce, grains, and livestock products. Reliable sourcing, scalable supply, and transparent farm-direct distribution." />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          className="relative min-h-[70vh] flex items-center bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 w-full py-20 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Partner With FarmyCure
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl md:text-2xl text-white/90 mb-4"
              >
                Wholesale, Distribution & Strategic Business Collaborations
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
              >
                Scale your business with reliable farm-direct sourcing, transparent supply chains, and bulk organic produce solutions.
              </motion.p>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                href="#trade-form"
                className="inline-block bg-[#1f4d36] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#163a2a] transition-colors"
              >
                Trade With Us
              </motion.a>
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-12 text-center"
            >
              Why Choose FarmyCure?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-[#1f4d36] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="py-20 bg-gray-50 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-12 text-center"
            >
              Our Wholesale Categories
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {wholesaleCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-8 shadow-md border border-gray-100"
                >
                  <h3 className="text-xl font-semibold text-[#1f4d36] mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-start">
                        <span className="w-2 h-2 bg-[#1f4d36] rounded-full mt-2 mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Can Apply */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-12 text-center"
            >
              Who We Work With
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {targetBusinesses.map((business, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
                >
                  <span className="text-gray-700 font-medium">{business}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trade Form Section */}
        <section id="trade-form" className="py-20 bg-gray-50 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#1f4d36] mb-4 text-center"
            >
              Trade With Us
            </motion.h2>
            <p className="text-gray-600 text-center mb-12">
              Fill in your trade requirements and our team will get back to you within 24–48 hours.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-10 shadow-md text-center max-w-2xl mx-auto"
              >
                <div className="w-16 h-16 bg-[#1f4d36] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#1f4d36] mb-4">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  Your request has been submitted. Our team will contact you within your preferred time or the closest available business hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md">
                {errors.submit && <p className="text-red-500 text-sm mb-4">{errors.submit}</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    />
                    {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                  </div>

                  {/* Product */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Rice, Wheat, Eggs, Fish"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    />
                    {errors.product && <p className="text-red-500 text-sm mt-1">{errors.product}</p>}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity (in KGs) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="100"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    />
                    {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
                  </div>

                  {/* Timezone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timezone <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    >
                      {timezoneOptions.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Contact Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    >
                      <option value="">Select preferred time</option>
                      <option value="Morning (9 AM – 12 PM)">Morning (9 AM – 12 PM)</option>
                      <option value="Afternoon (12 PM – 4 PM)">Afternoon (12 PM – 4 PM)</option>
                      <option value="Evening (4 PM – 8 PM)">Evening (4 PM – 8 PM)</option>
                      <option value="Night (8 PM – 11 PM)">Night (8 PM – 11 PM)</option>
                    </select>
                    {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Contact Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    >
                      <option value="">Select contact method</option>
                      <option value="Call">Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </select>
                    {errors.contactMethod && <p className="text-red-500 text-sm mt-1">{errors.contactMethod}</p>}
                  </div>

                  {/* Legal Trade Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Trade Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="legalName"
                      value={formData.legalName}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    />
                    {errors.legalName && <p className="text-red-500 text-sm mt-1">{errors.legalName}</p>}
                  </div>

                  {/* GST / VAT Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GST / VAT Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="gst"
                      value={formData.gst}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    />
                    {errors.gst && <p className="text-red-500 text-sm mt-1">{errors.gst}</p>}
                  </div>
                </div>

                {/* Message - Full Width */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={200}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1f4d36]"
                    placeholder="Tell us more about your trade requirements..."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.message.length}/200 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1f4d36] text-white py-3 rounded-lg font-medium hover:bg-[#173c2b] transition mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Trade Request'
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 bg-[#1f4d36] px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              Reliable. Scalable. Sustainable.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-lg"
            >
              FarmyCure is building a future-ready agricultural supply network designed for long-term growth and responsible sourcing.
            </motion.p>
          </div>
        </section>
      </main>
    </>
  )
}

export default Partners
