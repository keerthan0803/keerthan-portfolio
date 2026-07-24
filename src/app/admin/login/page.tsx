'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password')
      return
    }

    router.push('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg text-text selection:bg-accent selection:text-bg p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-surface p-8 shadow-xl"
      >
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-text">Admin Login</h1>
          <p className="mt-1 text-xs text-text-muted">Enter credentials to access admin control center.</p>
        </div>

        {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1">Email Address</label>
          <input
            type="email"
            placeholder="keerthanpentam@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-4 py-2 text-sm text-text outline-none focus:border-accent"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-muted mb-1">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-surface-alt pl-4 pr-10 py-2 text-sm text-text outline-none focus:border-accent"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-text-muted hover:text-text transition focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-accent py-2.5 text-sm font-medium text-bg transition hover:bg-accent-hover disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In to Dashboard'}
        </button>
      </form>
    </div>
  )
}