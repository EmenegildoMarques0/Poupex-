export async function deleteLesson(lessonId: string): Promise<{ success: boolean; message: string }> {
    // Mock implementation - replace with actual API call
    console.log("[v0] Deleting lesson:", lessonId)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
        success: true,
        message: "Aula deletada com sucesso",
    }
}
