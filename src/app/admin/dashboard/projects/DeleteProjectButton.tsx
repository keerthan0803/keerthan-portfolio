'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setDeleting(true)
    await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-500/20 disabled:opacity-50"
    >
      {deleting ? 'Deleting...' : 'Delete'}
    </button>
  )
}
