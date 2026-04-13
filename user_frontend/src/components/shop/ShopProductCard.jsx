import { Card } from '../ui/Card'
import Price from '../Price'
import { getQuantities, getStartingPrice, getVariantImage, getVariantTypes } from '../../utils/productPricing'

const ShopProductCard = ({ product, onOpenModal }) => {
  const startingPrice = getStartingPrice(product)
  const isNonVeg = product.category === 'nonVeg'
  const firstType = getVariantTypes(product)[0] || null
  const firstQty = getQuantities(product, firstType)[0] || null
  const cardImage = getVariantImage(product, firstType, firstQty)

  return (
    <Card hoverable className="h-full flex flex-col rounded-[18px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {/* Image - clickable to open modal */}
      <div 
        onClick={() => onOpenModal(product)}
        className="cursor-pointer"
      >
        <div className="relative h-32 sm:h-40 md:h-52 overflow-hidden bg-gray-100 rounded-t-[18px]">
          {cardImage ? (
            <img
              src={cardImage}
              alt={product.title || product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm px-2 text-center bg-gray-100">
              No Image Available
            </div>
          )}
          {/* Category Badge */}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
            isNonVeg 
              ? 'bg-nonveg text-white' 
              : 'bg-forest/90 text-white'
          }`}>
            {product.category === 'nonVeg' ? 'Non-Veg' : product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
        <div 
          onClick={() => onOpenModal(product)}
          className="cursor-pointer"
        >
          <h3 className="font-heading text-sm sm:text-base md:text-lg font-semibold text-text-primary mb-1.5 hover:text-forest transition-colors">
            {product.title || product.name}
          </h3>
        </div>
        <p className="font-body text-xs sm:text-sm text-gray-600 mb-3 md:mb-4 flex-1">
          Available in multiple variants
        </p>

        {/* Price */}
        <div className="mb-4">
          {startingPrice ? (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Starting at</p>

              <Price amount={startingPrice} size="lg" />
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-2">Price varies</p>
          )}
        </div>

        {/* Add to Cart and Buy Now Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
          <button
            onClick={() => onOpenModal(product)}
            className={`w-full flex-1 min-h-[44px] px-2 py-2 rounded-xl text-sm font-medium transition duration-300 ${
              isNonVeg
                ? "bg-nonveg hover:bg-[#6E1616] text-white"
                : "bg-[#1f4d36] hover:bg-[#163a2a] text-white"
            }`}
          >
            Add to Cart
          </button>

          <button
            onClick={() => onOpenModal(product, true)}
            className={`w-full flex-1 min-h-[44px] px-2 py-2 rounded-xl text-sm font-medium border transition duration-300 ${
              isNonVeg
                ? "border-nonveg text-nonveg hover:bg-nonveg hover:text-white"
                : "border-[#1f4d36] text-[#1f4d36] hover:bg-[#1f4d36] hover:text-white"
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </Card>
  )
}

export default ShopProductCard
