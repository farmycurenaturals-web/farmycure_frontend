import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import NavLinks from './NavLinks'
import CartIcon from './CartIcon'
import { Container } from '../ui/Container'
import Logo from '../../assets/icons/Logo.svg'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const location = useLocation()
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
      {/* Top Announcement Strip */}
      <div className="bg-[#1f4d36] text-white text-[10px] md:text-xs py-1.5 text-center font-medium tracking-wide">
        Farm-fresh organic products delivered directly to you.
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
        <Container>
          <nav className="flex items-center justify-between h-14 md:h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <img 
                src={Logo} 
                alt="FarmyCure Logo"
                className="h-7 md:h-9"
              />
              <span className="text-[15px] md:text-lg font-semibold tracking-wide text-[#1f4d36]">
                FarmyCure Naturals
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLinks isTransparent={false} />
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
                <Link to="/login" className="text-sm font-medium text-forest">
                  Login
                </Link>
              )}
              <CartIcon isTransparent={false} />
            </div>

            {/* Mobile: Cart Only */}
            <div className="flex items-center gap-1 lg:hidden">
              <CartIcon isTransparent={false} />
            </div>

          </nav>
        </Container>
      </header>
    </>
  )
}

export default Navbar
