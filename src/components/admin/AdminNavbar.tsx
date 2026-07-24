'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface AdminNavbarProps {
  signOutAction: () => Promise<void>
}

export default function AdminNavbar({ signOutAction }: AdminNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-border bg-bg/90 backdrop-blur-md px-6 py-4 shadow-sm sm:px-8">
      <Link href="/admin/dashboard" className="font-heading text-lg font-bold tracking-tight text-accent sm:text-xl">
        Admin Center
      </Link>

      {/* Desktop Links */}
      <div className="hidden sm:flex flex-wrap items-center gap-6 text-sm">
        <Link href="/admin/dashboard/projects" className="font-medium text-text-muted transition hover:text-text">
          Projects
        </Link>
        <Link href="/admin/dashboard/certificates" className="font-medium text-text-muted transition hover:text-text">
          Certificates
        </Link>
        <Link href="/admin/dashboard/profile" className="font-medium text-text-muted transition hover:text-text">
          Profile & Links
        </Link>
        <Link href="/admin/dashboard/feedback" className="font-medium text-text-muted transition hover:text-text">
          Feedback
        </Link>
        <Link href="/" target="_blank" className="text-xs text-accent underline hover:text-accent-hover">
          View Live Site ↗
        </Link>

        <form action={signOutAction}>
          <button className="rounded-md border border-border px-4 py-1.5 text-xs font-medium text-text transition hover:border-accent">
            Sign out
          </button>
        </form>
      </div>

      {/* Mobile Hamburger Toggle Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden text-text p-1 hover:text-accent focus:outline-none"
        aria-label="Toggle Admin Navigation Menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown Drawer */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full border-b border-border bg-bg/95 backdrop-blur-lg px-6 py-6 shadow-2xl sm:hidden flex flex-col gap-4 text-base font-medium">
          <Link
            href="/admin/dashboard/projects"
            onClick={() => setMenuOpen(false)}
            className="text-left font-medium text-text-muted transition hover:text-accent"
          >
            Projects
          </Link>
          <Link
            href="/admin/dashboard/certificates"
            onClick={() => setMenuOpen(false)}
            className="text-left font-medium text-text-muted transition hover:text-accent"
          >
            Certificates
          </Link>
          <Link
            href="/admin/dashboard/profile"
            onClick={() => setMenuOpen(false)}
            className="text-left font-medium text-text-muted transition hover:text-accent"
          >
            Profile & Links
          </Link>
          <Link
            href="/admin/dashboard/feedback"
            onClick={() => setMenuOpen(false)}
            className="text-left font-medium text-text-muted transition hover:text-accent"
          >
            Feedback
          </Link>
          <Link
            href="/"
            target="_blank"
            onClick={() => setMenuOpen(false)}
            className="text-left text-sm text-accent underline hover:text-accent-hover"
          >
            View Live Site ↗
          </Link>

          <form action={signOutAction} className="pt-2 border-t border-border/40">
            <button className="w-full rounded-md border border-border px-4 py-2 text-sm font-medium text-text transition hover:border-accent">
              Sign out
            </button>
          </form>
        </div>
      )}
    </nav>
  )
}
