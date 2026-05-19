import { Card } from '../ui/Card'
import Price from '../Price'
import { getQuantities, getStartingPrice, getVariantImage, getVariantTypes } from '../../utils/productPricing'

const ShopProductCard = ({ product, onOpenModal }) => {
  const startingPrice = getStartingPrice(product)
  const isNonVeg = product.category === 'nonVeg'
  const firstType = getVariantTypes(product)[0] || null
  const firstQty = getQuantities(product, firstType)[0] || null
  const cardImage = getVariantImage(product, firstType, firstQty)

  // Determine a dynamic badge (just for UI premium feel on mobile)
  const isBestseller = product.featured || false;

  return (
    <Card hoverable className="h-full flex flex-col group rounded-xl sm:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:shadow-sm overflow-hidden border border-gray-100 sm:border-transparent">
      {/* Image - clickable to open modal */}
      <div 
        onClick={() => onOpenModal(product)}
        className="cursor-pointer relative"
      >
        <div className="relative aspect-[4/5] sm:aspect-auto sm:h-40 md:h-52 overflow-hidden bg-gray-50 rounded-t-xl sm:rounded-none">
          {cardImage ? (
            <img
              src={cardImage}
              alt={product.title || product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-[11px] px-2 text-center">
              No Image
            </div>
          )}
          {/* Subtle dark gradient overlay on mobile for premium look */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent sm:hidden" />
          
          {/* Category & Badges */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 md:top-3 md:left-3 flex flex-col gap-1 z-10">
            {isBestseller && (
              <span className="bg-amber-500/95 backdrop-blur-sm text-white text-[8px] sm:text-[10px] md:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-[2px] md:px-3 md:py-1 rounded-sm sm:rounded-full uppercase tracking-wider w-fit shadow-sm">
                Bestseller
              </span>
            )}
            <span className={`px-1.5 py-0.5 sm:px-2 sm:py-[2px] md:px-3 md:py-1 rounded-sm sm:rounded-full text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md w-fit shadow-sm ${
              isNonVeg 
                ? 'bg-nonveg/95 text-white' 
                : 'bg-[#1f4d36]/95 text-white sm:bg-[#1f4d36]/90'
            }`}>
              {product.category === 'nonVeg' ? 'Non-Veg' : product.category}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4 flex flex-col flex-1 bg-white">
        <div 
          onClick={() => onOpenModal(product)}
          className="cursor-pointer"
        >
          <h3 className="font-heading text-[12px] leading-[1.3] sm:text-[15px] md:text-[16px] font-bold text-gray-800 mb-0.5 sm:mb-1 group-hover:text-[#1f4d36] transition-colors line-clamp-2">
            {product.title || product.name}
          </h3>
        </div>
        <p className="font-body text-[9px] sm:text-xs text-gray-400 sm:text-gray-500 mb-1.5 sm:mb-2 md:mb-3 flex-1 line-clamp-1 font-medium tracking-wide">
          Multiple variants
        </p>

        {/* Price */}
        <div className="mb-2.5 sm:mb-3">
          {startingPrice ? (
            <div className="flex flex-row items-center gap-1.5 sm:flex-col sm:items-start sm:gap-0">
              <span className="hidden sm:block text-[10px] text-gray-400 uppercase tracking-wider mb-[2px]">Starting from</span>
              <Price amount={startingPrice} size="sm" className="sm:!text-md font-bold !text-[#1f4d36]" />
            </div>
          ) : (
            <p className="text-[11px] sm:text-[12px] text-gray-500 mt-1 font-semibold">Price varies</p>
          )}
        </div>

        {/* Add to Cart and Buy Now Buttons */}
        <div className="flex gap-1.5 sm:gap-2 mt-auto">
          <button
            onClick={() => onOpenModal(product)}
            className={`flex-1 h-[28px] sm:h-[38px] rounded-full text-[10px] sm:text-[13px] font-bold transition duration-300 active:scale-95 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:shadow-none ${
              isNonVeg
                ? "bg-nonveg hover:bg-[#6E1616] text-white"
                : "bg-[#1f4d36] hover:bg-[#173c2b] text-white"
            }`}
          >
            Add
          </button>

          <button
            onClick={() => onOpenModal(product, true)}
            className={`flex-1 h-[28px] sm:h-[38px] rounded-full text-[10px] sm:text-[13px] font-bold border transition duration-300 active:scale-95 ${
              isNonVeg
                ? "border-nonveg text-nonveg hover:bg-nonveg hover:text-white bg-nonveg/5 sm:bg-transparent"
                : "border-[#1f4d36] text-[#1f4d36] hover:bg-[#1f4d36] hover:text-white bg-[#1f4d36]/5 sm:bg-transparent"
            }`}
          >
            Buy
          </button>
        </div>
      </div>
    </Card>
  )
}

export default ShopProductCard
