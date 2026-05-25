import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const tabs = [
  {
    label: 'Home',
    path: '/',
    icon: (
      <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: 'Categories',
    path: '/shop',
    icon: (
      <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    label: 'Cart',
    path: '/cart',
    isCart: true,
    icon: (
      <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
  {
    label: 'Wishlist',
    path: '/profile?tab=wishlist',
    icon: (
      <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    label: 'Account',
    path: '/profile',
    icon: (
      <svg className="w-[20px] h-[20px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
]

const MobileBottomNav = () => {
  const { cart } = useCart()
  const itemCount = cart.totalItems

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 bg-white/75 backdrop-blur-lg border border-white/20 lg:hidden rounded-2xl shadow-[0_8px_32px_0_rgba(27,67,50,0.08)]">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 h-full py-1 text-xs transition-all duration-300 ${
                isActive ? 'text-[#1B4332] scale-105' : 'text-gray-400 hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <div className="flex flex-col items-center">
                <span className={`relative transition-all duration-300 ${isActive ? '-translate-y-0.5' : ''}`}>
                  {tab.icon}
                  {tab.isCart && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] bg-[#1B4332] text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white shadow-sm">
                      {itemCount}
                    </span>
                  )}
                </span>
                <span className={`mt-1 text-[9px] tracking-wide transition-all ${isActive ? 'font-bold opacity-100' : 'font-medium opacity-80'}`}>
                  {tab.label}
                </span>
                {isActive && (
                  <span className="absolute bottom-1.5 w-1 h-1 bg-[#1B4332] rounded-full"></span>
                )}
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileBottomNav


