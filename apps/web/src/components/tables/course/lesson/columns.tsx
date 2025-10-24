import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { course } from "@/core/actions/course";
import { Lesson } from "@/core/schemas/course/lesson.schema";
import { copyToClipboard } from "@/lib/formats/copy-to-clipboard";
import { formatDate } from "@/lib/formats/format-date";
import { getYouTubeThumbnail } from "@/lib/formats/youtube-thumbnail-link";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, FileText, MoreVertical, Trash2, Video } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const columns: ColumnDef<Lesson>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center font-bold">Id</div>,
        cell: ({ row }) => {
            return <div className="text-center">{String(row.original.id).padStart(2, "0")}</div>
        }
    },
    {
        accessorKey: "title",
        header: () => <div className="font-bold">Aula</div>,
        cell: ({ row }) => {
            const thumbnail = getYouTubeThumbnail(row.original.link);
            const title = row.getValue("title") as string;
            return (
                <div className="flex items-center gap-3">
                    <div className="relative w-16 h-10 rounded bg-muted flex-shrink-0 border border-muted flex items-center justify-center overflow-hidden">
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full text-xs text-muted-foreground">
                                #{row.original.order}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0 max-w-[20rem]">
                        <p className="font-medium text-sm truncate mb-1">
                            {title}
                        </p>
                        {row.original.description && (
                            <p className="text-xs text-muted-foreground truncate">
                                {row.original.description}
                            </p>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "supporting_materials",
        header: () => <div className="font-bold text-center">Materiais</div>,
        cell: ({ row }) => {
            return <div className="text-center">
                {row.original.supporting_materials?.length ? (
                    <Badge variant="secondary" className="gap-1">
                        <FileText className="h-3 w-3" />
                        {row.original.supporting_materials.length}
                    </Badge>
                ) : (
                    <span className="text-muted-foreground text-xs">
                        Nenhum
                    </span>
                )}
            </div>;
        },
    },
    {
        accessorKey: "link",
        header: () => <div className="font-bold text-center">Link</div>,
        cell: ({ row }) => {
            const link = row.original.link
            return <div className="text-center">
                {link ? (
                    <Link
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                        <Video className="h-3.5 w-3.5" />
                        <ExternalLink className="h-3 w-3" />
                    </Link>
                ) : (
                    <span className="text-xs text-muted-foreground">
                        Sem link
                    </span>
                )
                }
            </div>
        },
    },
    {
        accessorKey: "created_at",
        header: () => <div className="font-bold text-center">Criado em</div>,
        cell: ({ row }) => {
            return <div className="text-center">{formatDate(row.original.created_at)}</div>;
        },
    },
    {
        accessorKey: "actions",
        header: undefined,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    className="text-destructive focus:text-destructive"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span>Eliminar</span>
                                </DropdownMenuItem>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Tem certeza que deseja eliminar esta aula?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta ação não pode ser desfeita. A aula será removida
                                        permanentemente do curso e todos os dados associados
                                        serão eliminados.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={async () => {
                                            const result = await course.lesson.delete(
                                                String(row.original.course_id),
                                                String(row.original.id)
                                            );

                                            if (!result.success) {
                                                toast.error(result.error || "Erro ao eliminar a aula.");
                                                return;
                                            }

                                            toast.success(result.message || "Aula eliminada com sucesso!");
                                        }}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => {
                            const result = await copyToClipboard(row.original.link);

                            if (result.success) {
                                toast.success(result.message);
                            } else {
                                toast.warning(result.message);
                            }
                        }}>
                            <ExternalLink className="h-4 w-4" />
                            <span>Copiar Link</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }

]