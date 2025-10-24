import { ProfileInfoForm } from "@/components/forms/profile-info.from";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { User } from "@/core/schemas/user";
import { AvatarUploader } from "./avatar-uploader";

export default async function ProfileInfoCard({
	data: session,
}: {
	data: User;
}) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Informações Pessoais</CardTitle>
				<CardDescription>
					Atualize suas informações básicas de perfil
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<AvatarUploader
					data={{
						name: session.name,
					}}
				/>
				<ProfileInfoForm
					defaultValues={{
						name: session.name,
						email: session.email,
					}}
				/>
			</CardContent>
		</Card>
	);
}
