import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "SEO Docs",
		template: "%s | SEO Docs",
	},
	description: "Comprehensive SEO documentation and resources",
	metadataBase: new URL("https://your-domain.com"),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
			<body suppressHydrationWarning={true} className="antialiased">
				{children}
				<Toaster />
			</body>
		</html>
	);
}
