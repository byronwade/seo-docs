import { pgTable, bigserial, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const contentTypes = pgTable('ContentType', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
});

export const pages = pgTable('Page', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  slug: varchar('slug', { length: 255 }).unique(),
  description: text('description'),
  author: varchar('author', { length: 255 }).notNull(),
  date: timestamp('date').defaultNow(),
  image: varchar('image', { length: 255 }),
  keywords: text('keywords').array(),
  seoTitle: varchar('seoTitle', { length: 255 }),
  seoDescription: text('seoDescription'),
  seoImage: varchar('seoImage', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').notNull(),
  contentTypeId: bigserial('contentTypeId', { mode: 'number' })
    .references(() => contentTypes.id),
  sources: jsonb('sources'),
});

export const posts = pgTable('Post', {
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  slug: varchar('slug', { length: 255 }).unique(),
  description: text('description'),
  author: varchar('author', { length: 255 }).notNull(),
  date: timestamp('date').defaultNow(),
  image: varchar('image', { length: 255 }),
  keywords: text('keywords').array(),
  seoTitle: varchar('seoTitle', { length: 255 }),
  seoDescription: text('seoDescription'),
  seoImage: varchar('seoImage', { length: 255 }),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('updatedAt').notNull(),
  contentTypeId: bigserial('contentTypeId', { mode: 'number' })
    .references(() => contentTypes.id),
  sources: jsonb('sources'),
});

// Relations
export const contentTypeRelations = relations(contentTypes, ({ many }) => ({
  pages: many(pages),
  posts: many(posts),
}));

export const pageRelations = relations(pages, ({ one }) => ({
  contentType: one(contentTypes, {
    fields: [pages.contentTypeId],
    references: [contentTypes.id],
  }),
}));

export const postRelations = relations(posts, ({ one }) => ({
  contentType: one(contentTypes, {
    fields: [posts.contentTypeId],
    references: [contentTypes.id],
  }),
}));

// Schemas
export const insertContentTypeSchema = createInsertSchema(contentTypes);
export const selectContentTypeSchema = createSelectSchema(contentTypes);

export const insertPageSchema = createInsertSchema(pages);
export const selectPageSchema = createSelectSchema(pages);

export const insertPostSchema = createInsertSchema(posts);
export const selectPostSchema = createSelectSchema(posts);

// Types
export type ContentType = typeof contentTypes.$inferSelect;
export type NewContentType = typeof contentTypes.$inferInsert;

export type Page = typeof pages.$inferSelect;
export type NewPage = typeof pages.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
