import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { api } from '../services/api'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const tokenFromUrl = useMemo(() => searchParams.get('token') || '', [searchParams])
  const [token, setToken] = useState(tokenFromUrl)
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)
    try {
      const res = await api.auth.resetPassword(token, newPassword)
      setMessage(res.message || 'Password reset successful.')
      setNewPassword('')
    } catch (err) {
      setError(err.message || 'Password reset failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-16 min-h-[70vh] bg-background">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-card p-6 border border-gray-100">
          <h1 className="font-heading text-2xl font-bold text-text-primary mb-2">Reset Password</h1>
          <p className="text-sm text-gray-500 mb-6">Use your reset token and create a new password.</p>
          {message && <p className="text-sm text-green-700 mb-4">{message}</p>}
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Reset token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full border border-gray-200 rounded-card px-4 py-3"
              required
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-card px-4 py-3"
              minLength={6}
              required
            />
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Please wait...' : 'Reset Password'}
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

export default ResetPassword
