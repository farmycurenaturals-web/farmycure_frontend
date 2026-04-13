import HeroSection from '../components/home/HeroSection'
import CategorySection from '../components/home/CategorySection'
import HomeLatestProducts from '../components/home/HomeLatestProducts'
import FeaturedProducts from '../components/home/FeaturedProducts'
import TrustSection from '../components/home/TrustSection'

const Home = () => {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <HomeLatestProducts />
      <TrustSection />
    </main>
  )
}

export default Home
