import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-bg">
      <nav className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-border bg-bg/90 backdrop-blur-md px-8 py-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/admin/dashboard" className="font-heading text-lg font-bold tracking-tight text-accent">
            Admin Center
          </Link>
          <Link href="/admin/dashboard/projects" className="text-sm font-medium text-text-muted transition hover:text-text">
            Projects
          </Link>
          <Link href="/admin/dashboard/certificates" className="text-sm font-medium text-text-muted transition hover:text-text">
            Certificates
          </Link>
          <Link href="/admin/dashboard/profile" className="text-sm font-medium text-text-muted transition hover:text-text">
            Profile & Links
          </Link>
          <Link href="/admin/dashboard/feedback" className="text-sm font-medium text-text-muted transition hover:text-text">
            Feedback
          </Link>
          <Link href="/" target="_blank" className="text-xs text-accent underline hover:text-accent-hover">
            View Live Site ↗
          </Link>
        </div>

        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <button className="rounded-md border border-border px-4 py-1.5 text-xs font-medium text-text transition hover:border-accent">
            Sign out
          </button>
        </form>
      </nav>

      <main className="mx-auto max-w-5xl px-8 pt-28 pb-16">{children}</main>
    </div>
  )
}