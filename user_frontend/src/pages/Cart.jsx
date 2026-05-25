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
      className="bg-white rounded-3xl border border-gray-100 p-4 sm:p-5 shadow-[0_4px_20px_rgba(27,67,50,0.02)] flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-[0_8px_30px_rgba(27,67,50,0.05)] transition-all duration-300"
    >
      {/* Product info row */}
      <div className="flex flex-row items-center gap-4 flex-1">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="shrink-0 relative group">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-2xl border border-gray-50 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 text-[10px] text-center px-1">
              No Image
            </div>
          )}
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-heading text-[15px] sm:text-base font-bold text-gray-900 leading-snug hover:text-[#1B4332] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
          {product.selectedVariant && (
            <span className={`inline-block text-[9px] px-2.5 py-0.5 rounded-full mt-1.5 font-bold tracking-wider uppercase ${
              isNonVeg ? 'bg-red-50 text-red-600' : 'bg-[#1B4332]/5 text-[#1B4332]'
            }`}>
              {product.selectedVariant}
            </span>
          )}
          <div className="sm:hidden mt-2">
            <Price amount={product.price} size="sm" className="font-bold text-gray-900" />
          </div>
        </div>
      </div>

      {/* Controls & Subtotal */}
      <div className="flex items-center justify-between sm:justify-end gap-6 border-t border-gray-50 pt-3 sm:pt-0 sm:border-0">
        
        {/* Quantity Controls */}
        <div className="flex items-center bg-gray-50 border border-gray-200/50 rounded-full p-1.5 shadow-sm">
          <button
            onClick={() => onUpdateQuantity(itemKey, quantity - 1)}
            className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#1B4332] transition-colors"
          >
            -
          </button>
          <span className="w-7 text-center font-bold text-xs text-gray-800">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(itemKey, quantity + 1)}
            className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1B4332] hover:text-[#1B4332]/85 transition-colors font-bold"
          >
            +
          </button>
        </div>

        {/* Desktop Specific Price/Subtotal & Remove */}
        <div className="hidden sm:block text-right min-w-[90px]">
          <span className="block text-[9px] text-gray-400 uppercase tracking-widest font-semibold mb-0.5">Subtotal</span>
          <Price amount={subtotal} size="md" className="font-bold !text-[#1B4332] !text-[15px]" />
        </div>

        <button
          onClick={() => onRemove(itemKey)}
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
          aria-label="Remove item"
        >
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

const EmptyCart = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-16 sm:py-24 px-4 max-w-md mx-auto"
  >
    <div className="w-20 h-20 mx-auto mb-6 bg-[#1B4332]/5 rounded-full flex items-center justify-center shadow-inner relative">
      <div className="absolute inset-0 bg-[#1B4332]/5 rounded-full animate-ping opacity-20"></div>
      <svg className="w-9 h-9 text-[#1B4332]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      </svg>
    </div>
    <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
      Your cart is empty
    </h2>
    <p className="font-body text-xs sm:text-sm text-gray-500 mb-8 leading-relaxed">
      Looks like you haven&apos;t added any fresh harvest yet. Explore our farm catalog to fill your basket!
    </p>
    <Link to="/shop">
      <Button variant="primary" className="px-8 py-3.5 shadow-md shadow-emerald-100">
        Start Shopping
      </Button>
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
    <main className="py-8 sm:py-16 md:py-20 bg-[#FBFBF9] min-h-[70vh] pb-32 sm:pb-20">
      <Container>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12 flex items-baseline justify-between border-b border-gray-100 pb-5"
        >
          <div>
            <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#1B4332] tracking-tight">
              Your Basket
            </h1>
            <p className="font-body text-xs sm:text-sm text-gray-500 mt-1.5">
              Review items before checking out.
            </p>
          </div>
          {items.length > 0 && (
            <span className="bg-[#1B4332]/5 text-[#1B4332] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
          )}
        </motion.div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Cart Items List */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-8 space-y-4"
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
            </motion.div>

            {/* Bill Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4"
            >
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(27,67,50,0.02)] lg:sticky lg:top-28">
                <h2 className="font-heading text-lg sm:text-xl font-bold text-gray-900 mb-5 tracking-tight">
                  Bill Summary
                </h2>

                <div className="space-y-4 mb-6 border-b border-gray-100 pb-5">
                  <div className="flex justify-between items-center font-body text-xs sm:text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center font-body text-xs sm:text-sm text-gray-500">
                    <span>Delivery Charge</span>
                    <span className="text-[#1B4332] font-bold text-[10px] uppercase tracking-wider bg-[#1B4332]/5 px-2 py-0.5 rounded">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-heading text-base sm:text-lg font-bold text-gray-900">Grand Total</span>
                  <Price amount={totalPrice} size="lg" className="!text-xl font-bold !text-[#1B4332]" />
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden sm:block space-y-3">
                  <Link to="/checkout" className="block">
                    <Button variant="primary" className="w-full py-3.5 shadow-md shadow-emerald-100 uppercase tracking-wider font-bold text-xs">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link to="/shop" className="block">
                    <Button variant="outline" className="w-full py-3" size="md">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between text-gray-400 text-[10px] uppercase tracking-wider font-semibold">
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-[#1B4332]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>Secure</span>
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-[#1B4332]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l4.03 3.359a.75.75 0 01.254.565v5.336a.75.75 0 01-.254.565l-4.03 3.359a1.125 1.125 0 00-.405.864v.568M11.25 3.03v.568c0 .334-.148.65-.405.864L6.815 7.821a.75.75 0 00-.254.565v5.336c0 .225.101.44.254.565l4.03 3.359c.257.214.405.53.405.864v.568M2.25 12h19.5" /></svg>Direct</span>
                  <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-[#1B4332]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.12-1.014L1.5 6.075C1.5 5.316 2.116 4.7 2.875 4.7h1.072m1.238 3.5h9.432m1.961 0h1.458c.545 0 .995.382 1.083.918l1.112 6.818a1.125 1.125 0 01-1.11 1.308h-1.596m-14.733 0h1.447m0 0a1.5 1.5 0 013 0m0 0h6m-3 0a1.5 1.5 0 01-3 0m3 0h6" /></svg>Express</span>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </Container>

      {/* Mobile Sticky Checkout Bar */}
      {items.length > 0 && (
        <div className="sm:hidden fixed bottom-20 left-4 right-4 bg-white/90 backdrop-blur-md border border-gray-100 p-4 rounded-2xl flex items-center justify-between shadow-lg z-30">
          <div className="flex flex-col pl-1">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">Total Bill</span>
            <Price amount={totalPrice} size="lg" className="!text-xl font-bold !text-[#1B4332]" />
          </div>
          <Link to="/checkout" className="w-[50%]">
            <button className="w-full py-3 bg-[#1B4332] text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-1.5">
              <span>Checkout</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </Link>
        </div>
      )}
    </main>
  )
}

export default Cart
