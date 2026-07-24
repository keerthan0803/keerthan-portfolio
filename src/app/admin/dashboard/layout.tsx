import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminNavbar from '@/components/admin/AdminNavbar'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const handleSignOut = async () => {
    'use server'
    await signOut()
  }

  return (
    <div className="min-h-screen bg-bg text-text selection:bg-accent selection:text-bg">
      <AdminNavbar signOutAction={handleSignOut} />

      <main className="mx-auto max-w-5xl px-8 pt-28 pb-16">{children}</main>
    </div>
  )
}