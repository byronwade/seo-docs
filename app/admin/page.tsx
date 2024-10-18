'use client'

import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { deleteContentType, createPage, updatePage, deletePage, createPost, updatePost, deletePost } from "../actions";
import Link from "next/link";

export default function ContentManagement() {
	const [activeTab, setActiveTab] = useState("content-types");
	const [editingId, setEditingId] = useState<number | null>(null);
	const [formData, setFormData] = useState<{
		title?: string;
		slug?: string;
		content?: string;
		contentTypeId?: string;
		author?: string;
	}>({});
	const [contentTypes, setContentTypes] = useState([]);
	const [pages, setPages] = useState([]);
	const [posts, setPosts] = useState([]);
	const { toast } = useToast();
	const [isEditing, setIsEditing] = useState(false);
	const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

	useEffect(() => {
		fetchContentTypes();
		fetchPages();
		fetchPosts();
	}, []);

	const fetchContentTypes = async () => {
		const response = await fetch("/api/content-types");
		const data = await response.json();
		setContentTypes(data);
	};

	const fetchPages = async () => {
		const response = await fetch("/api/pages");
		const data = await response.json();
		setPages(data);
	};

	const fetchPosts = async () => {
		const response = await fetch("/api/posts");
		const data = await response.json();
		setPosts(data);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCreate = () => {
		setFormData({});
		setEditingId(null);
		setIsEditing(false);
	};

	const handleEdit = async (type: "pages" | "posts", id: number) => {
		const item = type === "pages" ? pages.find((p) => p.id === id) : posts.find((p) => p.id === id);
		if (item) {
			setFormData({
				...item,
				contentTypeId: item.contentTypeId?.toString(),
			});
			setEditingId(id);
			setIsEditing(true);
		}
	};

	const handleSubmit = async (type: "pages" | "posts") => {
		try {
			console.log("Submitting form:", { type, editingId, formData });

			const requiredFields = ["title", "slug", "content", "contentTypeId", "author"];
			const missingFields = requiredFields.filter((field) => !formData[field]);

			if (missingFields.length > 0) {
				throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
			}

			const data = {
				...formData,
				id: editingId,
				contentType: {
					connect: { id: parseInt(formData.contentTypeId) },
				},
			};

			let result;
			if (type === "pages") {
				result = editingId ? await updatePage(data) : await createPage(data);
			} else if (type === "posts") {
				result = editingId ? await updatePost(data) : await createPost(data);
			}

			if (result.error) {
				throw new Error(result.error);
			}

			showNotification("success", `${type} ${editingId ? "updated" : "created"} successfully`);

			// Refresh the list of pages or posts
			if (type === "pages") fetchPages();
			else if (type === "posts") fetchPosts();

			// Reset form after successful submission
			setFormData({});
		} catch (error) {
			console.error("Error in handleSubmit:", error);
			showNotification("error", error instanceof Error ? error.message : "An unexpected error occurred");
		}
	};

	const handleDelete = async (type: "content-types" | "pages" | "posts", id: number) => {
		try {
			let result;
			if (type === "content-types") {
				result = await deleteContentType(id);
			} else if (type === "pages") {
				result = await deletePage(id);
			} else if (type === "posts") {
				result = await deletePost(id);
			}

			if (result.error) {
				throw new Error(result.error);
			}

			showNotification("success", `${type} deleted successfully`);

			// Refresh the data
			if (type === "content-types") {
				fetchContentTypes();
			} else if (type === "pages") {
				fetchPages();
			} else if (type === "posts") {
				fetchPosts();
			}

			setEditingId(null);
			setFormData({});
		} catch (error) {
			console.error("Error in handleDelete:", error);
			showNotification("error", error instanceof Error ? error.message : "An unexpected error occurred");
		}
	};

	const getItemLink = (item: any, type: string) => {
		const contentType = contentTypes.find((ct: any) => ct.id === item.contentTypeId);
		return `${process.env.NEXT_PUBLIC_DOMAIN}/${contentType?.slug}/${item.slug}`;
	};

	const showNotification = (type: "success" | "error", message: string) => {
		setNotification({ type, message });
		setTimeout(() => setNotification(null), 5000); // Hide notification after 5 seconds
	};

	return (
		<div className="container mx-auto p-4">
			{notification && <div className={`mb-4 p-4 rounded ${notification.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{notification.message}</div>}
			<h1 className="text-2xl font-bold mb-4">Content Management System</h1>
			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList>
					<TabsTrigger value="content-types">Content Types</TabsTrigger>
					<TabsTrigger value="pages">Pages</TabsTrigger>
					<TabsTrigger value="posts">Posts</TabsTrigger>
				</TabsList>
				<TabsContent value="content-types">
					<h2 className="text-xl font-semibold mb-2">Content Types</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							// Add logic to handle content type submission
						}}
						className="space-y-4 mb-4"
					>
						<div>
							<Label htmlFor="name">Name</Label>
							<Input id="name" name="name" value={formData.name || ""} onChange={handleInputChange} required />
						</div>
						<div>
							<Label htmlFor="slug">Slug</Label>
							<Input id="slug" name="slug" value={formData.slug || ""} onChange={handleInputChange} required />
						</div>
						<Button type="submit">{editingId ? "Update" : "Create"} Content Type</Button>
					</form>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Slug</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{contentTypes.map((contentType: any) => (
								<TableRow key={contentType.id}>
									<TableCell>{contentType.name}</TableCell>
									<TableCell>{contentType.slug}</TableCell>
									<TableCell>
										<Button variant="outline" size="sm" onClick={() => handleEdit("content-types", contentType.id)} className="mr-2">
											Edit
										</Button>
										<Button variant="destructive" size="sm" onClick={() => handleDelete("content-types", contentType.id)}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TabsContent>
				<TabsContent value="pages">
					<h2 className="text-xl font-semibold mb-2">Pages</h2>
					<Button onClick={handleCreate} className="mb-4">
						Create New Page
					</Button>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit("pages");
						}}
						className="space-y-4 mb-4"
					>
						<div>
							<Label htmlFor="title">Title</Label>
							<Input id="title" name="title" value={formData.title || ""} onChange={handleInputChange} required />
						</div>
						<div>
							<Label htmlFor="slug">Slug</Label>
							<Input id="slug" name="slug" value={formData.slug || ""} onChange={handleInputChange} required />
						</div>
						<div>
							<Label htmlFor="author">Author</Label>
							<Input id="author" name="author" value={formData.author || ""} onChange={handleInputChange} required />
						</div>
						<div>
							<Label htmlFor="content">Content</Label>
							<textarea id="content" name="content" value={formData.content || ""} onChange={handleInputChange} className="w-full h-64 p-2 border rounded" required />
						</div>
						<div>
							<Label htmlFor="contentTypeId">Content Type</Label>
							<Select name="contentTypeId" value={formData.contentTypeId || ""} onValueChange={(value) => setFormData((prev) => ({ ...prev, contentTypeId: value }))}>
								<SelectTrigger>
									<SelectValue placeholder="Select a content type" />
								</SelectTrigger>
								<SelectContent>
									{contentTypes.map((ct: any) => (
										<SelectItem key={ct.id} value={ct.id.toString()}>
											{ct.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<Button type="submit">{isEditing ? "Update" : "Create"} Page</Button>
					</form>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Slug</TableHead>
								<TableHead>Content Type</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pages.map((page: any) => (
								<TableRow key={page.id}>
									<TableCell>{page.title}</TableCell>
									<TableCell>{page.slug}</TableCell>
									<TableCell>{contentTypes.find((ct: any) => ct.id === page.contentTypeId)?.name}</TableCell>
									<TableCell>
										<Button variant="outline" size="sm" onClick={() => handleEdit("pages", page.id)} className="mr-2">
											Edit
										</Button>
										<Button variant="destructive" size="sm" onClick={() => handleDelete("pages", page.id)} className="mr-2">
											Delete
										</Button>
										<Link href={getItemLink(page, "pages")} target="_blank" passHref>
											<Button variant="link" size="sm">
												Open
											</Button>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TabsContent>
				<TabsContent value="posts">
					<h2 className="text-xl font-semibold mb-2">Posts</h2>
					<Button onClick={handleCreate} className="mb-4">
						Create New Post
					</Button>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit("posts");
						}}
						className="space-y-4 mb-4"
					>
						<div>
							<Label htmlFor="title">Title</Label>
							<Input id="title" name="title" value={formData.title || ""} onChange={handleInputChange} required />
						</div>
						<div>
							<Label htmlFor="slug">Slug</Label>
							<Input id="slug" name="slug" value={formData.slug || ""} onChange={handleInputChange} required />
						</div>
						<div>
							<Label htmlFor="content">Content</Label>
							<textarea id="content" name="content" value={formData.content || ""} onChange={handleInputChange} className="w-full h-64 p-2 border rounded" required />
						</div>
						<div>
							<Label htmlFor="contentTypeId">Content Type</Label>
							<Select name="contentTypeId" value={formData.contentTypeId || ""} onValueChange={(value) => setFormData((prev) => ({ ...prev, contentTypeId: value }))}>
								<SelectTrigger>
									<SelectValue placeholder="Select a content type" />
								</SelectTrigger>
								<SelectContent>
									{contentTypes.map((ct: any) => (
										<SelectItem key={ct.id} value={ct.id.toString()}>
											{ct.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<Button type="submit">{isEditing ? "Update" : "Create"} Post</Button>
					</form>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Slug</TableHead>
								<TableHead>Content Type</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{posts.map((post: any) => (
								<TableRow key={post.id}>
									<TableCell>{post.title}</TableCell>
									<TableCell>{post.slug}</TableCell>
									<TableCell>{contentTypes.find((ct: any) => ct.id === post.contentTypeId)?.name}</TableCell>
									<TableCell>
										<Button variant="outline" size="sm" onClick={() => handleEdit("posts", post.id)} className="mr-2">
											Edit
										</Button>
										<Button variant="destructive" size="sm" onClick={() => handleDelete("posts", post.id)} className="mr-2">
											Delete
										</Button>
										<Link href={getItemLink(post, "posts")} target="_blank" passHref>
											<Button variant="link" size="sm">
												Open
											</Button>
										</Link>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TabsContent>
			</Tabs>
		</div>
	);
}
