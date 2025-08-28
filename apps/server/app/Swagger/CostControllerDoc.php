<?php

namespace App\Swagger;


use App\Models\Cost;
use Illuminate\Http\Request;
use Modules\Costs\app\Models\Cost as ModelsCost;
use OpenApi\Annotations as OA;


class CostControllerDoc
{
    /**
     * @OA\Get(
     *     path="/api/v1/costs",
     *     summary="Listar todos os custos do usuário autenticado",
     *     tags={"Costs"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de custos retornada com sucesso",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="data", type="string", format="date", example="2025-08-29"),
     *                 @OA\Property(property="description", type="string", example="Compra de material"),
     *                 @OA\Property(property="category", type="string", example="Escritório"),
     *                 @OA\Property(property="value", type="number", format="float", example=150.75),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *                 @OA\Property(property="deleted_at", type="string", format="date-time", nullable=true, example=null)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthenticated")
     *         )
     *     )
     * )
     */
    public function index()
    {
    }

    /**
     * @OA\Post(
     *     path="/api/v1/costs",
     *     summary="Criar um novo custo",
     *     tags={"Costs"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"data", "description", "category", "value"},
     *             @OA\Property(property="data", type="string", format="date", example="2025-08-29"),
     *             @OA\Property(property="description", type="string", example="Compra de material"),
     *             @OA\Property(property="category", type="string", example="Escritório"),
     *             @OA\Property(property="value", type="number", format="float", example=150.75)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Custo criado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Custo criado com sucesso."),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="data", type="string", format="date", example="2025-08-29"),
     *                 @OA\Property(property="description", type="string", example="Compra de material"),
     *                 @OA\Property(property="category", type="string", example="Escritório"),
     *                 @OA\Property(property="value", type="number", format="float", example=150.75),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *                 @OA\Property(property="deleted_at", type="string", format="date-time", nullable=true, example=null)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(property="data", type="array", @OA\Items(type="string", example="The data field is required."))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthenticated")
     *         )
     *     )
     * )
     */
    public function store(Request $request)
    {
    }

    /**
     * @OA\Get(
     *     path="/api/v1/costs/{cost}",
     *     summary="Obter detalhes de um custo específico",
     *     tags={"Costs"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="cost",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         description="ID do custo"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Custo retornado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="id", type="integer", example=1),
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="data", type="string", format="date", example="2025-08-29"),
     *             @OA\Property(property="description", type="string", example="Compra de material"),
     *             @OA\Property(property="category", type="string", example="Escritório"),
     *             @OA\Property(property="value", type="number", format="float", example=150.75),
     *             @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *             @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *             @OA\Property(property="deleted_at", type="string", format="date-time", nullable=true, example=null)
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Ação não autorizada",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ação não autorizada.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Custo não encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Custo não encontrado.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthenticated")
     *         )
     *     )
     * )
     */
    public function show()
    {
    }

    /**
     * @OA\Put(
     *     path="/api/v1/costs/{cost}",
     *     summary="Atualizar um custo existente",
     *     tags={"Costs"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="cost",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         description="ID do custo"
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"data", "description", "category", "value"},
     *             @OA\Property(property="data", type="string", format="date", example="2025-08-29"),
     *             @OA\Property(property="description", type="string", example="Compra de material"),
     *             @OA\Property(property="category", type="string", example="Escritório"),
     *             @OA\Property(property="value", type="number", format="float", example=150.75)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Custo atualizado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Custo atualizado com sucesso."),
     *             @OA\Property(
     *                 property="data",
     *                 type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="user_id", type="integer", example=1),
     *                 @OA\Property(property="data", type="string", format="date", example="2025-08-29"),
     *                 @OA\Property(property="description", type="string", example="Compra de material"),
     *                 @OA\Property(property="category", type="string", example="Escritório"),
     *                 @OA\Property(property="value", type="number", format="float", example=150.75),
     *                 @OA\Property(property="created_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *                 @OA\Property(property="updated_at", type="string", format="date-time", example="2025-08-29T00:00:00.000000Z"),
     *                 @OA\Property(property="deleted_at", type="string", format="date-time", nullable=true, example=null)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Ação não autorizada",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ação não autorizada.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The given data was invalid."),
     *             @OA\Property(
     *                 property="errors",
     *                 type="object",
     *                 @OA\Property(property="data", type="array", @OA\Items(type="string", example="The data field is required."))
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Custo não encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Custo não encontrado.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthenticated")
     *         )
     *     )
     * )
     */
    public function update()
    {
    }

    /**
     * @OA\Delete(
     *     path="/api/v1/costs/{cost}",
     *     summary="Deletar (soft delete) um custo",
     *     tags={"Costs"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="cost",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer"),
     *         description="ID do custo"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Custo deletado com sucesso",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Custo deletado com sucesso.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Ação não autorizada",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Ação não autorizada.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Custo não encontrado",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Custo não encontrado.")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Não autenticado",
     *         @OA\JsonContent(
     *             @OA\Property(property="error", type="string", example="Unauthenticated")
     *         )
     *     )
     * )
     */
    public function destroy()
    {
    }
}