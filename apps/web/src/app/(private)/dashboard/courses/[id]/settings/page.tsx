import { notFound } from "next/navigation";
import { CourseSettingsForm } from "@/components/forms/course/course-settings-form";
import { DeleteCourseSection } from "@/components/layout/course/delete-course-section";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { course } from "@/core/actions/course";

interface CourseSettingsPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function CourseSettingsPage({
	params,
}: CourseSettingsPageProps) {
	const { id: courseId } = await params;
	const c = await course.findOne(courseId);

	if (!c.success) {
		notFound();
	}

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">
					Definições do Curso
				</h2>
				<p className="text-muted-foreground">
					Gerencie as configurações e informações do curso
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Informações Gerais</CardTitle>
					<CardDescription>
						Atualize o título, descrição e outras informações do
						curso
					</CardDescription>
				</CardHeader>
				<CardContent>
					<CourseSettingsForm defaultValues={c.data} />
				</CardContent>
			</Card>

			<DeleteCourseSection
				courseId={courseId}
				courseTitle={c.data.title}
			/>
		</div>
	);
}
