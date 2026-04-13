import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import CartIcon from './CartIcon'
import { Container } from '../ui/Container'
import Logo from '../../assets/icons/Logo.svg'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const { isScrolled } = useScrollPosition()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const shouldBeTransparent = isHomePage && !isScrolled
  const { isAuthenticated, user, logout } = useAuth()
  const avatarSrc = user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E5E7EB&color=111827`

  useEffect(() => {
    const onDoc = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    setProfileOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={`
          sticky top-0 z-50
          transition-all duration-300
          ${shouldBeTransparent 
            ? 'bg-transparent' 
            : 'bg-white shadow-md'
          }
        `}
      >
        <Container>
          <nav className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={Logo} 
                alt="FarmyCure Logo"
                className={`h-9 transition-colors duration-300 ${shouldBeTransparent ? 'brightness-0 invert' : ''}`}
              />
              <span
                className={`
                  text-lg font-semibold tracking-wide
                  transition-colors duration-300
                  ${shouldBeTransparent ? 'text-white' : 'text-[#1f4d36]'}
                `}
              >
                FarmyCure Naturals
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLinks isTransparent={shouldBeTransparent} />
              {isAuthenticated ? (
                <div className="relative flex items-center gap-3" ref={profileRef}>
                  <button
                    type="button"
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                    onClick={() => setProfileOpen((o) => !o)}
                    className="inline-flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f4d36]/40"
                  >
                    <img
                      src={avatarSrc}
                      alt={`${user?.name || 'User'} avatar`}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200 hover:scale-105 transition"
                    />
                  </button>
                  {profileOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-md border border-gray-100 py-1 z-50"
                    >
                      <Link
                        to="/profile"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="block hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-gray-800"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/profile?tab=orders"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="block hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-gray-800"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/profile?tab=addresses"
                        role="menuitem"
                        onClick={() => setProfileOpen(false)}
                        className="block hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-gray-800"
                      >
                        Saved Addresses
                      </Link>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setProfileOpen(false)
                          logout()
                        }}
                        className="w-full text-left hover:bg-gray-100 px-4 py-2 cursor-pointer text-sm text-gray-800"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className={`text-sm font-medium ${shouldBeTransparent ? 'text-white' : 'text-forest'}`}>
                  Login
                </Link>
              )}
              <CartIcon isTransparent={shouldBeTransparent} />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2"
              aria-label="Open menu"
            >
              <svg
                className={`w-6 h-6 transition-colors duration-300 ${
                  shouldBeTransparent ? 'text-white' : 'text-forest'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

          </nav>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}

export default Navbar
