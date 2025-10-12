import { ChartBarInteractive } from "@/components/charts/chart-bar-interactive";
import { ChartBarMixed } from "@/components/charts/chart-bar-mixed";
import { ChartPieInteractive } from "@/components/charts/chart-pie-interactive";
import { NotAuthenticatedSection } from "@/components/layout/not-authenticated-section";
import { InfoCard } from "@/components/statistic/info-card";
import { getDayOfWeek } from "@/lib/formats/format-date";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { cookies } from "next/headers";

export default async function StatisticPage() {
    const token = (await cookies()).get("ppx-auth.session-token")?.value;
            
    if (!token) {
        return <NotAuthenticatedSection />;
    }
        
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/stats`;
    
    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        // cache: "no-store",
        next: {
            tags: ["get-statistic"],
            revalidate: 60 // 01 min
        }
    });
    
    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return <p>Erro ao carregar os dados</p>;
    }
    
    const data = await response.json();

    const myConfig: ChartConfig = data.data.charts.categoryChart.labels.reduce((acc, label, idx) => {
        acc[label] = {
            label,
            color: `var(--chart-${idx + 1})`,
        }
        return acc
    }, {} as ChartConfig)

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartBarInteractive 
                title="Evolução Mensal"
                dataChart={{
                    labels: data.data.charts.monthlyChart.labels ?? [],
					data: data.data.charts.monthlyChart.data ?? []
                }}
                className="col-span-2 md:col-span-2 w-full min-h-[400px]"
            />

            <ChartBarMixed 
                title="Distribuição por Categoria" 
                data={(data?.data?.charts?.categoryChart?.labels ?? []).map((label, idx) => ({
                    label,
                    value: String(data?.data?.charts?.categoryChart?.data?.[idx] ?? 0)
                }))}
                config={myConfig}
                className="max-md:col-span-2 w-full min-h-[400px]"
            />

            <ChartPieInteractive 
                title="Top Categorias"
                data={(data?.data?.charts?.categoryChart?.labels ?? []).map((label, idx) => ({
                    label,
                    value: String(data?.data?.charts?.categoryChart?.data?.[idx] ?? 0)
                }))}
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
                        value={data.data.averages.daily}
                        subtitle="Últimos 30 dias"
                    />
                    <InfoCard
                        title="Média Mensal"
                        value={data.data.averages.monthly}
                        subtitle="Últimos 6 meses"
                    />
                    <InfoCard
                        title="Maior Categoria"
                        value={`${data.data.top.category.match(/\(.*\)/)?.[0]}`}
                        badge={data.data.top.category.split("(")[0]}
                        subtitle="Mês atual"
                    />
                    <InfoCard
                        title="Maior Categoria"
                        value={`${data.data.top.day.match(/\(.*\)/)?.[0]}`}
                        badge={getDayOfWeek(Number(data.data.top.day.split("(")[0]))}
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
                        value={data.data.forecast.month}
                        subtitle="Baseado nos gastos atuais"
                    />
                    <InfoCard
                        title="Comparativo"
                        value={data.data.forecast.comparison}
                        subtitle="vs Mês Anterior"
                    />
                    <InfoCard
                        title="Economia Mensal"
                        value={data.data.forecast.savings}
                        subtitle="Baseado na média dos últimos 6 meses"
                        className="md:col-span-2"
                    />
                </CardContent>
            </Card>
        </div>
    )
}