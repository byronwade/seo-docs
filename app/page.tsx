import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
	title: "Home - SEO Docs",
	description: "Welcome to the SEO Docs home page.",
};

export default function Page() {
	return <HomePage />;
}
