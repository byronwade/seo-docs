"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Globe, Wrench, BarChart, FileText, Video, Newspaper, MessageCircle, Landmark } from "lucide-react";

interface Source {
	authors: string;
	year?: number;
	title: string;
	publication?: string;
	url: string;
}

function categorizeSource(source: Source) {
	const lowerTitle = source.title.toLowerCase();
	const lowerPublication = (source.publication || "").toLowerCase();
	const lowerAuthors = source.authors.toLowerCase();
	const lowerUrl = source.url.toLowerCase();

	// Academic sources
	if (lowerPublication.includes("journal") || lowerTitle.includes("journal") || /\b(?:proceedings|conference|symposium|thesis|dissertation)\b/.test(lowerTitle) || /\b(?:university|institute|college|academia)\b/.test(lowerPublication) || /.edu\//.test(lowerUrl)) {
		return "Academic";
	}

	// Blogs & Articles
	const blogKeywords = ["blog", "article", "post", "guide", "tutorial", "how-to", "moz", "hubspot", "ahrefs", "yoast", "neil patel", "search engine journal", "sej", "content marketing institute", "backlinko", "wordstream", "medium.com"];
	if (blogKeywords.some((keyword) => lowerTitle.includes(keyword) || lowerPublication.includes(keyword) || lowerUrl.includes(keyword)) || /\b(?:tips|strategies|tactics|insights|overview|introduction)\b/.test(lowerTitle) || lowerPublication.includes("ai") || /\b(?:seo|marketing|digital|tech|ai|ml)\s+(?:guide|tips|strategies|trends)\b/.test(lowerTitle) || /\.(com|org|net)\/blog\//.test(lowerUrl)) {
		return "Blogs & Articles";
	}

	// Tools & Resources
	if (lowerTitle.includes("tool") || lowerTitle.includes("generator") || lowerTitle.includes("software") || lowerTitle.includes("platform") || lowerTitle.includes("app") || /\b(?:analyzer|checker|audit|framework|library|sdk|api)\b/.test(lowerTitle) || /\bgithub\.com\//.test(lowerUrl)) {
		return "Tools & Resources";
	}

	// Industry Reports & Studies
	if (/\b(?:report|study|survey|analysis|research|whitepaper|case study)\b/.test(lowerTitle) || /\b(?:trends|statistics|data|metrics|insights)\b/.test(lowerTitle) || lowerPublication.includes("research") || lowerAuthors.includes("research") || /\b(?:gartner|forrester|mckinsey|deloitte|pwc|kpmg)\b/.test(lowerPublication)) {
		return "Industry Reports & Studies";
	}

	// Official Documentation
	if (lowerTitle.includes("documentation") || lowerTitle.includes("official guide") || lowerTitle.includes("developer guide") || lowerPublication.includes("docs") || /\b(?:api|sdk)\s+(?:reference|guide)\b/.test(lowerTitle) || /\/docs\//.test(lowerUrl) || /\b(?:microsoft|google|apple|amazon|ibm)\.com\/.*(?:docs|guide)/.test(lowerUrl)) {
		return "Official Documentation";
	}

	// Video Content
	if (lowerTitle.includes("video") || lowerTitle.includes("youtube") || lowerTitle.includes("webinar") || lowerPublication.includes("youtube") || lowerPublication.includes("vimeo") || /(?:youtube\.com|youtu\.be|vimeo\.com)/.test(lowerUrl)) {
		return "Video Content";
	}

	// News & Press Releases
	if (/\b(?:news|press release|announcement|update)\b/.test(lowerTitle) || /\b(?:times|post|herald|guardian|bbc|cnn|reuters)\b/.test(lowerPublication) || /\/news\//.test(lowerUrl)) {
		return "News & Press Releases";
	}

	// Forums & Discussions
	if (/\b(?:forum|discussion|thread|community|q&a)\b/.test(lowerTitle) || /\b(?:reddit|quora|stack\s*overflow|hacker\s*news)\b/.test(lowerPublication) || /(?:reddit\.com|quora\.com|stackoverflow\.com|stackexchange\.com)/.test(lowerUrl)) {
		return "Forums & Discussions";
	}

	// Government & Organizations
	if (/\b(?:gov|government|organization|agency|institution)\b/.test(lowerPublication) || /.gov\//.test(lowerUrl) || /.org\//.test(lowerUrl)) {
		return "Government & Organizations";
	}

	return "Other";
}

const categoryIcons = {
	Academic: BookOpen,
	"Blogs & Articles": Globe,
	"Tools & Resources": Wrench,
	"Industry Reports & Studies": BarChart,
	"Official Documentation": FileText,
	"Video Content": Video,
	"News & Press Releases": Newspaper,
	"Forums & Discussions": MessageCircle,
	"Government & Organizations": Landmark,
	Other: Globe,
};

export function SourcesComponent({ sources }: { sources: Source[] }) {
	const categorizedSources = useMemo(() => {
		const categories: Record<string, Source[]> = {};
		sources.forEach((source) => {
			const category = categorizeSource(source);
			if (!categories[category]) {
				categories[category] = [];
			}
			categories[category].push(source);
		});
		return Object.entries(categories).map(([type, items]) => ({ type, items }));
	}, [sources]);

	// If there are no sources, return null (render nothing)
	if (!sources || sources.length === 0) {
		return null;
	}

	return (
		<Card className="w-full">
			<CardHeader className="pb-2">
				<CardTitle className="text-2xl font-bold">Sources</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{categorizedSources.map((category, index) => (
						<div key={index} className="space-y-2">
							<div className="flex items-center gap-2 text-lg font-semibold">
								{React.createElement(categoryIcons[category.type as keyof typeof categoryIcons] || Globe, { className: "h-5 w-5" })}
								<span>{category.type}</span>
							</div>
							<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
								{category.items.map((item, itemIndex) => (
									<li key={itemIndex} className="group">
										<a href={item.url} target="_blank" rel="noopener noreferrer" className="block p-2 rounded-lg transition-all duration-200 hover:bg-secondary">
											<div className="font-medium group-hover:text-primary transition-colors duration-200 text-sm">
												{item.authors} {item.year && `(${item.year})`}
											</div>
											<div className="text-xs text-muted-foreground mt-1">
												<em>{item.title}</em>
												{item.publication && `. ${item.publication}`}
											</div>
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
