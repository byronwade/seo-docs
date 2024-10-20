"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { CommandPalette } from "@/components/admin/CommandPalette";

export default function AdminInterface({ children }: { children: React.ReactNode }) {
	const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				setIsCommandPaletteOpen(true);
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<div className="flex h-screen bg-background">
			<Sidebar />
			<div className="flex flex-col flex-1 overflow-hidden">
				<main className="flex-1 overflow-auto">{children}</main>
			</div>
			<CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
		</div>
	);
}
