import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import {
  hasTypeVariants,
  getVariantTypes,
  getQuantities,
  getPrice,
  getVariantImage
} from '../../utils/productPricing'
import { isUserLoggedIn } from '../../utils/auth'
import Price from '../Price'

const ProductModal = ({ product, isOpen, onClose, isBuyNow = false }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSubType, setSelectedSubType] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState(null)
  const [itemQuantity, setItemQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (product) {
      const isRice = (product.productCode || product._id) === 'rice'
      const hasTypes = hasTypeVariants(product)
      
      if (isRice) {
        const subTypes = getVariantTypes(product)
        if (subTypes.length > 0) {
          setSelectedSubType(subTypes[0])
          const quantities = getQuantities(product, subTypes[0])
          setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
          setSelectedType(null)
        }
      } else if (hasTypes) {
        const types = getVariantTypes(product)
        if (types.length > 0) {
          setSelectedType(types[0])
          const quantities = getQuantities(product, types[0])
          setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
          setSelectedSubType(null)
        }
      } else {
        setSelectedType(null)
        setSelectedSubType(null)
        const quantities = getQuantities(product)
        setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
      }
      setItemQuantity(1)
      setAdded(false)
    }
  }, [product?.id])

  useEffect(() => {
    if (selectedType && product) {
      const quantities = getQuantities(product, selectedType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
    if (selectedSubType && product) {
      const quantities = getQuantities(product, selectedSubType)
      setSelectedQuantity(quantities.length > 0 ? quantities[0] : null)
    }
  }, [selectedType, selectedSubType])

  if (!isOpen || !product) return null

  const isRice = (product.productCode || product._id) === 'rice'
  const isNonVeg = product.category === 'nonVeg'
  const hasTypes = hasTypeVariants(product)
  const variantTypes = getVariantTypes(product)

  const availableQuantities = hasTypes
    ? isRice
      ? getQuantities(product, selectedSubType)
      : getQuantities(product, selectedType)
    : getQuantities(product)

  const currentPrice = isRice
    ? getPrice(product, selectedSubType, selectedQuantity)
    : getPrice(product, selectedType, selectedQuantity)
  
  const activeType = isRice ? selectedSubType : selectedType
  const modalImage = getVariantImage(product, activeType, selectedQuantity)
  const canAddToCart = currentPrice !== null && selectedQuantity !== null && (!hasTypes || Boolean(activeType))

  const formatTypeName = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const formatSubTypeName = (subType) => {
    if (subType === 'kala_namak') return 'Kala Namak'
    return subType.charAt(0).toUpperCase() + subType.slice(1)
  }

  const buildVariantLabel = () => {
    const parts = []
    if (isRice && selectedSubType) {
      parts.push(formatSubTypeName(selectedSubType))
    } else if (selectedType) {
      parts.push(formatTypeName(selectedType))
    }
    if (selectedQuantity) parts.push(selectedQuantity)
    return parts.join(' - ')
  }

  const handleAddToCart = () => {
    if (!canAddToCart) return
    if (!isUserLoggedIn()) {
      alert('Please login to continue')
      setTimeout(() => {
        onClose()
        navigate('/login', { state: { from: '/shop', message: 'Please login to continue' } })
      }, 1000)
      return
    }

    const cartItem = {
      id: product._id || product.id,
      productId: product._id || product.id,
      title: product.title || product.name,
      image: modalImage,
      category: product.category,
      selectedType: isRice ? null : selectedType,
      selectedSubType: isRice ? selectedSubType : null,
      variant: activeType || 'default',
      selectedQuantity,
      selectedVariant: buildVariantLabel(),
      price: currentPrice
    }

    addToCart(cartItem, itemQuantity)
    setAdded(true)

    if (isBuyNow) {
      setTimeout(() => {
        onClose()
        navigate('/checkout')
      }, 500)
    } else {
      setTimeout(() => {
        setAdded(false)
        onClose()
      }, 1000)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 sm:backdrop-blur-md backdrop-blur-sm z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4"
          onClick={handleOverlayClick}
        >
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white rounded-t-[28px] sm:rounded-3xl shadow-2xl max-w-4xl sm:max-w-[880px] w-full p-0 sm:p-8 relative max-h-[92vh] sm:max-h-[85vh] overflow-hidden flex flex-col"
          >
            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 rounded-full hover:bg-gray-100 transition-colors z-20 hidden sm:block bg-white shadow-sm border border-gray-100"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mobile Drag Handle & Close Button */}
            <div className="absolute top-3 right-3 z-20 sm:hidden flex items-center justify-between w-[calc(100%-24px)]">
               <div className="w-10 h-1.5 bg-white/40 rounded-full mx-auto backdrop-blur-md shadow-sm"></div>
              <button onClick={onClose} className="p-2 bg-black/25 rounded-full backdrop-blur-md text-white shadow-sm active:scale-95 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto sm:overflow-visible flex-1 sm:flex-none hide-scrollbar sm:h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-10 h-full">
                
                {/* Image Section */}
                <div className="relative bg-gray-50 sm:bg-white min-h-[300px] sm:min-h-0 sm:rounded-2xl overflow-hidden group flex-shrink-0 sm:h-[100%] sm:flex sm:flex-col">
                  {/* Main Large Image */}
                  <div className="relative w-full h-[360px] sm:flex-1 sm:min-h-0 sm:rounded-2xl sm:overflow-hidden sm:bg-gray-50 sm:border sm:border-gray-100">
                    {modalImage ? (
                      <motion.img
                        key={modalImage}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        src={modalImage}
                        alt={product.title || product.name}
                        className="w-full h-full object-cover sm:object-cover sm:transition-transform sm:duration-700 sm:hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm px-4 text-center">
                        No Image Available
                      </div>
                    )}
                    {/* Subtle gradient overlay for header visibility on mobile */}
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent sm:hidden pointer-events-none" />
                  </div>

                  {/* Desktop Mock Thumbnails (Premium Gallery Feel) */}
                  <div className="hidden sm:flex mt-4 gap-3">
                    <div className="w-16 h-16 rounded-xl border-2 border-[#1f4d36] overflow-hidden cursor-pointer shadow-sm">
                       {modalImage && <img src={modalImage} className="w-full h-full object-cover" alt="thumbnail" />}
                    </div>
                    {/* Placeholder for secondary thumbnail if needed */}
                    <div className="w-16 h-16 rounded-xl border border-gray-200 opacity-50 grayscale overflow-hidden hidden">
                       {modalImage && <img src={modalImage} className="w-full h-full object-cover" alt="thumbnail" />}
                    </div>
                  </div>

                  {/* Pagination Dots (Mobile Mock Carousel) */}
                  <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 sm:hidden z-10">
                    <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50 shadow-sm"></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col p-5 sm:p-2 sm:pr-4 sm:overflow-y-auto sm:hide-scrollbar sm:h-full">
                  {/* Badge & Title */}
                  <div className="mb-4 sm:mb-5">
                    <span className={`inline-block w-fit text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-1 sm:px-3 sm:py-1 rounded-sm sm:rounded-full mb-2.5 sm:mb-4 shadow-sm ${
                        isNonVeg ? 'bg-nonveg/10 text-nonveg sm:bg-nonveg/10 sm:text-nonveg' : 'bg-[#1f4d36]/10 text-[#1f4d36] sm:bg-[#1f4d36]/10 sm:text-[#1f4d36]'
                      }`}>
                        {isNonVeg ? 'Non-Veg' : product.category}
                      </span>
                      
                      <h2 className="font-heading text-xl sm:text-3xl md:text-[32px] font-bold text-gray-900 mb-1 sm:mb-3 leading-tight sm:tracking-tight">
                        {product.title || product.name}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm sm:block hidden mb-5 leading-relaxed line-clamp-3">
                        {product.description || "Experience the finest quality ingredients sourced directly from trusted local farms. Every product is carefully selected to ensure premium taste and natural freshness for your home."}
                      </p>
                      
                      <div className="flex items-baseline gap-2 mb-2 sm:mb-6">
                        {currentPrice != null ? (
                          <Price amount={currentPrice * itemQuantity} size="lg" className="!text-2xl sm:!text-3xl font-bold text-gray-900 sm:!text-gray-900" />
                        ) : (
                          <span className="font-heading text-xl sm:text-2xl font-bold text-gray-900">Select options</span>
                        )}
                      </div>
                  </div>

                  {/* Dividers on Mobile */}
                  <div className="h-[1px] bg-gray-100 -mx-5 px-5 mb-5 sm:hidden"></div>

                  {/* Variants (Type) */}
                  {hasTypes && variantTypes.length > 0 && (
                    <div className="mb-5 sm:mb-6">
                      <label className="font-body text-[13px] sm:text-xs font-bold sm:font-bold text-gray-900 sm:text-gray-400 mb-2.5 sm:mb-3 block uppercase sm:uppercase tracking-wider sm:tracking-widest">
                        {isRice ? 'Select Type' : 'Select Variant'}
                      </label>
                      <div className="flex flex-wrap gap-2.5 sm:gap-2.5">
                        {variantTypes.map((type) => (
                          <button
                            key={type}
                            onClick={() => isRice ? setSelectedSubType(type) : setSelectedType(type)}
                            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold sm:font-medium text-[12px] sm:text-[13px] transition-all border ${
                              (isRice ? selectedSubType : selectedType) === type
                                ? isNonVeg
                                  ? 'bg-nonveg text-white border-nonveg shadow-md shadow-nonveg/20'
                                  : 'bg-[#1f4d36] text-white border-[#1f4d36] shadow-md shadow-[#1f4d36]/20'
                                : 'bg-white sm:bg-white text-gray-600 sm:text-gray-700 border-gray-200 sm:border-gray-200 hover:border-[#1f4d36] sm:hover:border-gray-400'
                            }`}
                          >
                            {isRice ? formatSubTypeName(type) : formatTypeName(type)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantities (Sizes) */}
                  {availableQuantities.length > 0 && (
                    <div className="mb-6 sm:mb-8">
                      <label className="font-body text-[13px] sm:text-xs font-bold sm:font-bold text-gray-900 sm:text-gray-400 mb-2.5 sm:mb-3 block uppercase sm:uppercase tracking-wider sm:tracking-widest">
                        Select Size / Volume
                      </label>
                      <div className="flex flex-wrap gap-2.5 sm:gap-2.5">
                        {availableQuantities.map((qty) => {
                          const price = hasTypes
                            ? isRice
                              ? getPrice(product, selectedSubType, qty)
                              : getPrice(product, selectedType, qty)
                            : getPrice(product, null, qty)
                          return (
                            <button
                              key={qty}
                              onClick={() => setSelectedQuantity(qty)}
                              className={`px-3 py-2 sm:px-5 sm:py-2.5 rounded-full font-bold sm:font-medium text-[12px] sm:text-[13px] transition-all flex flex-row sm:flex-col items-center justify-center gap-1.5 sm:gap-0 sm:min-w-[76px] border ${
                                selectedQuantity === qty
                                  ? isNonVeg
                                    ? 'bg-nonveg text-white border-nonveg shadow-md shadow-nonveg/20'
                                    : 'bg-[#1f4d36] text-white border-[#1f4d36] shadow-md shadow-[#1f4d36]/20'
                                  : 'bg-white sm:bg-white text-gray-600 sm:text-gray-700 border-gray-200 sm:border-gray-200 hover:border-[#1f4d36] sm:hover:border-gray-400'
                              }`}
                            >
                              <span>{qty}</span>
                              {price != null && (
                                <span className="sm:mt-0.5 font-medium opacity-90 sm:opacity-80 text-[10px] sm:text-[11px]">
                                  <span className="sm:hidden"> - </span>
                                  <Price
                                    amount={price}
                                    size="xs"
                                    variant={selectedQuantity === qty ? 'onDark' : 'muted'}
                                    className="!inline-block"
                                  />
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Spacer to push content up on desktop */}
                  <div className="hidden sm:block flex-1 min-h-[40px]"></div>

                  {/* Desktop Add to Cart (Hidden on Mobile) */}
                  <div className="hidden sm:block mt-auto pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-4">
                      {/* Desktop Item Stepper */}
                      <div className="flex items-center justify-between bg-white border border-gray-200 rounded-full px-1.5 py-1.5 w-[130px] shadow-sm">
                        <button 
                          onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 font-medium transition-colors"
                        >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4"/></svg>
                        </button>
                        <span className="font-bold text-gray-800 text-[15px]">{itemQuantity}</span>
                        <button 
                          onClick={() => setItemQuantity(itemQuantity + 1)}
                          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-[#1f4d36] font-bold transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}
                        className={`flex-1 py-4 rounded-full font-bold text-[15px] tracking-wide transition-all shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-[0.98] ${
                          isNonVeg
                            ? 'bg-nonveg hover:bg-[#6E1616] text-white disabled:opacity-50'
                            : 'bg-[#1f4d36] hover:bg-[#163a2a] text-white disabled:bg-gray-300'
                        } ${!canAddToCart ? 'cursor-not-allowed' : ''}`}
                      >
                        {added ? 'Added to Cart!' : isBuyNow ? 'Buy Now' : `Add to Cart`}
                      </button>
                    </div>
                    {canAddToCart && (
                      <p className="font-body text-xs text-gray-400 text-center mt-3 tracking-wide uppercase">
                        {product.title} - {buildVariantLabel()}
                      </p>
                    )}
                  </div>
                  
                  {/* Extra padding at bottom for mobile to scroll past sticky footer */}
                  <div className="h-[100px] sm:hidden w-full"></div>

                </div>
              </div>
            </div>
            
            {/* Mobile Sticky Bottom CTA Section */}
            <div className="sm:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-5 flex items-center gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-20 rounded-b-[28px]">
              {/* Mobile Item Quantity Stepper */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-full px-1.5 py-1.5 w-[110px] flex-shrink-0">
                <button 
                  onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                  className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 font-medium active:scale-95 transition-transform border border-gray-50"
                >
                  -
                </button>
                <span className="font-bold text-gray-800 text-sm w-4 text-center">{itemQuantity}</span>
                <button 
                  onClick={() => setItemQuantity(itemQuantity + 1)}
                  className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1f4d36] font-bold active:scale-95 transition-transform border border-gray-50"
                >
                  +
                </button>
              </div>
              
              {/* Mobile Add to Cart Button */}
              <button
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className={`flex-1 py-3.5 rounded-full font-bold text-[15px] transition-all shadow-lg active:scale-[0.98] ${
                    isNonVeg
                      ? 'bg-nonveg text-white disabled:opacity-50 shadow-nonveg/30'
                      : 'bg-[#1f4d36] text-white disabled:bg-gray-300 disabled:shadow-none shadow-[#1f4d36]/30'
                  } ${!canAddToCart ? 'cursor-not-allowed' : ''}`}
                >
                  {added ? 'Added to Cart!' : isBuyNow ? 'Buy Now' : `Add Item${itemQuantity > 1 ? 's' : ''}`}
                </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProductModal
