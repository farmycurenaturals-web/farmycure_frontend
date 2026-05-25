import { Link } from 'react-router-dom'
import Price from '../Price'
import { getQuantities, getStartingPrice, getVariantImage, getVariantTypes } from '../../utils/productPricing'
import { useWishlist } from '../../context/WishlistContext'

const ShopProductCard = ({ product, onOpenModal }) => {
  const startingPrice = getStartingPrice(product)
  const isNonVeg = product.category === 'nonVeg'
  const firstType = getVariantTypes(product)[0] || null
  const firstQty = getQuantities(product, firstType)[0] || null
  const cardImage = getVariantImage(product, firstType, firstQty)
  const productId = product._id || product.id

  const { toggleWishlist, isWishlisted } = useWishlist()
  const wish = isWishlisted(productId)

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(27,67,50,0.02)] hover:shadow-[0_20px_45px_rgba(27,67,50,0.07)] border border-gray-100/50 hover:border-gray-200/30 hover:-translate-y-1 transition-all duration-500 h-full">
      
      {/* Image Container */}
      <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-gray-50/50">
        {cardImage ? (
          <img
            src={cardImage}
            alt={product.title || product.name}
            className="w-full h-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center px-2">
            No Image
          </div>
        )}
        
        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Badges (Top Left) */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.featured && (
            <span className="bg-[#D4AF37]/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              Bestseller
            </span>
          )}
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm ${
            isNonVeg 
              ? 'bg-red-600/90 text-white' 
              : 'bg-[#1B4332]/95 text-white'
          }`}>
            {isNonVeg ? 'Non-Veg' : product.category || 'Fresh'}
          </span>
        </div>

        {/* Wishlist Button (Top Right) */}
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

        {/* Quick View Button Overlay (Desktop Only) */}
        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center z-10">
          <button
            onClick={() => onOpenModal(product)}
            className="px-5 py-2.5 bg-white text-[#1B4332] text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:bg-[#F8F6F1] transition-colors"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
        <div className="flex-1 cursor-pointer" onClick={() => onOpenModal(product)}>
          <h3 className="font-heading text-base sm:text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-[#1B4332] transition-colors mb-1 leading-tight">
            {product.title || product.name}
          </h3>
          <p className="font-body text-[11px] text-gray-400 font-medium line-clamp-2 leading-relaxed mb-4">
            {product.description || 'Verified organic produce straight from trusted local farmers.'}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Starting from</span>
            {startingPrice ? (
              <Price amount={startingPrice} size="md" className="font-bold !text-[#1B4332] !text-[16px] sm:!text-[18px]" />
            ) : (
              <span className="text-xs font-bold text-gray-500">Varies</span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onOpenModal(product)}
              className={`h-9 px-4 rounded-full text-xs font-bold text-white transition-all active:scale-95 shadow-sm ${
                isNonVeg ? 'bg-red-600 hover:bg-red-700 shadow-red-200' : 'bg-[#1B4332] hover:bg-[#122e22] shadow-emerald-100'
              }`}
            >
              Add
            </button>
            <button
              onClick={() => onOpenModal(product, true)}
              className={`h-9 px-4 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                isNonVeg 
                  ? 'border-red-600 text-red-600 hover:bg-red-50' 
                  : 'border-[#1B4332] text-[#1B4332] hover:bg-emerald-50'
              }`}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopProductCard
