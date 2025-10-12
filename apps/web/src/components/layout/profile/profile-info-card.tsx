import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AvatarUploader } from "./avatar-uploader"
import { ProfileInfoForm } from "@/components/forms/profile-info.from"
import { redirect } from "next/navigation"
import { getSession } from "@/core/actions/auth/session/server"

export default async function ProfileInfoCard() {
    const session = await getSession()

    if (!session.success) {
        redirect("/sign-in")
    }

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
                        name: session.data.name,
                    }}
                />
                <ProfileInfoForm defaultValues={{
                    name: session.data.name,
                    email: session.data.email
                }} />
            </CardContent>
        </Card>
  )
}
