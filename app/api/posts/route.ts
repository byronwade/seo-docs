import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const posts = await prisma.post.findMany()
  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  const body = await request.json()
  const post = await prisma.post.create({
    data: {
      title: body.name,
      slug: body.slug,
      content: body.content,
      author: body.authorId,
      contentType: body.contentType,
    },
  })

  // Convert BigInt to String before serializing
  const serializedPost = {
    ...post,
    id: post.id.toString(),
    authorId: post.author.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }

  return NextResponse.json(serializedPost)
}
