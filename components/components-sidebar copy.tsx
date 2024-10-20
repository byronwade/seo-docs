"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Bell, ChartBar, BookOpen, Bot, ChevronRight, Folder, Frame, LifeBuoy, Map, MoreHorizontal, PieChart, Send, Settings2, Share, SquareTerminal, Trash2, MapPin, ShoppingCart, TrendingUp, Zap, Smartphone, Globe, Briefcase, CheckCircle, Aperture, FileText, Link as LinkIcon, Copy, CornerUpRight, CornerUpLeft, LineChart, GalleryVerticalEnd, Trash, ArrowUp, ArrowDown, BookmarkMinus, Facebook, Twitter, Linkedin, Instagram, ExternalLink, Home, Newspaper, ScrollText } from "lucide-react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";
import { HeartFilledIcon } from "@radix-ui/react-icons";

const data = {
	navMain: [
		{
			title: "On-Page SEO",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Content Optimization",
					url: "#",
					items: [
						{
							title: "Keyword Research",
							url: "#",
							items: [
								{
									title: "Long-Tail Keywords",
									url: "#",
								},
								{
									title: "Latent Semantic Indexing (LSI)",
									url: "#",
								},
								{
									title: "Primary vs. Secondary Keywords",
									url: "#",
								},
							],
						},
						{
							title: "Content Quality",
							url: "#",
							items: [
								{
									title: "E-A-T (Expertise, Authority, Trustworthiness)",
									url: "#",
								},
								{
									title: "Avoiding Thin Content",
									url: "#",
								},
								{
									title: "Content Freshness",
									url: "#",
								},
							],
						},
						{
							title: "User Engagement Signals",
							url: "#",
							items: [
								{
									title: "Bounce Rate Optimization",
									url: "#",
								},
								{
									title: "Improving Time on Page",
									url: "#",
								},
								{
									title: "Scroll Depth Analysis",
									url: "#",
								},
							],
						},
						{
							title: "Content Structure",
							url: "#",
							items: [
								{
									title: "Using Headings (H1, H2, H3)",
									url: "#",
								},
								{
									title: "Bullet Points and Lists",
									url: "#",
								},
								{
									title: "Internal Linking Strategy",
									url: "#",
								},
							],
						},
						{
							title: "Rich Snippets",
							url: "#",
							items: [
								{
									title: "Schema Markup Implementation",
									url: "#",
								},
								{
									title: "Featured Snippets",
									url: "#",
								},
								{
									title: "People Also Ask Boxes",
									url: "#",
								},
							],
						},
						{
							title: "Optimizing Images",
							url: "#",
							items: [
								{
									title: "Alt Text Best Practices",
									url: "#",
								},
								{
									title: "Image Compression",
									url: "#",
								},
								{
									title: "Using WebP Format",
									url: "#",
								},
							],
						},
						{
							title: "Multimedia Integration",
							url: "#",
							items: [
								{
									title: "Video SEO",
									url: "#",
								},
								{
									title: "Embedding Interactive Elements",
									url: "#",
								},
								{
									title: "Podcast SEO",
									url: "#",
								},
							],
						},
					],
				},
				{
					title: "URL Structure",
					url: "#",
					items: [
						{
							title: "SEO-Friendly URLs",
							url: "#",
							items: [
								{
									title: "Keyword Usage in URLs",
									url: "#",
								},
								{
									title: "Avoiding URL Parameters",
									url: "#",
								},
								{
									title: "Subfolders vs. Subdomains",
									url: "#",
								},
							],
						},
						{
							title: "Canonical Tags",
							url: "#",
							items: [
								{
									title: "Avoiding Duplicate Content",
									url: "#",
								},
								{
									title: "Cross-Domain Canonicals",
									url: "#",
								},
							],
						},
						{
							title: "Breadcrumb Navigation",
							url: "#",
							items: [
								{
									title: "SEO Benefits of Breadcrumbs",
									url: "#",
								},
								{
									title: "Structured Data for Breadcrumbs",
									url: "#",
								},
							],
						},
					],
				},
			],
		},
		{
			title: "Off-Page SEO",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Link Building",
					url: "#",
					items: [
						{
							title: "Backlink Quality",
							url: "#",
							items: [
								{
									title: "Domain Authority",
									url: "#",
								},
								{
									title: "Relevance of Linking Page",
									url: "#",
								},
							],
						},
						{
							title: "Link Earning Techniques",
							url: "#",
							items: [
								{
									title: "Guest Blogging",
									url: "#",
								},
								{
									title: "Broken Link Building",
									url: "#",
								},
								{
									title: "Skyscraper Technique",
									url: "#",
								},
							],
						},
						{
							title: "Link Disavowal",
							url: "#",
							items: [
								{
									title: "Using Google's Disavow Tool",
									url: "#",
								},
								{
									title: "When to Disavow Links",
									url: "#",
								},
							],
						},
					],
				},
				{
					title: "Social Media Signals",
					url: "#",
					items: [
						{
							title: "Impact of Social Shares",
							url: "#",
						},
						{
							title: "Building a Social Media Following",
							url: "#",
						},
						{
							title: "Social Bookmarking",
							url: "#",
						},
					],
				},
				{
					title: "Brand Mentions",
					url: "#",
					items: [
						{
							title: "Unlinked Brand Mentions",
							url: "#",
						},
						{
							title: "Monitoring Brand Reputation",
							url: "#",
						},
						{
							title: "Tools for Tracking Brand Mentions",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "Technical SEO",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Site Architecture",
					url: "#",
					items: [
						{
							title: "Sitemap Optimization",
							url: "#",
						},
						{
							title: "Crawl Depth",
							url: "#",
						},
						{
							title: "Internal Linking",
							url: "#",
						},
					],
				},
				{
					title: "Core Web Vitals",
					url: "#",
					items: [
						{
							title: "Largest Contentful Paint (LCP)",
							url: "#",
						},
						{
							title: "First Input Delay (FID)",
							url: "#",
						},
						{
							title: "Cumulative Layout Shift (CLS)",
							url: "#",
						},
					],
				},
				{
					title: "Crawl Budget Optimization",
					url: "#",
					items: [
						{
							title: "Googlebot Behavior",
							url: "#",
						},
						{
							title: "Managing Crawl Errors",
							url: "#",
						},
						{
							title: "Index Bloat",
							url: "#",
						},
					],
				},
				{
					title: "Technical Site Issues",
					url: "#",
					items: [
						{
							title: "Handling 404 Errors",
							url: "#",
						},
						{
							title: "Fixing 500 Errors",
							url: "#",
						},
						{
							title: "Redirect Chains and Loops",
							url: "#",
						},
					],
				},
				{
					title: "JavaScript SEO",
					url: "#",
					items: [
						{
							title: "Handling Client-Side Rendering",
							url: "#",
						},
						{
							title: "Pre-Rendering for SEO",
							url: "#",
						},
						{
							title: "Lazy Loading Implementation",
							url: "#",
						},
					],
				},
				{
					title: "Structured Data",
					url: "#",
					items: [
						{
							title: "Types of Structured Data",
							url: "#",
						},
						{
							title: "JSON-LD Implementation",
							url: "#",
						},
						{
							title: "Testing Structured Data",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "SEO Analytics",
			url: "#",
			icon: ChartBar,
			items: [
				{
					title: "Google Analytics",
					url: "#",
					items: [
						{
							title: "Setting Up Goals and Conversions",
							url: "#",
						},
						{
							title: "Tracking User Behavior",
							url: "#",
						},
						{
							title: "Event Tracking",
							url: "#",
						},
					],
				},
				{
					title: "Google Search Console",
					url: "#",
					items: [
						{
							title: "Monitoring Search Queries",
							url: "#",
						},
						{
							title: "Fixing Coverage Issues",
							url: "#",
						},
						{
							title: "Checking Mobile Usability",
							url: "#",
						},
					],
				},
				{
					title: "Conversion Rate Optimization (CRO)",
					url: "#",
					items: [
						{
							title: "A/B Testing for SEO",
							url: "#",
						},
						{
							title: "Improving Call-to-Action (CTA)",
							url: "#",
						},
						{
							title: "Heatmap Analysis",
							url: "#",
						},
					],
				},
				{
					title: "Attribution Modeling",
					url: "#",
					items: [
						{
							title: "Multi-Touch Attribution",
							url: "#",
						},
						{
							title: "First-Touch Attribution",
							url: "#",
						},
						{
							title: "Last-Touch Attribution",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "Local SEO",
			url: "#",
			icon: MapPin,
			items: [
				{
					title: "Google My Business Optimization",
					url: "#",
					items: [
						{
							title: "Claiming Your GMB Profile",
							url: "#",
						},
						{
							title: "Optimizing GMB Listings",
							url: "#",
						},
						{
							title: "Responding to Reviews",
							url: "#",
						},
					],
				},
				{
					title: "Local Citations",
					url: "#",
					items: [
						{
							title: "Building Consistent NAP Information",
							url: "#",
						},
						{
							title: "Local Business Directories",
							url: "#",
						},
					],
				},
				{
					title: "Local Content Optimization",
					url: "#",
					items: [
						{
							title: "Creating Hyperlocal Content",
							url: "#",
						},
						{
							title: "Local Keyword Research",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "E-commerce SEO",
			url: "#",
			icon: ShoppingCart,
			items: [
				{
					title: "Product Page Optimization",
					url: "#",
					items: [
						{
							title: "Using Rich Snippets for Products",
							url: "#",
						},
						{
							title: "Optimizing Product Descriptions",
							url: "#",
						},
						{
							title: "Image Optimization for E-commerce",
							url: "#",
						},
					],
				},
				{
					title: "Technical E-commerce SEO",
					url: "#",
					items: [
						{
							title: "Managing Duplicate Content Issues",
							url: "#",
						},
						{
							title: "Faceted Navigation SEO",
							url: "#",
						},
						{
							title: "Handling Out-of-Stock Products",
							url: "#",
						},
					],
				},
				{
					title: "SEO for E-commerce Platforms",
					url: "#",
					items: [
						{
							title: "SEO for Shopify",
							url: "#",
						},
						{
							title: "SEO for WooCommerce",
							url: "#",
						},
						{
							title: "SEO for Magento",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "SEO Trends",
			url: "#",
			icon: TrendingUp,
			items: [
				{
					title: "Voice Search Optimization",
					url: "#",
					items: [
						{
							title: "Long-Tail Keyword Strategies for Voice",
							url: "#",
						},
						{
							title: "Conversational Content",
							url: "#",
						},
					],
				},
				{
					title: "AI and SEO",
					url: "#",
					items: [
						{
							title: "Using AI for Content Generation",
							url: "#",
						},
						{
							title: "AI for Predictive Analytics",
							url: "#",
						},
					],
				},
				{
					title: "Visual Search",
					url: "#",
					items: [
						{
							title: "Optimizing for Google Lens",
							url: "#",
						},
						{
							title: "Pinterest Visual Search",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "SEO Techniques",
			url: "#",
			icon: Zap,
			items: [
				{
					title: "Advanced Schema Markup",
					url: "#",
					items: [
						{
							title: "Rich Snippets vs. Rich Results",
							url: "#",
						},
						{
							title: "Structured Data for Articles",
							url: "#",
						},
					],
				},
				{
					title: "Entity-Based SEO",
					url: "#",
					items: [
						{
							title: "Understanding Entity-Based Indexing",
							url: "#",
						},
						{
							title: "Using Entities for Content Optimization",
							url: "#",
						},
					],
				},
				{
					title: "Edge SEO",
					url: "#",
					items: [
						{
							title: "Server-Side Rendering for SEO",
							url: "#",
						},
						{
							title: "Leveraging CDN for Performance",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "Mobile SEO",
			url: "#",
			icon: Smartphone,
			items: [
				{
					title: "Mobile User Experience",
					url: "#",
					items: [
						{
							title: "Optimizing Mobile Load Times",
							url: "#",
						},
						{
							title: "Mobile Navigation Best Practices",
							url: "#",
						},
					],
				},
				{
					title: "Accelerated Mobile Pages (AMP)",
					url: "#",
					items: [
						{
							title: "Implementing AMP",
							url: "#",
						},
						{
							title: "AMP for E-commerce",
							url: "#",
						},
					],
				},
				{
					title: "Google's Mobile Usability Reports",
					url: "#",
				},
			],
		},
		{
			title: "SEO for International",
			url: "#",
			icon: Globe,
			items: [
				{
					title: "Hreflang Tags",
					url: "#",
					items: [
						{
							title: "Implementing Hreflang for Multilingual Sites",
							url: "#",
						},
						{
							title: "Avoiding Common Hreflang Mistakes",
							url: "#",
						},
					],
				},
				{
					title: "Geotargeting",
					url: "#",
					items: [
						{
							title: "Using Google Search Console for Geotargeting",
							url: "#",
						},
						{
							title: "Country-Specific Content Optimization",
							url: "#",
						},
					],
				},
				{
					title: "Cultural Differences in SEO",
					url: "#",
				},
				{
					title: "Global Keyword Research",
					url: "#",
				},
			],
		},
		{
			title: "SEO for Industries",
			url: "#",
			icon: Briefcase,
			items: [
				{
					title: "Healthcare SEO",
					url: "#",
					items: [
						{
							title: "Local SEO for Medical Practices",
							url: "#",
						},
						{
							title: "Content Marketing for Health-Related Topics",
							url: "#",
						},
					],
				},
				{
					title: "Real Estate SEO",
					url: "#",
					items: [
						{
							title: "Optimizing Listings for Local Search",
							url: "#",
						},
						{
							title: "Using Virtual Tours for SEO",
							url: "#",
						},
					],
				},
				{
					title: "SaaS SEO",
					url: "#",
					items: [
						{
							title: "SEO for Subscription Models",
							url: "#",
						},
						{
							title: "Content Marketing for Software",
							url: "#",
						},
					],
				},
				{
					title: "Restaurant SEO",
					url: "#",
					items: [
						{
							title: "Local SEO for Restaurants",
							url: "#",
						},
						{
							title: "Using Online Reviews for SEO",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "SEO Audits",
			url: "#",
			icon: CheckCircle,
			items: [
				{
					title: "Comprehensive SEO Audits",
					url: "#",
					items: [
						{
							title: "Checklist for Full Site Audit",
							url: "#",
						},
						{
							title: "Tools for SEO Auditing",
							url: "#",
						},
					],
				},
				{
					title: "Competitor SEO Audits",
					url: "#",
					items: [
						{
							title: "Identifying Competitor Strategies",
							url: "#",
						},
						{
							title: "Benchmarking Against Competitors",
							url: "#",
						},
					],
				},
				{
					title: "Content Audits",
					url: "#",
					items: [
						{
							title: "Finding Thin Content",
							url: "#",
						},
						{
							title: "Updating Outdated Content",
							url: "#",
						},
					],
				},
			],
		},
		{
			title: "SEO for Platforms",
			url: "#",
			icon: Aperture,
			items: [
				{
					title: "SEO for Video Content",
					url: "#",
					items: [
						{
							title: "Optimizing Video Metadata",
							url: "#",
						},
						{
							title: "Using YouTube for SEO",
							url: "#",
						},
					],
				},
				{
					title: "SEO for Podcasts",
					url: "#",
					items: [
						{
							title: "Optimizing Show Notes",
							url: "#",
						},
						{
							title: "Using Transcripts for SEO",
							url: "#",
						},
					],
				},
				{
					title: "SEO for Voice Assistants",
					url: "#",
					items: [
						{
							title: "Optimizing for Alexa Skills",
							url: "#",
						},
						{
							title: "Using Structured Data for Voice",
							url: "#",
						},
					],
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Changelogs",
			url: "#",
			icon: ScrollText,
		},
		{
			title: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			title: "Feedback",
			url: "#",
			icon: Send,
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
	],
	main: [
		{
			name: "Home",
			url: "/",
			icon: Home,
		},
		{
			name: "Docs",
			url: "/docs",
			icon: FileText,
		},
		{
			name: "News",
			url: "/news",
			icon: Newspaper,
		},
	],
};

export default function SidebarPage({ children }: { children: React.ReactNode }) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			toast({
				title: "Link copied to clipboard",
				description: "You can now paste the link anywhere.",
			});
		});
	};

	return (
		<SidebarProvider
			style={{
				"--sidebar-width": "20rem",
			}}
		>
			<Sidebar variant="inset" collapsible="icon">
				<SidebarHeader>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" asChild>
								<Link href="/">
									<Image src="/seo-icon.svg" alt="Logo" width={32} height={32} className="size-12" />
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-semibold">SEO Docs</span>
										<span className="truncate text-xs">by Byron Wade</span>
									</div>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup className="group-data-[collapsible=icon]:hidden">
						<SidebarGroupLabel>Navigation</SidebarGroupLabel>
						<SidebarMenu>
							{data.main.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.name}</span>
										</a>
									</SidebarMenuButton>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<SidebarMenuAction showOnHover>
												<MoreHorizontal />
												<span className="sr-only">More</span>
											</SidebarMenuAction>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-48" side="bottom" align="end">
											<DropdownMenuItem>
												<Folder className="text-muted-foreground mr-2 h-4 w-4" />
												<span>View Project</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Share className="text-muted-foreground mr-2 h-4 w-4" />
												<span>Share Project</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Trash2 className="text-muted-foreground mr-2 h-4 w-4" />
												<span>Delete Project</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup className="group-data-[collapsible=icon]:hidden">
						<SidebarGroupLabel>Platform</SidebarGroupLabel>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<TreeItem key={item.title} item={item} />
							))}
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup className="group-data-[collapsible=icon]:hidden">
						<SidebarGroupLabel>Projects</SidebarGroupLabel>
						<SidebarMenu>
							{data.projects.map((item) => (
								<SidebarMenuItem key={item.name}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.name}</span>
										</a>
									</SidebarMenuButton>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<SidebarMenuAction showOnHover>
												<MoreHorizontal />
												<span className="sr-only">More</span>
											</SidebarMenuAction>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-48" side="bottom" align="end">
											<DropdownMenuItem>
												<Folder className="text-muted-foreground mr-2 h-4 w-4" />
												<span>View Project</span>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Share className="text-muted-foreground mr-2 h-4 w-4" />
												<span>Share Project</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Trash2 className="text-muted-foreground mr-2 h-4 w-4" />
												<span>Delete Project</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</SidebarMenuItem>
							))}
							<SidebarMenuItem>
								<SidebarMenuButton>
									<MoreHorizontal />
									<span>More</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup className="mt-auto">
						<SidebarGroupContent>
							<SidebarMenu>
								{data.navSecondary.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild size="sm">
											<a href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				<SidebarFooter>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton size="lg" className="bg-gray-100" asChild>
								<a href="#donate" className="w-full flex items-center">
									<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-pink-200">
										<HeartFilledIcon className="size-4 text-pink-500" />
									</div>
									<span className="flex-1 text-left font-semibold">Donate</span>
									<ExternalLink className="ml-2 size-4" />
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</Sidebar>
			<SidebarInset>
				<header className={`flex h-14 shrink-0 items-center gap-2 transition-all duration-300 ${isScrolled ? "sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm" : ""}`}>
					<div className="flex flex-1 items-center gap-2 px-3">
						<SidebarTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7" />
						<Separator orientation="vertical" className="shrink-0 bg-border w-[1px] mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
								<BreadcrumbItem>
									<BreadcrumbPage className="font-normal text-foreground line-clamp-1">Project Management & Task Tracking</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="ml-auto px-3">
						<div className="flex items-center gap-2 text-sm">
							<div className="hidden font-medium text-muted-foreground md:inline-block">Edit Oct 08</div>
							<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7">
								<BookmarkMinus className="lucide lucide-bookmark-minus" />
							</button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7">
										<Share className="lucide lucide-share" />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuLabel>Share</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<Facebook className="mr-2 h-4 w-4" />
											<span>Facebook</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Twitter className="mr-2 h-4 w-4" />
											<span>Twitter</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Linkedin className="mr-2 h-4 w-4" />
											<span>LinkedIn</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Instagram className="mr-2 h-4 w-4" />
											<span>Instagram</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem onClick={copyToClipboard}>
										<LinkIcon className="mr-2 h-4 w-4" />
										<span>Copy link</span>
										<DropdownMenuShortcut>
											<Copy className="h-4 w-4" />
										</DropdownMenuShortcut>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button
										className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4  [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7 data-[state=open]:bg-accent"
										type="button"
										aria-haspopup="dialog"
										aria-expanded="false"
										data-state="closed"
									>
										<MoreHorizontal className="lucide lucide-ellipsis" />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="w-56" align="end" forceMount>
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<Settings2 className="mr-2 h-4  w-4" />
											<span>Customize Page</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<FileText className="mr-2 h-4 w-4" />
											<span>Turn into wiki</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<LinkIcon className="mr-2 h-4 w-4" />
											<span>Copy Link</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Copy className="mr-2 h-4 w-4" />
											<span>Duplicate</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<CornerUpRight className="mr-2 h-4 w-4" />
											<span>Move to</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Trash2 className="mr-2 h-4 w-4" />
											<span>Move to Trash</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<CornerUpLeft className="mr-2 h-4 w-4" />
											<span>Undo</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<LineChart className="mr-2 h-4 w-4" />
											<span>View analytics</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<GalleryVerticalEnd className="mr-2 h-4 w-4" />
											<span>Version History</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Trash className="mr-2 h-4 w-4" />
											<span>Show delete pages</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Bell className="mr-2 h-4 w-4" />
											<span>Notifications</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<DropdownMenuItem>
											<ArrowUp className="mr-2 h-4 w-4" />
											<span>Import</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<ArrowDown className="mr-2 h-4 w-4" />
											<span>Export</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				</header>
				<div className="flex flex-col gap-4 p-4 mx-auto">{children}</div>
				<footer className="w-full py-6 bg-gray-50 border-y rounded-b-xl flex justify-end flex-grow">
					<div className="container mx-auto px-4">
						<p className="text-center text-sm text-gray-600">
							Made with{" "}
							<Link href="https://nextjs.org" className="font-medium hover:underline" target="_blank" rel="noopener noreferrer">
								Next.js
							</Link>{" "}
							and{" "}
							<Link href="https://ui.shadcn.com" className="font-medium hover:underline" target="_blank" rel="noopener noreferrer">
								Shadcn
							</Link>{" "}
							by Byron Wade
						</p>
					</div>
				</footer>
			</SidebarInset>
		</SidebarProvider>
	);
}

function TreeItem({ item }: { item: any }) {
	return (
		<SidebarMenuItem>
			<Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
				<CollapsibleTrigger asChild>
					<SidebarMenuButton>
						<ChevronRight className="transition-transform" />
						<item.icon />
						<span>{item.title}</span>
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.items?.map((subItem: any) => (
							<TreeSubItem key={subItem.title} item={subItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</Collapsible>
		</SidebarMenuItem>
	);
}

function TreeSubItem({ item }: { item: any }) {
	if (!item.items) {
		return (
			<SidebarMenuSubItem>
				<SidebarMenuSubButton asChild>
					<Link href={item.url}>
						<span>{item.title}</span>
					</Link>
				</SidebarMenuSubButton>
			</SidebarMenuSubItem>
		);
	}

	return (
		<SidebarMenuSubItem className="w-full">
			<Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90">
				<CollapsibleTrigger asChild>
					<SidebarMenuSubButton>
						<ChevronRight className="transition-transform" />
						<span>{item.title}</span>
					</SidebarMenuSubButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.items.map((subSubItem: any) => (
							<TreeSubItem key={subSubItem.title} item={subSubItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</Collapsible>
		</SidebarMenuSubItem>
	);
}
