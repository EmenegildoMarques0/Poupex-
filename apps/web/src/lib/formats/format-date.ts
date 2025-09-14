import { formatDistance, format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * Retorna a distância de tempo legível entre a data informada e a data atual.
 * Ex.: "há 5 dias", "em 3 meses"
 * @param date Data como Date ou string
 */

export function formatDate(date: string | Date): string {
	return formatDistance(new Date(date), new Date(), {
		addSuffix: true,
		locale: ptBR,
	});
}

/**
 * Formata uma data para dd/mm/yyyy
 * @param input Data como Date ou string
 */

export function formatDateFull(input: Date | string): string {
	const date = input instanceof Date ? input : new Date(input);
	return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
}


/**
 * Recebe um número de 1 a 7 e retorna o nome do dia da semana em pt-BR
 * 1 = segunda-feira … 7 = domingo
 * @param n como Number
 */

export function getDayOfWeek(n: number): string {
	if (typeof n !== 'number' || !Number.isFinite(n)) return ''
	const offset = ((n - 1) % 7 + 7) % 7
	const baseMonday = new Date(2025, 8, 1)
	
	return format(addDays(baseMonday, offset), 'EEEE', { locale: ptBR })
}
