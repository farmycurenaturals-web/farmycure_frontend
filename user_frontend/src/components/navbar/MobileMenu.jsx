import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import CartIcon from './CartIcon'
import { slideInRight } from '../../animations/variants'
import { useAuth } from '../../context/AuthContext'

const MobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth()
  const avatarSrc = user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E5E7EB&color=111827`
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          />

          {/* Menu Panel */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <Link to="/" onClick={onClose}>
                  <span className="font-heading text-xl font-bold text-forest">
                    FarmyCure Naturals
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-6 h-6 text-text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <NavLinks onClick={onClose} />
                <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={avatarSrc}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 hover:scale-105 transition"
                        />
                        <span className="text-sm font-medium text-text-primary truncate">{user?.name}</span>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg border border-gray-100 overflow-hidden bg-gray-50/50">
                        <Link
                          to="/profile"
                          onClick={onClose}
                          className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-forest"
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/profile?tab=orders"
                          onClick={onClose}
                          className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-forest"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/profile?tab=addresses"
                          onClick={onClose}
                          className="hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-forest"
                        >
                          Saved Addresses
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            logout()
                            onClose()
                          }}
                          className="text-left hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-forest"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <Link to="/login" onClick={onClose} className="text-sm font-medium text-forest">
                      Login
                    </Link>
                  )}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-gray-500">
                    Your Cart
                  </span>
                  <CartIcon onClick={onClose} />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
