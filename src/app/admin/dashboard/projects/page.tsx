import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import DeleteProjectButton from './DeleteProjectButton'

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: 'asc' } })

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-text">Manage Projects</h1>
          <p className="text-sm text-text-muted">Create, edit, or delete portfolio projects and live links.</p>
        </div>
        <Link
          href="/admin/dashboard/projects/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:bg-accent-hover transition"
        >
          + New Project
        </Link>
      </div>

      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="text-sm text-text-muted">No projects found.</p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition hover:border-accent"
            >
              <div>
                <h3 className="font-semibold text-text">{p.title}</h3>
                <span className={`text-xs ${p.published ? 'text-accent' : 'text-text-muted'}`}>
                  {p.published ? '✓ Published' : 'Draft'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/dashboard/projects/${p.id}/edit`}
                  className="rounded-md border border-border bg-surface-alt px-3 py-1.5 text-xs font-medium text-text hover:border-accent"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={p.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}