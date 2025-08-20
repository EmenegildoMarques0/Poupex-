import { CustomCard, CustomCardContent, CustomCardIcon } from "./_components/custom-card";

const METRICS_CARD_ITEMS = [
	{
		id: "1",
		title: "Total da Semana",
		value: 5634,
		icon: Home
	},
	{
		id: "2",
		title: "Total da Semana",
		value: 5634,
		icon: Home
	},
	{
		id: "3",
		title: "Total Geral",
		value: 5634,
		icon: Home
	},
]

export default function Home() {
	return <div>

		<div>
			<h1 className="text-2xl font-bold">Overview</h1>
		</div>
		<div>
			<div>
				<span>Estatisticas</span>
				<span>Ultimas 24 horas</span>
			</div>
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
				{METRICS_CARD_ITEMS.map((item, idx) => (
					<CustomCard key={item.id}>
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
							value={item.value.toString()}
							description={"dsdsd"}
						/>
					</CustomCard>
				))}
			</div>
		</div>
		Home Page</div>;
}
