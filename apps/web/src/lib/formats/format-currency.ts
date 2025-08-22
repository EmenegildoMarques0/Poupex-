export function formatCurrency(
    value: number | string,
    currency: string = "AOA",
    locale: string = "pt-AO"
): string {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
        throw new Error("O valor fornecido não é um número válido.");
    }

    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(numericValue);
}
