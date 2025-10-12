"use client";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import type { Course } from "@/core/schemas/course"; 

/**
 * Hook para carregar os cursos disponíveis do usuário autenticado.
 */
export function useCoursesAction() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        async function loadCourses() {
            try {
                const { "ppx-auth.session-token": token } = parseCookies();

                if (!token) {
                    setError("Token de sessão não encontrado.");
                    setLoading(false);
                    return;
                }

                const API_URL = process.env.NEXT_PUBLIC_API_URL;
                if (!API_URL) {
                    throw new Error("NEXT_PUBLIC_API_URL não configurada no ambiente.");
                }

                const res = await fetch(`${API_URL}/api/v1/courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    signal,
                });

                if (!res.ok) {
                    throw new Error(`Erro ${res.status}: falha ao carregar cursos`);
                }

                const data = await res.json();

                
                setCourses(Array.isArray(data) ? data : data.courses ?? []);
            } catch (err: any) {
                if (err.name !== "AbortError") {
                    console.error("Falha ao carregar cursos:", err);
                    setError(err.message || "Erro desconhecido.");
                }
            } finally {
                setLoading(false);
            }
        }

        loadCourses();

        return () => controller.abort();
    }, []);

    return { courses, loading, error };
}
