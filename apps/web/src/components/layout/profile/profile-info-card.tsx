import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { AvatarUploader } from "./avatar-uploader"
import { getSession } from "@/hooks/auth/session/server"
import { ProfileInfoForm } from "@/components/forms/profile-info.from"
import { redirect } from "next/navigation"

export default async function ProfileInfoCard() {
    const { data: session } = await getSession()

    if (!session) {
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
                        name: session.name,
                    }}
                />
                <ProfileInfoForm defaultValues={{
                    name: session.name,
                    email: session.email
                }} />
            </CardContent>
        </Card>
  )
}
