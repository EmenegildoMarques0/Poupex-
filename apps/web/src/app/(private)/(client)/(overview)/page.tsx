import { ChartBarInteractive } from "@/components/charts/chart-bar-interactive";
import { ChartPieDonut } from "@/components/charts/chart-pie-donut";
import {
	CustomCard,
	CustomCardContent,
	CustomCardIcon,
} from "@/components/layout/custom-card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getMetricStats } from "@/core/actions/stats";
import type { MetricStats } from "@/core/schemas/stats";
import { METRICS_CARD_ITEMS } from "@/core/static/metric-card.static";

export default async function Home() {
	const result = await getMetricStats();
	let data: MetricStats = {
		totals: { week: "", month: "", total: "" },
		top: { category: "", day: "" },
		averages: { daily: "", monthly: "" },
		forecast: { comparison: "", month: "", savings: "" },
		charts: {
			categoryChart: { data: [], labels: [] },
			dailyChart: { data: [], labels: [] },
			monthlyChart: { data: [], labels: [] },
			topCategoriesChart: { data: [], labels: [] },
		},
	};

	if (result.success) {
		data = result.data;
	}

	const categoryChartData = (data.charts?.categoryChart?.labels ?? []).map(
		(label: string, i: number) => ({
			label,
			value: String(data.charts?.categoryChart?.data?.[i] ?? 0),
		}),
	);

	const dailyChartData = {
		labels: data.charts?.dailyChart?.labels ?? [],
		data: data.charts?.dailyChart?.data ?? [],
	};

	return (
		<div className="space-y-4">
			<header>
				<h1 className="text-2xl font-bold">Overview</h1>
			</header>

			<section className="space-y-2">
				<div className="flex items-center gap-2">
					<span>Estatísticas</span>
					<Select defaultValue="24h">
						<SelectTrigger className="min-w-32 p-0 px-2 text-sm text-neutral-500 border-none bg-transparent hover:bg-transparent dark:hover:bg-transparent dark:bg-transparent focus-visible:border-none">
							<SelectValue placeholder="Últimas 24 horas" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Intervalos</SelectLabel>
								<SelectItem value="24h">
									Últimas 24 horas
								</SelectItem>
								<SelectItem value="07days">
									Últimos 7 dias
								</SelectItem>
								<SelectItem value="15days">
									Últimos 15 dias
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{METRICS_CARD_ITEMS.map((item, idx) => {
						const value =
							idx === 0
								? data.totals.week
								: idx === 1
									? data.totals.month
									: data.totals.total;

						return (
							<CustomCard key={item.id}>
								<CustomCardIcon
									icon={item.icon}
									className={
										idx === 0
											? "text-green-600 bg-green-400/10"
											: idx === 1
												? "text-blue-600 bg-blue-400/10"
												: "text-amber-600 bg-amber-400/10"
									}
								/>
								<CustomCardContent
									title={item.title}
									value={value || "—"}
									description={item.description}
								/>
							</CustomCard>
						);
					})}
				</div>
			</section>

			<section className="grid md:grid-cols-3 gap-4">
				<ChartPieDonut data={categoryChartData} />
				<ChartBarInteractive
					variant="in-days"
					dataChart={dailyChartData}
				/>
			</section>
		</div>
	);
}
