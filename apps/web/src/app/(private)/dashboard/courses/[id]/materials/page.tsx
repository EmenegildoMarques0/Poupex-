import { FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CourseMaterialsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					Materiais do Curso
				</h2>
				<p className="text-muted-foreground">
					Gerencie materiais complementares e recursos
				</p>
			</div>

			<Card>
				<CardContent className="flex flex-col items-center justify-center py-16 text-center">
					<FileText className="h-16 w-16 text-muted-foreground/50 mb-4" />
					<h3 className="font-semibold text-xl mb-2">
						Biblioteca de materiais em breve
					</h3>
					<p className="text-sm text-muted-foreground max-w-sm">
						Em breve você poderá adicionar PDFs, documentos, slides
						e outros materiais complementares ao curso
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
