import { CourseForm } from "@/components/forms/course/course-form";
import { CourseCard } from "@/components/layout/course/course-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { course } from "@/core/actions/course";
import { BarChart3, BookHeadphones, BookOpen, PlusCircle } from "lucide-react";

export default async function CoursePageDashbaord() {
    const courses = await course.findAllServer();

    return (
        <div className="space-y-8">
            <h1 className="text-xl font-bold">Overview</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="min-h-24 border-4 rounded-xl flex items-center justify-center">
                    <span>Total de alunos inscritos</span>
                </div>
                <div className="min-h-24 border-4 rounded-xl flex items-center justify-center">
                    <span>Total de alunos recentes</span>
                </div>
                <div className="min-h-24 border-4 rounded-xl flex items-center justify-center">
                    <span>Total de cursos</span>
                </div>
                <div className="min-h-24 border-4 rounded-xl flex items-center justify-center">
                    <span>Total de cursos recentes</span>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Gráfico Mensal
                            </CardTitle>
                            <CardDescription className="mt-1.5">Quantidade de visualizações nos últimos 28 dias</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">
                        <div className="text-center space-y-2">
                            <BarChart3 className="h-12 w-12 mx-auto opacity-50" />
                            <p className="text-sm">Gráfico será exibido aqui</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <section className="flex items-end justify-between w-full">
                <div className="flex items-center gap-4">
                    <div className="size-12 flex items-center justify-center bg-foreground rounded-lg">
                        <BookHeadphones className="text-background" />
                    </div>
                    <Separator orientation="vertical" className="min-h-10" />
                    <div>
                        <h1 className="text-xl font-bold">Cursos Disponíveis</h1>
                        <p className="text-md text-muted-foreground">Escolha um curso para começar sua jornada de aprendizado.</p>
                    </div>
                </div>

            </section>

            <div className="mt-4">
                {courses.success && (
                    !courses.data.length ? (
                        <Card className="border-dashed border-muted-foreground/30 shadow-none">
                            <CardContent className="flex flex-col items-center justify-center py-20 text-center w-full">
                                <BookOpen className="h-16 w-16 text-muted-foreground/40 mb-4" />
                                <h3 className="font-semibold text-lg mb-2">Nenhum curso ainda</h3>
                                <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                                    Comece criando seu primeiro curso para disponibilizar conteúdo aos alunos.
                                </p>
                            
                                <Dialog>
                        <DialogTrigger asChild>
                            <Button>Adicionar Curso</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar curso</DialogTitle>
                                <DialogDescription>Preencha todos os campos para adicionar um curso à sua lista</DialogDescription>
                            </DialogHeader>
                            <CourseForm />
                        </DialogContent>
                    </Dialog>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="h-full w-full group aspect-square rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 flex flex-col gap-2 items-center justify-center cursor-pointer">
                                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                                    <PlusCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Criar curso</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar curso</DialogTitle>
                                <DialogDescription>Preencha todos os campos para adicionar um curso à sua lista</DialogDescription>
                            </DialogHeader>
                            <CourseForm />
                        </DialogContent>
                    </Dialog>

                    {courses.data.map((course) => (
                        <CourseCard key={course.id} data={course} />
                    ))}
                </div>
                            
                    )
                )}
            </div>
        </div>
    )
}