import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-forest text-white hover:bg-forest/90',
  secondary: 'bg-burnt-orange text-white hover:bg-burnt-orange/90',
  outline: 'bg-transparent border-2 border-forest text-forest hover:bg-forest hover:text-white',
  'outline-white': 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-forest',
  nonVeg: 'bg-nonveg text-white hover:bg-[#6E1616]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        font-body font-medium
        rounded-card
        transition-colors duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}
