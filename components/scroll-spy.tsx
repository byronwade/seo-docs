"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderItem {
	id: string;
	title: string;
	level: 1 | 2;
}

export function ScrollSpy() {
	const [headers, setHeaders] = useState<HeaderItem[]>([]);
	const [activeHeader, setActiveHeader] = useState("");
	const observerRef = useRef<IntersectionObserver | null>(null);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const headerElements = document.querySelectorAll("h1, h2");
		const headerItems: HeaderItem[] = Array.from(headerElements).map((el, index) => ({
			id: el.id || `header-${index}`,
			title: el.textContent || "",
			level: el.tagName === "H1" ? 1 : 2,
		}));
		setHeaders(headerItems);

		headerElements.forEach((el, index) => {
			if (!el.id) el.id = `header-${index}`;
		});

		const callback: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveHeader(entry.target.id);
				}
			});
		};

		observerRef.current = new IntersectionObserver(callback, {
			rootMargin: "-20% 0px -79% 0px",
			threshold: 0,
		});

		headerElements.forEach((el) => observerRef.current?.observe(el));

		return () => observerRef.current?.disconnect();
	}, []);

	const scrollToHeader = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = element.offsetTop - 20;
			window.scrollTo({
				top: offset,
				behavior: "smooth",
			});
		}
	};

	return (
		<nav className="w-64 p-4 relative" aria-label="Table of Contents" data-docs-table-of-contents="">
			<div aria-hidden="true" className="absolute left-0 top-0 h-3 w-full bg-gradient-to-b from-gray-0 z-1"></div>
			<div aria-hidden="true" className="absolute bottom-0 left-0 z-10 h-3 w-full bg-gradient-to-t from-gray-0"></div>
			<ul ref={listRef} className="styled-scrollbar max-h-[70vh] space-y-2.5 overflow-y-auto py-2 text-sm">
				{headers.map((header) => (
					<li key={header.id}>
						<a
							href={`#${header.id}`}
							onClick={(e) => {
								e.preventDefault();
								scrollToHeader(header.id);
							}}
							className={cn("hover:text-gray-1000 block leading-[1.6] text-gray-900 transition-colors duration-300", activeHeader === header.id && "text-geist-link font-medium", header.level === 1 && "font-medium")}
						>
							{header.title}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
