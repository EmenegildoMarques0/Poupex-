import { BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseAnalyticsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					Análises do Curso
				</h2>
				<p className="text-muted-foreground">
					Visualize estatísticas e métricas de desempenho
				</p>
			</div>

			<Card>
				<CardContent className="flex flex-col items-center justify-center py-16 text-center">
					<BarChart3 className="h-16 w-16 text-muted-foreground/50 mb-4" />
					<h3 className="font-semibold text-xl mb-2">
						Análises em breve
					</h3>
					<p className="text-sm text-muted-foreground max-w-sm">
						Em breve você poderá visualizar estatísticas detalhadas
						sobre visualizações, conclusões e engajamento dos alunos
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
