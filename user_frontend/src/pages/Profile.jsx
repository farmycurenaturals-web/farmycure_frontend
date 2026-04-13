import { useMemo } from 'react'
import { Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { useAuth } from '../context/AuthContext'
import ProfileInfoSection from '../components/profile/ProfileInfoSection'
import OrdersSection from '../components/profile/OrdersSection'
import AddressesSection from '../components/profile/AddressesSection'
import SettingsSection from '../components/profile/SettingsSection'

const VALID = ['profile', 'orders', 'addresses', 'settings']

const Profile = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab') || 'profile'
  const active = useMemo(() => (VALID.includes(tabParam) ? tabParam : 'profile'), [tabParam])

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
    <main className="py-10 min-h-[70vh] bg-background">
      <Container>
        <h1 className="font-heading text-2xl font-bold text-[#1f4d36] mb-6">Account</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-56 shrink-0">
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
      </Container>
    </main>
  )
}

export default Profile
