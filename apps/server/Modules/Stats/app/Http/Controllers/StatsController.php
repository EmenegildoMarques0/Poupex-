<?php

namespace Modules\Stats\app\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Costs\app\Models\Cost;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class StatsController extends Controller
{
    /**
     * Retorna estatísticas de custos do usuário autenticado.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        
        try {
            $stats = $this->getStatistics($request);
            return response()->json([
                'status' => 'success',
                'data' => $stats,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Erro ao obter estatísticas: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Calcula as estatísticas de custos com base nos filtros fornecidos.
     *
     * @param Request $request
     * @return array
     */
    protected function getStatistics(Request $request)
    {
        

        $userId = Auth::id();
        $now = Carbon::now();

        
        
        // Filtros opcionais via query string
        $startDate = $request->query('start_date') ? Carbon::parse($request->query('start_date')) : null;
        $endDate = $request->query('end_date') ? Carbon::parse($request->query('end_date')) : $now;
        $category = $request->query('category');

        // Períodos padrão
        $sevenDaysAgo = $now->copy()->subDays(7);
        $monthStart = $now->copy()->startOfMonth();
        $lastMonthStart = $now->copy()->subMonth()->startOfMonth();
        $lastMonthEnd = $monthStart->copy()->subDay();
        $thirtyDaysAgo = $now->copy()->subDays(30);

        // Base query com filtro de usuário
        $query = Cost::where('user_id', $userId);

        // Aplicar filtros de data e categoria, se fornecidos
        if ($startDate) {
            $query->where('data', '>=', $startDate);
        }
        if ($endDate) {
            $query->where('data', '<=', $endDate);
        }
        if ($category) {
            $query->where('category', $category);
        }

        // Totais básicos
        $weekTotal = Cost::where('user_id', $userId)
            ->where('data', '>=', $sevenDaysAgo)
            ->when($category, fn($q) => $q->where('category', $category))
            ->sum('value');

        $monthTotal = Cost::where('user_id', $userId)
            ->where('data', '>=', $monthStart)
            ->when($category, fn($q) => $q->where('category', $category))
            ->sum('value');

        $lastMonthTotal = Cost::where('user_id', $userId)
            ->whereBetween('data', [$lastMonthStart, $lastMonthEnd])
            ->when($category, fn($q) => $q->where('category', $category))
            ->sum('value');

        $total = $query->sum('value');

        // Médias
        $last30DaysExpenses = Cost::where('user_id', $userId)
            ->where('data', '>=', $thirtyDaysAgo)
            ->when($category, fn($q) => $q->where('category', $category))
            ->get();
        $dailyAverage = $last30DaysExpenses->count() > 0 ? $last30DaysExpenses->sum('value') / 30 : 0;

        // Média mensal dos últimos 6 meses
        $monthlyTotals = [];
        for ($i = 0; $i < 6; $i++) {
            $monthStartLoop = $now->copy()->subMonths($i)->startOfMonth();
            $monthEndLoop = $monthStartLoop->copy()->endOfMonth();
            $monthlyTotals[] = Cost::where('user_id', $userId)
                ->whereBetween('data', [$monthStartLoop, $monthEndLoop])
                ->when($category, fn($q) => $q->where('category', $category))
                ->sum('value');
        }
        $monthlyAverage = count($monthlyTotals) > 0 ? array_sum($monthlyTotals) / count($monthlyTotals) : 0;

        // Categoria com maior gasto no mês
        $categoryTotals = Cost::where('user_id', $userId)
            ->where('data', '>=', $monthStart)
            ->select('category', DB::raw('SUM(value) as total'))
            ->groupBy('category')
            ->orderByDesc('total')
            ->first();
        $topCategory = $categoryTotals ? [$categoryTotals->category, $categoryTotals->total] : ['-', 0];

        // Dia da semana com mais gastos (nos últimos 30 dias)
       $dayTotals = Cost::where('user_id', $userId)
    ->where('data', '>=', $thirtyDaysAgo)
    ->select(DB::raw('strftime("%w", data) as day'), DB::raw('SUM(value) as total'))
    ->groupBy('day')
    ->orderByDesc('total')
    ->first();

        $dayNames = [
            'Monday' => 'Segunda-feira',
            'Tuesday' => 'Terça-feira',
            'Wednesday' => 'Quarta-feira',
            'Thursday' => 'Quinta-feira',
            'Friday' => 'Sexta-feira',
            'Saturday' => 'Sábado',
            'Sunday' => 'Domingo'
        ];
        $topDay = $dayTotals ? [$dayNames[$dayTotals->day] ?? $dayTotals->day, $dayTotals->total] : ['-', 0];

        // Previsão do mês
        $daysInMonth = $now->daysInMonth;
        $daysPassed = $now->day;
        $monthForecast = ($daysPassed > 0) ? ($monthTotal / $daysPassed) * $daysInMonth : 0;

        // Comparativo com mês anterior
        $monthComparison = ($lastMonthTotal > 0) ? (($monthTotal - $lastMonthTotal) / $lastMonthTotal) * 100 : 0;

        // Economia mensal sugerida (10% da média mensal)
        $monthlySavings = $monthlyAverage * 0.1;

        // Dados para gráficos
        $chartData = $this->getChartData(1, $startDate, $endDate, $category);

        return [
            'totals' => [
                'week' => $this->formatCurrency($weekTotal),
                'month' => $this->formatCurrency($monthTotal),
                'total' => $this->formatCurrency($total),
            ],
            'averages' => [
                'daily' => $this->formatCurrency($dailyAverage),
                'monthly' => $this->formatCurrency($monthlyAverage),
            ],
            'top' => [
                'category' => $topCategory[0] . ' (' . $this->formatCurrency($topCategory[1]) . ')',
                'day' => $topDay[0] . ' (' . $this->formatCurrency($topDay[1]) . ')',
            ],
            'forecast' => [
                'month' => $this->formatCurrency($monthForecast),
                'comparison' => number_format($monthComparison, 1) . '%',
                'savings' => $this->formatCurrency($monthlySavings),
            ],
            'charts' => $chartData,
        ];
    }

    /**
     * Retorna dados para os gráficos de estatísticas.
     *
     * @param int 1
     * @param Carbon|null $startDate
     * @param Carbon|null $endDate
     * @param string|null $category
     * @return array
     */
    protected function getChartData($userId, $startDate = null, $endDate = null, $category = null)
    {
        $now = Carbon::now();

        // Gráfico de categorias (doughnut)
        $categoryQuery = Cost::where('user_id', $userId)
            ->select('category', DB::raw('SUM(value) as total'))
            ->groupBy('category');
        if ($startDate) {
            $categoryQuery->where('data', '>=', $startDate);
        }
        if ($endDate) {
            $categoryQuery->where('data', '<=', $endDate);
        }
        if ($category) {
            $categoryQuery->where('category', $category);
        }
        $categoryData = $categoryQuery->get()->mapWithKeys(function ($item) {
            return [$item->category => $item->total];
        })->toArray();

        // Gráfico diário (bar, últimos 7 dias)
        $dailyQuery = Cost::where('user_id', $userId)
            ->where('data', '>=', $now->copy()->subDays(7))
            ->select(DB::raw('DATE(data) as date'), DB::raw('SUM(value) as total'))
            ->groupBy('date')
            ->orderBy('date');
        if ($category) {
            $dailyQuery->where('category', $category);
        }
        $dailyData = $dailyQuery->get()->mapWithKeys(function ($item) {
            return [Carbon::parse($item->date)->format('d/m/Y') => $item->total];
        })->toArray();

        // Gráfico mensal (line, últimos 6 meses)
        $monthlyData = [];
        for ($i = 0; $i < 6; $i++) {
            $monthStart = $now->copy()->subMonths($i)->startOfMonth();
            $monthEnd = $monthStart->copy()->endOfMonth();
            $query = Cost::where('user_id', $userId)
                ->whereBetween('data', [$monthStart, $monthEnd]);
            if ($category) {
                $query->where('category', $category);
            }
            $monthlyData[Carbon::parse($monthStart)->format('m/Y')] = $query->sum('value');
        }
        $monthlyData = array_reverse($monthlyData); // Ordena do mais antigo ao mais recente

        // Gráfico de top categorias (bar, top 5)
        $topCategories = Cost::where('user_id', $userId)
            ->select('category', DB::raw('SUM(value) as total'))
            ->groupBy('category')
            ->orderByDesc('total')
            ->take(5)
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->category => $item->total];
            })->toArray();

        return [
            'categoryChart' => [
                'labels' => array_keys($categoryData),
                'data' => array_values($categoryData),
            ],
            'dailyChart' => [
                'labels' => array_keys($dailyData),
                'data' => array_values($dailyData),
            ],
            'monthlyChart' => [
                'labels' => array_keys($monthlyData),
                'data' => array_values($monthlyData),
                
            ],
            'topCategoriesChart' => [
                'labels' => array_keys($topCategories),
                'data' => array_values($topCategories),
            ],
        ];
    }

    /**
     * Formata valores monetários para AOA.
     *
     * @param float $amount
     * @return string
     */
    protected function formatCurrency($amount)
    {
        return 'AOA ' . number_format($amount, 2, ',', '.');
        // Alternativa com intl: 
        // return (new \NumberFormatter('pt_AO', \NumberFormatter::CURRENCY))->formatCurrency($amount, 'AOA');
    }
}