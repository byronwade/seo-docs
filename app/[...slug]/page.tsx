import { Metadata } from 'next';
import { Layout } from "@/components/layout";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { BlogEmailSignup } from "@/components/blog-email-signup";
import { Suspense } from "react";
import { PrismaClient } from '@prisma/client';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MDXComponents from '@/components/MDXComponents';

const prisma = new PrismaClient();

// Function to generate metadata for SEO purposes
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const content = await getContentFromSlug(params.slug);

  if (!content) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  return {
    title: content.seoTitle ?? content.title ?? undefined,
    description: content.seoDescription ?? content.description ?? undefined,
    openGraph: {
      title: content.seoTitle ?? content.title ?? undefined,
      description: content.seoDescription ?? content.description ?? undefined,
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/${params.slug.join("/")}`,
      type: "article",
      images: [
        {
          url: content.seoImage || content.image || "/images/default-image.jpg",
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourwebsite",
      title: content.seoTitle ?? content.title ?? undefined,
      description: content.seoDescription ?? content.description ?? undefined,
      images: [
        {
          url: content.seoImage || content.image || "/images/default-image.jpg",
          alt: content.title,
        },
      ],
    },
    robots: "index, follow",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/${params.slug.join("/")}`,
    },
  };
}

async function getContentFromSlug(slug: string[]) {
  const fullSlug = slug.join('/');
  console.log('Searching for slug:', fullSlug);

  // First, try to find a ContentType that matches the first part of the slug
  const contentType = await prisma.contentType.findFirst({
    where: { slug: slug[0] },
  });

  if (!contentType) {
    console.log('Content type not found');
    return null;
  }

  // Now, search for a Page or Post with the remaining slug
  const remainingSlug = slug.slice(1).join('/');
  
  const page = await prisma.page.findFirst({
    where: {
      contentTypeId: contentType.id,
      slug: remainingSlug,
    },
  });

  if (page) {
    console.log('Found page:', page);
    return { ...page, type: 'page' };
  }

  const post = await prisma.post.findFirst({
    where: {
      contentTypeId: contentType.id,
      slug: remainingSlug,
    },
  });

  if (post) {
    console.log('Found post:', post);
    return { ...post, type: 'post' };
  }

  console.log('Content not found');
  return null;
}

// Full Next.js Page component with metadata, structured data, Error Boundary, and loading skeleton
export default async function Page({ params }: { params: { slug: string[] } }) {
  const content = await getContentFromSlug(params.slug);

  if (!content) {
    return (
      <Layout>
        <h1>Content Not Found</h1>
        <p>The requested page could not be found.</p>
      </Layout>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.description,
    author: {
      "@type": "Person",
      name: content.author,
    },
    datePublished: content.date.toISOString(),
    image: content.image || `${process.env.NEXT_PUBLIC_DOMAIN}/images/default-image.jpg`,
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/${params.slug.join("/")}`,
    publisher: {
      "@type": "Organization",
      name: "Your Website",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`,
      },
    },
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={<LoadingSkeleton />}>
        <Article content={content} />
      </Suspense>
    </Layout>
  );
}

function Article({ content }: { content: unknown }) {
  return (
    <article className="prose dark:prose-invert mt-8 space-y-8">
      <MDXRemote source={(content as { content: string }).content} components={MDXComponents} />
      <BlogEmailSignup />
    </article>
  );
}

export async function generateStaticParams() {
  const contentTypes = await prisma.contentType.findMany();
  
  const params: { slug: string[] }[] = [];

  for (const contentType of contentTypes) {
    const pages = await prisma.page.findMany({
      where: { contentTypeId: contentType.id },
      select: { slug: true },
    });

    const posts = await prisma.post.findMany({
      where: { contentTypeId: contentType.id },
      select: { slug: true },
    });

    pages.forEach(page => {
      if (page.slug) {
        params.push({ slug: [contentType.slug, page.slug] });
      }
    });

    posts.forEach(post => {
      if (post.slug) {
        params.push({ slug: [contentType.slug, post.slug] });
      }
    });
  }

  console.log('Generated params:', params);
  return params;
}
