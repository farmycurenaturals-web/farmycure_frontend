import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'

const CartIcon = ({ isTransparent = false, onClick }) => {
  const { cart } = useCart()
  const itemCount = cart.totalItems

  return (
    <Link to="/cart" onClick={onClick}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-2"
      >
        <svg
          className={`w-6 h-6 transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-forest'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-burnt-orange text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.div>
    </Link>
  )
}

export default CartIcon
