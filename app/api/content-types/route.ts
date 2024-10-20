import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const contentTypes = await prisma.contentType.findMany()
    
    // Convert BigInt to String before serializing
    const serializedContentTypes = contentTypes.map(type => ({
      ...type,
      id: type.id.toString()
    }))

    return NextResponse.json(serializedContentTypes)
  } catch (error) {
    console.error('Error fetching content types:', error)
    return NextResponse.json({ error: 'Failed to fetch content types' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const contentType = await prisma.contentType.create({
    data: {
      name: body.name,
      slug: body.slug,
    },
  })

  // Convert BigInt to String before serializing
  const serializedContentType = {
    ...contentType,
    id: contentType.id.toString()
  }

  return NextResponse.json(serializedContentType)
}
