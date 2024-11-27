import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Star, DollarSign, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SidebarPage from "@/components/components-sidebar";

const BlogPage = () => {
	const seoTools = [
		{
			name: "Google Search Console",
			description: "Monitor and optimize your site's presence in Google Search results.",
			longDescription: "Google Search Console is a free tool that helps you monitor, maintain, and troubleshoot your site's presence in Google Search results. You can see how Google views your site, fix indexing problems, and request re-indexing of new or updated content.",
			url: "https://search.google.com/search-console",
			rating: 4.8,
			userRatings: 15243,
			category: "Analytics",
			image: "https://placehold.co/600x400",
			pricing: "Free",
			keyFeatures: ["Performance tracking", "Search analytics", "Index coverage", "Mobile usability"],
			connectedDate: "3 months ago",
			addedBy: "user@example.com",
			slug: "google-search-console",
		},
		{
			name: "SEMrush",
			description: "All-in-one tool suite for improving online visibility and marketing insights.",
			longDescription: "SEMrush is a comprehensive SEO tool that offers solutions for SEO, PPC, content, social media and competitive research. It provides insights about your website's ranking and offers suggestions to improve your SEO strategy.",
			url: "https://www.semrush.com/",
			rating: 4.7,
			userRatings: 12876,
			category: "Keyword Research",
			image: "https://placehold.co/600x400",
			pricing: "From $119.95/mo",
			keyFeatures: ["Keyword research", "Competitor analysis", "Site audit", "Rank tracking"],
			connectedDate: "1 month ago",
			addedBy: "admin@example.com",
			slug: "semrush",
		},
	];

	return (
		<SidebarPage noRightSidebar>
			<div className="min-h-screen px-4 sm:px-6 lg:px-8">
				<div className="mx-auto w-full">
					{seoTools.map((tool, index) => (
						<div key={index} className="flex flex-col gap-6 py-8 lg:py-12 border-b border-gray-200 last:border-b-0">
							<div className="flex flex-col lg:flex-row gap-6">
								<div className="lg:w-1/3 xl:w-1/4 flex flex-col">
									<h2 className="text-2xl font-bold mb-4">{tool.name}</h2>
									<p className="text-sm mb-4">{tool.description}</p>
									<Image src={tool.image} alt={`${tool.name} Cover`} width={600} height={400} className="border rounded-lg shadow w-full lg:w-80 mt-4 border-gray-200" />
								</div>
								<div className="lg:w-2/3 xl:w-3/4 flex flex-col gap-6">
									<div className="prose text-sm">
										<h3 className="mb-1 text-lg font-semibold">How does {tool.name} work?</h3>
										<p>{tool.longDescription}</p>
									</div>
									<Card className="overflow-hidden">
										<CardHeader className="bg-white border-b">
											<CardTitle className="flex items-center justify-between flex-wrap gap-2">
												<span className="text-lg font-semibold">{tool.name}</span>
												<Badge variant="secondary" className="text-xs">
													{tool.category}
												</Badge>
											</CardTitle>
										</CardHeader>
										<CardContent className="p-6">
											<div className="flex flex-col gap-4">
												<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
													<div className="flex items-center gap-2">
														<Image src="https://placehold.co/20x20" alt={tool.name} width={24} height={24} className="rounded" />
														<a href={tool.url} className="text-sm font-medium text-blue-600 hover:underline" target="_blank" rel="noreferrer">
															{tool.url}
														</a>
													</div>
													<div className="flex items-center gap-2 text-sm text-gray-500">
														<span>Connected {tool.connectedDate}</span>
														<span className="hidden sm:inline">•</span>
														<span>Added by {tool.addedBy}</span>
													</div>
												</div>
												<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
													{tool.keyFeatures.map((feature, i) => (
														<div key={i} className="flex items-center gap-2">
															<CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
															<span className="text-sm">{feature}</span>
														</div>
													))}
												</div>
												<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
													<div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
														<div className="flex items-center">
															<Star className="h-5 w-5 text-yellow-400 mr-1" />
															<span className="text-sm font-medium">{tool.rating}</span>
															<span className="text-xs text-gray-500 ml-1">({tool.userRatings.toLocaleString()} ratings)</span>
														</div>
														<TooltipProvider>
															<Tooltip>
																<TooltipTrigger>
																	<div className="flex items-center text-sm text-gray-600">
																		<DollarSign className="h-5 w-5 mr-1" />
																		{tool.pricing}
																	</div>
																</TooltipTrigger>
																<TooltipContent>
																	<p>Pricing information</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<div className="flex gap-2 w-full sm:w-auto">
														<Button asChild variant="outline" className="flex-1 sm:flex-initial">
															<a href={tool.url} target="_blank" rel="noreferrer" className="flex items-center justify-center">
																Visit Website
																<ExternalLink className="ml-2 h-4 w-4" />
															</a>
														</Button>
														<Button asChild variant="default" className="flex-1 sm:flex-initial">
															<Link prefetch={true} href={`/seo-tools/${tool.slug}`} className="flex items-center justify-center">
																View Details
																<ArrowRight className="ml-2 h-4 w-4" />
															</Link>
														</Button>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</SidebarPage>
	);
};

export default BlogPage;
