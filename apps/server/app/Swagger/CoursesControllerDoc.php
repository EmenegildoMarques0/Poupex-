<?php

namespace App\Swagger;

use App\Http\Controllers\Controller;

/**
 * @OA\Get(
 *     path="/api/v1/courses",
 *     tags={"Courses"},
 *     summary="Listar todos os cursos",
 *     security={{"bearerAuth": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Lista de cursos retornada com sucesso",
 *         @OA\JsonContent(
 *             type="array",
 *             @OA\Items(
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="title", type="string", example="oi"),
 *                 @OA\Property(property="description", type="string", example="oi"),
 *                 @OA\Property(property="thumbnail", type="string", nullable=true, example=null),
 *                 @OA\Property(property="user_id", type="integer", example=1),
 *                 @OA\Property(property="is_public", type="boolean", example=true),
 *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *                 @OA\Property(property="level", type="string", example="beginner"),
 *                 @OA\Property(property="lessons_count", type="integer", example=1),
 *                 @OA\Property(
 *                     property="lessons",
 *                     type="array",
 *                     @OA\Items(
 *                         type="object",
 *                         @OA\Property(property="id", type="integer", example=1),
 *                         @OA\Property(property="course_id", type="integer", example=1),
 *                         @OA\Property(property="title", type="string", example="we"),
 *                         @OA\Property(property="link", type="string", example="https://grok.com/c/e00a750f-9de3-414a-9848-f2e1875078c9"),
 *                         @OA\Property(property="description", type="string", example="1MH87q9yRSkyS3B9dbwjBJ4bRLa"),
 *                         @OA\Property(property="supporting_materials", type="string", nullable=true, example=null),
 *                         @OA\Property(property="order", type="integer", example=1),
 *                         @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z"),
 *                         @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z")
 *                     )
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
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/v1/courses",
 *     tags={"Courses"},
 *     summary="Criar um novo curso",
 *     security={{"bearerAuth": {}}},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 required={"title", "description", "level"},
 *                 @OA\Property(property="title", type="string", maxLength=255, example="Curso de Laravel"),
 *                 @OA\Property(property="description", type="string", example="Aprenda a desenvolver com Laravel"),
 *                 @OA\Property(property="thumbnail", type="string", format="binary", nullable=true),
 *                 @OA\Property(property="is_public", type="boolean", example=true),
 *                 @OA\Property(property="level", type="string", enum={"beginner", "intermediate", "advanced"}, example="beginner")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Curso criado com sucesso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="Curso de Laravel"),
 *             @OA\Property(property="description", type="string", example="Aprenda a desenvolver com Laravel"),
 *             @OA\Property(property="thumbnail", type="string", nullable=true, example="thumbnails/curso1.jpg"),
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="is_public", type="boolean", example=true),
 *             @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *             @OA\Property(property="level", type="string", example="beginner")
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
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/v1/courses/{course}",
 *     tags={"Courses"},
 *     summary="Exibir um curso específico",
 *     security={{"bearerAuth": {}}},
 *     @OA\Parameter(
 *         name="course",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Curso retornado com sucesso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="oi"),
 *             @OA\Property(property="description", type="string", example="oi"),
 *             @OA\Property(property="thumbnail", type="string", nullable=true, example=null),
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="is_public", type="boolean", example=true),
 *             @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *             @OA\Property(property="level", type="string", example="beginner"),
 *             @OA\Property(
 *                 property="lessons",
 *                 type="array",
 *                 @OA\Items(
 *                     type="object",
 *                     @OA\Property(property="id", type="integer", example=1),
 *                     @OA\Property(property="course_id", type="integer", example=1),
 *                     @OA\Property(property="title", type="string", example="we"),
 *                     @OA\Property(property="link", type="string", example="https://grok.com/c/e00a750f-9de3-414a-9848-f2e1875078c9"),
 *                     @OA\Property(property="description", type="string", example="1MH87q9yRSkyS3B9dbwjBJ4bRLa"),
 *                     @OA\Property(property="supporting_materials", type="string", nullable=true, example=null),
 *                     @OA\Property(property="order", type="integer", example=1),
 *                     @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z"),
 *                     @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-05T20:46:04.000000Z")
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
 *         response=404,
 *         description="Curso não encontrado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resource not found")
 *         )
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/v1/courses/{course}",
 *     tags={"Courses"},
 *     summary="Atualizar um curso existente",
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
 *                 @OA\Property(property="title", type="string", maxLength=255, example="Curso de Laravel Atualizado"),
 *                 @OA\Property(property="description", type="string", example="Curso atualizado sobre Laravel"),
 *                 @OA\Property(property="thumbnail", type="string", format="binary", nullable=true),
 *                 @OA\Property(property="is_public", type="boolean", example=true),
 *                 @OA\Property(property="level", type="string", enum={"beginner", "intermediate", "advanced"}, example="intermediate")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Curso atualizado com sucesso",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="id", type="integer", example=1),
 *             @OA\Property(property="title", type="string", example="Curso de Laravel Atualizado"),
 *             @OA\Property(property="description", type="string", example="Curso atualizado sobre Laravel"),
 *             @OA\Property(property="thumbnail", type="string", nullable=true, example="thumbnails/curso1_updated.jpg"),
 *             @OA\Property(property="user_id", type="integer", example=1),
 *             @OA\Property(property="is_public", type="boolean", example=true),
 *             @OA\Property(property="created_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-09-04T00:23:50.000000Z"),
 *             @OA\Property(property="level", type="string", example="intermediate")
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
 *         description="Curso não encontrado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Resource not found")
 *         )
 *     )
 * )
 *
 * @OA\Delete(
 *     path="/api/v1/courses/{course}",
 *     tags={"Courses"},
 *     summary="Deletar um curso",
 *     security={{"bearerAuth": {}}},
 *     @OA\Parameter(
 *         name="course",
 *         in="path",
 *         required=true,
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=204,
 *         description="Curso deletado com sucesso"
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
 */
class CoursesControllerDoc extends Controller {}