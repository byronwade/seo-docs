// import { MetadataRoute } from 'next';
// import { promises as fs } from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

// const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

// async function getPages(dir: string): Promise<MetadataRoute.Sitemap> {
//   const entries = await fs.readdir(dir, { withFileTypes: true });
//   let pages: MetadataRoute.Sitemap = [];

//   for (const entry of entries) {
//     const fullPath = path.join(dir, entry.name);
//     if (entry.isDirectory()) {
//       pages = pages.concat(await getPages(fullPath));
//     } else if (entry.name === 'page.mdx') {
//       const content = await fs.readFile(fullPath, 'utf-8');
//       const { data } = matter(content);
//       const relativePath = path.relative(path.join(process.cwd(), 'content'), dir);
//       const url = `${DOMAIN}/${relativePath}`;

//       pages.push({
//         url,
//         lastModified: data.date || new Date().toISOString(),
//         changeFrequency: 'weekly',
//         priority: 0.7,
//       } as MetadataRoute.Sitemap[number]);
//     }
//   }

//   return pages;
// }

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const contentDir = path.join(process.cwd(), 'content');
//   const pages = await getPages(contentDir);

//   // Add the home page
//   pages.unshift({
//     url: DOMAIN || '',
//     lastModified: new Date().toISOString(),
//     changeFrequency: 'daily',
//     priority: 1,
//   });

//   return pages;
// }

export default function sitemap() {
	return [];
}
