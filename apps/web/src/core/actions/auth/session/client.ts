"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import type { User } from "@/core/schemas/user";

export function useSession() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		async function loadSession() {
			try {
				const { "ppx-auth.session-token": token } = parseCookies();

				if (!token) {
					setError("Token não encontrado.");
					setLoading(false);
					return;
				}


				const API_URL = process.env.NEXT_PUBLIC_API_URL;
				const res = await fetch(`${API_URL}/api/v1/auth/token-verify`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					signal,
				});

				if (!res.ok) {
					throw new Error(`Erro ${res.status}: falha na verificação do token`);
				}

				const data = await res.json();
				setUser(data.user);
			} catch (err: any) {
				if (err.name !== "AbortError") {
					console.error("Falha ao carregar sessão:", err);
					setError(err.message || "Erro desconhecido.");
				}
			} finally {
				setLoading(false);
			}
		}

		loadSession();

		return () => controller.abort();
	}, []);

	return { user, loading, error };
}
