import { CustomCard, CustomCardContent, CustomCardIcon } from "@/components/layout/custom-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table";
import { Calendar } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select";

const METRICS_CARD_ITEMS = [
	{
		id: "1",
		title: "Total da Semana",
		value: 5634,
		icon: Calendar,
		description: "Últimos 7 dias"
	},
	{
		id: "2",
		title: "Total do Mês",
		value: 5634,
		icon: Calendar,
		description: "Mês atual"
	},
	{
		id: "3",
		title: "Total Geral",
		value: 5634,
		icon: Calendar,
		description: "Desde o início"
	},
]

export default function Home() {
    return (
        <div className="space-y-4">
            <div>
				<h1 className="text-2xl font-bold">Overview</h1>
			</div>
			<section className="space-y-2">
				<div className="flex items-center gap-2">
					<span>Estatisticas</span>
					 <Select>
						<SelectTrigger className="w-[135px] p-0 text-sm text-neutral-500 border-none bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent">
							<SelectValue defaultValue="24h" placeholder="Ultimas 24 horas" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
							<SelectLabel>Fruits</SelectLabel>
							<SelectItem value="24h">Ultimas 24 horas</SelectItem>
							<SelectItem value="07days">Ultimos 7 dias</SelectItem>
							<SelectItem value="15days">Ultimos 15 dias</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{METRICS_CARD_ITEMS.map((item, idx) => (
						<CustomCard.CustomCardRoot key={item.id}>
							<CustomCardIcon
								icon={item.icon}
								className={`${
									idx === 0
										? "text-green-600 bg-green-400/10"
										: idx === 1
											? "text-blue-600 bg-blue-400/10"
											: idx === 2
												? "text-amber-600 bg-amber-400/10"
												: idx === 3 &&
													"text-lime-600 bg-lime-400/10"
								}`}
							/>
							<CustomCardContent
								title={item.title}
								value={`${item.value} kz`.toString()}
								description={item.description}
							/>
						</CustomCard.CustomCardRoot>
					))}
				</div>
			</section>
			<section className="grid md:grid-cols-2 gap-4">
				<div className="p-4 min-h-96 rounded-xl bg-neutral-50 dark:bg-neutral-900">Gráfico 1</div>
				<div className="p-4 min-h-96 rounded-xl bg-neutral-50 dark:bg-neutral-900">Gráfico 2</div>
			</section>

			<section className="p-4 space-y-4 min-h-96 rounded-xl bg-neutral-50 dark:bg-neutral-900">
				<div>
					<h1 className="text-xl font-bold">Últimos Gastos</h1>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Índice</TableHead>
							<TableHead>Categoria</TableHead>
							<TableHead>Descrição</TableHead>
							<TableHead>Valor</TableHead>
							<TableHead>Data</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>1</TableCell>
							<TableCell>Alimentação</TableCell>
							<TableCell>Gastei com besteiras</TableCell>
							<TableCell>400,00 Kz</TableCell>
							<TableCell>19/08/2025</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</section>
        </div>
    )
}