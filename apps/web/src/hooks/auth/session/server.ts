"use server"

import { ResponseAuthTokenVerify, User } from "@/@types/auth/user.type";
import { cookies } from "next/headers";

interface UseSessionServerResult {
	data: User | null;
	error: Error | null;
}

export async function getSession(): Promise<UseSessionServerResult> {
    const token = (await cookies()).get("ppx-auth.session-token")?.value;

    if (!token) {
        return {
            data: null,
            error: new Error("Token em falta"),
        };
  }

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/token-verify`;

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        next: {
            revalidate: 60 * 1, // em segundos (1 min)
            tags: ["session"],
        },
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = (await response.json()) as ResponseAuthTokenVerify;

    return { data: result.user, error: null };
}
