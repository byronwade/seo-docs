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
		<SidebarProvider>
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
				<footer className="w-full py-6 bg-gray-50 border-t rounded-b-xl">
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
