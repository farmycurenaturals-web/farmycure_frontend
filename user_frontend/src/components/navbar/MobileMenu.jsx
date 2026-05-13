import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import { useAuth } from '../../context/AuthContext'

const slideDown = {
  hidden: { y: '-100%', opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { y: '-100%', opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } },
}

const MobileMenu = ({ isOpen, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth()
  const avatarSrc = user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E5E7EB&color=111827`
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />

          <motion.div
            variants={slideDown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-white shadow-xl rounded-b-2xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <Link to="/" onClick={onClose}>
                <span className="font-heading text-lg font-bold text-forest">
                  FarmyCure Naturals
                </span>
              </Link>
              <button
                onClick={onClose}
                className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="px-5 py-4">
              <NavLinks onClick={onClose} />
            </nav>

            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarSrc}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                    <span className="text-sm font-medium text-text-primary truncate">{user?.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/profile" onClick={onClose} className="text-center bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2.5 text-sm text-forest font-medium transition-colors">
                      Profile
                    </Link>
                    <Link to="/profile?tab=orders" onClick={onClose} className="text-center bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2.5 text-sm text-forest font-medium transition-colors">
                      Orders
                    </Link>
                    <Link to="/profile?tab=addresses" onClick={onClose} className="text-center bg-gray-50 hover:bg-gray-100 rounded-lg px-3 py-2.5 text-sm text-forest font-medium transition-colors">
                      Addresses
                    </Link>
                    <button
                      type="button"
                      onClick={() => { logout(); onClose() }}
                      className="text-center bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-lg px-3 py-2.5 text-sm text-gray-600 font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="block w-full text-center bg-forest text-white rounded-lg px-4 py-3 text-sm font-semibold hover:bg-forest/90 transition-colors"
                >
                  Login / Create Account
                </Link>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
