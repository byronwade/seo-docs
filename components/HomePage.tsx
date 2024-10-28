import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Zap, BarChart, Users, Code, Globe } from "lucide-react";
import SidebarPage from "@/components/components-sidebar";

export default function HomePage() {
	return (
		<SidebarPage noRightSidebar isAISummary={false}>
			<div className="min-h-screen">
				<main className="container mx-auto px-4 py-16 space-y-24">
					<section className="text-center space-y-6">
						<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Master SEO with Our Comprehensive Docs</h1>
						<p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">Boost your website&apos;s visibility and climb the search rankings with our expert SEO guidance.</p>
						<div className="max-w-md mx-auto">
							<form className="flex space-x-2">
								<Input className="flex-1" placeholder="Search documentation..." type="search" />
								<Button type="submit">Search</Button>
							</form>
						</div>
					</section>

					<section className="space-y-12">
						<h2 className="text-3xl font-bold text-center">Why Choose Our SEO Docs?</h2>
						<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
							{[
								{ icon: BookOpen, title: "Comprehensive Guides", description: "In-depth tutorials and best practices to optimize your website for search engines." },
								{ icon: Zap, title: "Quick Tips", description: "Actionable SEO tips and tricks to implement right away for immediate impact." },
								{ icon: BarChart, title: "Performance Metrics", description: "Learn how to measure and analyze your SEO efforts for continuous improvement." },
								{ icon: Users, title: "Community Support", description: "Join our thriving community of SEO enthusiasts and experts for advice and discussions." },
								{ icon: Code, title: "Technical SEO", description: "Dive deep into the technical aspects of SEO, including schema markup and site architecture." },
								{ icon: Globe, title: "International SEO", description: "Strategies for optimizing your site for global audiences and multiple languages." },
							].map((feature, index) => (
								<Card key={index}>
									<CardHeader>
										<feature.icon className="h-10 w-10 mb-2 text-primary" />
										<CardTitle>{feature.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
									</CardContent>
								</Card>
							))}
						</div>
					</section>

					<section className="space-y-12">
						<h2 className="text-3xl font-bold text-center">Getting Started</h2>
						<Tabs defaultValue="beginners" className="max-w-3xl mx-auto">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="beginners">Beginners</TabsTrigger>
								<TabsTrigger value="intermediate">Intermediate</TabsTrigger>
								<TabsTrigger value="advanced">Advanced</TabsTrigger>
							</TabsList>
							<TabsContent value="beginners" className="mt-4">
								<Card>
									<CardHeader>
										<CardTitle>SEO Fundamentals</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="list-disc pl-5 space-y-2">
											<li>Understanding search engine algorithms</li>
											<li>Keyword research basics</li>
											<li>On-page SEO essentials</li>
											<li>Creating SEO-friendly content</li>
										</ul>
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="intermediate" className="mt-4">
								<Card>
									<CardHeader>
										<CardTitle>Advanced Techniques</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="list-disc pl-5 space-y-2">
											<li>Technical SEO audits</li>
											<li>Link building strategies</li>
											<li>Local SEO optimization</li>
											<li>Mobile SEO best practices</li>
										</ul>
									</CardContent>
								</Card>
							</TabsContent>
							<TabsContent value="advanced" className="mt-4">
								<Card>
									<CardHeader>
										<CardTitle>Expert Strategies</CardTitle>
									</CardHeader>
									<CardContent>
										<ul className="list-disc pl-5 space-y-2">
											<li>JavaScript SEO</li>
											<li>International SEO</li>
											<li>E-commerce SEO at scale</li>
											<li>AI and machine learning in SEO</li>
										</ul>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</section>

					<section className="space-y-8 text-center">
						<h2 className="text-3xl font-bold">Ready to Elevate Your SEO Game?</h2>
						<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Dive into our comprehensive documentation and start optimizing your website today.</p>
						<Button size="lg">Get Started Now</Button>
					</section>
				</main>
			</div>
		</SidebarPage>
	);
}
