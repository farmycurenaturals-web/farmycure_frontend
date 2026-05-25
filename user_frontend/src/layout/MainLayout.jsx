import { Outlet, useLocation } from 'react-router-dom'
import AnnouncementBar from '../components/announcement/AnnouncementBar'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTop from '../components/ScrollToTop'
import WhatsAppButton from '../components/WhatsAppButton'
import MobileBottomNav from '../components/navbar/MobileBottomNav'

const MainLayout = () => {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FBFBF9]">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      {/* Bottom spacer so footer content isn't hidden behind the fixed bottom nav on mobile */}
      <div className="h-16 lg:hidden" />
      <MobileBottomNav />
      <WhatsAppButton />
    </div>
  )
}

export default MainLayout
