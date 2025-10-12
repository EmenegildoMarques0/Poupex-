"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer, ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

interface ChartBarMixedProps {
    title: string
    description?: string
    data: { label: string; value: string | number }[]
    config?: ChartConfig
    className?: React.ComponentProps<"div">["className"]
}

export function ChartBarMixed({ title, description, data, config, className }: ChartBarMixedProps) {
 
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
            data.map((d, idx) => {
                const value = Number(d.value);
                if (isNaN(value)) {
                    console.warn(`Valor inválido para ${d.label}: ${d.value}`);
                    return {
                        name: d.label,
                        value: 0,
                        fill: chartConfig[d.label]?.color ?? `var(--chart-${idx + 1})`,
                    };
                }
                return {
                    name: d.label,
                    value,
                    fill: chartConfig[d.label]?.color ?? `var(--chart-${idx + 1})`,
                };
            }),
        [data, chartConfig]
    );

    return (
        <Card className={cn("", className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    {/* <ResponsiveContainer width="100%" height="100%"> */}
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
                    {/* </ResponsiveContainer> */}
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
