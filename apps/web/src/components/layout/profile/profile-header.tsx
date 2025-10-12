"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export function ProfileHeader() {
    return (
        <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" asChild>
                <Link href="/">
                    <ArrowLeft className="h-4 w-4" />
                </Link>
            </Button>
            <div>
                <h1 className="font-playfair text-3xl font-bold mb-2">Perfil do Usuário</h1>
                <p className="text-muted-foreground">
                    Gerencie suas informações pessoais e preferências
                </p>
            </div>
        </div>
    )
}
