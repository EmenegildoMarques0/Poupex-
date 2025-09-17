<?php

namespace App\Swagger;

use App\Http\Controllers\Controller;

/**
 * @OA\Get(
 *     path="/api/v1/courses/{course}/lessons",
 *     tags={"Lessons"},
 *     summary="Listar todas as lições de um curso",
 *     security={{"bearerAuth": {}}},
 *     @OA\Parameter(
 *         name="course",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Lista de lições retornada com sucesso",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="course_id", type="integer", example=1),
 *                 @OA\Property(property="title", type="string", example="we"),
 *                 @OA\Property(property="link", type="string", example="https://grok.com/c/e00a750f-9de3-414a-9848-f2e1875078c9"),
 *                 @OA\Property(property="description", type="string", nullable=true, example="1MH87q9yRSkyS3B9dbwjBJ4bRLa"),
 *                 @OA\Property(
 *                     property="supporting_materials",
 *                     type="array",
 *                     nullable=true,
 *                     @OA\Items(type="string", example="materials/document1.pdf")
 *                 ),
 *                 @OA\Property(property="order", type="integer", example=1),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Não autenticado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Unauthenticated")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Curso não encontrado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resource not found")
 *         )
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/v1/courses/{course}/lessons",
 *     tags={"Lessons"},
 *     summary="Criar uma nova lição",
 *     security={{"bearerAuth": {}}},
 *     @OA\Parameter(
 *         name="course",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 required={"title", "link"},
 *                 @OA\Property(property="title", type="string", maxLength=255, example="Introdução ao Laravel"),
 *                 @OA\Property(property="link", type="string", format="url", example="https://www.youtube.com/watch?v=example"),
 *                 @OA\Property(property="description", type="string", nullable=true, example="Aula introdutória sobre Laravel"),
 *                 @OA\Property(
 *                     property="supporting_materials",
 *                     type="array",
 *                     nullable=true,
 *                     @OA\Items(type="string", format="binary")
 *                 ),
 *                 @OA\Property(property="order", type="integer", minimum=0, example=1)
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Lição criada com sucesso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="course_id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="Introdução ao Laravel"),
 *             @OA\Property(property="link", type="string", example="https://www.youtube.com/watch?v=example"),
 *             @OA\Property(property="description", type="string", nullable=true, example="Aula introdutória sobre Laravel"),
 *             @OA\Property(
 *                 property="supporting_materials",
 *                 type="array",
 *                 nullable=true,
 *                 @OA\Items(type="string", example="materials/document1.pdf")
 *             ),
 *             @OA\Property(property="order", type="integer", example=1),
 *             @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z"),
 *             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Erro de validação",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="The given data was invalid"),
 *             @OA\Property(
 *                 property="errors",
 *                 type="object",
 *                 @OA\Property(
 *                     property="title",
 *                     type="array",
 *                     @OA\Items(type="string", example="The title field is required")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Não autenticado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Unauthenticated")
 *         )
 *     ),
 *     @OA\Response(
 *         response=403,
 *         description="Não autorizado",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Unauthorized")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Curso não encontrado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resource not found")
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/v1/courses/{course}/lessons/{lesson}",
 *     tags={"Lessons"},
 *     summary="Exibir uma lição específica",
 *     security={{"bearerAuth": {}}},
 *     @OA\Parameter(
 *         name="course",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Parameter(
 *         name="lesson",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Lição retornada com sucesso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="course_id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="we"),
 *             @OA\Property(property="link", type="string", example="https://grok.com/c/e00a750f-9de3-414a-9848-f2e1875078c9"),
 *             @OA\Property(property="description", type="string", nullable=true, example="1MH87q9yRSkyS3B9dbwjBJ4bRLa"),
 *             @OA\Property(
 *                 property="supporting_materials",
 *                 type="array",
 *                 nullable=true,
 *                 @OA\Items(type="string", example="materials/document1.pdf")
 *             ),
 *             @OA\Property(property="order", type="integer", example=1),
 *             @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z"),
 *             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Não autenticado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Unauthenticated")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Lição não encontrada no curso",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Lesson not found in this course")
 *         )
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/v1/courses/{course}/lessons/{lesson}",
 *     tags={"Lessons"},
 *     summary="Atualizar uma lição existente",
 *     security={{"bearerAuth": {}}},
 *     @OA\Parameter(
 *         name="course",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Parameter(
 *         name="lesson",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 @OA\Property(property="title", type="string", maxLength=255, example="Introdução ao Laravel Atualizada"),
 *                 @OA\Property(property="link", type="string", format="url", example="https://www.youtube.com/watch?v=updated"),
 *                 @OA\Property(property="description", type="string", nullable=true, example="Aula atualizada sobre Laravel"),
 *                 @OA\Property(
 *                     property="supporting_materials",
 *                     type="array",
 *                     nullable=true,
 *                     @OA\Items(type="string", format="binary")
 *                 ),
 *                 @OA\Property(property="order", type="integer", minimum=0, example=1)
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Lição atualizada com sucesso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="course_id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="Introdução ao Laravel Atualizada"),
 *             @OA\Property(property="link", type="string", example="https://www.youtube.com/watch?v=updated"),
 *             @OA\Property(property="description", type="string", nullable=true, example="Aula atualizada sobre Laravel"),
 *             @OA\Property(
 *                 property="supporting_materials",
 *                 type="array",
 *                 nullable=true,
 *                 @OA\Items(type="string", example="materials/document2.pdf")
 *             ),
 *             @OA\Property(property="order", type="integer", example=1),
 *             @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z"),
 *             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Erro de validação",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="The given data was invalid"),
 *             @OA\Property(
 *                 property="errors",
 *                 type="object",
 *                 @OA\Property(
 *                     property="title",
 *                     type="array",
 *                     @OA\Items(type="string", example="The title must be a string")
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Não autenticado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Unauthenticated")
 *         )
 *     ),
 *     @OA\Response(
 *         response=403,
 *         description="Não autorizado",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Unauthorized")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Lição não encontrada no curso",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Lesson not found in this course")
 *         )
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/v1/courses/{course}/lessons/{lesson}",
 *     tags={"Lessons"},
 *     summary="Deletar uma lição",
 *     security={{"bearerAuth": {}}},
 *     @OA\Parameter(
 *         name="course",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Parameter(
 *         name="lesson",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Lição deletada com sucesso"
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Não autenticado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Unauthenticated")
 *         )
 *     ),
 *     @OA\Response(
 *         response=403,
 *         description="Não autorizado",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Unauthorized")
 *         )
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Lição não encontrada no curso",
 *         @OA\JsonContent(
 *             @OA\Property(property="error", type="string", example="Lesson not found in this course")
 *         )
 *     )
 * )
 */
class LessonControllerDoc extends Controller {}