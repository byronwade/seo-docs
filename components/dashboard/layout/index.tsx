import { DashboardSidebar } from "../sidebar";
import { DashboardTopNav } from "../nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen">
			<DashboardSidebar />
			<div className="flex-1 overflow-auto">
				<DashboardTopNav />
				<main className="p-6">{children}</main>
			</div>
		</div>
	);
}
