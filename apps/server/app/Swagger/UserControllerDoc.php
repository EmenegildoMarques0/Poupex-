<?php

namespace App\Swagger;

/**
 * @OA\Post(
 *     path="/api/v1/register",
 *     tags={"User"},
 *     summary="Registrar novo usuário",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"name","email","password","password_confirmation"},
 *             @OA\Property(property="name", type="string", example="Emenegildo Marques"),
 *             @OA\Property(property="email", type="string", format="email", example="emenegildo@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="SenhaForte123"),
 *             @OA\Property(property="password_confirmation", type="string", format="password", example="SenhaForte123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=201,
 *         description="Usuário registrado com sucesso"
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/v1/user",
 *     tags={"User"},
 *     summary="Obter usuário autenticado",
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="Informações do usuário autenticado"
 *     )
 * )
 *
 * @OA\Put(
 *     path="/api/v1/user",
 *     tags={"User"},
 *     summary="Atualizar dados do usuário",
 *     security={{"bearerAuth":{}}},
 *     @OA\RequestBody(
 *         @OA\JsonContent(
 *             @OA\Property(property="name", type="string", example="Novo Nome"),
 *             @OA\Property(property="email", type="string", format="email", example="novoemail@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="NovaSenha123"),
 *             @OA\Property(property="password_confirmation", type="string", format="password", example="NovaSenha123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Usuário atualizado com sucesso"
 *     )
 * )
 */
class UserControllerDoc {}
