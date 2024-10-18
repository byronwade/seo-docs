"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SeoSettings() {
	const [title, setTitle] = useState("How to Optimize Your Website for Search Engines");
	const [content, setContent] = useState("Search Engine Optimization (SEO) is crucial for improving your website's visibility...");
	const [metaDescription, setMetaDescription] = useState("Learn effective SEO strategies to boost your website's search engine rankings and increase organic traffic.");
	const [slug, setSlug] = useState("how-to-optimize-website-for-seo");

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="w-56 flex-shrink-0 bg-dash-sidebar border-r border-default">
				<div className="border-default flex h-12 items-center border-b px-6">
					<h4 className="text-lg">Settings</h4>
				</div>
				<div className="flex-grow overflow-y-auto">
					<div className="flex flex-col space-y-8 overflow-y-auto">
						<nav role="menu" aria-label="Sidebar" aria-orientation="vertical" aria-labelledby="options-menu">
							<ul>
								<div className="my-6 space-y-8 border-b border-border-overlay pb-6">
									<div className="mx-3">
										<div className="flex space-x-3 mb-2 font-normal px-3">
											<span className="text-sm text-foreground-lighter w-full">
												<div className="flex flex-col space-y-2 uppercase font-mono">
													<span>SEO Settings</span>
												</div>
											</span>
										</div>
										<div>
											<Link href="#" className="block">
												<li role="menuitem" className="cursor-pointer flex space-x-3 items-center outline-none focus-visible:ring-1 ring-foreground-muted focus-visible:z-10 group px-3 py-1 font-semibold bg-surface-200 text-foreground-lighter z-10 rounded-md" aria-current="page">
													<span className="transition truncate text-sm w-full text-foreground font-semibold">
														<div className="flex w-full items-center justify-between gap-1">
															<div title="Page Content" className="flex items-center gap-2 truncate w-full">
																<span className="truncate">Page Content</span>
															</div>
														</div>
													</span>
												</li>
											</Link>
											<Link href="#" className="block">
												<li role="menuitem" className="cursor-pointer flex space-x-3 items-center outline-none focus-visible:ring-1 ring-foreground-muted focus-visible:z-10 group px-3 py-1 font-normal border-default group-hover:border-foreground-muted">
													<span className="transition truncate text-sm w-full text-foreground-light group-hover:text-foreground">
														<div className="flex w-full items-center justify-between gap-1">
															<div title="Meta Tags" className="flex items-center gap-2 truncate w-full">
																<span className="truncate">Meta Tags</span>
															</div>
														</div>
													</span>
												</li>
											</Link>
											<Link href="#" className="block">
												<li role="menuitem" className="cursor-pointer flex space-x-3 items-center outline-none focus-visible:ring-1 ring-foreground-muted focus-visible:z-10 group px-3 py-1 font-normal border-default group-hover:border-foreground-muted">
													<span className="transition truncate text-sm w-full text-foreground-light group-hover:text-foreground">
														<div className="flex w-full items-center justify-between gap-1">
															<div title="URL Structure" className="flex items-center gap-2 truncate w-full">
																<span className="truncate">URL Structure</span>
															</div>
														</div>
													</span>
												</li>
											</Link>
										</div>
									</div>
								</div>
								<div>
									<div className="my-6 space-y-8 border-b border-border-overlay pb-6">
										<div className="mx-3">
											<div className="flex space-x-3 mb-2 font-normal px-3">
												<span className="text-sm text-foreground-lighter w-full">
													<div className="flex flex-col space-y-2 uppercase font-mono">
														<span>Analytics</span>
													</div>
												</span>
											</div>
											<div>
												<Link href="#" className="block">
													<li role="menuitem" className="cursor-pointer flex space-x-3 items-center outline-none focus-visible:ring-1 ring-foreground-muted focus-visible:z-10 group px-3 py-1 font-normal border-default group-hover:border-foreground-muted">
														<span className="transition truncate text-sm w-full text-foreground-light group-hover:text-foreground">
															<div className="flex w-full items-center justify-between gap-1">
																<div title="Traffic Overview" className="flex items-center gap-2 truncate w-full">
																	<span className="truncate">Traffic Overview</span>
																</div>
															</div>
														</span>
													</li>
												</Link>
												<Link href="#" className="block">
													<li role="menuitem" className="cursor-pointer flex space-x-3 items-center outline-none focus-visible:ring-1 ring-foreground-muted focus-visible:z-10 group px-3 py-1 font-normal border-default group-hover:border-foreground-muted">
														<span className="transition truncate text-sm w-full text-foreground-light group-hover:text-foreground">
															<div className="flex w-full items-center justify-between gap-1">
																<div title="Search Performance" className="flex items-center gap-2 truncate w-full">
																	<span className="truncate">Search Performance</span>
																</div>
															</div>
														</span>
													</li>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</ul>
						</nav>
					</div>
				</div>
			</div>

			{/* Board to the right of the sidebar */}
			<div className="flex-1 flex overflow-hidden">
				<div className="flex-1 overflow-y-auto bg-gray-50">
					{/* Main content */}
					<main className="max-w-4xl mx-auto py-8 px-4">
						<h1 className="text-2xl font-bold mb-6">Edit SEO Content</h1>

						<Card className="mb-6 shadow-sm">
							<CardContent className="pt-6">
								<div className="space-y-4">
									<div>
										<Label htmlFor="title">Page Title</Label>
										<Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
									</div>
									<div>
										<Label htmlFor="slug">URL Slug</Label>
										<Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="mb-6 shadow-sm">
							<CardContent className="pt-6">
								<div className="flex justify-between items-center mb-2">
									<Label htmlFor="content">Content</Label>
									<Button variant="outline" size="sm" asChild>
										<Link href="/preview" target="_blank">
											Preview Content
										</Link>
									</Button>
								</div>
								<Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="w-full mt-2" />
							</CardContent>
						</Card>

						<Card className="mb-6 shadow-sm">
							<CardContent className="pt-6">
								<Label htmlFor="metaDescription">SEO Meta Description</Label>
								<Textarea id="metaDescription" value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} className="w-full mt-2" />
								<p className="text-sm text-muted-foreground mt-2">Recommended length: 150-160 characters. Current length: {metaDescription.length}</p>
							</CardContent>
						</Card>

						<div className="flex justify-between items-center mt-6">
							<Button variant="destructive">Delete Page</Button>
							<Button>Save Changes</Button>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
