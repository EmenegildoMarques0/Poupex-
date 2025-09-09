import { ResponseStatistic } from "@/@types/statistic.type";
import { NotAuthenticatedSection } from "@/components/layout/not-authenticated-section";
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
            </section>
            <section className="p-4 space-y-4 min-h-96 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Top Categorias</h1>
				</div>
                Gráfico 3
            </section>

            <section className="p-4 space-y-4 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Médias e Tendências</h1>
				</div>
                <div className="grid md:grid-cols-2 gap-4">
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 md:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Média Diária</span>
                        <span className="text-2xl font-bold">187,80 Kz</span>
                        <span className="text-xs">Últimos 30 dias</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 md:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Média Mensal</span>
                        <span className="text-2xl font-bold">939,00 Kz</span>
                        <span className="text-xs">Últimos 6 meses</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 md:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <div className="space-x-4">
                        <span>Maior Categoria</span>
                        <Badge>Moradia</Badge>
                        </div>
                        <span className="text-2xl font-bold">(5 000,00 Kz)</span>
                        <span className="text-xs">Mês atual</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 md:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <div className="space-x-4">
                            <span>Dia Mais Gastador</span>
                        <Badge>sexta-feira</Badge>
                        </div>
                        <span className="text-2xl font-bold">(5 000,00 Kz)</span>
                        <span className="text-xs">Últimos 30 dias</span>
                    </section>
                </div>
            </section>
            <section className="p-4 space-y-4 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Previsões e Comparativos</h1>
				</div>
                <div className="grid md:grid-cols-2 gap-4">
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 md:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Previsão Mês</span>
                        <span className="text-2xl font-bold">7 938,82 Kz</span>
                        <span className="text-xs">Baseado nos gastos atuais</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 md:col-span-1 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                        <span>Comparativo</span>
                        <span className="text-2xl font-bold">0.0%</span>
                        <span className="text-xs">vs Mês Anterior</span>
                    </section>
                    <section className="p-4 flex flex-col items-center justify-center gap-2 col-span-2 min-h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                         <span>Economia Mensal</span>
                        <span className="text-2xl font-bold">93,90 Kz</span>
                        <span className="text-xs">Baseado na média dos últimos 6 meses</span>
                    </section>
                </div>
            </section>
            <pre>{JSON.stringify(data,null, 4)}</pre>
        </div>
    )
}