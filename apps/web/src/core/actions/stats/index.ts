"use server";
import { cookies } from "next/headers";
import {
	type ApiResponse,
	ResponseMapper,
} from "@/core/schemas/default.meppers";
import type { MetricStats } from "@/core/schemas/stats";
import { env } from "@/lib/env";

export async function getMetricStats(): Promise<ApiResponse<MetricStats>> {
	try {
		const storage = await cookies();
		const token = storage.get("ppx-auth.session-token");

		if (!token) {
			return ResponseMapper.error("Precisa estar autenticado.");
		}

		const { NEXT_PUBLIC_API_URL: API_URL } = env;

		const response = await fetch(`${API_URL}/api/v1/stats`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token.value}`,
				"Content-Type": "application/json",
			},
			next: {
				tags: ["get-statistic"],
				revalidate: 60, // 01 min
			},
		});

		const data = await response.json().catch(() => null);

		if (!response.ok) {
			const msg = data?.message ?? "Falha ao carregar dados.";
			return ResponseMapper.error(msg);
		}

		return ResponseMapper.success(
			data.data,
			"Dados carregados com sucesso.",
		);
	} catch (error) {
		console.error("❌ Erro inesperado ao carregar dados:", error);
		return ResponseMapper.error("Erro inesperado ao carregar dados.");
	}
}
