import { cn } from "@workspace/ui/lib/utils"
import { ArrowLeft, PlayCircle, Video } from "lucide-react"
import Link from "next/link"
import ReactPlayer from "react-player"

interface DetailsCouseProps {
    params: {
        name: string
    },
    searchParams: {}
}

export default function DetailsCouse({ params }: DetailsCouseProps) {
    return (
        <div>
            <div className="flex items-center px-4 h-16 bg-neutral-50 dark:bg-neutral-900">
                <Link href="/courses" className="flex items-center gap-2">
                    <ArrowLeft />
                    <span className="first-letter:uppercase">{params.name.split("-").filter(t => t.length > 1 && t).join(" ").trim()}</span>
                    <span className="size-1 rounded-full bg-neutral-500" />
                    <span className="text-neutral-500">Aula {params.name.split("-")[2]?.toString().padStart(2, "0")}</span>
                </Link>
            </div>
            <div className="flex gap-2">
                <div className="flex-1">
                    <div className="min-h-[500px] mt-2 bg-neutral-50 dark:bg-neutral-900">
                        {/* Video */}
                        <ReactPlayer src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                            controls
                            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                            config={{
                                youtube: {
                                    color: "white"
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="min-w-[300px] space-y-3">
                    <div className="border-b-2 border-primary p-4 flex items-center justify-center gap-2 text-primary">
                        <PlayCircle />
                        <h1>Playlist</h1>
                    </div>
                    <div className="border rounded-md p-4 mx-auto">
                        <h2 className="text-sm">Nome da aula selecionada</h2>
                        <span className="text-xs text-neutral-500">43 Aulas</span>
                    </div>
                    <div>
                        {Array.from({ length: 20 }).map((_, idx) => {
                            const num = params.name.split("-")[2];
                            return num && (
                                <div className={cn("flex items-center gap-2 p-2 text-neutral-700",
                                    ((idx + 1).toString()) == num && "text-blue-500"
                                )
                                }>
                                    <Video />
                                    <span className="flex-1">Aula {(+idx + 1).toString().padStart(2, "0")}</span>
                                    <span>00:{idx.toString().padStart(2, "0")}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
}