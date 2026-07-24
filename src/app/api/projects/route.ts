import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'nodejs'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { z } from 'zod'

const projectSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    content: z.string().optional(),
    coverImage: z.string().min(1),
    modelUrl: z.string().optional().nullable(),
    liveUrl: z.string().optional().nullable(),
    repoUrl: z.string().optional().nullable(),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    order: z.number().optional(),
    tagIds: z.array(z.string()).optional(),
})

export async function GET() {
    const projects = await prisma.project.findMany({
        include: { tags: true, images: true },
        orderBy: { order: 'asc' },
    })
    return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const parsed = projectSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { tagIds, ...data } = parsed.data

    const project = await prisma.project.create({
        data: {
            ...data,
            tags: tagIds ? { connect: tagIds.map((id) => ({ id })) } : undefined,
        },
    })

    return NextResponse.json(project, { status: 201 })
}
