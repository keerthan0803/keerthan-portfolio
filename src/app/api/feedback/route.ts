import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const feedbackSchema = z.object({
    projectId: z.string().min(1),
    name: z.string().min(1).max(100),
    email: z.string().email().optional().or(z.literal('')),
    message: z.string().min(1).max(1000),
    rating: z.number().min(1).max(5),
})

export async function GET(req: NextRequest) {
    const session = await auth()
    const projectId = req.nextUrl.searchParams.get('projectId')

    const feedback = await prisma.feedback.findMany({
        where: {
            ...(session ? {} : { approved: true }),
            ...(projectId ? { projectId } : {}),
        },
        include: { project: { select: { title: true } } },
        orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(feedback)
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const parsed = feedbackSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const feedback = await prisma.feedback.create({
        data: {
            ...parsed.data,
            email: parsed.data.email || undefined,
            approved: false,
        },
    })

    return NextResponse.json(feedback, { status: 201 })
}