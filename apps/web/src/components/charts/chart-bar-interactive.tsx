"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"

const chartConfig = {
	value: {
		label: "Valor",
		color: "var(--chart-1)",
	},
} satisfies ChartConfig

type Variant = "in-days" | "in-weeks" | "in-months"

interface ChartBarInteractiveProps {
	dataChart: {
		labels: string[]
		data: (string | number)[]
	}
  title?: string
  description?: string
  variant?: Variant
}

export function ChartBarInteractive({
	dataChart,
	title,
	description,
	variant = "in-months",
}: ChartBarInteractiveProps) {
	const chartData = React.useMemo(() => {
		return dataChart.labels.map((label, idx) => {
		let formattedLabel = label
		if (variant === "in-months") {
			const [m, y] = label.split("/")
			formattedLabel = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("pt-BR", {
				month: "short",
				year: "numeric",
			})
		} else if (variant === "in-days") {
			const [day, month, year] = label.split("/")
			formattedLabel = new Date(Number(year), Number(month) - 1, Number(day)).toLocaleDateString("pt-BR", {
				day: "2-digit",
				month: "short",
			})
		} else if (variant === "in-weeks") {
			const start = new Date(label)
			const end = new Date(start)
			end.setDate(start.getDate() + 6)
			formattedLabel = `${start.toLocaleDateString("pt-BR", {
				day: "2-digit",
				month: "short",
			})} - ${end.toLocaleDateString("pt-BR", {
				day: "2-digit",
				month: "short",
			})}`
		}
		return {
			label: formattedLabel,
			value: Number(dataChart.data[idx] ?? 0),
		}
		})
	}, [dataChart, variant])

	const total = React.useMemo(() => chartData.reduce((acc, curr) => acc + curr.value, 0), [chartData])

	const autoTitle =
		title ??
			(variant === "in-days"
				? "Gastos Diários"
					: variant === "in-weeks"
						? "Gastos Semanais"
							: "Gastos Mensais")

	const autoDescription =
		description ??
			(variant === "in-days"
				? "Últimos dias"
					: variant === "in-weeks"
						? "Últimas semanas"
							: "Últimos meses")

	return (
		<Card className="py-0 md:col-span-2">
			<CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
					<CardTitle>{autoTitle}</CardTitle>
					<CardDescription>{autoDescription}</CardDescription>
				</div>
				<div className="flex">
					<div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:px-8 sm:py-6">
						<span className="text-muted-foreground text-xs">
							{chartConfig.value.label}
						</span>
						<span className="text-lg leading-none font-bold sm:text-3xl">
							{total.toLocaleString("pt-BR")}
						</span>
					</div>
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="label"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
						/>
						<ChartTooltip
							content={<ChartTooltipContent className="w-[150px]" nameKey="value" />}
						/>
						<Bar dataKey="value" fill="var(--color-value)" />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
  	)
}
