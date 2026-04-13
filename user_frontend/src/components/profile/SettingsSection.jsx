import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'

const SettingsSection = () => {
  const { user, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPw, setSavingPw] = useState(false)

  useEffect(() => {
    setName(user?.name || '')
    setPhone(user?.phone || '')
  }, [user?.name, user?.phone])

  const handleProfileSave = async (e) => {
    e.preventDefault()
    setErr('')
    setMsg('')
    try {
      setSavingProfile(true)
      await updateProfile({ name, phone })
      setMsg('Profile updated')
    } catch (e2) {
      setErr(e2.message || 'Update failed')
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePassword = async (e) => {
    e.preventDefault()
    setErr('')
    setMsg('')
    if (newPassword !== confirmPassword) {
      setErr('New passwords do not match')
      return
    }
    try {
      setSavingPw(true)
      await api.user.changePassword({ currentPassword, newPassword })
      setMsg('Password updated. Redirecting to login…')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => {
        logout()
        navigate('/login', { replace: true, state: { message: 'Please sign in with your new password' } })
      }, 800)
    } catch (e2) {
      setErr(e2.message || 'Could not change password')
    } finally {
      setSavingPw(false)
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-[#1f4d36]">Settings</h2>

      {msg && <p className="text-sm text-green-700">{msg}</p>}
      {err && <p className="text-sm text-red-600">{err}</p>}

      <form onSubmit={handleProfileSave} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Update profile</h3>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Email</label>
          <input value={user?.email || ''} disabled className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={savingProfile}
          className="px-4 py-2 rounded-lg bg-[#1f4d36] text-white text-sm font-medium hover:bg-[#173c2b] transition disabled:opacity-60"
        >
          {savingProfile ? 'Saving…' : 'Save profile'}
        </button>
      </form>

      <form onSubmit={handlePassword} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Change password</h3>
        <p className="text-xs text-gray-500">Optional — you will be signed out after a successful change.</p>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Current password</label>
          <input
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">New password</label>
          <input
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Confirm new password</label>
          <input
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={savingPw || !currentPassword || !newPassword}
          className="px-4 py-2 rounded-lg border border-[#1f4d36] text-[#1f4d36] text-sm font-medium hover:bg-[#1f4d36]/5 transition disabled:opacity-50"
        >
          {savingPw ? 'Updating…' : 'Change password'}
        </button>
      </form>
    </div>
  )
}

export default SettingsSection
