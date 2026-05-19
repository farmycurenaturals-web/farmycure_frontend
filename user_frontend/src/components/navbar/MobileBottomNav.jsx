import { NavLink } from 'react-router-dom'
import { useCart } from '../../context/CartContext'

const tabs = [
  {
    label: 'Home',
    path: '/',
    icon: (
      <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    label: 'Categories',
    path: '/shop',
    icon: (
      <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    label: 'Cart',
    path: '/cart',
    isCart: true,
    icon: (
      <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: 'Account',
    path: '/profile',
    icon: (
      <svg className="w-[24px] h-[24px]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
]

const MobileBottomNav = () => {
  const { cart } = useCart()
  const itemCount = cart.totalItems

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 lg:hidden safe-area-bottom pb-1 shadow-[0_-8px_20px_-1px_rgba(0,0,0,0.05)] rounded-t-xl">
      <div className="flex items-stretch justify-around px-2 py-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center flex-1 py-1.5 transition-all duration-300 ${
                isActive ? 'text-[#1f4d36]' : 'text-gray-400 hover:text-gray-600 scale-95'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`relative transition-transform duration-300 ${isActive ? '-translate-y-0.5' : ''}`}>
                  {tab.icon}
                  {tab.isCart && itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white shadow-sm">
                      {itemCount}
                    </span>
                  )}
                </span>
                <span className={`mt-1 text-[10px] tracking-wide transition-all ${isActive ? 'font-semibold opacity-100' : 'font-medium opacity-80'}`}>{tab.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default MobileBottomNav

