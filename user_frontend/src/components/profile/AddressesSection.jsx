import { useEffect, useState } from 'react'
import { api } from '../../services/api'

const emptyForm = { name: '', phone: '', address: '', city: '', state: '', pincode: '' }

const AddressesSection = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [saving, setSaving] = useState(false)

  const load = async () => {
    const data = await api.user.getAddresses()
    setList(Array.isArray(data) ? data : [])
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError('')
        await load()
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load addresses')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      setSaving(true)
      if (editingId) {
        await api.user.updateAddress(editingId, form)
      } else {
        await api.user.createAddress(form)
      }
      await load()
      resetForm()
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (addr) => {
    setEditingId(addr._id)
    setForm({
      name: addr.name || '',
      phone: addr.phone || '',
      address: addr.address || '',
      city: addr.city || '',
        state: addr.state || '',
      pincode: addr.pincode || ''
    })
  }

  const onDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete?')) return
    setError('')
    try {
      await api.user.deleteAddress(id)
      setList((prev) => prev.filter((item) => item._id !== id))
      if (editingId === id) resetForm()
    } catch (err) {
      setError(err.message || 'Delete failed')
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500 text-sm">
        Loading addresses…
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[#1f4d36]">Saved addresses</h2>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <form onSubmit={onSubmit} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-sm">
        <p className="text-sm font-medium text-gray-800">{editingId ? 'Edit address' : 'Add address'}</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            required
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <input
          required
          placeholder="Street address"
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
        />
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            required
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="State"
            value={form.state}
            onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Pincode"
            value={form.pincode}
            onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value }))}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-[#1f4d36] text-white text-sm font-medium hover:bg-[#173c2b] transition disabled:opacity-60"
          >
            {saving ? 'Saving…' : editingId ? 'Update' : 'Add address'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {list.length === 0 && <li className="text-sm text-gray-500">No saved addresses yet.</li>}
        {list.map((a) => (
          <li
            key={a._id}
            className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 shadow-sm"
          >
            <div className="text-sm space-y-1">
              <p className="font-medium text-gray-900">{a.name}</p>
              <p className="text-gray-600">{a.phone}</p>
              <p className="text-gray-700">
                {a.address}, {a.city}, {a.state} - {a.pincode}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => startEdit(a)}
                className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(a._id)}
                className="text-sm px-3 py-1.5 rounded-lg text-red-700 border border-red-100 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AddressesSection
