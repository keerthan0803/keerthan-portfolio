import { NextResponse } from 'next/server'
export const runtime = 'nodejs'
import { prisma } from '@/lib/prisma'

export async function GET() {
    const items = await prisma.education.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(items)
}
