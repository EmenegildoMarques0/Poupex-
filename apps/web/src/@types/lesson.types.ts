export interface Lesson {
    id: number
    course_id: number
    title: string
    link: string // URL to the lesson content
    description: string
    supporting_materials: string[] // Array of material URLs/paths
    order: number
    created_at: string
    updated_at: string
}