import OverviewClientContent from "@/components/layout/overview-client-content";

export default async function Home() {
	return (<div className="space-y-4">
		<header>
			<h1 className="text-2xl font-bold">Overview</h1>
		</header>
		<OverviewClientContent />
	</div>
	);
}
