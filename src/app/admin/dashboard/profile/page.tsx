'use client'

import { useEffect, useState } from 'react'

type Profile = {
  id?: string
  name: string
  title: string
  summary: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  leetcode: string
  codechef: string
  codeforces: string
  hackerrank: string
}

export default function ProfileAdminPage() {
  const [form, setForm] = useState<Profile>({
    name: '',
    title: '',
    summary: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    leetcode: '',
    codechef: '',
    codeforces: '',
    hackerrank: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setForm({
            name: data.name || '',
            title: data.title || '',
            summary: data.summary || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            linkedin: data.linkedin || '',
            github: data.github || '',
            leetcode: data.leetcode || '',
            codechef: data.codechef || '',
            codeforces: data.codeforces || '',
            hackerrank: data.hackerrank || '',
          })
        }
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setMessage('Profile and coding links updated successfully!')
    } else {
      setMessage('Failed to update profile.')
    }
    setSaving(false)
  }

  if (loading) {
    return <p className="text-sm text-text-muted">Loading profile data...</p>
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-heading text-text">Manage Profile & Coding Links</h1>
        <p className="text-sm text-text-muted">
          Update your portfolio bio summary, contact details, and competitive coding profile links dynamically.
        </p>
      </div>

      {message && (
        <div className="rounded-md border border-accent/40 bg-accent/10 p-4 text-sm text-accent">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* BASIC INFORMATION */}
        <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
          <h2 className="text-lg font-semibold font-heading text-text">Basic Information</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Professional Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1">Bio Summary</label>
            <textarea
              rows={4}
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
              className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL & CODING PROFILES */}
        <div className="rounded-xl border border-border bg-surface p-6 space-y-4">
          <h2 className="text-lg font-semibold font-heading text-text">Social & Competitive Coding Profile Links</h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">GitHub URL</label>
              <input
                type="url"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">⚡ LeetCode Profile URL</label>
              <input
                type="url"
                placeholder="https://leetcode.com/u/username"
                value={form.leetcode}
                onChange={(e) => setForm({ ...form, leetcode: e.target.value })}
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">🍲 CodeChef Profile URL</label>
              <input
                type="url"
                placeholder="https://www.codechef.com/users/username"
                value={form.codechef}
                onChange={(e) => setForm({ ...form, codechef: e.target.value })}
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">⚔️ Codeforces Profile URL</label>
              <input
                type="url"
                placeholder="https://codeforces.com/profile/username"
                value={form.codeforces}
                onChange={(e) => setForm({ ...form, codeforces: e.target.value })}
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1">🎯 HackerRank Profile URL</label>
              <input
                type="url"
                placeholder="https://www.hackerrank.com/profile/username"
                value={form.hackerrank}
                onChange={(e) => setForm({ ...form, hackerrank: e.target.value })}
                className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm text-text outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-bg hover:bg-accent-hover disabled:opacity-50"
        >
          {saving ? 'Saving Profile...' : 'Save Profile & Coding Links'}
        </button>
      </form>
    </div>
  )
}
