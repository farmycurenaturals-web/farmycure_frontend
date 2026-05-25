import { useMemo, useEffect, useState } from 'react'
import { Navigate, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { api } from '../services/api'
import ProfileInfoSection from '../components/profile/ProfileInfoSection'
import OrdersSection from '../components/profile/OrdersSection'
import AddressesSection from '../components/profile/AddressesSection'
import SettingsSection from '../components/profile/SettingsSection'
import WishlistSection from '../components/profile/WishlistSection'

const VALID = ['profile', 'orders', 'addresses', 'wishlist', 'settings']

// Icons for navigation and stats
const ProfileIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
const BoxIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
const MapPinIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" /></svg>
const HeartIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
const SettingsIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.43l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.991l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.645-.869l.214-1.28z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
const LogoutIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
const BriefcaseIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .621-.504 1.125-1.125 1.125H4.875c-.621 0-1.125-.504-1.125-1.125v-4.25m16.5 0a2.25 2.25 0 00-2.25-2.25H4.875a2.25 2.25 0 00-2.25 2.25m16.5 0V9.45c0-.621-.504-1.125-1.125-1.125H4.875c-.621 0-1.125.504-1.125 1.125v4.7M10.5 8.25V3.75c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125v4.5m-4.5 0h4.5" /></svg>

const MobileNavRow = ({ icon, label, onClick, textClass = "text-gray-700" }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 hover:bg-[#1B4332]/5 rounded-2xl transition-all duration-300 group">
    <div className="flex items-center gap-3.5">
      <div className={`flex items-center justify-center w-9 h-9 rounded-xl bg-gray-50 text-gray-500 group-hover:bg-white group-hover:shadow-sm transition-all duration-300 ${
        textClass === 'text-red-500' ? 'text-red-500 bg-red-50/50' : ''
      }`}>
         {icon}
      </div>
      <span className={`text-sm font-semibold tracking-wide ${textClass}`}>{label}</span>
    </div>
    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#1B4332] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
    </svg>
  </button>
)

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const { wishlistIds } = useWishlist()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') || 'profile'
  const active = useMemo(() => (VALID.includes(tabParam) ? tabParam : 'profile'), [tabParam])

  const [stats, setStats] = useState({ orders: 0, addresses: 0 })

  useEffect(() => {
    if (isAuthenticated) {
      api.user.getOrders().then(d => setStats(prev => ({ ...prev, orders: Array.isArray(d) ? d.length : 0 }))).catch(() => null)
      api.address.list().then(d => setStats(prev => ({ ...prev, addresses: Array.isArray(d) ? d.length : 0 }))).catch(() => null)
    }
  }, [isAuthenticated])

  const avatarSrc = user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=1B4332&color=FFFFFF`

  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to="/login" replace state={{ from, message: 'Please login to continue' }} />
  }

  const setTab = (tab) => {
    setSearchParams(tab === 'profile' ? {} : { tab })
  }

  const sidebarButton = (id, label, icon) => {
    const isActive = active === id
    return (
      <button
        type="button"
        onClick={() => setTab(id)}
        className={`w-full flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
          isActive
            ? 'bg-[#1B4332] text-white shadow-md shadow-emerald-100'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
      >
        <span className={isActive ? 'text-white' : 'text-gray-400'}>{icon}</span>
        {label}
      </button>
    )
  }

  return (
    <main className="py-8 sm:py-16 md:py-20 min-h-[75vh] bg-[#FBFBF9] pb-32 sm:pb-20">
      <Container>
        
        {/* Profile Info Header Card (Desktop Only) */}
        <div className="hidden lg:flex items-center justify-between bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgba(27,67,50,0.02)] mb-10">
          <div className="flex items-center gap-5">
            <img 
              src={avatarSrc} 
              alt={user?.name || 'User'} 
              className="w-18 h-18 rounded-full object-cover border-2 border-[#1B4332]/20 shadow-inner" 
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-gray-900 leading-tight">{user?.name || 'Customer'}</h2>
              <p className="text-xs text-gray-500 font-medium mt-1">{user?.email || user?.phone || 'No contact email'}</p>
            </div>
          </div>
          
          {/* Quick Statistics Grid */}
          <div className="flex gap-6">
            <div className="bg-gray-50/70 border border-gray-200/40 rounded-2xl px-6 py-3.5 text-center min-w-[100px] shadow-sm">
              <span className="block text-[20px] font-bold text-[#1B4332] font-heading">{stats.orders}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold font-body">Orders</span>
            </div>
            <div className="bg-gray-50/70 border border-gray-200/40 rounded-2xl px-6 py-3.5 text-center min-w-[100px] shadow-sm">
              <span className="block text-[20px] font-bold text-[#1B4332] font-heading">{stats.addresses}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold font-body">Addresses</span>
            </div>
            <div className="bg-gray-50/70 border border-gray-200/40 rounded-2xl px-6 py-3.5 text-center min-w-[100px] shadow-sm">
              <span className="block text-[20px] font-bold text-[#1B4332] font-heading">{wishlistIds.length}</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold font-body">Wishlist</span>
            </div>
          </div>
        </div>

        {/* DESKTOP CONTENT VIEW */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-10">
          <aside className="lg:col-span-3">
            <nav className="bg-white rounded-3xl border border-gray-100 p-3 shadow-[0_8px_30px_rgba(27,67,50,0.02)] space-y-1">
              {sidebarButton('profile', 'My Profile', ProfileIcon)}
              {sidebarButton('orders', 'Order History', BoxIcon)}
              {sidebarButton('addresses', 'Addresses', MapPinIcon)}
              {sidebarButton('wishlist', 'Saved Items', HeartIcon)}
              {sidebarButton('settings', 'Settings', SettingsIcon)}
              <hr className="border-gray-100 my-2" />
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-3.5 px-4.5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider text-red-500 hover:bg-red-50 transition-all duration-300"
              >
                <span>{LogoutIcon}</span>
                Logout
              </button>
            </nav>
          </aside>

          <div className="lg:col-span-9 bg-white rounded-3xl border border-gray-100 p-8 shadow-[0_8px_30px_rgba(27,67,50,0.02)] min-h-[500px]">
            {active === 'profile' && <ProfileInfoSection />}
            {active === 'orders' && <OrdersSection />}
            {active === 'addresses' && <AddressesSection />}
            {active === 'wishlist' && <WishlistSection />}
            {active === 'settings' && <SettingsSection />}
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden">
          {active === 'profile' ? (
            <div className="space-y-5">
               {/* Mobile Profile Card */}
               <div className="bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(27,67,50,0.02)] border border-gray-100 flex items-center gap-4">
                 <img src={avatarSrc} alt={user?.name || 'User'} className="w-14 h-14 rounded-full object-cover border-2 border-[#1B4332]/10" />
                 <div className="min-w-0">
                   <h2 className="text-base font-bold text-gray-900 leading-tight">{user?.name || 'Customer'}</h2>
                   <p className="text-[11px] text-gray-500 font-medium mt-0.5 truncate">{user?.email || user?.phone || 'No contact email'}</p>
                 </div>
               </div>

               {/* Mobile Navigation List Row */}
               <div className="bg-white rounded-3xl p-2.5 shadow-[0_4px_20px_rgba(27,67,50,0.02)] border border-gray-100">
                 <MobileNavRow icon={BoxIcon} label="Orders" onClick={() => setTab('orders')} />
                 <MobileNavRow icon={MapPinIcon} label="Saved Addresses" onClick={() => setTab('addresses')} />
                 <MobileNavRow icon={HeartIcon} label="Wishlist" onClick={() => setTab('wishlist')} />
                 <MobileNavRow icon={BriefcaseIcon} label="Trade Dashboard" onClick={() => navigate('/partners')} />
                 <MobileNavRow icon={SettingsIcon} label="Account Settings" onClick={() => setTab('settings')} />
               </div>

               {/* Mobile Support Row */}
               <div className="bg-white rounded-3xl p-2.5 shadow-[0_4px_20px_rgba(27,67,50,0.02)] border border-gray-100">
                 <MobileNavRow icon={ProfileIcon} label="About FarmyCure" onClick={() => navigate('/about')} />
                 <MobileNavRow icon={LogoutIcon} label="Logout" onClick={logout} textClass="text-red-500" />
               </div>
            </div>
          ) : (
            <div>
              {/* Back CTA Button */}
              <button 
                onClick={() => setTab('profile')} 
                className="mb-6 text-[10px] font-bold uppercase tracking-wider text-[#1B4332] flex items-center gap-2 bg-white px-4 py-2.5 rounded-full shadow-sm border border-gray-100/60 w-fit active:scale-95 transition-transform"
              >
                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                 </svg>
                 Back to Dashboard
              </button>
              
              <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm min-h-[300px]">
                {active === 'orders' && <OrdersSection />}
                {active === 'addresses' && <AddressesSection />}
                {active === 'wishlist' && <WishlistSection />}
                {active === 'settings' && <SettingsSection />}
              </div>
            </div>
          )}
        </div>

      </Container>
    </main>
  )
}

export default Profile
