"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Github, Menu, Sun, Moon, Command } from "lucide-react";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Breadcrumb } from "@/components/breadcrumb";
import { ScrollSpy } from "@/components/scroll-spy";

const mainNav = [
	{ title: "Documentation", href: "/docs", icon: Menu },
	{ title: "Components", href: "/docs/components", icon: Menu },
	{ title: "Examples", href: "/examples", icon: Menu },
	{ title: "Blog", href: "/blog", icon: Menu },
];

const sidebarNav = [
	{
		title: "Getting Started",
		items: [
			{ title: "Introduction", href: "/docs" },
			{ title: "SEO Basics", href: "/docs/seo-basics" },
			{ title: "Keyword Research", href: "/docs/keyword-research" },
		],
	},
	{
		title: "On-Page SEO",
		items: [
			{ title: "Content Optimization", href: "/docs/content-optimization" },
			{ title: "Meta Tags", href: "/docs/meta-tags" },
			{ title: "URL Structure", href: "/docs/url-structure" },
		],
	},
	{
		title: "Technical SEO",
		items: [
			{ title: "Site Speed", href: "/docs/site-speed" },
			{ title: "Mobile Optimization", href: "/docs/mobile-optimization" },
			{ title: "Structured Data", href: "/docs/structured-data" },
		],
	},
	{
		title: "Off-Page SEO",
		items: [
			{ title: "Link Building", href: "/docs/link-building" },
			{ title: "Social Media SEO", href: "/docs/social-media-seo" },
			{ title: "Local SEO", href: "/docs/local-seo" },
		],
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
	const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(-1);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
		if (savedTheme) {
			setTheme(savedTheme);
		} else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
			setTheme("dark");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("theme", theme);
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsSearchOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	useEffect(() => {
		async function parseMarkdown() {
			const ast = await remark().use(remarkGfm).parse();
			const headings: { id: string; text: string }[] = [];

			visit(ast, "heading", (node) => {
				const text = node.children.map((child) => ("value" in child ? child.value : "")).join("");
				const id = (node.data as { id?: string })?.id || text.toLowerCase().replace(/\s+/g, "-");
				headings.push({ id, text });
			});

			setHeadings(headings);
		}

		parseMarkdown();
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = headings.findIndex((heading) => heading.id === entry.target.id);
						setCurrentActiveIndex(index);
					}
				});
			},
			{ rootMargin: "-100px 0px -66%" }
		);

		headings.forEach((heading) => {
			const element = document.getElementById(heading.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, [headings]);

	const runCommand = (command: string | (() => void)) => {
		setIsSearchOpen(false);
		if (typeof command === "string") {
			router.push(command);
		} else {
			command();
		}
	};

	const isHomePage = pathname === "/";

	return (
		<div className={cn("min-h-screen bg-background font-sans antialiased", theme)}>
			<header className="sticky top-0 z-40 w-full border-b bg-background">
				<div className="container mx-auto flex h-16 items-center justify-between px-2">
					<div className="flex items-center space-x-6">
						<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" className="md:hidden" size="icon">
									<Menu className="h-5 w-5" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="w-[80%] sm:w-[385px]">
								<Link href="/" className="flex items-center">
									<span className="font-bold">Menu</span>
								</Link>
								<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
									<div className="flex flex-col space-y-3">
										{mainNav.map((item) => (
											<Link key={item.href} href={item.href} className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === item.href ? "text-foreground" : "text-foreground/60")}>
												{item.title}
											</Link>
										))}
									</div>
								</ScrollArea>
							</SheetContent>
						</Sheet>
						<Link href="/" className="flex items-center space-x-2">
							<span className="font-bold">SEO Docs</span>
						</Link>
					</div>
					<div className="flex items-center justify-between flex-1 space-x-4 ml-6">
						<nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
							{mainNav.map((item, index) => (
								<Link key={index} href={item.href} className={cn("text-sm font-medium transition-colors hover:text-foreground/80", pathname === item.href ? "text-foreground" : "text-foreground/60")}>
									{item.title}
								</Link>
							))}
						</nav>
						<div className="flex items-center space-x-2">
							<Button variant="outline" onClick={() => setIsSearchOpen(true)} className="px-2 py-1">
								<span className="sr-only">Search</span>
								<Command className="h-5 w-5" />
								<kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
									<span className="text-xs">⌘</span>K
								</kbd>
							</Button>
							<Button variant="ghost" size="icon" onClick={toggleTheme}>
								<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								<span className="sr-only">Toggle theme</span>
							</Button>
							<Link href="https://github.com/yourusername/seo-docs" target="_blank" rel="noopener noreferrer">
								<Button variant="ghost" size="icon">
									<Github className="h-5 w-5" />
									<span className="sr-only">GitHub</span>
								</Button>
							</Link>
							<Link href="/donate" passHref>
								<Button variant="outline" size="sm">
									Donate
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</header>
			<div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
				<aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
					<ScrollArea className="h-full py-6 pl-8 pr-6 lg:py-8">
						{sidebarNav.map((section, index) => (
							<div key={index} className="pb-8">
								<h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">{section.title}</h4>
								<Collapsible defaultOpen>
									<CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-2 py-1 text-sm hover:bg-accent">
										<span>{section.title}</span>
										<ChevronDown className="h-4 w-4" />
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className="mt-1 space-y-1">
											{section.items.map((item, itemIndex) => (
												<Link key={itemIndex} href={item.href} className={cn("block rounded-md px-2 py-1 text-sm hover:bg-accent", pathname === item.href ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground")}>
													{item.title}
												</Link>
											))}
										</div>
									</CollapsibleContent>
								</Collapsible>
							</div>
						))}
					</ScrollArea>
				</aside>
				<main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
					<div className="mx-auto w-full min-w-0">
						{!isHomePage && <Breadcrumb />}
						{children}
					</div>
					<div className="hidden text-sm xl:block">
						<div className="sticky top-16 -mt-10 max-h-[calc(100vh-3.5rem)] overflow-hidden pt-10">
							<ScrollArea className="pb-10">
								<div className="space-y-2">
									<p className="font-medium">On This Page</p>
									<ScrollSpy />
								</div>
							</ScrollArea>
						</div>
					</div>
				</main>
			</div>
			<footer className="border-t mt-auto">
				<div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:justify-between md:py-0">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						Built by{" "}
						<a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
							Your Company
						</a>
						. The source code is available on{" "}
						<a href="https://github.com/yourusername/seo-docs" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
							GitHub
						</a>
						.
					</p>
				</div>
			</footer>
			<CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem onSelect={() => runCommand("/docs")}>
							<span>Search Documentation</span>
						</CommandItem>
						<CommandItem onSelect={() => runCommand("/docs/components")}>
							<Menu className="mr-2 h-4 w-4" />
							<span>Components</span>
						</CommandItem>
						<CommandItem onSelect={() => runCommand(toggleTheme)}>
							{theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
							<span>Toggle Theme</span>
						</CommandItem>
					</CommandGroup>
					<CommandGroup heading="SEO Topics">
						{sidebarNav.flatMap((section) =>
							section.items.map((item) => (
								<CommandItem key={item.href} onSelect={() => runCommand(item.href)}>
									<span>{item.title}</span>
								</CommandItem>
							))
						)}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</div>
	);
}
