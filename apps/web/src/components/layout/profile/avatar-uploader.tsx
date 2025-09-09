"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Camera } from "lucide-react"

interface AvatarUploaderProps {
    data: {
        name: string;
        image?: string;
    }
}

export function AvatarUploader({ data: session }: AvatarUploaderProps) {
    return (
        <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={session.image ?? ""} />
                <AvatarFallback className="text-lg">{session.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                <Button variant="outline" size="sm" disabled>
                    <Camera className="mr-2 h-4 w-4" />
                    Alterar Foto
                </Button>
                <p className="text-sm text-muted-foreground mt-1">JPG, PNG ou GIF. Máximo 2MB.</p>
            </div>
        </div>
    )
}
