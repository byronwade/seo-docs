import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Post {
	title: string;
	keywords: string[];
	slug: string;
	category: string;
}

interface RelatedContentProps {
	currentKeywords: string[];
}

const RelatedContent: React.FC<RelatedContentProps> = ({ currentKeywords }) => {
	// Function to load all MDX files from the content folder
	const getAllPosts = (): Post[] => {
		const postsDirectory = path.join(process.cwd(), "content");

		// Recursively find all directories containing page.mdx files
		const findAllPageFiles = (dir: string): string[] => {
			const entries = fs.readdirSync(dir, { withFileTypes: true });
			const mdxFiles = entries.filter((file) => file.isFile() && file.name === "page.mdx").map((file) => path.join(dir, file.name));

			const directories = entries.filter((file) => file.isDirectory());
			const directoryFiles = directories.flatMap((directory) => findAllPageFiles(path.join(dir, directory.name)));

			return [...mdxFiles, ...directoryFiles];
		};

		const filenames = findAllPageFiles(postsDirectory);

		// Parse all MDX files to extract frontmatter
		const posts: Post[] = filenames
			.map((filePath) => {
				const fileContents = fs.readFileSync(filePath, "utf-8");
				const { data } = matter(fileContents);
				const slug = filePath
					.replace(postsDirectory, "") // Remove base directory from path
					.replace("/page.mdx", "") // Remove 'page.mdx' from path
					.replace(/\\/g, "/"); // Normalize slashes for URLs

				return {
					title: data.title,
					keywords: data.keywords || [],
					slug: slug || "",
					category: data.category || "",
				};
			})
			.filter(Boolean); // Filter out invalid posts (if any)

		return posts;
	};

	// Filter posts based on matching keywords
	const findRelatedPosts = (): Post[] => {
		const allPosts = getAllPosts();

		// Find related posts based on shared keywords, excluding current post
		return allPosts.filter((post) => post.keywords.some((keyword) => currentKeywords.includes(keyword))).slice(0, 4); // Limit to 4 related posts
	};

	const relatedPosts = findRelatedPosts();

	if (relatedPosts.length === 0) {
		return null; // Don't render anything if there are no related posts
	}

	return (
		<section className="py-4">
			<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 !mt-0">Related Content</h2>
			<ul className="space-y-3">
				{relatedPosts.map((post) => (
					<li key={post.slug}>
						<Link href={post.slug} className="group flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
							<ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 mr-2" />
							<span className="text-sm font-medium">{post.title}</span>
							<span className="ml-2 text-xs text-gray-500">({post.category})</span>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default RelatedContent;
