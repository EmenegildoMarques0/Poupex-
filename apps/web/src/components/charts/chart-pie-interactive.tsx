"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { cn } from "@workspace/ui/lib/utils"

export const description = "An interactive pie chart"

interface ChartPieInteractiveProps {
    title: string
    description?: string
    data: { label: string; value: string | number }[]
    config?: ChartConfig
    className?: React.ComponentProps<"div">["className"]
}

export function ChartPieInteractive({ title, description, data, config, className }: ChartPieInteractiveProps) {
    const autoConfig: ChartConfig = React.useMemo(() => {
        return data.reduce((acc, d, idx) => {
            acc[d.label] = {
                label: d.label,
                color: `var(--chart-${idx + 1})`,
            }
            return acc
        }, {} as ChartConfig)
    }, [data])
    
    const chartConfig = config ?? autoConfig

    const chartData = React.useMemo(
        () =>
            data.map((d, idx) => ({
                name: d.label,
                value: Number(d.value) || 0,
                fill: chartConfig[d.label]?.color ?? `var(--chart-${idx + 1})`,
            })),
        [data, chartConfig]
    )

    const id = "pie-interactive"
    const [activeMonth, setActiveMonth] = React.useState(data[0]?.label)

    const activeIndex = React.useMemo(
        () => data.findIndex((item) => item.label === activeMonth),
        [activeMonth]
    )
    
    const categories = React.useMemo(() => data.map((item) => item.label), [])

    return (
        <Card data-chart={id} className={cn("flex flex-col", className)}>
            <ChartStyle id={id} config={chartConfig} />
            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </div>
                <Select value={activeMonth} onValueChange={setActiveMonth}>
                <SelectTrigger
                    className="ml-auto h-7 w-[150px] rounded-lg pl-2.5"
                    aria-label="Select a value"
                >
                    <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-xl">
                    {categories.map((key) => {
                    const config = chartConfig[key as keyof typeof chartConfig]

                    if (!config) {
                        return null
                    }

                    return (
                        <SelectItem
                            key={key}
                            value={key}
                            className="rounded-lg [&_span]:flex"
                        >
                        <div className="flex items-center gap-2 text-xs">
                            <span
                            className="flex h-3 w-3 shrink-0 rounded-xs"
                            style={{
                                backgroundColor: `var(--color-${key})`,
                            }}
                            />
                            {config?.label}
                        </div>
                        </SelectItem>
                    )
                    })}
                </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer
                    id={id}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[300px]"
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
                            innerRadius={70}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-lg m-2 font-bold"
                                                >
                                                    {chartData[activeIndex]?.name}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Categorias
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
