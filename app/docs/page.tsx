import React from "react";
import SidebarPage from "@/components/components-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const BlogPage = () => {
	const features = [
		{ title: "Keyword Research", description: "Uncover high-value keywords to target in your content." },
		{ title: "On-Page Optimization", description: "Optimize your web pages for better search engine rankings." },
		{ title: "Link Building", description: "Build high-quality backlinks to boost your site's authority." },
		{ title: "Performance Tracking", description: "Monitor your SEO progress with detailed analytics and reports." },
	];

	const faqs = [
		{ question: "What is SEO?", answer: "SEO stands for Search Engine Optimization. It's the practice of optimizing your website to increase its visibility in search engine results pages." },
		{ question: "Why is SEO important?", answer: "SEO is crucial because it helps your website rank higher in search results, driving more organic traffic to your site and potentially increasing conversions and revenue." },
		{ question: "How long does SEO take to show results?", answer: "SEO is a long-term strategy. While some changes can show results in a few weeks, significant improvements typically take 3-6 months or longer, depending on various factors." },
	];
	return (
		<SidebarPage noRightSidebar isAISummary={false}>
			<div className="px-4 py-8">
				<h1 className="text-4xl font-bold mb-4 text-center">Boost Your Online Presence with Expert SEO Services</h1>
				<p className="text-xl text-center mb-8 text-muted-foreground">Improve your search rankings, drive more traffic, and grow your business with our comprehensive SEO solutions.</p>

				<div className="mb-12 text-center">
					<Image src="https://placehold.co/600x400" alt="SEO illustration showing a website ranking first in search results" width={600} height={400} className="rounded-lg mx-auto" />
				</div>

				<h2 className="text-2xl font-semibold mb-6">Our SEO Services</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
					{features.map((feature, index) => (
						<Card key={index} className="h-full">
							<CardContent className="p-6">
								<h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mb-12">
					<Button size="lg" className="text-lg px-8 py-6">
						Get Your Free SEO Audit
					</Button>
				</div>

				<h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
				<div className="space-y-6 mb-12">
					{faqs.map((faq, index) => (
						<div key={index}>
							<h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
							<p className="text-muted-foreground">{faq.answer}</p>
						</div>
					))}
				</div>

				<div className="border-t pt-8">
					<h2 className="text-2xl font-semibold mb-4">Explore Our SEO Resources</h2>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<Link href="/seo-guide" className="text-primary hover:underline">
								Comprehensive SEO Guide
							</Link>
						</li>
						<li>
							<Link href="/keyword-research-tools" className="text-primary hover:underline">
								Top Keyword Research Tools
							</Link>
						</li>
						<li>
							<Link href="/local-seo-tips" className="text-primary hover:underline">
								Local SEO Best Practices
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</SidebarPage>
	);
};

export default BlogPage;
