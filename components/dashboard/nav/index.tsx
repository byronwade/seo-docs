"use client";

import { cn } from "@/lib/utils";

interface DashboardTopNavProps {
	className?: string;
}

export function DashboardTopNav({ className }: DashboardTopNavProps) {
	return <nav className={cn("h-16 border-b bg-background", className)}>{/* Top nav content */}</nav>;
}
