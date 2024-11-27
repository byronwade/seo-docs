'use client';

import { PageLayout } from "@/components/shared/layout";

export default function Error({ reset }: { error: Error; reset: () => void }) {
	return (
		<PageLayout noRightSidebar>
			<div>
				<h2>Something went wrong!</h2>
				<button onClick={() => reset()}>Try again</button>
			</div>
		</PageLayout>
	);
}