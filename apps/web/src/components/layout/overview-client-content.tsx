"use client";

import useSWR from "swr";
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { METRICS_CARD_ITEMS } from "@/core/static/metric-card.static";
import type { MetricStats } from "@/core/schemas/stats";
import { parseCookies } from "nookies";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats`;

const fetcher = async (url: string) => {
    const { "ppx-auth.session-token": token } = parseCookies();
    if (!token) {
        return;
    }
    try {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }, cache: "no-store"
        });
        if (!res.ok) throw new Error(`Erro ${res.status}: falha ao obter dados.`);
        return res.json();
    } catch (err) {
        throw new Error("Servidor indisponível. Verifique a conexão.");
    }
};

const defaultData: MetricStats = {
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

export default function HomeContent() {
    const [reloading, setReloading] = useState(false);
    const { data, error, isValidating, mutate } = useSWR(API_URL, fetcher, {
        refreshInterval: 10000,
        revalidateOnFocus: true,
        fallbackData: defaultData,
    });

    const safeData: MetricStats = data?.success ? data.data : defaultData;

    const handleReload = async () => {
        setReloading(true);
        try {
            await mutate();
        } finally {
            setReloading(false);
        }
    };

    const categoryChartData = (safeData.charts?.categoryChart?.labels ?? []).map(
        (label: string, i: number) => ({
            label,
            value: String(safeData.charts?.categoryChart?.data?.[i] ?? 0),
        })
    );

    const dailyChartData = {
        labels: safeData.charts?.dailyChart?.labels ?? [],
        data: safeData.charts?.dailyChart?.data ?? [],
    };

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span>Estatísticas</span>
                    <Select defaultValue="24h">
                        <SelectTrigger className="w-[140px] p-0 text-sm text-neutral-500 border-none bg-transparent hover:bg-transparent dark:bg-transparent">
                            <SelectValue placeholder="Últimas 24 horas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Intervalos</SelectLabel>
                                <SelectItem value="24h">Últimas 24 horas</SelectItem>
                                <SelectItem value="07days">Últimos 7 dias</SelectItem>
                                <SelectItem value="15days">Últimos 15 dias</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">

                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleReload}
                        disabled={reloading}
                        title="Atualizar estatísticas"
                    >
                        <RotateCw
                            size={16}
                            className={reloading ? "animate-spin text-primary" : ""}
                        />
                    </Button>

                    {isValidating && (
                        <span className="text-xs text-muted-foreground animate-pulse">
                            Atualizando...
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <div className="flex items-center justify-between bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg">
                    <p className="text-sm">⚠️ {error.message}</p>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={handleReload}
                        disabled={reloading}
                        className="flex items-center gap-1 text-red-600 border-red-300 hover:bg-red-100"
                    >
                        <RotateCw size={14} className={reloading ? "animate-spin" : ""} />
                        {reloading ? "Recarregando..." : "Recarregar"}
                    </Button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {METRICS_CARD_ITEMS.map((item, idx) => {
                    const value =
                        idx === 0
                            ? safeData.totals.week
                            : idx === 1
                                ? safeData.totals.month
                                : safeData.totals.total;

                    return (
                        <CustomCard.CustomCardRoot key={item.id}>
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
                        </CustomCard.CustomCardRoot>
                    );
                })}
            </div>

            <section className="grid md:grid-cols-3 gap-4">
                <ChartPieDonut data={categoryChartData} />
                <ChartBarInteractive variant="in-days" dataChart={dailyChartData} />
            </section>
        </section>
    );
}
