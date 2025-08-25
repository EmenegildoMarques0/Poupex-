"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Card } from "@workspace/ui/components/card"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@workspace/ui/components/form"

const forgotPasswordSchema = z.object({
    email: z.string().email("Digite um email válido."),
})

type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [emailSentTo, setEmailSentTo] = useState("")

    const form = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "all",
        defaultValues: { email: "" },
    })

    const onSubmit = async (values: ForgotPasswordSchema) => {
        setIsLoading(true)
        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            if (response.ok) {
                setEmailSentTo(values.email)
                setIsEmailSent(true)
                form.reset()
            } else {
                const errorData = await response.json().catch(() => null)
                console.error("Erro ao enviar email:", errorData)
            }
        } catch (error) {
            console.error("Erro ao enviar email:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isEmailSent) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="w-full max-w-md border-none p-8">
                    <div className="text-center space-y-6">
                        <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-white" />
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold text-white">
                                Email enviado!
                            </h1>
                            <p className="text-neutral-400 text-sm">
                                Enviamos um link para redefinir sua senha para{" "}
                                <strong className="text-white">{emailSentTo}</strong>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-neutral-500 text-xs">
                                Não recebeu o email? Verifique sua caixa de spam ou tente
                                novamente.
                            </p>

                            <Button
                                onClick={() => setIsEmailSent(false)}
                                variant="outline"
                                className="w-full bg-transparent border-neutral-700 text-neutral-300 hover:bg-neutral-900"
                            >
                                Tentar novamente
                            </Button>

                            <Link href="/sign-in">
                                <Button
                                    variant="ghost"
                                    className="w-full text-neutral-400 hover:text-white"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Voltar ao login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-none p-8">
                <div className="text-center space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white">Poupex</h1>
                        <h2 className="text-xl text-white">Esqueceu sua senha? 🔑</h2>
                        <p className="text-neutral-400 text-sm">
                            Digite seu email para receber um link de redefinição de senha.
                        </p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 text-left"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-sm">Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                placeholder="exemplo@email.com"
                                                className="bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-500 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                            >
                                {isLoading ? "Enviando..." : "Enviar link de redefinição"}
                            </Button>
                        </form>
                    </Form>

                    <div className="pt-4">
                        <Link href="/sign-in">
                            <Button
                                variant="ghost"
                                className="text-neutral-400 hover:text-white"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Voltar ao login
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}
