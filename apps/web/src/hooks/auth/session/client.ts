"use client";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { User, ResponseAuthTokenVerify } from "@/@types/auth/user.type";

interface UseSessionResult {
	data: User | null;
	error: Error | null;
	loading: boolean;
}

export function useSession(): UseSessionResult {
	const [data, setData] = useState<User | null>(null);
	const [error, setError] = useState<Error | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const { "ppx-auth.session-token": token } = parseCookies();
		
		if (!token) {
			setLoading(false);
			return;
		}

		const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/token-verify`;

		fetch(API_URL, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
		.then((response) => {
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        	return response.json() as Promise<ResponseAuthTokenVerify>;
      	})
		.then((data) => {
			setData(data.user);
			setLoading(false);
		})
		.catch((err: Error) => {
			setError(err);
			setLoading(false);
		});
  	}, []);

  	return { data, error, loading };
}
