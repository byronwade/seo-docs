"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BlogEmailSignup() {
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement your email signup logic here
		console.log("Email submitted:", email);
		setEmail("");
	};

	return (
		<section className="py-4">
			<h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 !mt-0">Stay updated with our latest posts</h2>
			<p className="text-base sm:text-lg text-gray-600 mb-6">Join our newsletter and get fresh insights delivered straight to your inbox.</p>
			<form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
				<Input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-grow" />
				<Button type="submit" className="w-full sm:w-auto">
					Subscribe
				</Button>
			</form>
			<p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
		</section>
	);
}
