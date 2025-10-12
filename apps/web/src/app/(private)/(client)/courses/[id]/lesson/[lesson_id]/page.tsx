import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight, Download, FileText, PlayCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactPlayer from "react-player";
import { course } from "@/core/actions/course/index";

interface DetailsLessonProps {
    params: Promise<{
        lesson_id: string
        id: string
    }>
}

export default async function DetailsLesson({ params }: DetailsLessonProps) {
    const { id: courseId, lesson_id: lessonId } = await params;
    const lesson = await course.lesson.finOne(courseId, lessonId);
    const c = await course.findOne(courseId);

    if (!lesson.success || !c.success || !lesson.data || !c.data) {
        notFound();
    }

    const currentLessonIndex = c.data.lessons?.findIndex((l) => l.id === lesson.data.id) ?? -1;
    const previousLesson = currentLessonIndex > 0 ? c.data.lessons?.[currentLessonIndex - 1] : null;
    const nextLesson =
        currentLessonIndex < (c.data.lessons?.length ?? 0) - 1 ? c.data.lessons?.[currentLessonIndex + 1] : null;

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center gap-4 px-6">
                    <Link
                        href={`/courses/${courseId}`}
                        className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar ao curso
                    </Link>
                    <Separator orientation="vertical" className="h-6" />
                    <div className="flex flex-1 items-center gap-3">
                        <BookOpen className="min-w-5 size-5 text-muted-foreground" />
                        <div className="flex flex-col">
                            <h1 className="text-sm font-semibold leading-none line-clamp-1">{lesson.data.title}</h1>
                            <p className="text-xs text-muted-foreground">
                                Aula {lesson.data.order} de {c.data.lessons?.length ?? 0}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row">
                <div className="flex-1">
                    <div className="relative aspect-video w-full bg-black">
                        <ReactPlayer src={lesson.data.link ?? "https://www.youtube.com/watch?v=LXb3EKWsInQ"}
                            controls
                            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
                            config={{
                                youtube: {
                                    color: "white"
                                }
                            }}
                        />
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="mb-2 text-2xl font-bold">{lesson.data.title}</h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>Aula {lesson.data.order}</span>
                                <span>•</span>
                                <span>{c.data.title}</span>
                            </div>
                        </div>

                        <div className="mb-6 flex gap-3">
                            {previousLesson ? (
                                <Button variant="outline" asChild className="flex-1 bg-transparent">
                                    <Link href={`/courses/${courseId}/lesson/${previousLesson.id}`}>
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        Aula Anterior
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="outline" disabled className="flex-1 bg-transparent">
                                    <ChevronLeft className="mr-2 h-4 w-4" />
                                    Aula Anterior
                                </Button>
                            )}

                            {nextLesson ? (
                                <Button variant="outline" asChild className="flex-1 bg-transparent">
                                    <Link href={`/courses/${courseId}/lesson/${nextLesson.id}`}>
                                        Próxima Aula
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            ) : (
                                <Button disabled className="flex-1">
                                    Próxima Aula
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            )}


                        </div>

                        <Tabs defaultValue="description" className="w-full">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="description">Descrição</TabsTrigger>
                                <TabsTrigger value="materials">Materiais ({lesson.data.supporting_materials?.length ?? 0})</TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="mt-4">
                                <Card className="p-6">
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {lesson.data.description || "Nenhuma descrição disponível para esta aula."}
                                    </p>
                                </Card>
                            </TabsContent>
                            <TabsContent value="materials" className="mt-4">
                                <Card className="p-6">
                                    {lesson.data.supporting_materials && lesson.data.supporting_materials.length > 0 ? (
                                        <div className="space-y-3">
                                            {lesson.data.supporting_materials.map((material) => (
                                                <div
                                                    key={Math.random()}
                                                    className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="text-sm font-medium">{material.split("/").pop()}</p>
                                                            <p className="text-xs text-muted-foreground">Material de apoio</p>
                                                        </div>
                                                    </div>
                                                    <Button size="sm" variant="ghost">
                                                        <Download className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-center text-sm text-muted-foreground">
                                            Nenhum material de apoio disponível para esta aula.
                                        </p>
                                    )}
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <aside className="w-full border-l bg-muted/30 lg:w-[380px]">
                    <div className="sticky top-16">
                        <div className="border-b bg-background p-4">
                            <div className="flex items-center gap-2 text-primary">
                                <PlayCircle className="h-5 w-5" />
                                <h3 className="font-semibold">Conteúdo do Curso</h3>
                            </div>
                            <p className="mt-1 text-xs text-muted-foreground">{c.data.lessons?.length ?? 0} aulas disponíveis</p>
                        </div>

                        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                            {c.data.lessons.map((lessonItem, index) => {
                                const isActive = lessonItem.id === lesson.data?.id
                                return (
                                    <Link
                                        key={lessonItem.id}
                                        href={`/courses/${courseId}/lesson/${lessonItem.id}`}
                                        className={cn("block border-b p-4 transition-colors hover:bg-accent", isActive && "bg-accent")}
                                    >
                                        <div className="flex gap-3">
                                            <div
                                                className={cn(
                                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                                                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                                                )}
                                            >
                                                {index + 1}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className={cn("text-sm font-medium leading-tight", isActive && "text-primary")}>
                                                    {lessonItem.title}
                                                </p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <span>{lessonItem.supporting_materials?.length ?? 0} materiais</span>
                                                    {isActive && (
                                                        <Badge variant="secondary" className="h-5 text-xs">
                                                            Assistindo
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}