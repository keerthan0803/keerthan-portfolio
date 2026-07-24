'use client'

import { useEffect, useState } from 'react'

type Feedback = {
  id: string
  name: string
  message: string
  rating: number
  approved: boolean
  project?: { title: string }
}

export default function AdminFeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([])

  const load = () => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then(setFeedback)
  }

  useEffect(() => {
    load()
  }, [])

  const approve = async (id: string, approved: boolean) => {
    await fetch(`/api/feedback/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved }),
    })
    load()
  }

  const remove = async (id: string) => {
    await fetch(`/api/feedback/${id}`, { method: 'DELETE' })
    load()
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-text">Feedback Moderation</h1>
        <p className="text-sm text-text-muted">Review, approve, or delete user feedback and project ratings.</p>
      </div>

      <div className="space-y-4">
        {feedback.length === 0 ? (
          <p className="text-sm text-text-muted">No feedback submissions found.</p>
        ) : (
          feedback.map((f) => (
            <div key={f.id} className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-text">{f.name}</p>
                  {f.project?.title && <p className="text-xs text-text-muted">Project: {f.project.title}</p>}
                </div>
                <div className="flex items-center gap-1 text-accent text-sm">
                  {'★'.repeat(f.rating || 5)}
                </div>
              </div>

              <p className="mt-2 text-sm text-text-muted leading-relaxed">{f.message}</p>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => approve(f.id, !f.approved)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition ${
                    f.approved
                      ? 'border border-border bg-surface-alt text-text hover:border-accent'
                      : 'bg-accent text-bg hover:bg-accent-hover'
                  }`}
                >
                  {f.approved ? 'Unapprove' : 'Approve Review'}
                </button>
                <button
                  onClick={() => remove(f.id)}
                  className="rounded-md border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}