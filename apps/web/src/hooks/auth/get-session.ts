"use client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

export function useSession() {
    const [data, setData] = useState(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { "ppx-auth.session-token": token } = parseCookies();
        if (!token) {
            setLoading(false);
            return;
        }

        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`;

        fetch(API_URL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setData(data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err);
            setLoading(false);
        });
  }, []);

  return { data, error, loading };
}
