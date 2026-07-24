'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProjectPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    coverImage: '',
    liveUrl: '',
    repoUrl: '',
    published: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/dashboard/projects')
    } else {
      alert('Failed to create project.')
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl border border-border bg-surface p-8">
      <h1 className="text-2xl font-bold font-heading text-text">New Project</h1>

      <div>
        <label className="block text-xs font-semibold text-text-muted mb-1">Title</label>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full rounded-md border border-border bg-surface-alt px-4 py-2 text-text outline-none focus:border-accent"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted mb-1">Slug (URL friendly)</label>
        <input
          placeholder="Slug (url-friendly)"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="w-full rounded-md border border-border bg-surface-alt px-4 py-2 text-text outline-none focus:border-accent"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted mb-1">Description</label>
        <textarea
          rows={4}
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full rounded-md border border-border bg-surface-alt px-4 py-2 text-text outline-none focus:border-accent"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted mb-1">Cover Image URL</label>
        <input
          placeholder="Cover Image URL"
          value={form.coverImage}
          onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          className="w-full rounded-md border border-border bg-surface-alt px-4 py-2 text-text outline-none focus:border-accent"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted mb-1">Live URL (optional)</label>
        <input
          placeholder="Live URL (optional)"
          value={form.liveUrl}
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          className="w-full rounded-md border border-border bg-surface-alt px-4 py-2 text-text outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-text-muted mb-1">Repo URL (optional)</label>
        <input
          placeholder="Repo URL (optional)"
          value={form.repoUrl}
          onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
          className="w-full rounded-md border border-border bg-surface-alt px-4 py-2 text-text outline-none focus:border-accent"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg hover:bg-accent-hover disabled:opacity-50"
        >
          {saving ? 'Creating...' : 'Create Project'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard/projects')}
          className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-text hover:border-accent"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}