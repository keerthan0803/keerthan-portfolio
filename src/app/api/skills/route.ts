import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(skills)
}
