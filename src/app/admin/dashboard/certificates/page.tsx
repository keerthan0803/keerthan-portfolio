'use client'

import { useEffect, useState } from 'react'

type Certificate = {
  id: string
  title: string
  issuer: string
  link?: string | null
}

export default function CertificatesAdminPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCert, setEditingCert] = useState<Certificate | null>(null)
  const [form, setForm] = useState({ title: '', issuer: '', link: '' })
  const [saving, setSaving] = useState(false)

  const fetchCertificates = async () => {
    setLoading(true)
    const res = await fetch('/api/certificates')
    const data = await res.json()
    setCertificates(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchCertificates()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    if (editingCert) {
      await fetch('/api/certificates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingCert.id, ...form }),
      })
    } else {
      await fetch('/api/certificates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    }

    setSaving(false)
    setEditingCert(null)
    setForm({ title: '', issuer: '', link: '' })
    fetchCertificates()
  }

  const handleEdit = (cert: Certificate) => {
    setEditingCert(cert)
    setForm({
      title: cert.title,
      issuer: cert.issuer,
      link: cert.link || '',
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certificate?')) return
    await fetch(`/api/certificates?id=${id}`, { method: 'DELETE' })
    fetchCertificates()
  }

  const cancelEdit = () => {
    setEditingCert(null)
    setForm({ title: '', issuer: '', link: '' })
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-text">Manage Certificates</h1>
        <p className="text-sm text-text-muted">Add, edit, or delete certificates and credential verification links.</p>
      </div>

      {/* CERTIFICATE FORM */}
      <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface p-6 space-y-4">
        <h2 className="text-lg font-semibold font-heading text-text">{editingCert ? 'Edit Certificate' : 'Add New Certificate'}</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Certificate Title</label>
            <input
              type="text"
              placeholder="e.g. Smart Coder Certificate"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Issuer / Organization</label>
            <input
              type="text"
              placeholder="e.g. Smart Interviews / Cisco"
              value={form.issuer}
              onChange={(e) => setForm({ ...form, issuer: e.target.value })}
              required
              className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1">Certificate Credential URL (Optional)</label>
          <input
            type="url"
            placeholder="https://..."
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent-hover disabled:opacity-50"
          >
            {saving ? 'Saving...' : editingCert ? 'Update Certificate' : 'Add Certificate'}
          </button>
          {editingCert && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text hover:border-accent"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* CERTIFICATES LIST */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold font-heading text-text">Existing Certificates</h2>
        {loading ? (
          <p className="text-sm text-text-muted">Loading certificates...</p>
        ) : certificates.length === 0 ? (
          <p className="text-sm text-text-muted">No certificates found.</p>
        ) : (
          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition hover:border-accent"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-text">{cert.title}</p>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-accent underline hover:text-accent-hover"
                      >
                        [Verify ↗]
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-accent">{cert.issuer}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="rounded-md border border-border bg-surface-alt px-3 py-1.5 text-xs font-medium text-text hover:border-accent"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
