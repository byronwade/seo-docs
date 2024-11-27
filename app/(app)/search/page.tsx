import React from "react";
import SidebarPage from "@/components/components-sidebar";

const BlogPage = () => {
	return (
		<SidebarPage noRightSidebar isAISummary={false}>
			<div>
				<h1>Search</h1>
			</div>
		</SidebarPage>
	);
};

export default BlogPage;
