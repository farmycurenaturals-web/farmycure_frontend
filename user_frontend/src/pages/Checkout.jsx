import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import Price from '../components/Price'
import { useCart } from '../context/CartContext'
import { fadeInUp } from '../animations/variants'
import { api } from '../services/api'

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID

const InputField = ({ label, name, type = 'text', value, onChange, error, placeholder }) => (
  <div>
    <label htmlFor={name} className="block font-body text-sm font-medium text-text-primary mb-2">
      {label} <span className="text-deep-brown">*</span>
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 font-body border rounded-card transition-colors focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest ${
        error ? 'border-deep-brown' : 'border-gray-200'
      }`}
    />
    {error && (
      <p className="mt-1 text-sm text-deep-brown font-body">{error}</p>
    )}
  </div>
)

const OrderSummaryItem = ({ item }) => {
  const { product, quantity } = item

  const formatTypeName = (type) => {
    if (!type) return ''
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      {product.image ? (
        <img
          src={product.image}
          alt={product.title}
          className="w-12 h-12 object-cover rounded-lg shrink-0"
        />
      ) : (
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] text-center px-0.5 shrink-0 leading-tight">
          No image
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-text-primary truncate">
          {product.title}
        </p>
        <p className="font-body text-xs text-gray-500">
          {product.selectedType && `${formatTypeName(product.selectedType)} - `}
          {product.selectedQuantity && `${product.selectedQuantity} `}
          x {quantity}
        </p>
      </div>
      <div className="shrink-0">
        <Price amount={product.price * quantity} size="md" />
      </div>
    </div>
  )
}

const Checkout = () => {
  const navigate = useNavigate()
  const { cart, clearCart } = useCart()
  const { items, totalPrice, totalItems } = cart

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart')
    }
  }, [items, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required'
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required'
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    if (!RAZORPAY_KEY) {
      alert('Payment is not configured (missing VITE_RAZORPAY_KEY_ID). Please contact support.')
      setIsProcessing(false)
      return
    }

    const scriptLoaded = await loadRazorpayScript()

    if (!scriptLoaded) {
      alert('Failed to load payment gateway. Please try again.')
      setIsProcessing(false)
      return
    }

    const amountInPaise = Math.round(Number(totalPrice) * 100)
    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
      alert('Invalid order amount. Please refresh and try again.')
      setIsProcessing(false)
      return
    }

    let razorpayOrder
    try {
      razorpayOrder = await api.payments.createOrder(amountInPaise)
    } catch (error) {
      alert(error?.message || 'Unable to create payment order. Please try again.')
      setIsProcessing(false)
      return
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: amountInPaise,
      currency: 'INR',
      order_id: razorpayOrder.id,
      name: 'FarmyCure',
      description: `Order of ${totalItems} item${totalItems !== 1 ? 's' : ''}`,
      image: '/logo.png',
      handler: async function (response) {
        try {
          await api.payments.verifySignature(response)
          const orderPayload = {
            shippingAddress: formData,
            items: items.map((item) => ({
              productId: item.product.id,
              variant: item.product.selectedVariant || 'default',
              quantity: item.quantity,
              price: item.product.price,
              title: item.product.title,
              image: item.product.image,
              category: item.product.category
            })),
            totalPrice,
            razorpay: {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            }
          }
          const order = await api.orders.create(orderPayload)
          clearCart()
          navigate('/order-success', {
            state: {
              orderId: order._id,
              paymentId: response.razorpay_payment_id,
              totalAmount: totalPrice
            }
          })
        } catch (_error) {
          alert('Payment verification failed. Please contact support.')
          setIsProcessing(false)
        }
      },
      prefill: {
        name: formData.fullName,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      },
      theme: {
        color: '#1B4332',
      },
      modal: {
        ondismiss: function () {
          setIsProcessing(false)
        },
      },
    }

    try {
      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response) {
        alert(`Payment failed: ${response.error.description}`)
        setIsProcessing(false)
      })
      razorpay.open()
    } catch {
      alert('Something went wrong. Please try again.')
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <main className="py-12 md:py-16 bg-background min-h-[60vh]">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
            Checkout
          </h1>
          <div className="flex items-center gap-2 font-body text-sm text-gray-500">
            <Link to="/cart" className="hover:text-forest transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-forest">Checkout</span>
          </div>
        </motion.div>

        <div className="lg:flex lg:gap-8">
          {/* Shipping Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="flex-1"
          >
            <div className="bg-white rounded-card p-6 md:p-8 border border-gray-100">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-6">
                Shipping Information
              </h2>

              <div className="space-y-5">
                <InputField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  error={errors.fullName}
                  placeholder="Enter your full name"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="you@example.com"
                  />

                  <InputField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <InputField
                  label="Address Line 1"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={errors.address}
                  placeholder="House/Flat No., Street, Area"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    placeholder="City"
                  />

                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={errors.state}
                    placeholder="State"
                  />

                  <InputField
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    error={errors.pincode}
                    placeholder="123456"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:w-96 mt-8 lg:mt-0"
          >
            <div className="bg-white rounded-card p-6 border border-gray-100 sticky top-24">
              <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="max-h-64 overflow-y-auto mb-4">
                {items.map((item, index) => (
                  <OrderSummaryItem key={`${item.product.id}-${index}`} item={item} />
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center font-body text-gray-600">
                  <span>Total Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between items-center font-body text-gray-600">
                  <span>Subtotal</span>
                  <Price amount={totalPrice} size="md" />
                </div>
                <div className="flex justify-between items-center font-body text-gray-600">
                  <span>Shipping</span>
                  <Price amount={0} size="md" />
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-xl font-semibold text-text-primary">Grand Total</span>
                    <Price amount={totalPrice} size="lg" />
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                variant="primary"
                className="w-full mt-6"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </Button>

              {/* Security Note */}
              <div className="mt-4 flex items-center gap-2 justify-center">
                <svg className="w-4 h-4 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-body text-xs text-gray-500">
                  Secure payment powered by Razorpay
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  )
}

export default Checkout
