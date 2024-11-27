"use client";

import { cn } from "@/lib/utils";

interface SidebarProps {
	variant?: "left" | "right";
	className?: string;
	children?: React.ReactNode;
}

export function Sidebar({ variant = "left", className, children }: SidebarProps) {
	return <aside className={cn("w-64 border-r bg-background", variant === "right" && "border-l border-r-0", className)}>{children}</aside>;
}
