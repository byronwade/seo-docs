import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      include: { contentType: true }
    })
    
    // Convert BigInt to String before serializing
    const serializedPages = pages.map(page => ({
      ...page,
      id: page.id.toString(),
      contentTypeId: page.contentTypeId.toString(),
      contentType: {
        ...page.contentType,
        id: page.contentType.id.toString()
      },
      createdAt: page.createdAt.toISOString(),
      updatedAt: page.updatedAt.toISOString(),
      date: page.date.toISOString(),
    }))

    return NextResponse.json(serializedPages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('Received request to create page:', body)

    // Check if a page with the given slug already exists
    const existingPage = await prisma.page.findUnique({
      where: { slug: body.slug }
    })

    if (existingPage) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 })
    }

    const page = await prisma.page.create({
      data: {
        title: body.title,
        content: body.content,
        slug: body.slug,
        contentTypeId: BigInt(body.contentTypeId),
        author: body.author || 'Default Author',
        description: body.description,
        image: body.image,
        keywords: body.keywords,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        seoImage: body.seoImage,
        date: new Date(body.date) || new Date(),
      },
      include: { contentType: true }
    })

    // Convert BigInt to String before serializing
    const serializedPage = {
      ...page,
      id: page.id.toString(),
      contentTypeId: page.contentTypeId.toString(),
      contentType: {
        ...page.contentType,
        id: page.contentType.id.toString()
      },
      createdAt: page.createdAt.toISOString(),
      updatedAt: page.updatedAt.toISOString(),
      date: page.date.toISOString(),
    }
    
    return NextResponse.json(serializedPage)
  } catch (error: unknown) {
    console.error('Error creating page:', error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 })
    }
  }
}
