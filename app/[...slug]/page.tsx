import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc'; // This is important in Next.js 14
import { serialize } from 'next-mdx-remote/serialize';
import { Metadata } from 'next';
// import { JsonLd } from 'react-schemaorg';
// import { Article } from 'schema-dts';
import { MDXComponents } from '@/components/MDXComponents';
import { Layout } from '@/components/layout'

// Set up dynamic metadata based on the frontmatter of MDX files
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const slug = params.slug ? params.slug.join('/') : 'introduction';
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      title: data.title || 'SEO Docs',
      description: data.description || 'SEO Documentation and guides',
      // Remove the breadcrumb property as it's not a valid Metadata property
    };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Handle the case when the file doesn't exist
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = params.slug ? params.slug.join('/') : 'introduction';
  const filePath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, 'utf-8');
    const { content, data } = matter(source);
    const mdxSource = await serialize(content);
    return (
      <Layout>
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{data.title}</h1>
          <p className="text-xl text-muted-foreground">{data.description}</p>
        </div>
        <div className="mt-8 space-y-8">
          <MDXRemote source={mdxSource} components={MDXComponents} />
        </div>
      </Layout>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Handle the case when the file doesn't exist
    return (
      <Layout>
        <div>Page Not Found</div>
      </Layout>
    );
  }
}
