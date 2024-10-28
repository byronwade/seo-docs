// app/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/db";
import { contentTypes, pages, posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { ContentType, Page, Post } from "@/db/schema";

// Schemas
const ContentTypeSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(1).max(255),
});

const PageSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  author: z.string().min(1).max(255),
  image: z.string().max(255).optional(),
  keywords: z.array(z.string()).optional(),
  seoTitle: z.string().max(255).optional(),
  seoDescription: z.string().optional(),
  seoImage: z.string().max(255).optional(),
  contentTypeId: z.number(),
});

const PostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  slug: z.string().min(1).max(255),
  description: z.string().optional(),
  author: z.string().min(1).max(255),
  image: z.string().max(255).optional(),
  keywords: z.array(z.string()).optional(),
  seoTitle: z.string().max(255).optional(),
  seoDescription: z.string().optional(),
  seoImage: z.string().max(255).optional(),
  contentTypeId: z.number(),
});

// Content Type actions
export const createContentType = createSafeAction(ContentTypeSchema, async (data) => {
  const [contentType] = await db.insert(contentTypes)
    .values(data)
    .returning();
  
  revalidatePath("/admin");
  return { contentType };
});

export const updateContentType = createSafeAction(
  ContentTypeSchema.extend({ id: z.number() }),
  async ({ id, ...data }) => {
    const [contentType] = await db.update(contentTypes)
      .set(data)
      .where(eq(contentTypes.id, id))
      .returning();

    revalidatePath("/admin");
    return { contentType };
  }
);

export const deleteContentType = createSafeAction(
  z.object({ id: z.number() }),
  async ({ id }) => {
    await db.delete(contentTypes)
      .where(eq(contentTypes.id, id));

    revalidatePath("/admin");
    return { success: true };
  }
);

// Page actions
export const createPage = createSafeAction(PageSchema, async (data) => {
  const [page] = await db.insert(pages)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  revalidatePath("/admin");
  return { page };
});

export const updatePage = createSafeAction(
  PageSchema.extend({ id: z.number() }),
  async ({ id, ...data }) => {
    const [page] = await db.update(pages)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(pages.id, id))
      .returning();

    revalidatePath("/admin");
    return { page };
  }
);

export const deletePage = createSafeAction(
  z.object({ id: z.number() }),
  async ({ id }) => {
    await db.delete(pages)
      .where(eq(pages.id, id));

    revalidatePath("/admin");
    return { success: true };
  }
);

// Post actions
export const createPost = createSafeAction(PostSchema, async (data) => {
  const [post] = await db.insert(posts)
    .values({
      ...data,
      updatedAt: new Date(),
    })
    .returning();

  revalidatePath("/admin");
  return { post };
});

export const updatePost = createSafeAction(
  PostSchema.extend({ id: z.number() }),
  async ({ id, ...data }) => {
    const [post] = await db.update(posts)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    revalidatePath("/admin");
    return { post };
  }
);

export const deletePost = createSafeAction(
  z.object({ id: z.number() }),
  async ({ id }) => {
    await db.delete(posts)
      .where(eq(posts.id, id));

    revalidatePath("/admin");
    return { success: true };
  }
);
