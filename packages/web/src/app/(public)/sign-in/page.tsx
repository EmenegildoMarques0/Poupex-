import Image from "next/image";
import { SignInForm } from "../_components/sign-in.form";

export default function SignInPage() {
	return (
		<main className="h-screen flex flex-col gap-6 md:flex-row-reverse">
			<div className="h-60 md:h-full md:w-1/2 p-4">
				<div className="relative w-full h-full overflow-hidden rounded-xl bg-neutral-950/30">
					<Image
						src="/images/background-01.jpg"
						alt="background banner 01"
						width={100}
						height={100}
						quality={100}
						className="w-full h-full bg-black/30"
					/>
				</div>
			</div>
			<div className="flex-1 flex md:items-center justify-center px-4">
				<div className="flex flex-col gap-6">
					<div>
						<h1 className="text-2xl font-bold mb-2">
							Bem-vindo de volta 👋
						</h1>
						<p className="text-neutral-500 mb-2">
							Faça login para começar a gerenciar seus projetos.
						</p>
					</div>
					<SignInForm />
				</div>
			</div>
		</main>
	);
}