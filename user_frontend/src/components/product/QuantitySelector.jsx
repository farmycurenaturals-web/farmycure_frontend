import { motion } from 'framer-motion'

const QuantitySelector = ({ quantity, onQuantityChange }) => {
  const decrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1)
    }
  }

  const increment = () => {
    onQuantityChange(quantity + 1)
  }

  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-sm text-gray-600">Qty:</span>
      <div className="flex items-center border border-gray-200 rounded-card overflow-hidden">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-sage/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </motion.button>

        <span className="w-12 h-10 flex items-center justify-center font-body font-medium text-text-primary border-x border-gray-200">
          {quantity}
        </span>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          className="w-10 h-10 flex items-center justify-center text-text-primary hover:bg-sage/20 transition-colors"
          aria-label="Increase quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}

export default QuantitySelector
