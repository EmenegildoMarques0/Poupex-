import { redirect } from "next/navigation";
import { AccountActionsCard } from "@/components/layout/profile/account-actions-card";
import { PreferencesCard } from "@/components/layout/profile/preferences-card";
import { ProfileHeader } from "@/components/layout/profile/profile-header";
import ProfileInfoCard from "@/components/layout/profile/profile-info-card";
import { getSession } from "@/core/actions/auth/session/server";

export default async function ProfilePage() {
	const session = await getSession();

	if (!session.success) {
		redirect("/sign-in");
	}
	return (
		<main className="flex-1 p-6">
			<div className="max-w-4xl mx-auto">
				<ProfileHeader />
				<div className="grid gap-6">
					<ProfileInfoCard data={session.data} />
					<PreferencesCard />
					<AccountActionsCard />
				</div>
			</div>
		</main>
	);
}
