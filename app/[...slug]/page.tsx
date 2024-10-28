import { Metadata } from "next";
import { notFound } from "next/navigation";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { BacklinkNewsletterCTA } from "@/components/backlink-newsletter-cta";
import { Suspense } from "react";
import { PrismaClient } from "@prisma/client";
import { MDXRemote } from "next-mdx-remote/rsc";
import MDXComponents from "@/components/MDXComponents";
import SidebarPage from "@/components/components-sidebar";
import { SourcesComponent } from "@/components/sources-component";

const prisma = new PrismaClient();

async function getContentAndSlug(params: { slug: string[] }) {
	const slug = params.slug;
	const content = await getContentFromSlug(slug);
	return { slug, content };
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
	const { slug, content } = await getContentAndSlug(params);
	const fullUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/${slug.join("/")}`;

	if (!content) {
		return {
			title: "Content Not Found",
		};
	}

	return {
		title: content?.seoTitle ?? content?.title ?? "Default Title",
		description: content?.seoDescription ?? content?.description ?? "Default Description",
		openGraph: {
			title: content?.seoTitle ?? content?.title ?? "Default Title",
			description: content?.seoDescription ?? content?.description ?? "Default Description",
			url: fullUrl,
			type: "article",
			images: [
				{
					url: content?.seoImage || content?.image || "/images/default-image.jpg",
					width: 1200,
					height: 630,
					alt: content?.title ?? "Default Image Alt",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			site: "@yourwebsite",
			title: content?.seoTitle ?? content?.title ?? "Default Title",
			description: content?.seoDescription ?? content?.description ?? "Default Description",
			images: [
				{
					url: content?.seoImage || content?.image || "/images/default-image.jpg",
					alt: content?.title ?? "Default Image Alt",
				},
			],
		},
		alternates: {
			canonical: fullUrl,
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
		const parsedSources = post.sources ? JSON.parse(post.sources as string) : null;
		return {
			...post,
			type: "post",
			sources: parsedSources,
		};
	}

	return null;
}

export default async function Page({ params }: { params: { slug: string[] } }) {
	const { slug, content } = await getContentAndSlug(params);

	if (!content) {
		notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: content?.title ?? "Default Title",
		description: content?.description ?? "Default Description",
		author: {
			"@type": "Person",
			name: content?.author ?? "Default Author",
		},
		datePublished: content?.date?.toISOString() ?? new Date().toISOString(),
		dateModified: content?.updatedAt?.toISOString() ?? new Date().toISOString(),
		image: content?.image || `${process.env.NEXT_PUBLIC_DOMAIN}/images/default-image.jpg`,
		url: `${process.env.NEXT_PUBLIC_DOMAIN}/${slug.join("/")}`,
		publisher: {
			"@type": "Organization",
			name: "Your Website",
			logo: {
				"@type": "ImageObject",
				url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${process.env.NEXT_PUBLIC_DOMAIN}/${slug.join("/")}`,
		},
		keywords: content?.keywords ?? "default, keywords",
	};

	return (
		<SidebarPage isAISummary={true}>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<Suspense fallback={<LoadingSkeleton />}>
				<div className="relative max-w-7xl mx-auto">
					<h1 className="text-3xl font-bold mb-4">{content.title}</h1>
					<article className="prose md:prose-lg dark:prose-invert mt-8 space-y-8 mb-10">
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
