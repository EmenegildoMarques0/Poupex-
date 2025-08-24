<?php

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Poupex API",
 *     description="Documentação da API Poupex"
 * )
 *
 * @OA\Server(
 *     url="/api/v1",
 *     description="Servidor API"
 * )
 *
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 */

namespace App\Http\Controllers;

abstract class Controller
{
    //
}
