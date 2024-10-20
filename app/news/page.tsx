import React from "react";
import SidebarPage from "@/components/components-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayCircle, Clock, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const BlogPage = () => {
	return (
		<SidebarPage noRightSidebar isAISummary={false}>
			<div className="min-h-screen">
				<main className="container mx-auto px-4 py-8">
					<h1 className="text-5xl font-bold tracking-tight mb-2">The Daily Chronicle</h1>
					<p className="text-xl text-muted-foreground mb-8">Bringing you the latest news, as it happens</p>

					<div className="grid gap-8">
						<section className="grid gap-8 md:grid-cols-[2fr_1fr]">
							<div className="space-y-4">
								<h2 className="text-3xl font-bold">Breaking News</h2>
								<div className="relative aspect-[16/9] rounded-lg overflow-hidden">
									<Image src="https://placehold.co/600x400" alt="Live coverage of breaking news event" fill className="object-cover" />
									<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
										<PlayCircle className="h-16 w-16 text-white" />
									</div>
								</div>
								<h3 className="text-2xl font-bold mt-4">Global Summit: World Leaders Convene to Address Climate Crisis</h3>
								<p className="text-lg text-muted-foreground">In an unprecedented gathering, heads of state from over 190 countries are meeting to discuss urgent measures to combat climate change and its far-reaching impacts.</p>
								<Button variant="link" className="p-0 h-auto text-primary">
									Read full story <ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</div>

							<div>
								<h2 className="text-3xl font-bold mb-4">Most Read</h2>
								<ol className="space-y-4">
									{["Global Economy on the Brink: Experts Warn of Impending Recession", "Space Exploration Milestone: First Human Steps on Mars", "Political Upheaval: Major Scandal Rocks Capital, Resignations Expected", "Environmental Crisis: Unprecedented Heatwave Sweeps Across Continents", "Sports Sensation: Underdog Team Clinches World Championship in Stunning Upset"].map((title, index) => (
										<li key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
											<Link href="#" className="group flex items-start">
												<span className="text-3xl font-bold text-primary mr-3">{index + 1}</span>
												<div>
													<h3 className="text-lg font-bold group-hover:text-primary transition-colors">{title}</h3>
													<p className="text-sm text-muted-foreground">Read by {(5 - index) * 100}K users</p>
												</div>
											</Link>
										</li>
									))}
								</ol>
							</div>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-6">Latest News</h2>
							<div className="grid md:grid-cols-2 gap-6">
								{[
									{
										title: "Tech Giant Unveils Groundbreaking AI Technology",
										excerpt: "A revolutionary artificial intelligence system promises to transform industries from healthcare to transportation.",
										category: "Technology",
										time: "30 minutes ago",
									},
									{
										title: "Economic Shockwaves: Global Markets React to Trade Tensions",
										excerpt: "Stock exchanges worldwide experience volatility as major economies engage in escalating trade disputes.",
										category: "Economy",
										time: "1 hour ago",
									},
									{
										title: "Medical Breakthrough: New Treatment Shows Promise in Cancer Trials",
										excerpt: "Researchers announce encouraging results from clinical trials of an innovative immunotherapy approach.",
										category: "Health",
										time: "2 hours ago",
									},
									{
										title: "Cultural Milestone: Ancient Artifacts Discovered in Remote Jungle",
										excerpt: "Archaeologists unearth remnants of a previously unknown civilization, potentially rewriting historical narratives.",
										category: "Culture",
										time: "3 hours ago",
									},
									{
										title: "Renewable Energy Surge: Solar Power Adoption Hits Record High",
										excerpt: "Global shift towards sustainable energy sources accelerates as solar technology becomes more affordable and efficient.",
										category: "Environment",
										time: "4 hours ago",
									},
									{
										title: "Cybersecurity Alert: Major Data Breach Affects Millions",
										excerpt: "Tech companies and government agencies scramble to address widespread security vulnerabilities.",
										category: "Technology",
										time: "5 hours ago",
									},
								].map((article, index) => (
									<div key={index} className={`pb-6 ${index < 4 ? "border-b border-gray-200" : ""}`}>
										<Link href="#" className="group">
											<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
											<p className="text-muted-foreground mb-2">{article.excerpt}</p>
											<div className="flex items-center justify-between text-sm">
												<span className="font-bold text-primary">{article.category}</span>
												<div className="flex items-center text-muted-foreground">
													<Clock className="h-4 w-4 mr-1" />
													<span>{article.time}</span>
												</div>
											</div>
										</Link>
									</div>
								))}
							</div>
						</section>

						<section>
							<h2 className="text-3xl font-bold mb-6">Related Articles</h2>
							<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
								{[
									{
										title: "The Future of Work: How AI is Reshaping Industries",
										excerpt: "An in-depth look at the transformative impact of artificial intelligence on various sectors and job markets.",
										image: "https://placehold.co/600x400",
										category: "Technology",
										date: "May 15, 2024",
									},
									{
										title: "Climate Change: The Race Against Time",
										excerpt: "Exploring the urgent efforts to mitigate global warming and its effects on ecosystems worldwide.",
										image: "https://placehold.co/600x400",
										category: "Environment",
										date: "May 14, 2024",
									},
									{
										title: "The Rise of Sustainable Fashion",
										excerpt: "How eco-conscious consumers are driving a revolution in the clothing industry towards ethical practices.",
										image: "https://placehold.co/600x400",
										category: "Lifestyle",
										date: "May 13, 2024",
									},
								].map((story, index) => (
									<Card key={index} className="overflow-hidden flex flex-col">
										<div className="relative h-48">
											<Image src={story.image} alt={story.title} fill className="object-cover" />
											<div className="absolute top-0 left-0 bg-primary text-primary-foreground px-2 py-1 m-2 text-xs font-bold rounded">{story.category}</div>
										</div>
										<CardHeader className="flex-grow">
											<CardTitle className="text-xl leading-tight">{story.title}</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground line-clamp-3">{story.excerpt}</p>
										</CardContent>
										<CardFooter className="flex justify-between items-center">
											<div className="flex items-center text-sm text-muted-foreground">
												<Calendar className="h-4 w-4 mr-1" />
												<span>{story.date}</span>
											</div>
											<Button variant="link" className="p-0 h-auto text-primary">
												Read more <ArrowRight className="ml-2 h-4 w-4" />
											</Button>
										</CardFooter>
									</Card>
								))}
							</div>
						</section>
					</div>
				</main>
			</div>
		</SidebarPage>
	);
};

export default BlogPage;
