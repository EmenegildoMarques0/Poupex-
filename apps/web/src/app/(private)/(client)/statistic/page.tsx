import { ChartBarInteractive } from "@/components/charts/chart-bar-interactive";
import { ChartBarMixed } from "@/components/charts/chart-bar-mixed";
import { ChartPieInteractive } from "@/components/charts/chart-pie-interactive";
import { InfoCard } from "@/components/statistic/info-card";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getMetricStats } from "@/core/actions/stats";
import type { MetricStats } from "@/core/schemas/stats";
import { getDayOfWeek } from "@/lib/formats/format-date";

export default async function StatisticPage() {
	const result = await getMetricStats();

	let data: MetricStats = {
		averages: {
			daily: "",
			monthly: "",
		},
		charts: {
			categoryChart: {
				labels: [],
				data: [],
			},
			monthlyChart: {
				labels: [],
				data: [],
			},
			dailyChart: {
				labels: [],
				data: [],
			},
			topCategoriesChart: {
				labels: [],
				data: [],
			},
		},
		forecast: {
			comparison: "",
			month: "",
			savings: "",
		},
		top: {
			category: "",
			day: "",
		},
		totals: {
			month: "",
			total: "",
			week: "",
		},
	};
	if (result.success) {
		data = result.data;
	}

	const labels: string[] = data.charts.categoryChart.labels;

	const myConfig = labels.reduce<
		Record<string, { label: string; color: string }>
	>((acc, label, idx) => {
		acc[label] = {
			label,
			color: `var(--chart-${idx + 1})`,
		};
		return acc;
	}, {});

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			<ChartBarInteractive
				title="Evolução Mensal"
				dataChart={{
					labels: data.charts.monthlyChart.labels ?? [],
					data: data.charts.monthlyChart.data ?? [],
				}}
				className="col-span-2 md:col-span-2 w-full min-h-[400px]"
			/>
			<ChartBarMixed
				title="Distribuição por Categoria"
				data={(data.charts.categoryChart.labels ?? []).map(
					(label, idx) => ({
						label,
						value: String(data.charts.categoryChart.data[idx] ?? 0),
					}),
				)}
				config={myConfig}
				className="max-md:col-span-2 w-full min-h-[400px]"
			/>

			<ChartPieInteractive
				title="Top Categorias"
				data={(data.charts.categoryChart.labels ?? []).map(
					(label, idx) => ({
						label,
						value: String(
							data.charts.categoryChart?.data[idx] ?? 0,
						),
					}),
				)}
				config={myConfig}
				className="max-md:col-span-2 w-full min-h-[400px]"
			/>

			<Card className="flex flex-col max-md:col-span-2">
				<CardHeader className="items-center pb-0">
					<CardTitle>Médias e Tendências</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="flex-1 pb-0 grid grid-cols-1 md:grid-cols-2 gap-4">
					<InfoCard
						title="Média Diária"
						value={data.averages.daily}
						subtitle="Últimos 30 dias"
					/>
					<InfoCard
						title="Média Mensal"
						value={data.averages.monthly}
						subtitle="Últimos 6 meses"
					/>
					<InfoCard
						title="Maior Categoria"
						value={`${data.top.category.match(/\(.*\)/)?.[0]}`}
						badge={data.top.category.split("(")[0]}
						subtitle="Mês atual"
					/>
					<InfoCard
						title="Maior Categoria"
						value={`${data.top.day.match(/\(.*\)/)?.[0]}`}
						badge={getDayOfWeek(Number(data.top.day.split("(")[0]))}
						subtitle="Últimos 30 dias"
					/>
				</CardContent>
			</Card>

			<Card className="flex flex-col max-md:col-span-2">
				<CardHeader className="items-center pb-0">
					<CardTitle>Previsões e Comparativos</CardTitle>
					<CardDescription />
				</CardHeader>
				<CardContent className="flex-1 pb-0 grid grid-cols-1 md:grid-cols-2 gap-4">
					<InfoCard
						title="Previsão Mês"
						value={data.forecast.month}
						subtitle="Baseado nos gastos atuais"
					/>
					<InfoCard
						title="Comparativo"
						value={data.forecast.comparison}
						subtitle="vs Mês Anterior"
					/>
					<InfoCard
						title="Economia Mensal"
						value={data.forecast.savings}
						subtitle="Baseado na média dos últimos 6 meses"
						className="md:col-span-2"
					/>
				</CardContent>
			</Card>
		</div>
	);
}
