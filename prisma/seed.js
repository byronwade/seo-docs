import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	// Example MDX content
	const mdxContent = `
# Welcome to My Page

This is a **sample page** created with MDX content.

- List item 1
- List item 2

\`\`\`js
console.log('Hello, world!');
\`\`\`

Here is some [link](https://example.com) and more content.
  `;

	// Create or update a content type (if your schema requires it)
	const contentType = await prisma.contentType.upsert({
		where: { slug: "page" },
		update: {},
		create: {
			name: "Page",
			slug: "page",
		},
	});

	// Upsert a page with MDX content (updates if exists, creates if not)
	await prisma.page.upsert({
		where: { slug: "my-first-mdx-page" }, // Ensure slug is unique
		update: {
			title: "My First MDX Page - Updated",
			content: mdxContent,
			description: "This is an updated page created from a Prisma seed script.",
			author: "John Doe",
			image: "https://example.com/image.jpg",
			keywords: ["mdx", "prisma", "nextjs"],
			seoTitle: "My First MDX Page - Updated",
			seoDescription: "An updated sample page created with MDX content using Prisma.",
			contentTypeId: contentType.id,
		},
		create: {
			title: "My First MDX Page",
			content: mdxContent,
			slug: "my-first-mdx-page",
			description: "This is a page created from a Prisma seed script.",
			author: "John Doe",
			date: new Date(),
			image: "https://example.com/image.jpg",
			keywords: ["mdx", "prisma", "nextjs"],
			seoTitle: "My First MDX Page",
			seoDescription: "A sample page created with MDX content using Prisma.",
			contentTypeId: contentType.id,
		},
	});

	console.log("Seed data has been inserted or updated!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
