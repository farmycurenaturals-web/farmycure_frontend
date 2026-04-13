import { useState } from 'react'
import { Navigate, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import IntroSplash from './components/splash/IntroSplash'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import ProductDetails from './pages/ProductDetails'
import Partners from './pages/Partners'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import OrderTracking from './pages/OrderTracking'
import { isUserLoggedIn } from './utils/auth'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  if (!isUserLoggedIn()) {
    const from = `${location.pathname}${location.search}${location.hash}`
    return (
      <Navigate
        to="/login"
        replace
        state={{ from, message: 'Please login to continue' }}
      />
    )
  }
  return children
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'partners', element: <Partners /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      {
        path: 'cart',
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        )
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        )
      },
      { path: 'order-success', element: <OrderSuccess /> },
      {
        path: 'order/:id',
        element: (
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        )
      },
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      },
    ],
  },
], {
  basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
})

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <AuthProvider>
      <CartProvider>
        <AnimatePresence mode="wait">
          {showSplash && (
            <IntroSplash onComplete={() => setShowSplash(false)} />
          )}
        </AnimatePresence>

        {!showSplash && (
          <RouterProvider router={router} />
        )}
      </CartProvider>
    </AuthProvider>
  )
}

export default App
