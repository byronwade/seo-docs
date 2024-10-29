// app/actions.ts
"use server";

import { getDb } from '@/db';
import { revalidatePath } from 'next/cache';

export async function createContentType(data: FormData) {
  try {
    const db = await getDb();
    const contentType = await db.contentTypes.create({
      name: data.get('name') as string,
      slug: data.get('slug') as string,
    });
    
    revalidatePath('/admin');
    return { data: contentType };
  } catch (error) {
    return { error: 'Failed to create content type' };
  }
}
