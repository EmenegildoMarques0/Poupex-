import { Costs } from "@/@types/costs.type";
import { CostCard } from "@/components/layout/card-cost";
import { NotAuthenticatedSection } from "@/components/layout/not-authenticated-section";
import { TableListCosts } from "@/components/layout/tables/costs";
import { cookies } from "next/headers";

export default async function CostsPage() {
    const token = (await cookies()).get("ppx-auth.session-token")?.value;
    
    if (!token) {
        return <NotAuthenticatedSection />;
    }
    
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/costs`;

    const response = await fetch(API_URL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        next: {
            tags: ["get-costs"],
            revalidate: 60 // 01 min
        }
    });

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return <p>Erro ao carregar os dados</p>;
    }

    const data = await response.json() as Costs[];

    return <TableListCosts data={data} />
}
