import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.certificate.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, issuer, link, order } = body
    const item = await prisma.certificate.create({
      data: {
        title,
        issuer,
        link: link || null,
        order: Number(order) || 0,
      },
    })
    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { id, title, issuer, link, order } = body
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    const item = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        issuer,
        link: link || null,
        order: Number(order) || 0,
      },
    })
    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    await prisma.certificate.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 })
  }
}
