import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const contentTypes = [
		{ name: "Documentation", slug: "docs" },
		{ name: "Blog", slug: "blog" },
		{ name: "News", slug: "news" },
		{ name: "Page", slug: "" },
	];

	for (const { name, slug } of contentTypes) {
		await prisma.contentType.upsert({
			where: { slug },
			update: {},
			create: {
				name,
				slug,
			},
		});
	}

	const page = await prisma.contentType.findUnique({
		where: { slug: "" },
	});

	await prisma.page.upsert({
		where: { slug: "/" },
		update: {},
		create: {
			slug: "/",
			contentTypeId: page.id,
			content: {
				raw: "# Welcome to my website!",
			},
		},
	});

	// Create fake pages for each content type
	for (const { name, slug } of contentTypes) {
		await prisma.page.upsert({
			where: { slug: `/${slug}/fake-page` },
			update: {},
			create: {
				slug: `fake-page`,
				contentTypeId: (await prisma.contentType.findUnique({ where: { slug } })).id,
				content: {
					raw: `# Fake ${name} Page`,
				},
			},
		});
	}

	// Create posts for Blog and News
	const [blog, news] = await Promise.all([prisma.contentType.findUnique({ where: { slug: "blog" } }), prisma.contentType.findUnique({ where: { slug: "news" } })]);

	await prisma.post.createMany({
		data: [
			{
				title: "My First Blog Post",
				contentTypeId: blog.id,
				content: {
					raw: "This is my first blog post!",
				},
			},
			{
				title: "Breaking News!",
				contentTypeId: news.id,
				content: {
					raw: "Something important happened!",
				},
			},
		],
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
