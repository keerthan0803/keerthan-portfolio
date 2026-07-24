import { auth } from '@/lib/auth'
import Link from 'next/link'

export default async function DashboardHome() {
  const session = await auth()

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading text-text">Admin Control Center</h1>
        <p className="mt-1 text-sm text-text-muted">Logged in as {session?.user?.email}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Link
          href="/admin/dashboard/projects"
          className="group rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold font-heading text-text group-hover:text-accent">Manage Projects</h2>
            <span className="text-xl">🚀</span>
          </div>
          <p className="mt-2 text-xs text-text-muted leading-relaxed">
            Create, edit, or remove portfolio projects, GitHub links, and live demo URLs.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/certificates"
          className="group rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold font-heading text-text group-hover:text-accent">Manage Certificates</h2>
            <span className="text-xl">📜</span>
          </div>
          <p className="mt-2 text-xs text-text-muted leading-relaxed">
            Add, update, or remove certificates and dynamic credential verification links.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/profile"
          className="group rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold font-heading text-text group-hover:text-accent">Profile & Coding Links</h2>
            <span className="text-xl">👤</span>
          </div>
          <p className="mt-2 text-xs text-text-muted leading-relaxed">
            Update bio summary, contact info, LeetCode, CodeChef, Codeforces, and HackerRank URLs.
          </p>
        </Link>

        <Link
          href="/admin/dashboard/feedback"
          className="group rounded-xl border border-border bg-surface p-6 transition hover:border-accent"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold font-heading text-text group-hover:text-accent">Moderate Feedback</h2>
            <span className="text-xl">💬</span>
          </div>
          <p className="mt-2 text-xs text-text-muted leading-relaxed">
            Approve or delete user reviews and feedback for individual portfolio projects.
          </p>
        </Link>
      </div>
    </div>
  )
}