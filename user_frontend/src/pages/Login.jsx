import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

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
      const raw = location.state?.from
      const to =
        typeof raw === 'string' && raw.startsWith('/') && !raw.startsWith('//') ? raw : '/'
      navigate(to, { replace: true })
    } catch (err) {
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
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
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              className="w-full border border-gray-200 rounded-card px-4 py-3"
              required
            />
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
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Login'}
            </Button>
          </form>

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
