export interface MetricStats {
	totals: Totals;
	averages: Averages;
	top: Top;
	forecast: Forecast;
	charts: Charts;
}

interface Totals {
	week: string;
	month: string;
	total: string;
}

interface Averages {
	daily: string;
	monthly: string;
}

interface Top {
	category: string;
	day: string;
}

interface Forecast {
	month: string;
	comparison: string;
	savings: string;
}

interface Charts {
	categoryChart: CategoryChart;
	dailyChart: DailyChart;
	monthlyChart: MonthlyChart;
	topCategoriesChart: TopCategoriesChart;
}

type CharType = {
	labels: string[];
	data: number[];
};

interface CategoryChart extends CharType {}
interface DailyChart extends CharType {}
interface MonthlyChart extends CharType {}
interface TopCategoriesChart extends CharType {}
