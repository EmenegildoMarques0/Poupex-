import { useCoursesAction } from "./client";
import { createCourseAction } from "./create-course";
import { getCourseByIdAction } from "./get-course-by-id";
import { createCourseLessonAction } from "./lesson/create-course-lesson";
import { deleteLessonAction } from "./lesson/delete-course-lesson";
import { getLessonByCourseAction } from "./lesson/get-lesson-by-course";
import { getLessonByIdAction } from "./lesson/get-lesson-by-id";
import { getCoursesAction } from "./server";

export const course = {
    create: createCourseAction,
    findOne: getCourseByIdAction,
    findAllClient: useCoursesAction,
    findAllServer: getCoursesAction,
    lesson: {
        finOne: getLessonByIdAction,
        findManyByCourse: getLessonByCourseAction,
        create: createCourseLessonAction,
        delete: deleteLessonAction
    }
}