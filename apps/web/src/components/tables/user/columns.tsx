import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User } from "@/core/schemas/user"
import { formatDate } from "@/lib/formats/format-date";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center font-bold">Id</div>,
        cell: ({ row }) => {
            return <div className="text-center">{String(row.original.id).padStart(2, "0")}</div>
        }
    },
    {
        accessorKey: "name",
        header: () => <div className="font-bold">Usuário</div>,
        cell: ({ row }) => {
            const name = row.getValue("name") as string;
            return <div className="flex items-center gap-2">
                <Avatar>
                    <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
                <div>
                    <span className="block">{name}</span>
                    <span className="text-muted text-sm">{row.original.email}</span>
                </div>
            </div>;
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
                                            /* const result = await course.lesson.delete(
                                                String(row.original.course_id),
                                                String(row.original.id)
                                            );

                                            if (!result.success) {
                                                toast.error(result.error || "Erro ao eliminar a aula.");
                                                return;
                                            } */

                                            /* toast.success(result.message || "Aula eliminada com sucesso!"); */
                                        }}
                                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    }
]