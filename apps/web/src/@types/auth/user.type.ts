export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    provider: string | null;
    provider_id: string | null;
}

export interface ResponseAuthTokenVerify {
	status: string;
	user: User;
}