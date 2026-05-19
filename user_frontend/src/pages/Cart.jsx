import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import Price from '../components/Price'
import { useCart } from '../context/CartContext'
import { fadeInUp, staggerContainer } from '../animations/variants'

const CartItem = ({ item, onUpdateQuantity, onRemove, itemKey }) => {
  const { product, quantity } = item
  const subtotal = product.price * quantity
  const isNonVeg = product.category === 'nonVeg'

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-[24px] sm:rounded-card border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.03)] sm:shadow-none sm:p-4 mb-4 sm:mb-0 flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-4"
    >
      {/* Mobile & Desktop Inner Flex Row */}
      <div className="flex flex-row items-start sm:items-center gap-3 sm:gap-4 p-3.5 sm:p-0 w-full sm:w-auto flex-1">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="flex-shrink-0 relative group">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-[84px] h-[90px] sm:w-24 sm:h-24 object-cover rounded-[14px] sm:rounded-lg border border-gray-50 sm:group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-[84px] h-[90px] sm:w-24 sm:h-24 rounded-[14px] sm:rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-[10px] sm:text-xs text-center px-1">
              No Image
            </div>
          )}
        </Link>

        {/* Product Info & Controls */}
        <div className="flex-1 min-w-0 flex flex-col h-full justify-between py-0.5">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-2">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-heading text-[15px] sm:text-lg font-bold text-gray-900 leading-tight line-clamp-2 hover:text-[#1f4d36] transition-colors">
                  {product.title}
                </h3>
              </Link>
              {product.selectedVariant && (
                <span className={`inline-block text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full mt-1.5 font-bold tracking-wide uppercase ${isNonVeg ? 'bg-nonveg/10 text-nonveg' : 'bg-[#1f4d36]/10 text-[#1f4d36]'}`}>
                  {product.selectedVariant}
                </span>
              )}
            </div>
          </div>
          
          {/* Mobile Price and Stepper Row */}
          <div className="flex items-center justify-between mt-3 sm:mt-2">
            <div className="flex flex-col sm:hidden">
              <Price amount={product.price} size="sm" className="!text-[16px] font-bold text-gray-900" />
            </div>
            {/* Desktop Price */}
            <div className="hidden sm:block mt-1">
              <Price amount={product.price} size="md" />
            </div>

            {/* Quantity Controls (Mobile only, desktop is hidden here) */}
            <div className="flex items-center sm:hidden bg-gray-50 border border-gray-100 rounded-full p-1 ml-auto">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => onUpdateQuantity(itemKey, quantity - 1)}
                className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 transition-colors border border-gray-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
              </motion.button>
              <span className="w-7 text-center font-bold text-[13px] text-gray-800">
                {quantity}
              </span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => onUpdateQuantity(itemKey, quantity + 1)}
                className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1f4d36] transition-colors border border-gray-50"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Specific Content (Quantity, Subtotal, Remove) */}
      <div className="hidden sm:flex items-center gap-6 ml-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdateQuantity(itemKey, quantity - 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
            </motion.button>
            <span className="w-12 h-10 flex items-center justify-center font-bold text-gray-800 border-x border-gray-200">
              {quantity}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onUpdateQuantity(itemKey, quantity + 1)}
              className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </motion.button>
          </div>
        </div>

        <div className="text-right min-w-[100px]">
          <p className="font-body text-sm text-gray-500 mb-1">Subtotal</p>
          <div className="flex justify-end">
            <Price amount={subtotal} size="md" className="font-bold" />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onRemove(itemKey)}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </motion.button>
      </div>

      {/* Mobile Secondary Actions (Remove / Save) */}
      <div className="sm:hidden flex items-center justify-between border-t border-gray-50/50 px-5 py-3 bg-gray-50/30 rounded-b-[24px]">
        <button onClick={() => {}} className="text-[11px] font-bold text-gray-400 hover:text-gray-600 tracking-wider">SAVE FOR LATER</button>
        <div className="w-[1px] h-3 bg-gray-200"></div>
        <button onClick={() => onRemove(itemKey)} className="text-[11px] font-bold text-red-400 hover:text-red-600 tracking-wider flex items-center gap-1.5">
           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
           REMOVE
        </button>
      </div>
    </motion.div>
  )
}

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-12 sm:py-16 px-4"
  >
    <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 bg-[#1f4d36]/10 rounded-full flex items-center justify-center relative shadow-inner">
      <div className="absolute inset-0 bg-[#1f4d36]/5 rounded-full animate-ping opacity-20"></div>
      <svg className="w-12 h-12 sm:w-14 sm:h-14 text-[#1f4d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </div>
    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
      Your cart feels empty
    </h2>
    <p className="font-body text-sm sm:text-base text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
      Looks like you haven't added anything yet. Explore our fresh, organic collection and find something you love.
    </p>
    <Link to="/shop" className="block sm:inline-block">
      <button className="w-full sm:w-auto px-8 py-4 bg-[#1f4d36] text-white rounded-full font-bold shadow-[0_8px_20px_rgba(31,77,54,0.2)] hover:shadow-[0_10px_25px_rgba(31,77,54,0.3)] active:scale-95 transition-all text-[15px]">
        Explore Products
      </button>
    </Link>
  </motion.div>
)

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartItemKey } = useCart()
  const { items, totalPrice } = cart

  const handleUpdateQuantity = (itemKey, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemKey)
    } else {
      updateQuantity(itemKey, quantity)
    }
  }

  return (
    <main className="py-6 sm:py-12 md:py-16 bg-[#FAFAFA] min-h-[60vh] pb-32 sm:pb-16">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 flex flex-row items-center justify-between"
        >
          <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          {items.length > 0 && (
            <span className="sm:hidden bg-[#1f4d36]/10 text-[#1f4d36] px-3.5 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-wide">
              {items.length} item{items.length !== 1 ? 's' : ''}
            </span>
          )}
          {items.length > 0 && (
            <p className="hidden sm:block font-body text-gray-600">
              {items.length} item{items.length !== 1 ? 's' : ''} in your cart
            </p>
          )}
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="lg:flex lg:gap-8 relative">
            {/* Cart Items */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex-1 space-y-0 sm:space-y-4"
            >
              {items.map((item) => {
                const itemKey = getCartItemKey(item.product)
                return (
                  <CartItem
                    key={itemKey}
                    item={item}
                    itemKey={itemKey}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={removeFromCart}
                  />
                )
              })}
              
              {/* Mobile Only padding helper */}
              <div className="h-6 sm:hidden"></div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-80 mt-2 sm:mt-8 lg:mt-0"
            >
              <div className="bg-white rounded-[24px] sm:rounded-card p-5 sm:p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:shadow-none sm:sticky sm:top-24 mb-6 sm:mb-0">
                <h2 className="font-heading text-[17px] sm:text-xl font-bold text-gray-900 mb-5 sm:mb-6 tracking-tight">
                  Bill Details
                </h2>

                <div className="space-y-3.5 sm:space-y-3 mb-5 sm:mb-6">
                  <div className="flex justify-between items-center font-body text-[13px] sm:text-[15px] text-gray-500">
                    <span>Item Total</span>
                    <span className="font-medium text-gray-700">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center font-body text-[13px] sm:text-[15px] text-gray-500">
                    <span>Delivery Fee</span>
                    <span className="text-[#1f4d36] font-bold text-[12px] bg-[#1f4d36]/10 px-2 py-0.5 rounded">FREE</span>
                  </div>
                  
                  {/* Divider */}
                  <div className="border-t border-dashed sm:border-solid border-gray-200 my-4 sm:pt-3">
                    <div className="flex justify-between items-center mt-4 sm:mt-0">
                      <span className="font-heading text-[15px] sm:text-lg font-bold text-gray-900">Grand Total</span>
                      <Price amount={totalPrice} size="lg" className="!text-xl font-bold text-gray-900" />
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block">
                  <Link to="/checkout">
                    <Button variant="primary" className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link to="/shop" className="block mt-4">
                    <Button variant="outline" className="w-full" size="md">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
                
                {/* Mobile Trust Badges */}
                <div className="sm:hidden flex items-center justify-between mt-6 pt-5 border-t border-gray-50 bg-gray-50/50 -mx-5 -mb-5 px-5 pb-5 rounded-b-[24px]">
                  <div className="flex flex-col items-center gap-1.5">
                     <svg className="w-6 h-6 text-[#1f4d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">100% Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                     <svg className="w-6 h-6 text-[#1f4d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7"/></svg>
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Farm Verified</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5">
                     <svg className="w-6 h-6 text-[#1f4d36]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">Fresh Delivery</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </Container>
      
      {/* Mobile Sticky Checkout Bar */}
      {items.length > 0 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-5 flex items-center justify-between shadow-[0_-12px_30px_rgba(0,0,0,0.06)] z-40 rounded-t-[28px]">
          <div className="flex flex-col pl-2">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total</span>
            <Price amount={totalPrice} size="lg" className="!text-[22px] font-bold text-gray-900" />
          </div>
          <Link to="/checkout" className="w-[60%]">
            <button className="w-full py-4 bg-[#1f4d36] text-white rounded-full font-bold text-[15px] shadow-[0_8px_20px_rgba(31,77,54,0.25)] active:scale-95 transition-transform flex items-center justify-center gap-2 tracking-wide">
              Checkout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
            </button>
          </Link>
        </div>
      )}
    </main>
  )
}

export default Cart
