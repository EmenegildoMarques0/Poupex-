<?php

namespace App\Swagger;

use App\Http\Controllers\Controller;

/**

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
 *         description="Login bem-sucedido",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Login realizado com sucesso"),
 *             @OA\Property(
 *                 property="user",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="name", type="string", example="João Silva"),
 *                 @OA\Property(property="email", type="string", example="user@example.com")
 *             ),
 *             @OA\Property(property="token", type="string", example="1|randomstring123")
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Credenciais inválidas",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Credenciais inválidas")
 *         )
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
 *         description="Logout realizado com sucesso",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Logout realizado com sucesso")
 *         )
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
 *         description="E-mail de recuperação enviado",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Link de reset enviado")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Erro ao enviar e-mail",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Erro ao enviar link")
 *         )
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
 *         description="Senha redefinida com sucesso",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Senha redefinida com sucesso")
 *         )
 *     ),
 *     @OA\Response(
 *         response=400,
 *         description="Erro ao redefinir senha",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Erro ao redefinir senha")
 *         )
 *     )
 * )
 *
 * @OA\Get(
 *     path="/api/v1/auth/token-verify",
 *     tags={"Auth"},
 *     summary="Verifica a validade do token e retorna os dados do usuário",
 *     security={{"bearerAuth": {}}},
 *     @OA\Response(
 *         response=200,
 *         description="Token válido, dados do usuário retornados",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="success"),
 *             @OA\Property(
 *                 property="user",
 *                 type="object",
 *                 @OA\Property(property="id", type="integer", example=1),
 *                 @OA\Property(property="name", type="string", example="João Silva"),
 *                 @OA\Property(property="email", type="string", example="user@example.com")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Token inválido ou usuário não autenticado",
 *         @OA\JsonContent(
 *             @OA\Property(property="status", type="string", example="error"),
 *             @OA\Property(property="message", type="string", example="Token inválido")
 *         )
 *     )
 * )
 */
class AuthControllerDoc extends Controller{}