// app/actions.ts
"use server";

import { PrismaClient } from "@prisma/client";
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
export async function createPage(data: { title: string; content: string; slug?: string; description?: string; author: string; image?: string; keywords: string[]; seoTitle?: string; seoDescription?: string; seoImage?: string; contentTypeId: bigint }) {
	const page = await prisma.page.create({ data });
	revalidatePath("/admin");
	return page;
}

export async function updatePage(
	id: bigint,
	data: {
		title?: string;
		content?: string;
		slug?: string;
		description?: string;
		author?: string;
		image?: string | null;
		keywords?: string[];
		seoTitle?: string | null;
		seoDescription?: string | null;
		seoImage?: string | null;
		contentTypeId?: string | bigint;
		date?: Date | string;
	}
) {
	const { contentTypeId, date, ...restData } = data;

	const updateData: any = {
		...restData,
		...(contentTypeId && { contentType: { connect: { id: BigInt(contentTypeId) } } }),
		...(date && { date: new Date(date) }),
	};

	const page = await prisma.page.update({
		where: { id },
		data: updateData,
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
