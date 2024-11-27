"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export function ContentNotFound() {
	return (
		<div className="flex flex-col items-center justify-center bg-background text-foreground p-4">
			<div className="w-full max-w-md">
				<svg className="w-full h-auto mb-8" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect width="400" height="300" fill="none" />
					<circle cx="200" cy="150" r="100" fill="currentColor" fillOpacity="0.1" />
					<path d="M200 50C144.772 50 100 94.7715 100 150C100 205.228 144.772 250 200 250" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
					<path d="M200 250C255.228 250 300 205.228 300 150C300 94.7715 255.228 50 200 50" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeDasharray="8 14" />
					<path d="M180 120L220 180M220 120L180 180" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
				</svg>
				<h1 className="text-4xl font-bold text-center mb-4">Content Not Found</h1>
				<p className="text-center text-muted-foreground mb-8">Oops! The content you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.</p>
				<div className="flex justify-center">
					<Button asChild>
						<Link prefetch={true} href="/" className="flex items-center">
							<Home className="mr-2 h-4 w-4" />
							Return Home
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
