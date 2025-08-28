<?php

namespace Modules\Costs\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Costs\app\Models\Cost;

class CostsController extends Controller
{
      public function __construct()
    {
        //$this->middleware('auth:sanctum'); // Requer autenticação via Sanctum para todas as ações
    }

    public function index()
    {
        $costs = Cost::where('user_id', Auth::id())->get();
        return response()->json($costs, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'data' => 'required|date',
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'value' => 'required|numeric|min:0',
        ]);

        $validated['user_id'] = Auth::id(); // Associa o custo ao usuário logado
        $cost = Cost::create($validated);

        return response()->json([
            'message' => 'Custo criado com sucesso.',
            'data' => $cost
        ], 201);
    }

    public function show(Cost $cost)
    {
        $this->authorizeCost($cost); // Verifica se o custo pertence ao usuário
        return response()->json($cost, 200);
    }

    public function update(Request $request, Cost $cost)
    {
        $this->authorizeCost($cost); // Verifica se o custo pertence ao usuário
        $validated = $request->validate([
            'data' => 'required|date',
            'description' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'value' => 'required|numeric|min:0',
        ]);

        $cost->update($validated);

        return response()->json([
            'message' => 'Custo atualizado com sucesso.',
            'data' => $cost
        ], 200);
    }

    public function destroy(Cost $cost)
    {
        $this->authorizeCost($cost); // Verifica se o custo pertence ao usuário
        $cost->delete();
        return response()->json(['message' => 'Custo deletado com sucesso.'], 200);
    }

    private function authorizeCost(Cost $cost)
    {
        if ($cost->user_id !== Auth::id()) {
            abort(403, 'Ação não autorizada.');
        }
    }
}
