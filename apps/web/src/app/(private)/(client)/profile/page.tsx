import { ProfileHeader } from "@/components/layout/profile/profile-header";
import ProfileInfoCard from "@/components/layout/profile/profile-info-card";
import { AccountActionsCard } from "@/components/layout/profile/account-actions-card";
import { PreferencesCard } from "@/components/layout/profile/preferences-card";

export default function ProfilePage() {
    return (
        <main className="flex-1 p-6">
            <div className="max-w-4xl mx-auto">
                <ProfileHeader />
                <div className="grid gap-6">
                    <ProfileInfoCard />
                    <PreferencesCard />
                    <AccountActionsCard />
                </div>
            </div>
        </main>
    )
}