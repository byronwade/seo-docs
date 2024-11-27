"use client";

import { Sidebar } from "./sidebar";

interface PageLayoutProps {
	children: React.ReactNode;
	noRightSidebar?: boolean;
	isAISummary?: boolean;
}

export function PageLayout({ children, noRightSidebar, isAISummary }: PageLayoutProps) {
	return (
		<div className="flex min-h-screen">
			<Sidebar variant="left" />
			<main className="flex-1">
				{children}
				{isAISummary && <div className="fixed bottom-4 right-4">{/* AI Summary UI */}</div>}
			</main>
			{!noRightSidebar && <Sidebar variant="right" />}
		</div>
	);
}
