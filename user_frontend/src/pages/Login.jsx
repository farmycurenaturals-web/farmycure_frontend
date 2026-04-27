import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const GooglePopupButton = ({ onSuccess, onError, disabled }) => {
  const openGooglePopup = useGoogleLogin({
    flow: 'implicit',
    ux_mode: 'popup',
    scope: 'openid email profile',
    onSuccess,
    onError,
  })

  return (
    <button
      type="button"
      onClick={() => openGooglePopup()}
      disabled={disabled}
      className="w-full border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
    >
      Continue with Google
    </button>
  )
}

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginWithGoogle, loginWithOtp, setUser } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [authMode, setAuthMode] = useState('password')
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [otp, setOtp] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [otpSending, setOtpSending] = useState(false)
  const [otpVerifying, setOtpVerifying] = useState(false)
  const [otpCooldown, setOtpCooldown] = useState(0)
  const rawApiUrl = String(import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '')
  const googleClientId = String(import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim()
  const frontendOrigin = window.location.origin
  const googleAuthUrl = `${rawApiUrl || 'https://api.farmycure.com'}/api/auth/google?redirect=${encodeURIComponent(frontendOrigin)}`

  const navigateAfterLogin = () => {
    const raw = location.state?.from
    const to =
      typeof raw === 'string' && raw.startsWith('/') && !raw.startsWith('//') ? raw : '/'
    navigate(to, { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (isRegister) {
      if (!form.name.trim()) {
        setError('Full name is required')
        return
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters')
        return
      }
      if (form.password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }
    }
    if (!isRegister && authMode === 'otp') {
      if (!form.email.trim()) {
        setError('Email is required')
        return
      }
      if (!otp.trim()) {
        setError('OTP is required')
        return
      }
      setOtpVerifying(true)
      try {
        await loginWithOtp({ email: form.email.trim().toLowerCase(), otp: otp.trim(), purpose: 'login' })
        navigateAfterLogin()
      } catch (err) {
        setError(err.message || 'OTP verification failed')
      } finally {
        setOtpVerifying(false)
      }
      return
    }

    setLoading(true)
    try {
      if (isRegister) {
        await api.auth.register({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          role: form.role
        })
        setSuccess('Registration successful. Please login with the same email and password.')
        setIsRegister(false)
        setForm((p) => ({ ...p, password: '' }))
        setConfirmPassword('')
        return
      }

      await login(form.email.trim().toLowerCase(), form.password)
      navigateAfterLogin()
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async () => {
    if (otpCooldown > 0) return
    setError('')
    setSuccess('')
    const email = form.email.trim().toLowerCase()
    if (!email) {
      setError('Enter your email to receive OTP')
      return
    }
    setOtpSending(true)
    try {
      await api.auth.sendOtp({ email, purpose: 'login' })
      setSuccess('OTP sent to your email. It is valid for 5 minutes.')
      setOtpCooldown(30)
    } catch (err) {
      setError(err.message || 'Failed to send OTP')
    } finally {
      setOtpSending(false)
    }
  }

  useEffect(() => {
    if (otpCooldown <= 0) return
    const timer = window.setInterval(() => {
      setOtpCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [otpCooldown])

  useEffect(() => {
    const hashValue = window.location.hash || ''
    const queryString = hashValue.includes('?') ? hashValue.split('?')[1] : ''
    if (!queryString) return
    const params = new URLSearchParams(queryString)
    const token = params.get('token')
    const callbackError = params.get('error')
    if (callbackError) {
      setError('Google authentication failed')
      return
    }
    if (!token) return

    let parsedPayload = {}
    try {
      const payloadBase64 = token.split('.')[1] || ''
      if (payloadBase64) {
        parsedPayload = JSON.parse(atob(payloadBase64))
      }
    } catch {
      parsedPayload = {}
    }

    const userData = {
      _id: parsedPayload.id || '',
      role: parsedPayload.role || 'user',
      token,
      accessToken: token,
      refreshToken: token,
    }
    localStorage.setItem('farmycure_token', token)
    localStorage.setItem('farmycure_refresh_token', token)
    localStorage.setItem('farmycure_user', JSON.stringify(userData))
    setUser(userData)
    window.history.replaceState({}, document.title, '/#/login')
    navigateAfterLogin()
  }, [])

  const handleGoogleRedirect = () => {
    setError('')
    setSuccess('')
    setGoogleLoading(true)
    window.location.href = googleAuthUrl
  }

  const handleGooglePopupSuccess = async (response) => {
    const accessToken = String(response?.access_token || '').trim()
    if (!accessToken) {
      setError('Google authentication failed')
      return
    }
    setGoogleLoading(true)
    setError('')
    setSuccess('')
    try {
      await loginWithGoogle({ accessToken })
      navigateAfterLogin()
    } catch (err) {
      setError(err.message || 'Google authentication failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <main className="py-16 min-h-[70vh] bg-background">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-card p-6 border border-gray-100">
          <h1 className="font-heading text-2xl font-bold text-text-primary mb-2">
            {isRegister ? 'Create Account' : 'Login'}
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            User portal login and registration.
          </p>

          {location.state?.message && (
            <p className="mb-4 text-sm text-amber-700">{location.state.message}</p>
          )}
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          {success && <p className="mb-4 text-sm text-green-700">{success}</p>}

          {!isRegister && (
            <div className="mb-4 rounded-card border border-gray-200 p-1 flex">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('password')
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-2 text-sm rounded-card transition ${
                  authMode === 'password' ? 'bg-[#1f4d36] text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('otp')
                  setError('')
                  setSuccess('')
                }}
                className={`flex-1 py-2 text-sm rounded-card transition ${
                  authMode === 'otp' ? 'bg-[#1f4d36] text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                OTP
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-card px-4 py-3"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              className="w-full border border-gray-200 rounded-card px-4 py-3"
              required
            />
            {(isRegister || authMode === 'password') && (
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full border border-gray-200 rounded-card px-4 py-3"
                required
              />
            )}
            {!isRegister && authMode === 'otp' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full border border-gray-200 rounded-card px-4 py-3"
                    maxLength={6}
                    required
                  />
                  <Button type="button" variant="outline" onClick={handleSendOtp} disabled={otpSending || otpCooldown > 0}>
                    {otpSending ? 'Sending...' : otpCooldown > 0 ? `Resend in ${otpCooldown}s` : 'Send OTP'}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Use OTP sent to your registered email address.</p>
              </div>
            )}
            {isRegister && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-card px-4 py-3"
                required
              />
            )}
            {isRegister && (
              <select
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                className="w-full border border-gray-200 rounded-card px-4 py-3"
              >
                <option value="user">User</option>
                <option value="trade">Trade</option>
              </select>
            )}
            <Button type="submit" variant="primary" className="w-full" disabled={loading || otpVerifying}>
              {isRegister
                ? (loading ? 'Please wait...' : 'Create Account')
                : authMode === 'otp'
                  ? (otpVerifying ? 'Verifying OTP...' : 'Verify & Login')
                  : (loading ? 'Please wait...' : 'Login')}
            </Button>
          </form>

          <div className="mt-4">
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center" aria-hidden>
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-gray-500">OR</span>
              </div>
            </div>
            {googleClientId ? (
              <GoogleOAuthProvider clientId={googleClientId}>
                <GooglePopupButton
                  onSuccess={handleGooglePopupSuccess}
                  onError={() => setError('Google authentication failed')}
                  disabled={googleLoading}
                />
              </GoogleOAuthProvider>
            ) : (
              <button
                type="button"
                onClick={handleGoogleRedirect}
                disabled={googleLoading}
                className="w-full border border-gray-300 rounded-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                Continue with Google
              </button>
            )}
            {googleLoading && (
              <p className="mt-2 text-xs text-gray-500 text-center">Signing in with Google...</p>
            )}
            <p className="mt-2 text-xs text-gray-500 text-center">
              Continue with Google will log you in or create your account automatically.
            </p>
            <p className="mt-1 text-[11px] text-gray-500 text-center">
              If popup is blocked, allow popups or retry.
            </p>
          </div>

          <div className="mt-4 text-sm text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegister((v) => !v)
                setError('')
                setSuccess('')
                setConfirmPassword('')
              }}
              className="text-forest font-medium"
            >
              {isRegister ? 'Already have an account? Login' : 'New here? Create account'}
            </button>
          </div>
          {!isRegister && (
            <div className="mt-2 text-sm text-center">
              <Link to="/forgot-password" className="text-gray-500 hover:text-forest">Forgot password?</Link>
            </div>
          )}
          <div className="mt-3 text-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-forest">Back to home</Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Login
