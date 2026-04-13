import { Outlet } from 'react-router-dom'
import AnnouncementBar from '../components/announcement/AnnouncementBar'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ScrollToTop from '../components/ScrollToTop'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
