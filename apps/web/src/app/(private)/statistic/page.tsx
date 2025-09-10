import { ResponseStatistic } from "@/@types/statistic.type";
import { NotAuthenticatedSection } from "@/components/layout/not-authenticated-section";
import { getDayOfWeek } from "@/lib/formats/format-date";
import { Badge } from "@workspace/ui/components/badge";
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
    
    const data: ResponseStatistic = await response.json();

    return (
        <div className="grid md:grid-cols-2 gap-4">
            <section className="p-4 col-span-2 space-y-4 min-h-96 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Evolução Mensal</h1>
				</div>

                Grafico 1
            </section>

            <section className="p-4 space-y-4 min-h-96 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Distribuição por Categoria</h1>
				</div>
                Gráfico 2
                <pre>{JSON.stringify(data.data.charts.categoryChart,null, 4)}</pre>
            </section>
            <section className="p-4 space-y-4 min-h-96 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Top Categorias</h1>
				</div>
                Gráfico 3
                <pre>{JSON.stringify(data.data.charts.topCategoriesChart,null, 4)}</pre>
            </section>

            <section className="p-4 space-y-4 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Médias e Tendências</h1>
				</div>
                <div className="grid md:grid-cols-2 gap-4">
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 lg:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Média Diária</span>
                        <span title={data.data.averages.daily} className="text-xl font-bold truncate max-w-[12rem]">{data.data.averages.daily}</span>
                        <span className="text-xs">Últimos 30 dias</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 lg:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Média Mensal</span>
                        <span title={data.data.averages.monthly} className="text-xl font-bold truncate max-w-[12rem]">{data.data.averages.monthly}</span>
                        <span className="text-xs">Últimos 6 meses</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 lg:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <div className="space-x-4">
                        <span>Maior Categoria</span>
                        <Badge>{data.data.top.category.split("(")[0]}</Badge>
                        </div>
                        <span title={data.data.top.category.match(/\(.*\)/)?.[0]} className="text-xl font-bold truncate max-w-[12rem]">
                            {data.data.top.category.match(/\(.*\)/)?.[0]}
                        </span>
                        <span className="text-xs">Mês atual</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 lg:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <div className="space-x-4">
                            <span>Dia Mais Gastador</span>
                            <Badge>{getDayOfWeek(Number(data.data.top.day.split("(")[0]))}</Badge>
                        </div>
                        <span title={data.data.top.day.match(/\(.*\)/)?.[0]} className="text-xl font-bold truncate max-w-[12rem]">{data.data.top.day.match(/\(.*\)/)?.[0]}</span>
                        <span className="text-xs">Últimos 30 dias</span>
                    </section>
                </div>
            </section>
            <section className="p-4 space-y-4 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Previsões e Comparativos</h1>
				</div>
                <div className="grid md:grid-cols-2 gap-4">
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 lg:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Previsão Mês</span>
                        <span title={data.data.forecast.month} className="text-xl font-bold truncate max-w-[12rem]">
                            {data.data.forecast.month}
                        </span>
                        <span className="text-xs">Baseado nos gastos atuais</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 lg:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Comparativo</span>
                        <span title={data.data.forecast.comparison} className="text-xl font-bold truncate max-w-[12rem]">
                            {data.data.forecast.savings}
                        </span>
                        <span className="text-xs">vs Mês Anterior</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                         <span>Economia Mensal</span>
                        <span title={data.data.forecast.savings} className="text-xl font-bold truncate max-w-[12rem]">
                            {data.data.forecast.savings}
                        </span>
                        <span className="text-xs">Baseado na média dos últimos 6 meses</span>
                    </section>
                </div>
            </section>
        </div>
    )
}