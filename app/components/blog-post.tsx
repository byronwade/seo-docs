"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Clock, User, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Input } from "@/app/components/ui/input";

export function BlogPostComponent() {
	// This would typically come from your CMS or API
	const post = {
		title: "The Future of Artificial Intelligence: Trends and Implications",
		slug: "future-of-ai-trends-implications", // Add the slug property
		excerpt: "Explore the latest trends in AI and their potential impact on various industries.",
		featuredImage: "/placeholder.svg?height=1080&width=1920",
		author: {
			name: "Dr. Jane Smith",
			avatar: "/placeholder.svg?height=80&width=80",
			bio: "AI researcher and tech enthusiast",
		},
		date: "2023-05-15",
		modifiedDate: "2023-05-20",
		readingTime: "8 min read",
		content: `
      <h2>Introduction</h2>
      <p>Artificial Intelligence (AI) is rapidly evolving, reshaping industries and our daily lives. This post explores current trends and their implications.</p>
      
      <h2>1. Natural Language Processing Advancements</h2>
      <p>NLP is making significant strides, enabling more natural human-computer interactions and improving language translation capabilities.</p>
      
      <h2>2. AI in Healthcare</h2>
      <p>AI is revolutionizing healthcare through improved diagnostics, personalized treatment plans, and drug discovery acceleration.</p>
      
      <h2>3. Ethical AI and Bias Mitigation</h2>
      <p>As AI becomes more prevalent, addressing ethical concerns and mitigating biases in AI systems is crucial for responsible development.</p>
      
      <h2>Conclusion</h2>
      <p>The future of AI is bright, with immense potential to solve complex problems and improve our quality of life. However, it's essential to navigate this future thoughtfully and ethically.</p>
    `,
		tags: ["Artificial Intelligence", "Technology", "Future Trends"],
		relatedPosts: [
			{
				title: "Machine Learning Basics Explained",
				slug: "machine-learning-basics",
				excerpt: "A comprehensive guide to understanding the fundamentals of machine learning.",
				image: "/placeholder.svg?height=200&width=300",
				date: "2023-04-20",
				readingTime: "10 min read",
			},
			{
				title: "The Role of AI in Climate Change Mitigation",
				slug: "ai-climate-change",
				excerpt: "Exploring how AI technologies are being leveraged to combat climate change.",
				image: "/placeholder.svg?height=200&width=300",
				date: "2023-05-05",
				readingTime: "12 min read",
			},
			{
				title: "Ethical Considerations in AI Development",
				slug: "ethical-ai-development",
				excerpt: "Discussing the ethical challenges and considerations in AI development and deployment.",
				image: "/placeholder.svg?height=200&width=300",
				date: "2023-05-10",
				readingTime: "15 min read",
			},
		],
		comments: [
			{ user: "TechEnthusiast", content: "Great article! I'm particularly interested in the ethical implications of AI.", date: "2023-05-16" },
			{ user: "AIResearcher", content: "The advancements in NLP are truly remarkable. I'd love to see more on this topic.", date: "2023-05-17" },
		],
	};

	return (
		<>
			<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<header className="mb-12">
					<nav className="text-sm mb-6" aria-label="Breadcrumb">
						<ol className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-hide touch-pan-x py-2">
							<li className="flex items-center">
								<Link href="/" className="text-primary hover:text-primary-hover transition-colors">
									Home
								</Link>
							</li>
							<li className="flex items-center">
								<ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
								<Link href="/blog" className="text-primary hover:text-primary-hover transition-colors">
									Blog
								</Link>
							</li>
							<li className="flex items-center">
								<ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
								<span className="text-muted-foreground truncate max-w-[200px]" title={post.title}>
									{post.title}
								</span>
							</li>
						</ol>
					</nav>

					<h1 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">{post.title}</h1>

					<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
						<span className="flex items-center">
							<Clock className="w-4 h-4 mr-1" aria-hidden="true" />
							<span>{post.readingTime}</span>
						</span>
						<span className="flex items-center">
							<User className="w-4 h-4 mr-1" aria-hidden="true" />
							<span>{post.author.name}</span>
						</span>
						<span className="flex items-center">
							<time dateTime={post.date} className="text-muted-foreground">
								{new Date(post.date).toLocaleDateString()}
							</time>
						</span>
					</div>

					<p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>
				</header>

				<div className="relative w-full aspect-video mb-8">
					<Image src={post.featuredImage} alt={post.title} fill className="object-cover rounded-lg" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority />
				</div>

				<div className="lg:flex lg:gap-8">
					<main className="lg:w-2/3">
						<div className="prose prose-primary max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

						<section className="mb-12">
							<h2 className="text-2xl font-bold mb-4">Tags</h2>
							<div className="flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<Link key={tag} href={`/tag/${tag.toLowerCase().replace(" ", "-")}`} className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
										{tag}
									</Link>
								))}
							</div>
						</section>

						<section className="mb-12">
							<h2 className="text-2xl font-bold mb-4">About the Author</h2>
							<Card>
								<CardContent className="flex items-center space-x-4 p-6">
									<Avatar className="w-16 h-16">
										<AvatarImage src={post.author.avatar} alt={post.author.name} />
										<AvatarFallback>
											{post.author.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="font-semibold text-lg">{post.author.name}</h3>
										<p className="text-muted-foreground">{post.author.bio}</p>
									</div>
								</CardContent>
							</Card>
						</section>

						<section className="mb-12">
							<h2 className="text-2xl font-bold mb-4">Share this post</h2>
							<div className="flex space-x-2">
								<Button variant="outline" size="icon" className="w-12 h-12">
									<Facebook className="w-6 h-6" />
									<span className="sr-only">Share on Facebook</span>
								</Button>
								<Button variant="outline" size="icon" className="w-12 h-12">
									<Twitter className="w-6 h-6" />
									<span className="sr-only">Share on Twitter</span>
								</Button>
								<Button variant="outline" size="icon" className="w-12 h-12">
									<Linkedin className="w-6 h-6" />
									<span className="sr-only">Share on LinkedIn</span>
								</Button>
							</div>
						</section>

						<section className="mb-12">
							<h2 className="text-2xl font-bold mb-4">Comments</h2>
							{post.comments.map((comment, index) => (
								<Card key={index} className="mb-4">
									<CardContent className="p-4">
										<div className="flex items-center justify-between mb-2">
											<span className="font-semibold">{comment.user}</span>
											<time className="text-sm text-muted-foreground" dateTime={comment.date}>
												{new Date(comment.date).toLocaleDateString()}
											</time>
										</div>
										<p>{comment.content}</p>
									</CardContent>
								</Card>
							))}
							<form className="mt-6">
								<label htmlFor="comment" className="block text-sm font-medium text-muted-foreground mb-2">
									Leave a comment
								</label>
								<textarea id="comment" className="w-full p-2 border rounded-md mb-2" rows={3} placeholder="Your comment..."></textarea>
								<Button type="submit">Post Comment</Button>
							</form>
						</section>
					</main>

					<aside className="lg:w-1/3 space-y-8">
						<section>
							<h2 className="text-2xl font-bold mb-4">Subscribe to our newsletter</h2>
							<Card>
								<CardContent className="p-6">
									<p className="text-muted-foreground mb-4">Stay updated with our latest articles and news.</p>
									<form className="space-y-2">
										<Input type="email" placeholder="Your email address" />
										<Button type="submit" className="w-full">
											Subscribe
										</Button>
									</form>
								</CardContent>
							</Card>
						</section>

						<section>
							<h2 className="text-2xl font-bold mb-4">Related Posts</h2>
							<div className="space-y-6">
								{post.relatedPosts.map((relatedPost, index) => (
									<Card key={index} className="overflow-hidden">
										<div className="relative h-48">
											<Image src={relatedPost.image} alt={relatedPost.title} fill className="object-cover" />
										</div>
										<CardContent className="p-4">
											<h3 className="font-semibold text-lg mb-2 line-clamp-2">
												<Link href={`/blog/${relatedPost.slug}`} className="text-primary hover:underline">
													{relatedPost.title}
												</Link>
											</h3>
											<p className="text-sm text-muted-foreground mb-4 line-clamp-2">{relatedPost.excerpt}</p>
											<div className="flex justify-between items-center text-sm text-muted-foreground">
												<time dateTime={relatedPost.date}>{new Date(relatedPost.date).toLocaleDateString()}</time>
												<span>{relatedPost.readingTime}</span>
											</div>
										</CardContent>
										<CardFooter className="p-4 pt-0">
											<Button variant="link" className="p-0 h-auto font-semibold" asChild>
												<Link href={`/blog/${relatedPost.slug}`}>
													Read More <ArrowRight className="ml-2 h-4 w-4" />
												</Link>
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						</section>
					</aside>
				</div>
			</article>
		</>
	);
}
