// app/actions.ts
"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// Content Type actions
export async function createContentType(data: { name: string; slug: string }) {
	const contentType = await prisma.contentType.create({ data });
	revalidatePath("/admin");
	return contentType;
}

export async function updateContentType(id: bigint, data: { name: string; slug: string }) {
	const contentType = await prisma.contentType.update({
		where: { id },
		data,
	});
	revalidatePath("/admin");
	return contentType;
}

export async function deleteContentType(id: bigint) {
	await prisma.contentType.delete({ where: { id } });
	revalidatePath("/admin");
}
// Page actions
export async function createPage(data: {
  title: string;
  slug: string;
  content: string;
  author: string;
  contentTypeId: string;
}) {
  try {
    const result = await prisma.page.create({
      data: {
        title: data.title,
				slug: data.slug,
				content: data.content,
				author: data.author,
				contentType: {
					connect: { id: parseInt(data.contentTypeId) },
				},
			},
		});
		return { success: true, data: result };
	} catch (error) {
		console.error("Error creating page:", error);
		return { error: "Failed to create page" };
	}
}

export async function updatePage(data: {
  id: string | number;
  title?: string;
  slug?: string;
  content?: string;
  author?: string;
  contentTypeId?: string | number;
  date?: string;
  [key: string]: unknown;
}) {
	if (!data || typeof data !== "object") {
		throw new Error("Invalid data provided to updatePage");
	}

	const { id, contentTypeId, date, ...restData } = data;

	if (!id) {
		throw new Error("Missing id for updatePage");
	}

	const updateData: unknown = {
		...restData,
		...(contentTypeId && { contentType: { connect: { id: BigInt(contentTypeId) } } }),
		...(date && { date: new Date(date) }),
	};

	const page = await prisma.page.update({
		where: { id: BigInt(id) },
		data: updateData as Prisma.PageUpdateInput,
		include: { contentType: true },
	});

	revalidatePath("/admin");
	return page;
}

export async function deletePage(id: bigint) {
	await prisma.page.delete({ where: { id } });
	revalidatePath("/admin");
}

// Post actions
export async function createPost(data: { title: string; content: string; slug?: string; description?: string; author: string; image?: string; keywords: string[]; seoTitle?: string; seoDescription?: string; seoImage?: string; contentTypeId: bigint }) {
	const post = await prisma.post.create({ data });
	revalidatePath("/admin");
	return post;
}

export async function updatePost(
	id: bigint,
	data: {
		title?: string;
		content?: string;
		slug?: string;
		description?: string;
		author?: string;
		image?: string;
		keywords?: string[];
		seoTitle?: string;
		seoDescription?: string;
		seoImage?: string;
		contentTypeId?: bigint;
	}
) {
	const post = await prisma.post.update({
		where: { id },
		data,
	});
	revalidatePath("/admin");
	return post;
}

export async function deletePost(id: bigint) {
	await prisma.post.delete({ where: { id } });
	revalidatePath("/admin");
}
