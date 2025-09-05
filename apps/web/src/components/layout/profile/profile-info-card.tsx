"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Button } from "@workspace/ui/components/button"
import { useForm } from "react-hook-form"
import { Save } from "lucide-react"
import { AvatarUploader } from "./avatar-uploader"
import { Form } from "@workspace/ui/components/form"

export function ProfileInfoCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Atualize suas informações básicas de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <AvatarUploader data={{
                    name: "Erivaldo"
                }} />
                <ProfileInfoForm />
            </CardContent>
        </Card>
    )
}


function ProfileInfoForm() {
    const form = useForm({
        mode: "all",
        defaultValues: {
            name: "",
            email: "",
            telephone: "",
        }
    })

    const onSubmit = async (formData: any) => {
        console.log({ formData });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" defaultValue="Erivaldo Malebo" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="erivaldomalebo2206@gmail.com" disabled />
                        <p className="text-xs text-muted-foreground">Email não pode ser alterado</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" defaultValue="957031922" />
                    </div>
                </div>

                <Button type="submit" className="stepcash-gradient">
                    <Save className="h-4 w-4" />
                    Salvar Alterações
                </Button>
            </form>
        </Form>
    )
}