import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NavLinks from './NavLinks'
import CartIcon from './CartIcon'
import { Container } from '../ui/Container'
import Logo from '../../assets/icons/Logo.svg'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const profileRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()
  const { wishlistIds } = useWishlist()
  const wishlistCount = wishlistIds.length
  const isHome = location.pathname === '/'
  const avatarSrc = user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=1B4332&color=FFFFFF`

  const [placeholderText, setPlaceholderText] = useState("Search fresh products...")

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPlaceholderText("Search...")
      } else if (window.innerWidth < 1024) {
        setPlaceholderText("Search products...")
      } else {
        setPlaceholderText("Search fresh products...")
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchVal.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchVal.trim())}`)
    }
  }

  return (
    <>
      <header
        className={`z-50 transition-all duration-500 ease-in-out border-b flex items-center ${
          isHome
            ? isScrolled
              ? 'fixed top-0 left-0 w-full glass-nav shadow-[0_4px_30px_rgba(27,67,50,0.05)] border-gray-200/40 h-14 md:h-16'
              : 'absolute top-[34px] left-0 w-full bg-transparent border-transparent h-16 md:h-20'
            : 'sticky top-0 bg-[#FBFBF9]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(27,67,50,0.02)] border-gray-200/45 h-14 md:h-16'
        }`}
      >
        <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 max-w-[1920px] mx-auto">
          <nav className="flex items-center justify-between w-full">
            
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <div className={`relative overflow-hidden w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-xl group-hover:scale-105 transition-all duration-300 ${
                isHome && !isScrolled ? 'bg-white/10' : 'bg-[#1B4332]/5'
              }`}>
                <img 
                  src={Logo} 
                  alt="FarmyCure Logo"
                  className="h-5 w-5 md:h-6 md:w-6 object-contain"
                />
              </div>
              <span className={`hidden sm:block text-[15px] md:text-xl font-heading font-bold tracking-tight transition-colors ${
                isHome && !isScrolled ? 'text-white' : 'text-[#1B4332] group-hover:text-[#1B4332]/85'
              }`}>
                FarmyCure
              </span>
            </Link>
 
            {/* Center Area: NavLinks + Search on Home Desktop, NavLinks only on other pages Desktop */}
            <div className={`flex items-center flex-1 mx-2 md:mx-6 lg:mx-8 ${
              isHome 
                ? 'justify-end' 
                : 'justify-center hidden lg:flex max-w-md'
            }`}>
              {isHome ? (
                <>
                  {/* NavLinks — desktop only, home page only */}
                  <div className="hidden lg:flex mr-6">
                    <NavLinks isTransparent={!isScrolled} />
                  </div>
                  {/* Search bar — always visible on home */}
                  <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[170px] sm:max-w-[230px] md:max-w-[280px] lg:max-w-[360px]">
                    <input
                      type="text"
                      placeholder={placeholderText}
                      value={searchVal}
                      onChange={(e) => setSearchVal(e.target.value)}
                      className="w-full px-4 py-1.5 pl-8 rounded-full text-[10px] md:text-[11px] font-body transition-all duration-300 outline-none bg-white border border-gray-200/25 focus:border-[#1B4332]/40 text-gray-800 placeholder-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.06)] focus:shadow-[0_4px_16px_rgba(27,67,50,0.08)]"
                    />
                    <button type="submit" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4332] transition-colors">
                      <svg className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </form>
                </>
              ) : (
                <NavLinks isTransparent={false} />
              )}
            </div>

            {/* Right Side: Search, Wishlist, Cart */}
            <div className="hidden lg:flex items-center space-x-4">
              
              {/* Search Bar (Only shown on non-home pages) */}
              {!isHome && (
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search harvest..."
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    className="w-44 focus:w-60 px-4 py-1.5 pl-9 rounded-full text-xs font-body transition-all duration-300 outline-none bg-gray-100/60 focus:bg-white border-transparent focus:border-[#1B4332]/30 text-[#1A1A1A] placeholder-gray-400"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1B4332]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </form>
              )}

              {/* Wishlist */}
              <Link 
                to="/profile?tab=wishlist" 
                className={`relative p-2 active:scale-95 transition-transform ${
                  isHome && !isScrolled ? 'text-white hover:text-white/80' : 'text-[#1B4332] hover:text-[#1B4332]/80'
                }`} 
                aria-label="Wishlist"
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-burnt-orange text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <CartIcon isTransparent={isHome && !isScrolled} />

              {/* Profile / Login */}
              {isAuthenticated ? (
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    aria-expanded={profileOpen}
                    aria-haspopup="true"
                    onClick={() => setProfileOpen((o) => !o)}
                    className="inline-flex items-center rounded-full focus:outline-none ring-offset-2 focus:ring-2 focus:ring-[#1B4332]/40"
                  >
                    <img
                      src={avatarSrc}
                      alt={`${user?.name || 'User'} avatar`}
                      className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-gray-200/80 hover:scale-105 transition duration-300"
                    />
                  </button>
                  {profileOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-up"
                    >
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Welcome back</p>
                        <p className="text-sm font-semibold text-[#1B4332] truncate">{user?.name || 'Customer'}</p>
                      </div>
                      <Link
                        to="/profile?tab=profile"
                        role="menuitem"
                        className="block hover:bg-[#1B4332]/5 px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#1B4332] transition-colors"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/profile?tab=orders"
                        role="menuitem"
                        className="block hover:bg-[#1B4332]/5 px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#1B4332] transition-colors"
                      >
                        Orders
                      </Link>
                      <Link
                        to="/profile?tab=addresses"
                        role="menuitem"
                        className="block hover:bg-[#1B4332]/5 px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#1B4332] transition-colors"
                      >
                        Addresses
                      </Link>
                      <Link
                        to="/profile?tab=wishlist"
                        role="menuitem"
                        className="block hover:bg-[#1B4332]/5 px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#1B4332] transition-colors"
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/partners"
                        role="menuitem"
                        className="block hover:bg-[#1B4332]/5 px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#1B4332] transition-colors"
                      >
                        Trade Dashboard
                      </Link>
                      <Link
                        to="/profile?tab=settings"
                        role="menuitem"
                        className="block hover:bg-[#1B4332]/5 px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#1B4332] transition-colors"
                      >
                        Settings
                      </Link>
                      <hr className="border-gray-50 my-1" />
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => {
                          setProfileOpen(false)
                          logout()
                        }}
                        className="w-full text-left hover:bg-red-50 px-4 py-2 text-xs font-bold text-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-xs font-bold text-[#1B4332] hover:text-[#1B4332]/80 bg-[#1B4332]/5 px-4.5 py-2 rounded-full transition-all"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile View: Wishlist and Cart icons (no account icon to avoid duplicate navigation) */}
            <div className="flex lg:hidden items-center space-x-1">
              <Link to="/profile?tab=wishlist" className={`relative p-2 active:scale-95 transition-transform ${isHome && !isScrolled ? 'text-white/90 hover:text-white' : 'text-[#1B4332]'}`} aria-label="Wishlist">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 bg-[#1B4332] text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <CartIcon isTransparent={isHome && !isScrolled} />
            </div>

          </nav>
        </div>
      </header>
    </>
  )
}

export default Navbar

