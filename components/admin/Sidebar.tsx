"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Bell, ChevronRight, Home, Settings, FileText, Plus, List, Search, User, LogOut } from "lucide-react";

const sidebarItems = [
	{ id: "1", value: "/new", label: "Dashboard", icon: Home },
	{
		id: "2",
		value: "content-types",
		label: "Content Types",
		icon: FileText,
		children: [
			{ id: "2-1", value: "new/view", label: "View All", icon: List },
			{ id: "2-2", value: "new/add-update", label: "Add New", icon: Plus },
		],
	},
	{
		id: "3",
		value: "pages",
		label: "Pages",
		icon: FileText,
		children: [
			{ id: "3-1", value: "new/view", label: "View All", icon: List },
			{ id: "3-2", value: "new/add-update", label: "Add New", icon: Plus },
		],
	},
	{
		id: "4",
		value: "posts",
		label: "Posts",
		icon: FileText,
		children: [
			{ id: "4-1", value: "new/view", label: "View All", icon: List },
			{ id: "4-2", value: "new/add-update", label: "Add New", icon: Plus },
		],
	},
	{ id: "5", value: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ isSidebarCollapsed = false, activeSection = "" }) {
	const [isSearchOpen, setIsSearchOpen] = useState(false);

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

	const renderSidebarItem = (item: {
		id: string;
		value: string;
		label: string;
		icon: React.ComponentType<unknown>;
		children?: Array<{
			id: string;
			value: string;
			label: string;
			icon: React.ComponentType<unknown>;
		}>;
	}) => (
		<div key={item.id} className="mb-1">
			{item.children ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={activeSection === item.value ? "secondary" : "ghost"} className={`w-full justify-start ${isSidebarCollapsed ? "px-2" : "px-3"} ${activeSection === item.value ? "bg-accent" : ""}`}>
							{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
							{/* @ts-expect-error */}
							<item.icon className={`h-4 w-4 ${isSidebarCollapsed ? "mr-0" : "mr-2"}`} />
							{!isSidebarCollapsed && (
								<>
									<span className="flex-1 text-left text-sm">{item.label}</span>
									<ChevronRight className="h-3 w-3" />
								</>
							)}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="right" className="w-48">
						{item.children.map((child) => (
							<DropdownMenuItem key={child.id} asChild>
								<Link prefetch={true} href={`/admin/${child.value}`} className={`flex items-center w-full ${activeSection === child.value ? "bg-accent" : ""}`}>
									{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
									{/* @ts-expect-error */}
									<child.icon className="h-4 w-4 mr-2" />
									<span className="text-sm">{child.label}</span>
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Tooltip>
					<TooltipTrigger asChild>
						<Link prefetch={true} href={`/admin/${item.value}`} passHref>
							<Button variant={activeSection === item.value ? "secondary" : "ghost"} className={`w-full justify-start ${isSidebarCollapsed ? "px-2" : "px-3"} ${activeSection === item.value ? "bg-accent" : ""}`}>
								{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
								{/* @ts-expect-error */}
								<item.icon className={`h-4 w-4 ${isSidebarCollapsed ? "mr-0" : "mr-2"}`} />
								{!isSidebarCollapsed && <span className="flex-1 text-left text-sm">{item.label}</span>}
							</Button>
						</Link>
					</TooltipTrigger>
					{isSidebarCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
				</Tooltip>
			)}
		</div>
	);

	const sidebarWidth = isSidebarCollapsed ? "w-12" : "w-48";

	return (
		<TooltipProvider>
			<motion.div className={`flex flex-col border-r bg-white p-2 ${sidebarWidth} h-screen`} animate={{ width: isSidebarCollapsed ? 48 : 192 }} transition={{ duration: 0.3 }}>
				<Button variant="outline" className="w-full justify-start px-2 mb-2 bg-white" onClick={() => setIsSearchOpen(true)}>
					<Search className="h-4 w-4 mr-2" />
					{!isSidebarCollapsed && (
						<>
							<span className="text-sm flex-1 text-left">Search</span>
							<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
								<span className="text-xs">⌘</span>K
							</kbd>
						</>
					)}
				</Button>
				<nav className="flex-1 overflow-y-auto py-2">{sidebarItems.map((item) => renderSidebarItem(item as { id: string; value: string; label: string; icon: React.ComponentType<unknown>; children?: Array<{ id: string; value: string; label: string; icon: React.ComponentType<unknown> }> }))}</nav>
				<div className="p-2 border-t flex items-center justify-between">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<Bell className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side={isSidebarCollapsed ? "right" : "top"} align={isSidebarCollapsed ? "start" : "end"}>
							<DropdownMenuLabel>Notifications</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>New message from John</DropdownMenuItem>
							<DropdownMenuItem>Content update completed</DropdownMenuItem>
							<DropdownMenuItem>System maintenance scheduled</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<User className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent side={isSidebarCollapsed ? "right" : "top"} align={isSidebarCollapsed ? "start" : "end"}>
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<LogOut className="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
					<CommandInput placeholder="Type a command or search..." />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup heading="Suggestions">
							<CommandItem>
								<Home className="mr-2 h-4 w-4" />
								<span>Dashboard</span>
							</CommandItem>
							<CommandItem>
								<FileText className="mr-2 h-4 w-4" />
								<span>Content Types</span>
							</CommandItem>
							<CommandItem>
								<FileText className="mr-2 h-4 w-4" />
								<span>Pages</span>
							</CommandItem>
							<CommandItem>
								<FileText className="mr-2 h-4 w-4" />
								<span>Posts</span>
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</CommandDialog>
			</motion.div>
		</TooltipProvider>
	);
}
