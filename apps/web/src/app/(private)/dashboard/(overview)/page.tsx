import { getAllCourses } from "@/actions/courses/get-all-course";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog";
import { PlusCircle } from "lucide-react";
import { CourseForm } from "../_components/forms/course.form";

export default async function Overview() {
    const courses = await getAllCourses()
    return (
        <div className="space-y-8">
            <h1 className="text-xl font-bold">Overview</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div className="min-h-24 border-4 rounded-xl">1</div>
                <div className="min-h-24 border-4 rounded-xl">2</div>
                <div className="min-h-24 border-4 rounded-xl">3</div>
                <div className="min-h-24 border-4 rounded-xl">4</div>
            </div>

            <div className="p-1 rounded-xl bg-muted">
                <div className="min-h-48 rounded-lg bg-background">
                    Gráfico mensal
                </div>
                <div className="px-2 py-1">
                    <span className="text-sm">Quantidade de visualizações nos últimos 28 dias</span>
                </div>
            </div>

            <section className="space-y-4">
                <h2 className="text-lg font-medium">Meus Courses</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    <Dialog>
                        <DialogTrigger>
                            <div className="aspect-square w-full max-w-32 sm:max-w-36 md:max-w-44 border-2 rounded-xl bg-muted-background flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-muted/70 transition">
                                <PlusCircle className="size-5" />
                                <span className="text-sm">Criar curso</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Criar curso</DialogTitle>
                                <DialogDescription>Preencha todos os campos para adicionar um curso a sua lista</DialogDescription>
                            </DialogHeader>
                            <CourseForm />
                        </DialogContent>
                    </Dialog>

                    <pre>{JSON.stringify(courses, null, 2)}</pre>
                </div>
            </section>
        </div>
    )
}