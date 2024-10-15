import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from 'next';
import { Layout } from "@/components/layout";
import { MDXComponents } from '@/components/MDXComponents';
import LoadingSkeleton from "@/components/LoadingSkeleton";
import RelatedContent from "@/components/related-content";
import { BlogEmailSignup } from "@/components/blog-email-signup";
import { Suspense } from "react";

// Function to generate metadata for SEO purposes
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const filePath = path.join(process.cwd(), "content", ...params.slug, "page.mdx");

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
		title: data?.title || "SEO Docs",
		description: data?.description || "SEO Documentation and guides",
		openGraph: {
			title: data?.title || "SEO Docs",
			description: data?.description || "SEO Documentation and guides",
			url: data?.canonicalUrl || `${process.env.NEXT_PUBLIC_DOMAIN}/${params.slug.join("/")}`,
			type: "article",
			images: [
				{
					url: data?.image || "/images/seo-introduction-image.jpg",
					width: 1200,
					height: 630,
					alt: data?.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			site: "@yourwebsite",
			title: data?.title || "SEO Docs",
			description: data?.description || "SEO Documentation and guides",
			images: [
				{
					url: data?.image || "/images/seo-introduction-image.jpg",
					alt: data?.title || "SEO Docs",
				},
			],
		},
		robots: data?.robots || "index, follow",
		alternates: {
			canonical: data?.canonicalUrl || `${process.env.NEXT_PUBLIC_DOMAIN}/${params.slug.join("/")}`,
		},
	};
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }
}

// Full Next.js Page component with metadata, structured data, Error Boundary, and loading skeleton
export default async function Page({ params }: { params: { slug: string[] } }) {
	const filePath = path.join(process.cwd(), "content", ...params.slug, "page.mdx");
	const fileContent = await fs.readFile(filePath, "utf-8");
	const { data, content } = matter(fileContent);

	const jsonLd = data
		? {
				"@context": "https://schema.org",
				"@type": "Article",
				headline: data.title,
				description: data.description,
				author: {
					"@type": "Person",
					name: data.author || "John Doe",
				},
				datePublished: data.date || "2024-10-13",
				image: data.image || `${process.env.NEXT_PUBLIC_DOMAIN}/images/seo-introduction-image.jpg`,
				url: data.canonicalUrl || `${process.env.NEXT_PUBLIC_DOMAIN}/${params.slug.join("/")}`,
				publisher: {
					"@type": "Organization",
					name: "Your Website",
					logo: {
						"@type": "ImageObject",
						url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`,
					},
				},
		  }
		: null;

	return (
		<Layout>
			{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
			<Suspense fallback={<LoadingSkeleton />}>
				<Article filePath={filePath} params={params} data={data} content={content} />
			</Suspense>
		</Layout>
	);
}

// Server Component for rendering the article content
async function Article({ data, content }: { filePath: string; params: { slug: string[] }; data: unknown; content: string }) {
	try {
		return (
			<article className="prose md:prose-lg lg:prose-xl mt-8 space-y-8">
				<MDXRemote source={content} components={MDXComponents} />
				<BlogEmailSignup />
				<RelatedContent currentKeywords={(data as { keywords?: string[] }).keywords ?? []} />
			</article>
		);
	} catch (error) {
		console.error("Error loading MDX:", error);
		throw new Error("Failed to load article content");
	}
}
