export interface User {
    id: number;
    name: string;
    email: string;
    image?: string;
    gender: "F" | "M";
    created_at: string;
}