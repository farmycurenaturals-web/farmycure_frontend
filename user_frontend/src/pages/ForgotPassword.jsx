import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { api } from '../services/api'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [devResetLink, setDevResetLink] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setDevResetLink('')
    setLoading(true)
    try {
      const normalized = email.trim().toLowerCase()
      const res = await api.auth.forgotPassword(normalized)
      setMessage(res.message || 'If email exists, reset link is sent.')
      if (res.resetLink && !res.emailDelivery) {
        setDevResetLink(res.resetLink)
      }
    } catch (err) {
      setError(err.message || 'Failed to start password reset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-16 min-h-[70vh] bg-background">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-card p-6 border border-gray-100">
          <h1 className="font-heading text-2xl font-bold text-text-primary mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your account email to get a reset link.</p>
          {message && <p className="text-sm text-green-700 mb-4">{message}</p>}
          {devResetLink && (
            <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-100 text-sm text-amber-950">
              <p className="font-medium mb-2">Email not configured — use this link (dev only):</p>
              <a href={devResetLink} className="text-forest underline break-all block">
                {devResetLink}
              </a>
            </div>
          )}
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-card px-4 py-3"
              required
            />
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : 'Send Reset Link'}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            <Link to="/login" className="text-forest font-medium">Back to login</Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default ForgotPassword
