import { db } from "@/db";
import { contentTypes, pages } from "@/db/schema";

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

  // Create or update content type
  const [contentType] = await db.insert(contentTypes)
    .values({
      name: "Page",
      slug: "page",
    })
    .onConflictDoUpdate({
      target: contentTypes.slug,
      set: {
        name: "Page",
      },
    })
    .returning();

  // Create or update page
  await db.insert(pages)
    .values({
      title: "My First MDX Page",
      content: mdxContent,
      slug: "my-first-mdx-page",
      description: "This is a page created from a seed script.",
      author: "John Doe",
      date: new Date(),
      image: "https://example.com/image.jpg",
      keywords: ["mdx", "prisma", "nextjs"],
      seoTitle: "My First MDX Page",
      seoDescription: "A sample page created with MDX content using Drizzle.",
      contentTypeId: contentType.id,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: pages.slug,
      set: {
        title: "My First MDX Page - Updated",
        content: mdxContent,
        description: "This is an updated page created from a seed script.",
        author: "John Doe",
        image: "https://example.com/image.jpg",
        keywords: ["mdx", "prisma", "nextjs"],
        seoTitle: "My First MDX Page - Updated",
        seoDescription: "An updated sample page created with MDX content using Drizzle.",
        updatedAt: new Date(),
      },
    });

  console.log("Seed data has been inserted or updated!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });