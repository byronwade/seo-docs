'use client';
import SidebarPage from "@/components/components-sidebar";

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<SidebarPage>
			<div>
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
			</div>
		</SidebarPage>
	);
}