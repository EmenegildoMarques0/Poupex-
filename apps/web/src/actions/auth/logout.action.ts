"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction() {
    const store = await cookies();
    const token = store.get("ppx-auth.session-token")?.value;

    if (token) {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/logout`, {
                method: "POST",
                headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                },
                cache: "no-store",
            });
        } catch(err) {
            console.error(err);
        }
    }

    for (const cookie of store.getAll()) {
        if (cookie.name.startsWith("ppx-auth")) {
            store.delete(cookie.name);
        }
    }

    redirect("/sign-in");
}
