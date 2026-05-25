import Price from '../Price'
import { useCart } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { isUserLoggedIn } from '../../utils/auth'
import { useWishlist } from '../../context/WishlistContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const productId = product._id || product.id
  
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wish = isWishlisted(productId)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isUserLoggedIn()) {
      alert('Please login to continue')
      setTimeout(() => {
        navigate('/login', { state: { from: '/shop', message: 'Please login to continue' } })
      }, 1000)
      return
    }
    addToCart(product, 1)
  }

  const handleCardClick = () => {
    navigate(`/product/${productId}`)
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(27,67,50,0.02)] hover:shadow-[0_20px_45px_rgba(27,67,50,0.07)] border border-gray-100/50 hover:border-gray-200/30 hover:-translate-y-1 transition-all duration-500 h-full cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50/50">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(productId)
          }}
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-gray-700 hover:text-red-500 active:scale-90 transition-all duration-300 shadow-sm"
          aria-label={wish ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg 
            className={`w-4.5 h-4.5 transition-colors duration-300 ${wish ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            fill={wish ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            strokeWidth={1.8} 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {product.featured && (
          <span className="absolute top-3.5 left-3.5 bg-[#D4AF37]/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        <h3 className="font-heading text-base sm:text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-[#1B4332] transition-colors mb-1 leading-tight">
          {product.name}
        </h3>
        <p className="font-body text-[11px] text-gray-400 font-medium line-clamp-2 leading-relaxed mb-4">
          {product.description || 'Verified organic harvest direct from local farmers.'}
        </p>
        
        {/* Price and Button */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <Price amount={product.price} size="md" className="font-bold !text-[#1B4332] !text-[16px] sm:!text-[18px]" />
          <button 
            onClick={handleAddToCart}
            className="h-9 px-5 bg-[#1B4332] hover:bg-[#122e22] text-white text-xs font-bold rounded-full transition-all active:scale-95 shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

