"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link2, Copy, Mail, ArrowRight, Check, ExternalLink } from "lucide-react";

export function BacklinkNewsletterCTA() {
	const [copied, setCopied] = useState(false);
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [currentUrl, setCurrentUrl] = useState("");

	useEffect(() => {
		setCurrentUrl(window.location.href);
	}, []);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle newsletter signup logic here
		console.log("Signed up with email:", email);
		setEmail("");
		setIsSubmitted(true);
		setTimeout(() => setIsSubmitted(false), 3000);
	};

	return (
		<Card className="w-full my-8 overflow-hidden">
			<CardContent className="p-6">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="space-y-4">
						<h2 className="text-2xl font-bold flex items-center text-primary">
							<Link2 className="mr-3 h-8 w-8" />
							Boost Your SEO
						</h2>
						<p className="text-foreground text-base">Help others discover this valuable content by linking to this page. It&apos;s a win-win for SEO!</p>
						<div className="flex items-center space-x-2">
							<Input value={currentUrl} readOnly className="bg-background/50 border-primary/20 text-xs" />
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button onClick={copyToClipboard} variant="outline" size="icon" className="flex-shrink-0 hover:bg-primary/10">
											{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>{copied ? "Copied!" : "Copy URL"}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<div className="bg-background/50 rounded-lg p-3 border border-primary/10">
							<h3 className="text-base font-semibold text-primary mb-2">Why are backlinks important?</h3>
							<ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
								<li className="flex items-start">
									<Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
									<span>Improve website authority</span>
								</li>
								<li className="flex items-start">
									<Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
									<span>Boost search engine rankings</span>
								</li>
								<li className="flex items-start">
									<Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
									<span>Drive referral traffic</span>
								</li>
								<li className="flex items-start">
									<Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
									<span>Enhance content credibility</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="space-y-4 md:border-l md:border-primary/10 md:pl-6">
						<h2 className="text-2xl font-bold flex items-center text-secondary-foreground">
							<Mail className="mr-3 h-8 w-8" />
							Stay Updated
						</h2>
						<p className="text-foreground text-base">Get the latest SEO tips, tricks, and best practices delivered straight to your inbox.</p>
						<form onSubmit={handleSubmit} className="space-y-3">
							<Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background/50 border-primary/20 text-xs" />
							<Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
								{isSubmitted ? <Check className="h-4 w-4 mr-2" /> : <ArrowRight className="h-4 w-4 mr-2" />}
								{isSubmitted ? "Subscribed!" : "Subscribe to Newsletter"}
							</Button>
						</form>
						<p className="text-xs text-foreground/80">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
					</div>
				</div>
				<div className="mt-6 pt-4 border-t border-primary/10 text-center">
					<a href="#" className="inline-flex items-center text-xs text-primary hover:underline">
						Learn more about SEO best practices
						<ExternalLink className="ml-1 h-3 w-3" />
					</a>
				</div>
			</CardContent>
		</Card>
	);
}
