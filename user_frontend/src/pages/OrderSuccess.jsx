import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'

const OrderSuccess = () => {
  const location = useLocation()
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    if (location.state?.orderId) {
      setOrderId(location.state.orderId)
    } else {
      const generatedId = 'GH' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase()
      setOrderId(generatedId)
    }
  }, [location.state])

  return (
    <main className="py-16 md:py-24 bg-background min-h-[60vh]">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 bg-sage/30 rounded-full flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-forest rounded-full flex items-center justify-center"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-4"
          >
            Order Placed Successfully!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-body text-gray-600 mb-8"
          >
            Thank you for shopping with GreenHarvest Naturals! We've received your order and will start processing it right away.
          </motion.p>

          {/* Order ID Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-card p-6 border border-gray-100 mb-8"
          >
            <p className="font-body text-sm text-gray-500 mb-2">Your Order ID</p>
            <p className="font-heading text-2xl font-bold text-forest tracking-wider">
              {orderId}
            </p>
            <p className="font-body text-xs text-gray-400 mt-2">
              Save this ID for tracking your order
            </p>
          </motion.div>

          {/* What's Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-sage/10 rounded-card p-6 mb-8 text-left"
          >
            <h3 className="font-heading text-lg font-semibold text-text-primary mb-4">
              What happens next?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="font-body text-sm text-gray-600">
                  You'll receive an order confirmation email shortly
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="font-body text-sm text-gray-600">
                  We'll carefully pack your organic products
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="font-body text-sm text-gray-600">
                  Your order will be delivered within 3-5 business days
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <Link to="/shop">
              <Button variant="primary" size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="md" className="w-full">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </main>
  )
}

export default OrderSuccess
