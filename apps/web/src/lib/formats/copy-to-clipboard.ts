export async function copyToClipboard(
	value: string | number,
): Promise<{ success: boolean; message: string }> {
	try {
		if (!navigator.clipboard) {
			return {
				success: false,
				message: "Clipboard API não suportada neste navegador.",
			};
		}

		if (!value || typeof value !== "string" || typeof value !== "number") {
			return { success: false, message: "Valor inválido para copiar." };
		}

		await navigator.clipboard.writeText(value);
		return { success: true, message: "Texto copiado com sucesso!" };
	} catch (error: unknown) {
		console.error("Erro ao copiar:", error);
		return {
			success: false,
			message: "Falha ao copiar para a área de transferência.",
		};
	}
}