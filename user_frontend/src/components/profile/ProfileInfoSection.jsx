import { useMemo, useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const MAX_FILE_SIZE = 2 * 1024 * 1024

const ProfileInfoSection = () => {
  const { user, updateProfileImage, updateProfile } = useAuth()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(user?.name || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const avatarSrc = useMemo(
    () =>
      preview ||
      user?.profileImage ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=E5E7EB&color=111827`,
    [preview, user?.name, user?.profileImage]
  )

  const handleFileChange = (event) => {
    setError('')
    setMessage('')
    const selected = event.target.files?.[0]
    if (!selected) return
    if (!selected.type.startsWith('image/')) {
      setError('Only image files are allowed')
      return
    }
    if (selected.size > MAX_FILE_SIZE) {
      setError('Image must be 2MB or smaller')
      return
    }
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
  }

  const handleSave = async () => {
    setError('')
    setMessage('')
    try {
      setSaving(true)
      if (file) {
        await updateProfileImage(file)
        setFile(null)
        setPreview('')
      }
      await updateProfile({ name, phone })
      setMessage('Profile updated')
      setEditing(false)
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = () => {
    setName(user?.name || '')
    setPhone(user?.phone || '')
    setError('')
    setMessage('')
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
    setFile(null)
    setPreview('')
    setError('')
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[#1f4d36] mb-4">Profile</h2>

      {message && <p className="mb-3 text-sm text-green-700">{message}</p>}
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <img
            src={avatarSrc}
            alt=""
            className="w-20 h-20 rounded-full object-cover border border-gray-200 hover:scale-105 transition"
          />
          {editing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm w-full max-w-xs"
            />
          )}
        </div>

        <div className="flex-1 space-y-3 min-w-0">
          {editing ? (
            <>
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
                  placeholder="Phone number"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-[#1f4d36] text-white text-sm font-medium hover:bg-[#173c2b] transition disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-medium text-gray-900">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-gray-800">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-gray-800">{user?.phone || '—'}</p>
              </div>
              <button
                type="button"
                onClick={startEdit}
                className="mt-2 px-4 py-2 rounded-lg border border-[#1f4d36] text-[#1f4d36] text-sm font-medium hover:bg-[#1f4d36]/5 transition"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoSection
