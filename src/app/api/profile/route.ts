import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const profile = await prisma.profile.findFirst()
  return NextResponse.json(profile)
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      title,
      summary,
      email,
      phone,
      location,
      linkedin,
      github,
      leetcode,
      codechef,
      codeforces,
      hackerrank,
    } = body

    const existing = await prisma.profile.findFirst()

    if (existing) {
      const updated = await prisma.profile.update({
        where: { id: existing.id },
        data: {
          name,
          title,
          summary,
          email,
          phone,
          location,
          linkedin,
          github: github || null,
          leetcode: leetcode || null,
          codechef: codechef || null,
          codeforces: codeforces || null,
          hackerrank: hackerrank || null,
        },
      })
      return NextResponse.json(updated)
    } else {
      const created = await prisma.profile.create({
        data: {
          name,
          title,
          summary,
          email,
          phone,
          location,
          linkedin,
          github: github || null,
          leetcode: leetcode || null,
          codechef: codechef || null,
          codeforces: codeforces || null,
          hackerrank: hackerrank || null,
        },
      })
      return NextResponse.json(created, { status: 201 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}
