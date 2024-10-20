"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
	ChartBar,
	Check,
	Bot,
	ChevronRight,
	Folder,
	Frame,
	LifeBuoy,
	Map,
	PieChart,
	SquareTerminal,
	MapPin,
	ShoppingCart,
	TrendingUp,
	Zap,
	Smartphone,
	Globe,
	Briefcase,
	CheckCircle,
	Aperture,
	Link as LinkIcon,
	Copy,
	// BookmarkMinus,
	Home,
	Newspaper,
	ScrollText,
	Wrench,
	FileDown,
	Printer,
	Share,
	Bookmark,
	Languages,
	FileText,
	User,
	AlertTriangle,
	MessageSquare,
	Trash2,
	Wifi,
	Clock,
	Maximize2,
	MoreHorizontal,
	File,
	FileText as FileTextIcon,
	FileCode,
	FileAudio,
	Table,
	Palette,
	Image as ImageIcon,
	BookOpen,
	ExternalLink,
	Flag,
	Send,
	Focus,
	Mail,
	Twitter,
	Facebook,
	Linkedin,
	MessageCircle,
	QrCode,
	// Pocket,
	Database,
	Cloud,
	// BookmarkPlus,
	Brain,
	HeartHandshake,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuSubTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuPortal, DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import RightSidebar from "@/components/right-sidebar";
import { AISummary } from "@/components/ai-summary";

const data = {
	navMain: [
		{
			title: "Welcome",
			url: "#",
			icon: HeartHandshake,
			items: [
				{
					title: "Introduction",
					url: "/docs",
				},
				{
					title: "SEO Basics",
					url: "#",
				},
			],
		},
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
							title: "Latent Semantic Indexing (LSI)",
							url: "#",
						},
						{
							title: "Semantic Search",
							url: "#",
						},
						{
							title: "User Engagement Signals",
							url: "#",
						},
						{
							title: "Rich Snippets",
							url: "#",
						},
					],
				},
				{
					title: "URL Structure",
					url: "#",
					items: [
						{
							title: "Canonical Tags",
							url: "#",
						},
						{
							title: "Breadcrumb Navigation",
							url: "#",
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
					title: "Backlinks",
					url: "#",
					items: [
						{
							title: "Disavow Links",
							url: "#",
						},
						{
							title: "Negative SEO",
							url: "#",
						},
						{
							title: "Influencer Outreach",
							url: "#",
						},
					],
				},
				{
					title: "Local SEO",
					url: "#",
					items: [
						{
							title: "Citation Building for Off-Page SEO",
							url: "#",
						},
						{
							title: "Building Relationships with Local Businesses for Backlinks",
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
					title: "Core Web Vitals",
					url: "#",
				},
				{
					title: "JavaScript SEO",
					url: "#",
				},
				{
					title: "Crawl Budget",
					url: "#",
					items: [
						{
							title: "Googlebot Behavior",
							url: "#",
						},
						{
							title: "Identifying Crawl Errors",
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
					title: "Advanced Analytics",
					url: "#",
					items: [
						{
							title: "Google Tag Manager",
							url: "#",
						},
						{
							title: "Conversion Rate Optimization (CRO) and SEO",
							url: "#",
						},
						{
							title: "Attribution Modeling",
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
					title: "Google Maps Optimization",
					url: "#",
				},
				{
					title: "Hyperlocal Targeting",
					url: "#",
				},
				{
					title: "Geotargeting with Paid Ads",
					url: "#",
				},
			],
		},
		{
			title: "E-commerce SEO",
			url: "#",
			icon: ShoppingCart,
			items: [
				{
					title: "E-commerce SEO for Mobile Devices",
					url: "#",
				},
				{
					title: "Product Review Optimization",
					url: "#",
				},
				{
					title: "Rich Snippets for Products",
					url: "#",
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
				},
				{
					title: "AI in SEO",
					url: "#",
				},
				{
					title: "Visual Search Optimization",
					url: "#",
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
				},
				{
					title: "Entity-Based SEO",
					url: "#",
				},
				{
					title: "Edge SEO",
					url: "#",
				},
				{
					title: "Technical Auditing",
					url: "#",
					items: [
						{
							title: "Automated SEO Auditing",
							url: "#",
						},
						{
							title: "Automating SEO tasks",
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
					title: "Mobile UX",
					url: "#",
				},
				{
					title: "Google's Mobile Usability Reports",
					url: "#",
				},
				{
					title: "Accelerated Mobile Pages (AMP)",
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
				},
				{
					title: "Geotargeting",
					url: "#",
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
				},
				{
					title: "Real Estate SEO",
					url: "#",
				},
				{
					title: "SaaS SEO",
					url: "#",
				},
				{
					title: "Restaurant SEO",
					url: "#",
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
				},
				{
					title: "Competitor SEO Audits",
					url: "#",
				},
				{
					title: "Content Audits",
					url: "#",
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
				},
				{
					title: "SEO for Podcasts",
					url: "#",
				},
				{
					title: "SEO for Voice Assistants",
					url: "#",
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
			name: "News",
			url: "/news",
			icon: Newspaper,
			badge: "New",
		},
		// {
		// 	name: "Tools",
		// 	url: "/tools",
		// 	icon: Wrench,
		// 	badge: "New",
		// },
	],
};

export default function SidebarPage({ children, noRightSidebar, isAISummary }: { children: React.ReactNode; noRightSidebar?: boolean; isAISummary?: boolean }) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [linkCopied, setLinkCopied] = useState(false);
	const [articleUrl, setArticleUrl] = useState("");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setArticleUrl(window.location.href);
	}, []);

	const handleCopyLink = () => {
		navigator.clipboard.writeText(articleUrl);
		setLinkCopied(true);
		setTimeout(() => setLinkCopied(false), 2000);
	};

	return (
		<SidebarProvider>
			<Sidebar collapsible="offcanvas">
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

						{/* <SidebarMenuItem>
							<SidebarMenuButton className="bg-gradient-to-r from-blue-500 to-purple-500 text-white" size="sm" asChild>
								<Link href="/">
									<Star className="mr-2 h-4 w-4" />
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate text-xs">Upgrade to Pro</span>
									</div>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem> */}
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
									{item.badge && <SidebarMenuBadge className="bg-red-500 text-white">{item.badge}</SidebarMenuBadge>}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
					<SidebarGroup className="group-data-[collapsible=icon]:hidden">
						<SidebarGroupLabel>Docs</SidebarGroupLabel>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<Collapsible key={item.title} className="group/collapsible">
									<SidebarMenuItem>
										<CollapsibleTrigger asChild>
											<SidebarMenuButton>
												<item.icon />
												<span>{item.title}</span>
												<ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map((subItem) => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild>
															<Link href={subItem.url}>
																<span>{subItem.title}</span>
															</Link>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							))}
						</SidebarMenu>
					</SidebarGroup>
					{/* <SidebarGroup className="group-data-[collapsible=icon]:hidden">
						<SidebarGroupLabel>Loading</SidebarGroupLabel>
						<SidebarMenu>
							{Array.from({ length: 5 }).map((_, index) => (
								<SidebarMenuItem key={index}>
									<SidebarMenuSkeleton showIcon />
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup> */}
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
							{isAISummary && (
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-7 w-7 bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600">
											<Brain className="lucide lucide-brain" />
										</button>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="not-prose hidden xl:block p-2 rounded-lg bg-purple-50 dark:bg-purple-900 border-2 border-purple-400 dark:border-purple-500" align="end" forceMount>
										<AISummary />
									</DropdownMenuContent>
								</DropdownMenu>
							)}
							{/* <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7">
								{isBookmarked ? <BookmarkMinus className="lucide lucide-bookmark-minus" /> : <BookmarkPlus className="lucide lucide-bookmark-plus" />}
							</button> */}
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7">
										<Share className="lucide lucide-share" />
									</button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className="p-4 space-y-3" align="end" forceMount>
									<div className="flex justify-between items-center space-x-2">
										<Button variant="outline" size="sm" className="flex-1 h-10 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200">
											<Facebook className="h-4 w-4 text-blue-600 dark:text-blue-400" />
											<span className="sr-only">Share on Facebook</span>
										</Button>
										<Button variant="outline" size="sm" className="flex-1 h-10 hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors duration-200">
											<Twitter className="h-4 w-4 text-sky-500 dark:text-sky-400" />
											<span className="sr-only">Share on Twitter</span>
										</Button>
										<Button variant="outline" size="sm" className="flex-1 h-10 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors duration-200">
											<Linkedin className="h-4 w-4 text-blue-700 dark:text-blue-300" />
											<span className="sr-only">Share on LinkedIn</span>
										</Button>
										<Button variant="outline" size="sm" className="flex-1 h-10 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200">
											<Mail className="h-4 w-4 text-red-600 dark:text-red-400" />
											<span className="sr-only">Share via Email</span>
										</Button>
									</div>
									<div className="flex items-center space-x-2 text-sm">
										<div className="flex-1 truncate bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1">{articleUrl}</div>
										<Button size="sm" variant="outline" className={`h-8 w-20 ${linkCopied ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800" : "hover:bg-gray-100 dark:hover:bg-gray-800"} transition-colors duration-200`} onClick={handleCopyLink}>
											{linkCopied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
											<span className="text-xs">{linkCopied ? "Copied!" : "Copy"}</span>
										</Button>
									</div>
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
								<DropdownMenuContent className="w-56">
									<DropdownMenuLabel>Article Options</DropdownMenuLabel>
									<DropdownMenuSeparator />

									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<FileDown className="mr-2 h-4 w-4" />
											<span>Export</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>
													<File className="mr-2 h-4 w-4" />
													<span>PDF</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<FileTextIcon className="mr-2 h-4 w-4" />
													<span>Word document</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<FileCode className="mr-2 h-4 w-4" />
													<span>Markdown</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<FileCode className="mr-2 h-4 w-4" />
													<span>HTML</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<FileTextIcon className="mr-2 h-4 w-4" />
													<span>Plain text</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<FileAudio className="mr-2 h-4 w-4" />
													<span>ePub</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Table className="mr-2 h-4 w-4" />
													<span>CSV</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>

									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<Printer className="mr-2 h-4 w-4" />
											<span>Print</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>
													<Printer className="mr-2 h-4 w-4" />
													<span>Print Article</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Palette className="mr-2 h-4 w-4" />
													<span>Print in black and white</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<ImageIcon className="mr-2 h-4 w-4" />
													<span>Print without images</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>

									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<Share className="mr-2 h-4 w-4" />
											<span>Share</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>
													<Mail className="mr-2 h-4 w-4" />
													<span>Email</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Twitter className="mr-2 h-4 w-4" />
													<span>Twitter</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Facebook className="mr-2 h-4 w-4" />
													<span>Facebook</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Linkedin className="mr-2 h-4 w-4" />
													<span>LinkedIn</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<MessageCircle className="mr-2 h-4 w-4" />
													<span>WhatsApp</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<MessageSquare className="mr-2 h-4 w-4" />
													<span>Reddit</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<LinkIcon className="mr-2 h-4 w-4" />
													<span>Copy link</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<FileText className="mr-2 h-4 w-4" />
													<span>Note-taking app</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<QrCode className="mr-2 h-4 w-4" />
													<span>QR code</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>

									<DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<Bookmark className="mr-2 h-4 w-4" />
											<span>Save</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>
													<BookOpen className="mr-2 h-4 w-4" />
													<span>Add to Reading List</span>
												</DropdownMenuItem>
												{/* <DropdownMenuItem>
													<Pocket className="mr-2 h-4 w-4" />
													<span>Save to Pocket</span>
												</DropdownMenuItem> */}
												<DropdownMenuItem>
													<FileText className="mr-2 h-4 w-4" />
													<span>Save to Instapaper</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Database className="mr-2 h-4 w-4" />
													<span>Save to Google Drive</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Cloud className="mr-2 h-4 w-4" />
													<span>Save to Dropbox</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub>

									{/* <DropdownMenuSub>
										<DropdownMenuSubTrigger>
											<Edit className="mr-2 h-4 w-4" />
											<span>Edit & Annotate</span>
										</DropdownMenuSubTrigger>
										<DropdownMenuPortal>
											<DropdownMenuSubContent>
												<DropdownMenuItem>
													<Edit className="mr-2 h-4 w-4" />
													<span>Edit Article</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<Highlighter className="mr-2 h-4 w-4" />
													<span>Highlight Text</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<MessageSquare className="mr-2 h-4 w-4" />
													<span>Add Annotations</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<MessageCircle className="mr-2 h-4 w-4" />
													<span>Add Comments</span>
												</DropdownMenuItem>
												<DropdownMenuItem>
													<History className="mr-2 h-4 w-4" />
													<span>View Revision History</span>
												</DropdownMenuItem>
											</DropdownMenuSubContent>
										</DropdownMenuPortal>
									</DropdownMenuSub> */}

									<DropdownMenuGroup>
										{/* <DropdownMenuItem>
											<Volume2 className="mr-2 h-4 w-4" />
											<span>Text-to-Speech</span>
										</DropdownMenuItem> */}
										{/* <DropdownMenuItem>
											<Headphones className="mr-2 h-4 w-4" />
											<span>Download audio version</span>
										</DropdownMenuItem> */}
										<DropdownMenuItem>
											<Languages className="mr-2 h-4 w-4" />
											<span>Translate Article</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<User className="mr-2 h-4 w-4" />
											<span>View Author Profile</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<ExternalLink className="mr-2 h-4 w-4" />
											<span>View Source References</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>

									<DropdownMenuSeparator />

									<DropdownMenuGroup>
										<DropdownMenuItem>
											<AlertTriangle className="mr-2 h-4 w-4" />
											<span>Report an Issue</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Flag className="mr-2 h-4 w-4" />
											<span>Request Correction</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Send className="mr-2 h-4 w-4" />
											<span>Submit Feedback</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Wifi className="mr-2 h-4 w-4" />
											<span>Enable Offline Mode</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Clock className="mr-2 h-4 w-4" />
											<span>View Reading Statistics</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Focus className="mr-2 h-4 w-4" />
											<span>Turn on Focus Mode</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Maximize2 className="mr-2 h-4 w-4" />
											<span>Toggle Full-Screen Mode</span>
										</DropdownMenuItem>
									</DropdownMenuGroup>

									{/* <DropdownMenuSeparator />

									<DropdownMenuGroup>
										<DropdownMenuItem>
											<Code className="mr-2 h-4 w-4" />
											<span>View Source Code</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<FileCode className="mr-2 h-4 w-4" />
											<span>Inspect Markdown</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<LinkIcon className="mr-2 h-4 w-4" />
											<span>Generate API Link</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<FileJson className="mr-2 h-4 w-4" />
											<span>Export Metadata</span>
										</DropdownMenuItem>
									</DropdownMenuGroup> */}
								</DropdownMenuContent>
							</DropdownMenu>
							{/*
							//got to figure out a way to make this work
							<Separator orientation="vertical" className="shrink-0 bg-border w-[1px] mr-2 h-4" />
							<SidebarTrigger className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-7 w-7" /> */}
						</div>
					</div>
				</header>
				<div className="flex flex-col gap-4 p-4">{children}</div>
				<footer className="w-full py-6 bg-gray-50 border-y flex justify-end flex-grow">
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
			{!noRightSidebar && <RightSidebar />}
		</SidebarProvider>
	);
}
