const formatAmount = (amount) => {
  const n = Number(amount)
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)
}

const sizeClasses = {
  xs: {
    symbol: 'text-xs',
    amount: 'text-xs'
  },
  sm: {
    symbol: 'text-sm',
    amount: 'text-lg'
  },
  md: {
    symbol: 'text-base',
    amount: 'text-xl'
  },
  lg: {
    symbol: 'text-lg',
    amount: 'text-2xl'
  }
}

const variantTone = {
  default: {
    symbol: 'font-semibold text-gray-800',
    amount: 'font-bold text-[#1f4d36]'
  },
  onDark: {
    symbol: 'font-semibold text-white/90',
    amount: 'font-bold text-white'
  },
  muted: {
    symbol: 'font-semibold text-gray-500',
    amount: 'font-semibold text-gray-500'
  },
  onForest: {
    symbol: 'font-semibold text-white',
    amount: 'font-bold text-white'
  }
}

/**
 * Consistent INR display (Amazon/Flipkart-style grouping).
 * @param {number|string} amount — numeric value (rupees)
 * @param {'xs'|'sm'|'md'|'lg'} [size='md']
 * @param {'default'|'onDark'|'muted'|'onForest'} [variant='default'] — onDark = selected chip on colored bg; onForest = announcement bar
 */
const Price = ({ amount, size = 'md', variant = 'default', className = '' }) => {
  const selected = sizeClasses[size] || sizeClasses.md
  const tone = variantTone[variant] || variantTone.default

  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <span className={`${tone.symbol} ${selected.symbol}`}>₹</span>
      <span className={`${tone.amount} ${selected.amount}`}>{formatAmount(amount)}</span>
    </span>
  )
}

export default Price
