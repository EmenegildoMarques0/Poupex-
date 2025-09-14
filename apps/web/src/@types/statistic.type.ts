export interface ResponseStatistic {
  status: string
  data: Statistic
}

export interface Statistic {
  totals: Totals
  averages: Averages
  top: Top
  forecast: Forecast
  charts: Charts
}

export interface Totals {
  week: string
  month: string
  total: string
}

export interface Averages {
  daily: string
  monthly: string
}

export interface Top {
  category: string
  day: string
}

export interface Forecast {
  month: string
  comparison: string
  savings: string
}

export interface Charts {
  categoryChart: CategoryChart
  dailyChart: DailyChart
  monthlyChart: MonthlyChart
  topCategoriesChart: TopCategoriesChart
}

export interface CategoryChart {
  labels: string[]
  data: number[]
}

export interface DailyChart {
  labels: string[]
  data: number[]
}

export interface MonthlyChart {
  labels: string[]
  data: number[]
}

export interface TopCategoriesChart {
  labels: string[]
  data: number[]
}
