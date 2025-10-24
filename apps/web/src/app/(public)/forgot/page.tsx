import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
			<h1 className="text-2xl font-semibold">
				Página indisponível no momento
			</h1>
			<p className="text-sm text-slate-500">
				Esta seção está em desenvolvimento 🚧
			</p>

			<Button asChild className="mt-4">
				<Link href="/">
					<ArrowLeft />
					<span>Voltar à página inicial</span>
				</Link>
			</Button>
		</div>
	);
}
