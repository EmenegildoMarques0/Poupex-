<?php

namespace App\Swagger;

/**
 *  * @OA\Info(
 *     version="1.0.0",
 *     title="Poupex API",
 *     description="Documentação da API Poupex"
 * )
 * @OA\Post(
 *     path="/api/v1/login",
 *     tags={"Auth"},
 *     summary="Login do usuário",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email","password"},
 *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="SenhaForte123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Login bem-sucedido"
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Credenciais inválidas"
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/v1/logout",
 *     tags={"Auth"},
 *     summary="Logout do usuário",
 *     security={{"bearerAuth":{}}},
 *     @OA\Response(
 *         response=200,
 *         description="Logout realizado com sucesso"
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/v1/forgot-password",
 *     tags={"Auth"},
 *     summary="Enviar e-mail de recuperação de senha",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email"},
 *             @OA\Property(property="email", type="string", format="email", example="user@example.com")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="E-mail de recuperação enviado"
 *     )
 * )
 *
 * @OA\Post(
 *     path="/api/v1/reset-password",
 *     tags={"Auth"},
 *     summary="Resetar senha do usuário",
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"token","email","password","password_confirmation"},
 *             @OA\Property(property="token", type="string", example="abcdef123456"),
 *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
 *             @OA\Property(property="password", type="string", format="password", example="NovaSenha123"),
 *             @OA\Property(property="password_confirmation", type="string", format="password", example="NovaSenha123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Senha redefinida com sucesso"
 *     )
 * )
 */
class AuthControllerDoc {}
