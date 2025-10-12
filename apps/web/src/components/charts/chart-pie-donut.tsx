"use client"

import { Pie, PieChart } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

interface ChartPieDonutProps {
	title?: string;
	description?: string;
	data: { label: string; value: string }[]
	config?: ChartConfig
	className?: React.ComponentProps<"div">["className"]
}

export function ChartPieDonut({ title = "Gastos por Categoria", description, data, config, className }: ChartPieDonutProps) {
	const autoConfig: ChartConfig = data.reduce((acc, d, idx) => {
		acc[d.label] = {
			label: d.label,
			color: `var(--chart-${idx + 1})`,
		}
		return acc
	}, {} as ChartConfig)

  const chartConfig = config ?? autoConfig

	const chartData = data.map((d, idx) => ({
		name: d.label,
		value: Number(d.value),
		fill: chartConfig[d.label]?.color ?? `var(--chart-${idx + 1})`,
	}))

	return (
		<Card className={cn("flex flex-col", className)}>
			<CardHeader className="items-center pb-0">
				<CardTitle>{title}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[250px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="value"
							nameKey="name"
							innerRadius={60}
						/>
						<ChartLegend 
							content={<ChartLegendContent nameKey="name" />}
              				className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            			/>
          			</PieChart>
        		</ChartContainer>
      		</CardContent>
    	</Card>
  	)
}
