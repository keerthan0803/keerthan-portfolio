'use client'

import dynamic from 'next/dynamic'
import Loader from '@/components/3d/Loader'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false, loading: () => <Loader /> })

type Profile = {
  name: string
  title: string
  summary: string
  email: string
  phone: string
  location: string
  linkedin: string
  github?: string
  leetcode?: string
  codechef?: string
  codeforces?: string
  hackerrank?: string
}

type Education = {
  id: string
  degree: string
  institution: string
  location: string
  period: string
  score: string
}

type Skill = {
  id: string
  name: string
  category: string
}

type Achievement = {
  id: string
  title: string
  description: string
  icon?: string
}

type Certificate = {
  id: string
  title: string
  issuer: string
  link?: string | null
}

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

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [education, setEducation] = useState<Education[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [feedback, setFeedback] = useState<Record<string, Feedback[]>>({})
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollRef = useRef(0)
  const { scrollYProgress } = useScroll()
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    scrollRef.current = v
  })

  const aboutRef = useRef<HTMLDivElement>(null)
  const educationRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const achievementsRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/profile').then((r) => r.json()).then(setProfile)
    fetch('/api/education').then((r) => r.json()).then(setEducation)
    fetch('/api/skills').then((r) => r.json()).then(setSkills)
    fetch('/api/achievements').then((r) => r.json()).then(setAchievements)
    fetch('/api/certificates').then((r) => r.json()).then(setCertificates)
    fetch('/api/projects').then((r) => r.json()).then(setProjects)
  }, [])

  useEffect(() => {
    if (activeProject) {
      fetch(`/api/feedback?projectId=${activeProject.id}`)
        .then((r) => r.json())
        .then((data) => setFeedback((prev) => ({ ...prev, [activeProject.id]: data })))
    }
  }, [activeProject])

  const scrollTo = (label: string) => {
    const map: Record<string, React.RefObject<HTMLDivElement | null>> = {
      About: aboutRef,
      Education: educationRef,
      Skills: skillsRef,
      Achievements: achievementsRef,
      Work: workRef,
      Contact: contactRef,
    }
    map[label]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

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

  // Group skills by category
  const skillsByCategory = skills.reduce<Record<string, Skill[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div className="bg-bg text-text selection:bg-accent selection:text-bg">
      {/* NAVIGATION */}
      <nav className="fixed top-0 z-30 flex w-full items-center justify-between border-b border-border bg-bg/90 backdrop-blur-md px-6 py-4 shadow-sm sm:px-8">
        <span className="font-heading text-lg font-bold tracking-tight sm:text-xl">{profile?.name || 'Pentam Keerthan'}</span>

        {/* Desktop Links */}
        <div className="hidden sm:flex flex-wrap gap-6 text-sm text-text-muted">
          <button onClick={() => scrollTo('About')} className="transition hover:text-text">About</button>
          <button onClick={() => scrollTo('Education')} className="transition hover:text-text">Education</button>
          <button onClick={() => scrollTo('Skills')} className="transition hover:text-text">Skills</button>
          <button onClick={() => scrollTo('Achievements')} className="transition hover:text-text">Achievements</button>
          <button onClick={() => scrollTo('Work')} className="transition hover:text-text">Work</button>
          <button onClick={() => scrollTo('Contact')} className="transition hover:text-text">Contact</button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-text p-1 hover:text-accent focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Dropdown Drawer */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full border-b border-border bg-bg/95 backdrop-blur-lg px-6 py-6 shadow-2xl sm:hidden flex flex-col gap-4 text-base font-medium">
            <button onClick={() => { scrollTo('About'); setMenuOpen(false) }} className="text-left transition hover:text-accent">About</button>
            <button onClick={() => { scrollTo('Education'); setMenuOpen(false) }} className="text-left transition hover:text-accent">Education</button>
            <button onClick={() => { scrollTo('Skills'); setMenuOpen(false) }} className="text-left transition hover:text-accent">Skills</button>
            <button onClick={() => { scrollTo('Achievements'); setMenuOpen(false) }} className="text-left transition hover:text-accent">Achievements</button>
            <button onClick={() => { scrollTo('Work'); setMenuOpen(false) }} className="text-left transition hover:text-accent">Work</button>
            <button onClick={() => { scrollTo('Contact'); setMenuOpen(false) }} className="text-left transition hover:text-accent">Contact</button>
          </div>
        )}
      </nav>

      {/* FIXED 3D BACKGROUND — spans full scroll */}
      <div className="fixed inset-0 z-0">
        <Scene onSelect={scrollTo} scrollRef={scrollRef} />
      </div>

      {/* HERO TEXT */}
      <section className="relative z-10 flex h-screen w-full items-end pb-16 sm:pb-24">
        <div className="mx-4 max-w-xl rounded-2xl border border-border/60 bg-bg/85 p-6 backdrop-blur-md shadow-xl sm:mx-8 sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
          <p className="text-xs uppercase tracking-widest text-accent font-semibold">{profile?.title || 'AI & Full-Stack Developer'}</p>
          <h1 className="mt-2 font-heading text-4xl font-black text-text sm:text-6xl">Hi, I'm {profile?.name || 'Pentam Keerthan'}</h1>
          <p className="mt-4 text-sm font-medium leading-relaxed text-text sm:text-base sm:text-text-muted">
            {profile?.summary || 'AI & Full-Stack Developer passionate about building intelligent systems, full-stack web applications, and computer vision solutions. Experienced with Python, Machine Learning, Deep Learning, React.js, Node.js, and PostgreSQL.'}
          </p>
          <div className="pointer-events-auto mt-6 flex gap-4">
            <button onClick={() => scrollTo('Work')} className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent-hover shadow-sm">
              Explore Projects
            </button>
            <button onClick={() => scrollTo('Contact')} className="rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text transition hover:border-accent">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SUMMARY */}
      <section ref={aboutRef} className="relative z-10 mx-auto max-w-4xl bg-bg px-8 py-20 border-t border-border/40">
        <h2 className="font-heading text-3xl font-bold">About Me</h2>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          {profile?.summary}
        </p>
      </section>

      {/* EDUCATION */}
      <section ref={educationRef} className="relative z-10 mx-auto max-w-4xl bg-bg px-8 py-20 border-t border-border/40">
        <h2 className="font-heading text-3xl font-bold">Education</h2>
        <div className="mt-8 space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="rounded-lg border border-border bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-xl font-semibold">{edu.degree}</h3>
                <span className="text-sm font-medium text-accent">{edu.score}</span>
              </div>
              <p className="mt-1 text-sm text-text-muted">{edu.institution} — {edu.location}</p>
              <p className="mt-2 text-xs text-text-muted/80">{edu.period}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section ref={skillsRef} className="relative z-10 mx-auto max-w-4xl bg-bg px-8 py-20 border-t border-border/40">
        <h2 className="font-heading text-3xl font-bold">Technical Skills</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Object.entries(skillsByCategory).map(([category, items]) => (
            <div key={category} className="rounded-lg border border-border bg-surface p-6">
              <h3 className="font-heading text-lg font-semibold text-accent">{category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s.id} className="rounded-md border border-border bg-surface-alt px-3 py-1 text-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS & CERTIFICATES */}
      <section ref={achievementsRef} className="relative z-10 mx-auto max-w-4xl bg-bg px-8 py-20 border-t border-border/40">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-bold">Key Achievements</h2>
            <ul className="mt-6 space-y-4 text-sm text-text-muted">
              {achievements.map((ach) => (
                <li key={ach.id} className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4">
                  <span className="text-xl">{ach.icon || '🏆'}</span>
                  <div>
                    <strong className="text-text font-semibold">{ach.title}</strong>
                    <p className="mt-1 text-xs text-text-muted">{ach.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-3xl font-bold">Certificates</h2>
            <ul className="mt-6 space-y-3 text-sm text-text-muted">
              {certificates.map((cert) => (
                <li key={cert.id} className="rounded-lg border border-border bg-surface p-4 transition hover:border-accent">
                  {cert.link ? (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-text hover:text-accent flex items-center justify-between">
                      <span>{cert.title}</span>
                      <span className="text-xs text-accent">Verify ↗</span>
                    </a>
                  ) : (
                    <p className="font-semibold text-text">{cert.title}</p>
                  )}
                  <p className="mt-1 text-xs text-accent">{cert.issuer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WORK / PROJECTS */}
      <section ref={workRef} className="relative z-10 mx-auto max-w-6xl bg-bg px-8 py-20 border-t border-border/40">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold">Featured Projects</h2>
          <Link href="/projects" className="text-sm font-semibold text-accent hover:text-accent-hover">
            See All Projects ({projects.length}) ↗
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.slice(0, 4).map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p)}
              className="group overflow-hidden rounded-lg border border-border bg-surface text-left transition hover:border-accent"
            >
              <img src={p.coverImage} alt={p.title} className="aspect-video w-full object-cover transition group-hover:scale-105 duration-300" />
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold group-hover:text-accent">{p.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
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

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="rounded-md border border-border bg-surface px-6 py-3 text-sm font-semibold text-text transition hover:border-accent hover:text-accent shadow-sm"
          >
            See All Projects ↗
          </Link>
        </div>
      </section>

      {/* CONTACT & CODING PROFILES */}
      <section ref={contactRef} className="relative z-10 mx-auto max-w-4xl bg-bg px-8 py-20 border-t border-border/40">
        <h2 className="font-heading text-3xl font-bold">Contact & Profiles</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6 space-y-4">
            <h3 className="font-heading text-lg font-semibold text-accent">Get In Touch</h3>
            <div>
              <p className="text-xs text-text-muted">Email</p>
              <a href={`mailto:${profile?.email}`} className="text-sm font-medium hover:text-accent">{profile?.email}</a>
            </div>
            <div>
              <p className="text-xs text-text-muted">Phone</p>
              <a href={`tel:${profile?.phone}`} className="text-sm font-medium hover:text-accent">{profile?.phone}</a>
            </div>
            <div>
              <p className="text-xs text-text-muted">Location</p>
              <p className="text-sm font-medium">{profile?.location}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted">LinkedIn</p>
              <a href={profile?.linkedin} target="_blank" className="text-sm font-medium hover:text-accent">{profile?.linkedin}</a>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6 space-y-3">
            <h3 className="font-heading text-lg font-semibold text-accent">Coding Profiles</h3>
            {profile?.leetcode && (
              <a href={profile.leetcode} target="_blank" className="block rounded-md border border-border bg-surface-alt p-3 text-sm font-medium hover:border-accent">
                ⚡ LeetCode Profile
              </a>
            )}
            {profile?.codechef && (
              <a href={profile.codechef} target="_blank" className="block rounded-md border border-border bg-surface-alt p-3 text-sm font-medium hover:border-accent">
                🍲 CodeChef Profile
              </a>
            )}
            {profile?.codeforces && (
              <a href={profile.codeforces} target="_blank" className="block rounded-md border border-border bg-surface-alt p-3 text-sm font-medium hover:border-accent">
                ⚔️ Codeforces Profile
              </a>
            )}
            {profile?.hackerrank && (
              <a href={profile.hackerrank} target="_blank" className="block rounded-md border border-border bg-surface-alt p-3 text-sm font-medium hover:border-accent">
                🎯 HackerRank Profile
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border bg-bg py-8 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} {profile?.name || 'Pentam Keerthan'}. Built with Next.js, Three.js & TailwindCSS.
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
                <a href={activeProject.liveUrl} target="_blank" className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg hover:bg-accent-hover">
                  Live Site / Link
                </a>
              )}
              {activeProject.repoUrl && (
                <a href={activeProject.repoUrl} target="_blank" className="rounded-md border border-border px-4 py-2 text-sm hover:border-accent">
                  Source Code
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