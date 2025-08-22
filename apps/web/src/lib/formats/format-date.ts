import { formatDistance as fnDist } from "date-fns";
import { ptBR } from "date-fns/locale";
export function formatDate(date: string | Date): string {
	return fnDist(new Date(date), new Date(), {
		addSuffix: true,
		locale: ptBR,
	});
}