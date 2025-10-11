import { getAllCourses } from "@/actions/courses/get-all-course";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { BarChart3, PlusCircle } from "lucide-react";
import { CourseForm } from "../_components/forms/course.form";
import { CourseCard } from "../_components/card-course";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";

export default async function Overview() {
    const courses = await getAllCourses()
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

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Meus Cursos</h2>
                        <p className="text-muted-foreground text-sm mt-1">Gerencie e acompanhe seus cursos</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <Dialog>
                        <DialogTrigger asChild>
                            <button className="group aspect-square w-full rounded-xl border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 flex flex-col gap-2 items-center justify-center cursor-pointer">
                                <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                                    <PlusCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-sm font-medium">Criar curso</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar curso</DialogTitle>
                                <DialogDescription>Preencha todos os campos para adicionar um curso à sua lista</DialogDescription>
                            </DialogHeader>
                            <CourseForm />
                        </DialogContent>
                    </Dialog>

                    {(courses.success ? courses.data : []).map((course) => (
                        <CourseCard key={course.id} data={course} />
                    ))}
                </div>
            </section>
        </div>
    )
}