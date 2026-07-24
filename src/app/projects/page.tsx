'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Project = {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string
  liveUrl: string | null
  repoUrl: string | null
  tags: { id: string; name: string }[]
}

type Feedback = {
  id: string
  name: string
  message: string
  rating: number
  projectId: string
}

export default function AllProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [feedback, setFeedback] = useState<Record<string, Feedback[]>>({})
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (activeProject) {
      fetch(`/api/feedback?projectId=${activeProject.id}`)
        .then((r) => r.json())
        .then((data) => setFeedback((prev) => ({ ...prev, [activeProject.id]: data })))
    }
  }, [activeProject])

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeProject) return
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, projectId: activeProject.id }),
    })
    setSubmitted(true)
    setForm({ name: '', email: '', message: '', rating: 5 })
  }

  const avgRating = (id: string) => {
    const list = feedback[id]
    if (!list || list.length === 0) return null
    return (list.reduce((sum, f) => sum + f.rating, 0) / list.length).toFixed(1)
  }

  // Extract all unique tags
  const allTags = Array.from(
    new Set(projects.flatMap((p) => p.tags?.map((t) => t.name) || []))
  )

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    const matchesTag = selectedTag ? p.tags?.some((t) => t.name === selectedTag) : true
    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-bg">
      {/* NAVIGATION HEADER */}
      <nav className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-border bg-bg/90 backdrop-blur-md px-8 py-4 shadow-sm">
        <Link href="/" className="font-heading text-xl font-bold tracking-tight text-text hover:text-accent">
          ← Pentam Keerthan
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="text-sm font-medium text-text-muted hover:text-text">
            Home
          </Link>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <main className="mx-auto max-w-6xl px-8 pt-32 pb-20">
        <div className="space-y-4">
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">All Projects</h1>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            Explore the complete collection of AI systems, full-stack applications, machine learning tools, and campus support platforms built by Pentam Keerthan.
          </p>
        </div>

        {/* SEARCH & TAG FILTERS */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search projects by keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text outline-none focus:border-accent"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                selectedTag === null
                  ? 'bg-accent text-bg'
                  : 'border border-border bg-surface text-text-muted hover:text-text'
              }`}
            >
              All ({projects.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  selectedTag === tag
                    ? 'bg-accent text-bg'
                    : 'border border-border bg-surface text-text-muted hover:text-text'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        {loading ? (
          <div className="mt-12 text-center text-sm text-text-muted">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="mt-12 text-center text-sm text-text-muted">No projects found matching your search.</div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProject(p)}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface text-left transition hover:border-accent shadow-sm"
              >
                <img
                  src={p.coverImage}
                  alt={p.title}
                  className="aspect-video w-full object-cover transition group-hover:scale-105 duration-300"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-heading text-xl font-semibold group-hover:text-accent">{p.title}</h2>
                  <p className="mt-2 flex-1 line-clamp-3 text-sm leading-relaxed text-text-muted">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 pt-2">
                    {p.tags?.map((t) => (
                      <span key={t.id} className="rounded bg-surface-alt px-2.5 py-0.5 text-xs text-text-muted">
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-bg py-8 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} Pentam Keerthan. Built with Next.js, Three.js & TailwindCSS.
      </footer>

      {/* PROJECT MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-text/40 backdrop-blur-sm p-6">
          <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-surface p-8 shadow-2xl">
            <div className="flex items-start justify-between">
              <h3 className="font-heading text-2xl font-bold">{activeProject.title}</h3>
              <button onClick={() => { setActiveProject(null); setSubmitted(false) }} className="text-text-muted hover:text-text text-lg">
                ✕
              </button>
            </div>

            <img src={activeProject.coverImage} alt={activeProject.title} className="mt-4 aspect-video w-full rounded-md object-cover" />
            <p className="mt-4 text-sm leading-relaxed text-text-muted">{activeProject.description}</p>

            <div className="mt-4 flex gap-4">
              {activeProject.liveUrl && (
                <a href={activeProject.liveUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:bg-accent-hover">
                  Live Site / Link ↗
                </a>
              )}
              {activeProject.repoUrl && (
                <a href={activeProject.repoUrl} target="_blank" rel="noopener noreferrer" className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:border-accent">
                  Source Code ↗
                </a>
              )}
            </div>

            {/* Rating summary */}
            {avgRating(activeProject.id) && (
              <p className="mt-6 text-accent text-sm font-medium">
                ★ {avgRating(activeProject.id)} average ({feedback[activeProject.id]?.length} reviews)
              </p>
            )}

            {/* Existing feedback */}
            <div className="mt-4 space-y-3">
              {feedback[activeProject.id]?.map((f) => (
                <div key={f.id} className="rounded-md border border-border bg-surface-alt p-4 text-sm">
                  <div className="flex justify-between">
                    <p className="font-semibold">{f.name}</p>
                    <p className="text-accent">{'★'.repeat(f.rating)}</p>
                  </div>
                  <p className="mt-1 text-text-muted">{f.message}</p>
                </div>
              ))}
            </div>

            {/* Feedback form */}
            <div className="mt-6 border-t border-border pt-6">
              <h4 className="font-heading text-base font-semibold">Leave Feedback for this Project</h4>
              {submitted ? (
                <p className="mt-2 text-accent text-sm">Thank you! Your feedback is pending approval.</p>
              ) : (
                <form onSubmit={submitFeedback} className="mt-3 space-y-3">
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full rounded-md border border-border bg-bg px-4 py-2 text-sm"
                  />
                  <textarea
                    placeholder="Your feedback message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={3}
                    className="w-full rounded-md border border-border bg-bg px-4 py-2 text-sm"
                  />
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full rounded-md border border-border bg-bg px-4 py-2 text-sm"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} star{r > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <button className="w-full rounded-md bg-accent py-2 text-sm font-medium text-bg hover:bg-accent-hover">
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
