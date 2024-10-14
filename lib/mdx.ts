import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const root = process.cwd()

export async function getFiles(type: string) {
  return fs.readdirSync(path.join(root, 'content', type))
}

export async function getFileBySlug(type: string, slug: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'content', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'content', `${type}.mdx`), 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await serialize(content)

  return {
    data,
    content: mdxSource,
  }
}

