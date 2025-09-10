"use client"

import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"

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
import { useMemo } from "react"

interface ChartBarMixedProps {
    title: string
    description?: string
    data: { label: string; value: string | number }[]
    config?: ChartConfig
}

export function ChartBarMixed({ title, description, data, config }: ChartBarMixedProps) {
 
    const autoConfig: ChartConfig = useMemo(() => {
        return data.reduce((acc, d, idx) => {
        acc[d.label] = {
            label: d.label,
            color: `var(--chart-${idx + 1})`,
        }
        return acc
        }, {} as ChartConfig)
    }, [data])

    const chartConfig = config ?? autoConfig

    const chartData = useMemo(
        () =>
            data.map((d, idx) => ({
                name: d.label,
                value: Number(d.value) || 0,
                fill: chartConfig[d.label]?.color ?? `var(--chart-${idx + 1})`,
            })),
        [data, chartConfig]
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            layout="vertical"
                            margin={{
                                right: 16,
                            }}
                        >
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                hide
                            />
                            <XAxis dataKey="value" type="number" hide />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Bar
                                dataKey="value"
                                layout="vertical"
                                fill="var(--color-desktop)"
                                radius={4}
                            >
                            {chartData.map((_, idx) => (
                                <LabelList key={`cell-${idx}`}
                                    dataKey="name"
                                    position="insideLeft"
                                    offset={8}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            ))}
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
