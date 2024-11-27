export const SITE_CONFIG = {
	name: "SEO Docs",
	description: "Comprehensive SEO documentation",
	domain: "your-domain.com",
};

export const NAVIGATION = {
	main: [
		{ title: "Home", href: "/" },
		{ title: "Docs", href: "/docs" },
		{ title: "News", href: "/news" },
		{ title: "Tools", href: "/tools" },
	],
	docs: [
		{
			title: "Getting Started",
			items: [
				{ title: "Introduction", href: "/docs" },
				{ title: "Installation", href: "/docs/installation" },
			],
		},
		// Add more sections as needed
	],
};
