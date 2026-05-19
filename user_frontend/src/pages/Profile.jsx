import { useMemo } from 'react'
import { Navigate, useLocation, useSearchParams, useNavigate } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { useAuth } from '../context/AuthContext'
import ProfileInfoSection from '../components/profile/ProfileInfoSection'
import OrdersSection from '../components/profile/OrdersSection'
import AddressesSection from '../components/profile/AddressesSection'
import SettingsSection from '../components/profile/SettingsSection'

const VALID = ['profile', 'orders', 'addresses', 'settings']

// Icons for mobile nav rows
const BoxIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
const MapPinIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
const HeartIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
const BriefcaseIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
const PhoneIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
const InfoIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
const LogoutIcon = <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>

const MobileNavRow = ({ icon, label, onClick, textClass = "text-gray-700" }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
    <div className="flex items-center gap-3">
      <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-gray-500 ${textClass === 'text-red-500' ? 'text-red-500 bg-red-50' : ''}`}>
         {icon}
      </div>
      <span className={`text-[15px] font-medium ${textClass}`}>{label}</span>
    </div>
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
)

const Profile = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') || 'profile'
  const active = useMemo(() => (VALID.includes(tabParam) ? tabParam : 'profile'), [tabParam])

  const avatarSrc = user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E5E7EB&color=111827`

  if (!isAuthenticated) {
    const from = `${location.pathname}${location.search}${location.hash}`
    return <Navigate to="/login" replace state={{ from, message: 'Please login to continue' }} />
  }

  const setTab = (tab) => {
    setSearchParams(tab === 'profile' ? {} : { tab })
  }

  const navBtn = (id, label) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
        active === id
          ? 'bg-[#1f4d36] text-white shadow-sm'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )

  return (
    <main className="py-6 lg:py-10 min-h-[70vh] bg-gray-50 lg:bg-background">
      <Container>
        
        {/* DESKTOP VIEW */}
        <div className="hidden lg:block">
          <h1 className="font-heading text-2xl font-bold text-[#1f4d36] mb-6">Account</h1>
          <div className="flex flex-row gap-8">
            <aside className="w-56 shrink-0">
              <nav className="bg-white rounded-lg border border-gray-200 p-2 shadow-sm space-y-1">
                {navBtn('profile', 'Profile')}
                {navBtn('orders', 'Orders')}
                {navBtn('addresses', 'Addresses')}
                {navBtn('settings', 'Settings')}
              </nav>
            </aside>
            <div className="flex-1 min-w-0">
              {active === 'profile' && <ProfileInfoSection />}
              {active === 'orders' && <OrdersSection />}
              {active === 'addresses' && <AddressesSection />}
              {active === 'settings' && <SettingsSection />}
            </div>
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="block lg:hidden pb-20">
          {active === 'profile' ? (
            <div className="space-y-4 pt-2">
               {/* Section 1 */}
               <div className="bg-white rounded-2xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-4">
                 <img src={avatarSrc} alt={user?.name || 'User'} className="w-16 h-16 rounded-full object-cover border-2 border-[#1f4d36]/20" />
                 <div>
                   <h2 className="text-lg font-bold text-gray-800">{user?.name || 'User'}</h2>
                   <p className="text-sm text-gray-500 mb-1.5">{user?.email || user?.phone || 'No contact info'}</p>
                   <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-md font-medium border border-amber-100/50">
                     <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                     </svg>
                     250 FarmyPoints
                   </div>
                 </div>
               </div>

               {/* Section 2 */}
               <div className="bg-white rounded-2xl p-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100">
                 <MobileNavRow icon={BoxIcon} label="Orders" onClick={() => setTab('orders')} />
                 <MobileNavRow icon={MapPinIcon} label="Addresses" onClick={() => setTab('addresses')} />
                 <MobileNavRow icon={HeartIcon} label="Wishlist" onClick={() => navigate('/shop')} />
                 <MobileNavRow icon={BriefcaseIcon} label="Trade" onClick={() => navigate('/partners')} />
               </div>

               {/* Section 3 */}
               <div className="bg-white rounded-2xl p-2 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100">
                 <MobileNavRow icon={PhoneIcon} label="Contact Us" onClick={() => navigate('/contact')} />
                 <MobileNavRow icon={InfoIcon} label="About FarmyCure" onClick={() => navigate('/about')} />
                 <MobileNavRow icon={LogoutIcon} label="Logout" onClick={logout} textClass="text-red-500" />
               </div>
            </div>
          ) : (
            <div className="pt-2">
              <button 
                onClick={() => setTab('profile')} 
                className="mb-4 text-[13px] font-semibold text-[#1f4d36] flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 w-fit"
              >
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                 </svg>
                 Back to Account
              </button>
              {active === 'orders' && <OrdersSection />}
              {active === 'addresses' && <AddressesSection />}
              {active === 'settings' && <SettingsSection />}
            </div>
          )}
        </div>

      </Container>
    </main>
  )
}

export default Profile
