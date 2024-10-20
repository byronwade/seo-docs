"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/admin-sidebar";
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
		<AdminSidebar>
			{children}
			<CommandPalette isOpen={isCommandPaletteOpen} setIsOpen={setIsCommandPaletteOpen} />
		</AdminSidebar>
	);
}
