import { Metadata } from "next";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { BacklinkNewsletterCTA } from "@/components/backlink-newsletter-cta";
import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import SidebarPage from "@/components/components-sidebar";
import { ContentNotFound } from "@/components/content-not-found";
import { SourcesComponent } from "@/components/sources-component";
import { AISummary } from "@/components/ai-summary";

const prisma = new PrismaClient();

// Function to generate metadata for SEO purposes
export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
	const content = await getContentFromSlug(params.slug);

	return {
		title: content?.seoTitle ?? content?.title ?? undefined,
		description: content?.seoDescription ?? content?.description ?? undefined,
		openGraph: {
			title: content?.seoTitle ?? content?.title ?? undefined,
			description: content?.seoDescription ?? content?.description ?? undefined,
			url: `${process.env.NEXT_PUBLIC_DOMAIN}/${params.slug.join("/")}`,
			type: "article",
			images: [
				{
					url: content?.seoImage || content?.image || "/images/default-image.jpg",
					width: 1200,
					height: 630,
					alt: content?.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			site: "@yourwebsite",
			title: content?.seoTitle ?? content?.title ?? undefined,
			description: content?.seoDescription ?? content?.description ?? undefined,
			images: [
				{
					url: content?.seoImage || content?.image || "/images/default-image.jpg",
					alt: content?.title,
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
	const fullSlug = slug.join("/");
	console.log("Searching for slug:", fullSlug);

	const contentType = await prisma.contentType.findFirst({
		where: { slug: slug[0] },
	});

	if (!contentType) {
		console.log("Content type not found");
		return null;
	}

	const remainingSlug = slug.slice(1).join("/");

	const page = await prisma.page.findFirst({
		where: {
			contentTypeId: contentType.id,
			slug: remainingSlug,
		},
	});

	if (page) {
		console.log("Raw page data:", page);
		console.log("Raw page sources:", page.sources);

		// Remove the JSON.parse line
		// const parsedSources = page.sources ? JSON.parse(page.sources as string) : null;

		// Instead, use the sources directly
		console.log("Page sources:", page.sources);

		return {
			...page,
			type: "page",
			sources: page.sources, // Use the sources directly
		};
	}

	const post = await prisma.post.findFirst({
		where: {
			contentTypeId: contentType.id,
			slug: remainingSlug,
		},
	});

	if (post) {
		console.log("Raw post sources:", post.sources);
		const parsedSources = post.sources ? JSON.parse(post.sources as string) : null;
		console.log("Parsed post sources:", parsedSources);
		return {
			...post,
			type: "post",
			sources: parsedSources,
		};
	}

	return null;
}

// Full Next.js Page component with metadata, structured data, Error Boundary, and loading skeleton
export default async function Page({ params }: { params: { slug: string[] } }) {
	const content = await getContentFromSlug(params.slug);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: content?.title ?? "",
		description: content?.description ?? "",
		author: {
			"@type": "Person",
			name: content?.author ?? "",
		},
		datePublished: content?.date?.toISOString() ?? "",
		image: content?.image || `${process.env.NEXT_PUBLIC_DOMAIN}/images/default-image.jpg`,
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

	// If content is not found, return the ContentNotFound component
	if (!content) {
		return (
			<SidebarPage>
				<ContentNotFound />
			</SidebarPage>
		);
	}
	return (
		<SidebarPage>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<Suspense fallback={<LoadingSkeleton />}>
				<div className="relative max-w-7xl mx-auto">
					<article className="prose md:prose-lg dark:prose-invert mt-8 space-y-8 mb-10">
						<AISummary />
						<MDXRemote
							source={content.content}
							components={{
								...MDXComponents,
							}}
						/>
					</article>
				</div>
				{content.sources && <SourcesComponent sources={content.sources} />}
				<BacklinkNewsletterCTA />
			</Suspense>
		</SidebarPage>
	);
}
