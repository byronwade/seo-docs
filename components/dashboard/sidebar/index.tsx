"use client";

import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
	className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
	return <aside className={cn("w-64 border-r bg-background", className)}>{/* Sidebar content */}</aside>;
}
