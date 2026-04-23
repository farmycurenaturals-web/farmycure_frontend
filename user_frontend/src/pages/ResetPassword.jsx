import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Container } from '../components/ui/Container'
import { Button } from '../components/ui/Button'
import { api } from '../services/api'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { token: tokenFromPath = '' } = useParams()
  const [searchParams] = useSearchParams()
  const tokenFromUrl = useMemo(() => searchParams.get('token') || '', [searchParams])
  const [token] = useState(tokenFromPath || tokenFromUrl)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tokenChecking, setTokenChecking] = useState(true)
  const [tokenValid, setTokenValid] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!token) {
        if (!cancelled) {
          setTokenValid(false)
          setTokenChecking(false)
          setError('Reset link is invalid or missing.')
        }
        return
      }
      try {
        setTokenChecking(true)
        setError('')
        await api.auth.validateResetToken(token)
        if (!cancelled) setTokenValid(true)
      } catch (err) {
        if (!cancelled) {
          setTokenValid(false)
          setError(err.message || 'Reset link is invalid or expired')
        }
      } finally {
        if (!cancelled) setTokenChecking(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const res = await api.auth.resetPassword(token, newPassword.trim())
      setMessage(res.message || 'Password reset successful.')
      setNewPassword('')
      setConfirmPassword('')
      setTokenValid(false)
      navigate('/login', {
        replace: true,
        state: { message: 'Password updated. Please login with your new password.' },
      })
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
          <p className="text-sm text-gray-500 mb-6">Set your new password to continue.</p>
          {message && <p className="text-sm text-green-700 mb-4">{message}</p>}
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          {tokenChecking ? (
            <p className="text-sm text-gray-500">Validating reset link...</p>
          ) : tokenValid ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-card px-4 py-3"
                minLength={6}
                required
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-card px-4 py-3"
                minLength={6}
                required
              />
              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Please wait...' : 'Reset Password'}
              </Button>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                This reset link is not valid anymore. Please request a new reset email.
              </p>
              <Link to="/forgot-password" className="text-sm text-forest font-medium underline">
                Request new reset link
              </Link>
            </div>
          )}
          <div className="mt-4 text-sm text-center">
            <Link to="/login" className="text-forest font-medium">Back to login</Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default ResetPassword
