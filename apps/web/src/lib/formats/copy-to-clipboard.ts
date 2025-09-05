/**
 * Copia um texto ou número para a área de transferência.
 * 
 * @param value Valor a ser copiado (string ou number)
 * @returns Objeto com success e message
 */
export async function copyToClipboard(
  value: string | number
): Promise<{ success: boolean; message: string }> {

	try {
		if (!navigator.clipboard) {
			return {
				success: false,
				message: "Clipboard API não suportada neste navegador.",
			};
		}

		if (value === null || value === undefined || value === "") {
			return { success: false, message: "Valor inválido para copiar." };
		}

		const textToCopy = String(value);

		await navigator.clipboard.writeText(textToCopy);

		return { success: true, message: "Texto copiado com sucesso!" };
	} catch (error) {
		console.error("Erro ao copiar:", error);
		return {
			success: false,
			message: "Falha ao copiar para a área de transferência.",
		};
	}
}
