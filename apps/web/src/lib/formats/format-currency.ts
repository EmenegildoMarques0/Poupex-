/**
 * Formata um valor numérico para o formato monetário local.
 *
 * @param value Valor a ser formatado (número ou string numérica).
 * @param currency Código da moeda (padrão: "AOA").
 * @param locale Locale para formatação (padrão: "pt-AO").
 * @returns Valor formatado em moeda (ex.: "Kz 1 234,56").
 * @throws Se o valor não puder ser convertido para número.
 */

export function formatCurrency(value: number | string, currency: string = "AOA", locale: string = "pt-AO"): string {
    const numericValue =
        typeof value === "string" ? Number(value.replace(",", ".")) : value;

    if (isNaN(numericValue)) {
        throw new Error("O valor fornecido não é um número válido.");
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(numericValue);
}
