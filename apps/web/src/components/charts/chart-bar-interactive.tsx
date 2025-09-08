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

interface ChartBarInteractiveProps {
  /** labels: ["04/2025",...], data: [0,0,...] */
  monthlyChart: {
    labels: string[]
    data: (string | number)[]
  }
  title?: string
  description?: string
}

export function ChartBarInteractive({
  monthlyChart,
  title = "Gastos Mensais",
  description = "Últimos meses",
}: ChartBarInteractiveProps) {
  // monta [{label, value}] já formatando mês
  const chartData = React.useMemo(() => {
    return monthlyChart.labels.map((label, idx) => {
      // transforma "04/2025" em "Abr/2025"
      const [m, y] = label.split("/")
      const monthName = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString(
        "pt-BR",
        { month: "short", year: "numeric" }
      )
      return {
        label: monthName,
        value: Number(monthlyChart.data[idx] ?? 0),
      }
    })
  }, [monthlyChart])

  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData]
  )

  return (
    <Card className="py-0 md:col-span-2">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              {chartConfig.value.label}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
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
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="value"
                />
              }
            />
            <Bar dataKey="value" fill="var(--color-value)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
