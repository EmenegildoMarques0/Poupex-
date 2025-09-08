"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"

interface ChartPieDonutProps {
  data: { label: string; value: string }[]
  config?: ChartConfig
}

export function ChartPieDonut({ data, config }: ChartPieDonutProps) {
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
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Gastos por Categoria</CardTitle>
				<CardDescription />
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
