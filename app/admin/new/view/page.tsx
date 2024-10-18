"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, Plus, Search, SortAsc, SortDesc, Trash2, AlertCircle, CheckCircle2, Settings, MoreHorizontal, Info } from "lucide-react";

// Mock data for demonstration
const initialData = [
	{ id: 1, title: "Home Page", slug: "home", content: "Welcome to our website", seoTitle: "Home | Our Website", seoDescription: "Welcome to our amazing website", seoImageFacebook: "home-fb.jpg", seoImageTwitter: "home-tw.jpg", lastModified: "2023-05-15" },
	{ id: 2, title: "About Us", slug: "about", content: "Learn about our company", seoTitle: "About Us | Our Website", seoDescription: "Learn about our company's history and values", seoImageFacebook: "about-fb.jpg", seoImageTwitter: "about-tw.jpg", lastModified: "2023-05-14" },
	{ id: 3, title: "Services", slug: "services", content: "Our services include...", seoTitle: "Our Services | Our Website", seoDescription: "Explore our range of professional services", seoImageFacebook: "services-fb.jpg", seoImageTwitter: "services-tw.jpg", lastModified: "2023-05-13" },
	{ id: 4, title: "Contact", slug: "contact", content: "Get in touch with us", seoTitle: "Contact Us | Our Website", seoDescription: "Contact us for inquiries and support", seoImageFacebook: "contact-fb.jpg", seoImageTwitter: "contact-tw.jpg", lastModified: "2023-05-12" },
	{ id: 5, title: "Blog", slug: "blog", content: "Read our latest articles", seoTitle: "Blog | Our Website", seoDescription: "Stay updated with our latest news and articles", seoImageFacebook: "blog-fb.jpg", seoImageTwitter: "blog-tw.jpg", lastModified: "2023-05-11" },
];

const allColumns = [
	{ key: "title", label: "Title" },
	{ key: "slug", label: "Slug" },
	{ key: "content", label: "Content" },
	{ key: "seoTitle", label: "SEO Title" },
	{ key: "seoDescription", label: "SEO Description" },
	{ key: "seoImageFacebook", label: "SEO Image (Facebook)" },
	{ key: "seoImageTwitter", label: "SEO Image (Twitter)" },
	{ key: "lastModified", label: "Last Modified" },
];

export default function AdminPanelComponent() {
	const [data, setData] = useState(initialData);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortColumn, setSortColumn] = useState("title");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [visibleColumns, setVisibleColumns] = useState(["title", "slug", "content"]);
	const itemsPerPage = 5;

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
		setCurrentPage(1);
	};

	const handleSort = (column: string) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const handleSelectItem = (id: number) => {
		setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
	};

	const handleSelectAll = () => {
		setSelectedItems(selectedItems.length === filteredData.length ? [] : filteredData.map((item) => item.id));
	};

	const handleDeleteSelected = () => {
		try {
			setData(data.filter((item) => !selectedItems.includes(item.id)));
			setSelectedItems([]);
			setSuccessMessage("Selected items deleted successfully");
			setTimeout(() => setSuccessMessage(null), 3000);
		} catch (error) {
			setErrorMessage("Failed to delete selected items");
			setTimeout(() => setErrorMessage(null), 3000);
		}
	};

	const toggleColumn = (columnKey: string) => {
		setVisibleColumns((prev) => (prev.includes(columnKey) ? prev.filter((key) => key !== columnKey) : [...prev, columnKey]));
	};

	const filteredData = data.filter((item) => Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())));

	const sortedData = [...filteredData].sort((a, b) => {
		if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
		if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
		return 0;
	});

	const pageCount = Math.ceil(sortedData.length / itemsPerPage);
	const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<div className="container mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
			{successMessage && (
				<Alert variant="default" className="bg-green-500">
					<CheckCircle2 className="h-4 w-4" />
					<AlertTitle className="font-bold">Success</AlertTitle>
					<AlertDescription>{successMessage}</AlertDescription>
				</Alert>
			)}
			{errorMessage && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle className="font-bold">Error</AlertTitle>
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			)}
			<div className="space-y-6">
				<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
					<div className="w-full md:w-1/3">
						<Input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} className="w-full bg-white" />
					</div>
					<div className="flex gap-2">
						<Link href="/add" passHref>
							<Button size="sm">
								<Plus className="h-4 w-4 mr-1" />
								Add New
							</Button>
						</Link>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="bg-white" variant="outline" size="sm">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={handleDeleteSelected} disabled={selectedItems.length === 0}>
									<Trash2 className="h-4 w-4 mr-2" />
									Delete Selected
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Settings className="h-4 w-4 mr-2" />
									Customize Columns
								</DropdownMenuItem>
								{allColumns.map((column) => (
									<DropdownMenuCheckboxItem key={column.key} checked={visibleColumns.includes(column.key)} onCheckedChange={() => toggleColumn(column.key)}>
										{column.label}
									</DropdownMenuCheckboxItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
				<div className="rounded-md border bg-white">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/50">
								<TableHead className="w-[40px] p-0">
									<div className="h-[40px] flex items-center justify-center">
										<Checkbox checked={selectedItems.length === filteredData.length && filteredData.length > 0} onCheckedChange={handleSelectAll} className="translate-y-[2px]" />
									</div>
								</TableHead>
								{allColumns.map(
									(column) =>
										visibleColumns.includes(column.key) && (
											<TableHead key={column.key} onClick={() => handleSort(column.key)} className="cursor-pointer font-medium text-primary">
												<div className="flex items-center">
													{column.label}
													{sortColumn === column.key && (sortDirection === "asc" ? <SortAsc className="ml-1 h-3 w-3" /> : <SortDesc className="ml-1 h-3 w-3" />)}
												</div>
											</TableHead>
										)
								)}
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginatedData.length === 0 ? (
								<TableRow>
									<TableCell colSpan={visibleColumns.length + 1} className="h-24 text-center">
										No items found.
									</TableCell>
								</TableRow>
							) : (
								paginatedData.map((item) => (
									<TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
										<TableCell className="p-0">
											<div className="h-[40px] flex items-center justify-center">
												<Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={() => handleSelectItem(item.id)} className="translate-y-[2px]" />
											</div>
										</TableCell>
										{allColumns.map(
											(column) =>
												visibleColumns.includes(column.key) && (
													<TableCell key={column.key}>
														{column.key === "title" ? (
															<Link href={`/edit-item/${item.id}`} className="text-blue-600 hover:underline">
																{item[column.key]}
															</Link>
														) : column.key === "slug" ? (
															<div className="flex items-center">
																<span className="text-sm mr-2">{item[column.key]}</span>
																<Popover>
																	<PopoverTrigger>
																		<Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
																	</PopoverTrigger>
																	<PopoverContent className="w-64">
																		<h3 className="font-semibold mb-2">Page URL</h3>
																		<p className="text-sm mb-2">
																			<Link href={`/${item.slug}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
																				https://yourwebsite.com/{item.slug}
																			</Link>
																		</p>
																		<p className="text-sm">Click to view the live page</p>
																	</PopoverContent>
																</Popover>
															</div>
														) : (
															<span className="text-sm">{item[column.key]}</span>
														)}
													</TableCell>
												)
										)}
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
				<div className="flex justify-between items-center mt-4">
					<div className="text-sm text-muted-foreground">
						Showing {sortedData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
					</div>
					<div className="flex space-x-2">
						<Button className="bg-white" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} variant="outline" size="sm">
							<ChevronLeft className="h-4 w-4" />
						</Button>
						{Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
							<Button key={page} onClick={() => setCurrentPage(page)} variant={currentPage === page ? "default" : "outline"} size="sm">
								{page}
							</Button>
						))}
						<Button className="bg-white" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount || pageCount === 0} variant="outline" size="sm">
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
