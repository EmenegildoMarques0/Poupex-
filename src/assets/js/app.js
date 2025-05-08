// Classe para gerenciar os gastos
class ExpenseManager {
    constructor() {
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        this.categories = ['Alimentação', 'Transporte', 'Lazer', 'Moradia', 'Saúde', 'Outros'];
        this.charts = {};
        this.setupEventListeners();
        this.updateAll();
        this.initializeCharts();
    }

    setupEventListeners() {
        // Formulário de adição de gastos
        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        // Botão de salvar edição
        document.getElementById('saveEdit').addEventListener('click', () => {
            this.saveEdit();
        });

        // Filtros
        document.getElementById('searchInput').addEventListener('input', () => this.updateExpensesList());
        document.getElementById('categoryFilter').addEventListener('change', () => this.updateExpensesList());

        // Navegação
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSection(link.dataset.section);
            });
        });

        // Dark mode
        document.getElementById('darkModeToggle').addEventListener('click', () => this.toggleDarkMode());

        // Inicializa os gráficos quando a página carregar
        window.addEventListener('load', () => {
            this.updateAll();
            this.initializeCharts();
        });

        // Limpar dados
        document.getElementById('clearAll').addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar todos os dados?')) {
                this.clearAllData();
            }
        });
    }

    addExpense() {
        const date = document.getElementById('date').value;
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (!date || !category || !description || isNaN(amount)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const expense = {
            id: Date.now(),
            date,
            category,
            description,
            amount
        };

        this.expenses.push(expense);
        this.saveExpenses();
        this.updateAll();
        document.getElementById('expenseForm').reset();
    }

    deleteExpense(id) {
        if (confirm('Tem certeza que deseja excluir este gasto?')) {
            this.expenses = this.expenses.filter(expense => expense.id !== id);
            this.saveExpenses();
            this.updateAll();
        }
    }

    updateAll() {
        this.updateExpensesList();
        this.updateStatistics();
        this.updateRecentExpenses();
        this.updateCharts();
    }

    saveExpenses() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }

    updateExpensesList() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const tbody = document.getElementById('expensesList');
        const mobileCards = document.getElementById('mobileCards');
        tbody.innerHTML = '';
        if (mobileCards) mobileCards.innerHTML = '';

        const filteredExpenses = this.expenses
            .filter(expense => {
                const matchesSearch = expense.description.toLowerCase().includes(searchTerm) ||
                                    expense.category.toLowerCase().includes(searchTerm);
                const matchesCategory = !categoryFilter || expense.category === categoryFilter;
                return matchesSearch && matchesCategory;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        // Atualiza a tabela para desktop
        filteredExpenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.formatDate(expense.date)}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${this.formatCurrency(expense.amount)}</td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm edit-btn" data-id="${expense.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });

        // Atualiza os cards para mobile
        if (mobileCards) {
            filteredExpenses.forEach(expense => {
                const card = document.createElement('div');
                card.className = 'expense-card';
                card.innerHTML = `
                    <div class="card-header">
                        <span class="date">${this.formatDate(expense.date)}</span>
                        <span class="amount">${this.formatCurrency(expense.amount)}</span>
                    </div>
                    <div class="card-body">
                        <div>
                            <span class="label">Categoria:</span>
                            <span class="value">${expense.category}</span>
                        </div>
                        <div>
                            <span class="label">Descrição:</span>
                            <span class="value">${expense.description}</span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="actions">
                            <button class="btn btn-primary btn-sm edit-btn" data-id="${expense.id}">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                mobileCards.appendChild(card);
            });
        }

        // Adiciona os event listeners
        this.addEventListenersToButtons();
    }

    addEventListenersToButtons() {
        // Event listeners para botões na tabela
        document.querySelectorAll('#expensesList .edit-btn, #expensesList .delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                if (e.currentTarget.classList.contains('edit-btn')) {
                    this.editExpense(id);
                } else {
                    this.deleteExpense(id);
                }
            });
        });

        // Event listeners para botões nos cards mobile
        document.querySelectorAll('.mobile-cards .edit-btn, .mobile-cards .delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                if (e.currentTarget.classList.contains('edit-btn')) {
                    this.editExpense(id);
                } else {
                    this.deleteExpense(id);
                }
            });
        });
    }

    editExpense(id) {
        const expense = this.expenses.find(e => e.id === id);
        if (!expense) return;

        document.getElementById('editId').value = expense.id;
        document.getElementById('editDate').value = expense.date;
        document.getElementById('editCategory').value = expense.category;
        document.getElementById('editDescription').value = expense.description;
        document.getElementById('editAmount').value = expense.amount;

        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    }

    saveEdit() {
        const id = parseInt(document.getElementById('editId').value);
        const date = document.getElementById('editDate').value;
        const category = document.getElementById('editCategory').value;
        const description = document.getElementById('editDescription').value;
        const amount = parseFloat(document.getElementById('editAmount').value);

        if (!date || !category || !description || isNaN(amount)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const index = this.expenses.findIndex(e => e.id === id);
        if (index === -1) return;

        this.expenses[index] = {
            id,
            date,
            category,
            description,
            amount
        };

        this.saveExpenses();
        this.updateAll();
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal.hide();
    }

    updateRecentExpenses() {
        const tbody = document.getElementById('recentExpenses');
        tbody.innerHTML = '';

        const recentExpenses = [...this.expenses]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        recentExpenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${this.formatDate(expense.date)}</td>
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${this.formatCurrency(expense.amount)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    updateStatistics() {
        const now = new Date();
        // Calcula a data de 7 dias atrás
        const sevenDaysAgo = new Date(now);
        sevenDaysAgo.setDate(now.getDate() - 7);
        
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const thirtyDaysAgo = new Date(now);
        thirtyDaysAgo.setDate(now.getDate() - 30);

        // Totais básicos
        const weekTotal = this.expenses
            .filter(expense => new Date(expense.date) >= sevenDaysAgo)
            .reduce((sum, expense) => sum + expense.amount, 0);

        const monthTotal = this.expenses
            .filter(expense => new Date(expense.date) >= monthStart)
            .reduce((sum, expense) => sum + expense.amount, 0);

        const lastMonthTotal = this.expenses
            .filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= lastMonthStart && expenseDate < monthStart;
            })
            .reduce((sum, expense) => sum + expense.amount, 0);

        const total = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // Médias
        const last30DaysExpenses = this.expenses
            .filter(expense => new Date(expense.date) >= thirtyDaysAgo);
        
        const dailyAverage = last30DaysExpenses.length > 0
            ? last30DaysExpenses.reduce((sum, expense) => sum + expense.amount, 0) / 30
            : 0;

        // Média mensal dos últimos 6 meses
        const last6Months = Array.from({ length: 6 }, (_, i) => {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            return date;
        });

        const monthlyAverages = last6Months.map(monthStart => {
            const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
            const monthExpenses = this.expenses.filter(expense => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= monthStart && expenseDate <= monthEnd;
            });
            return monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        });

        const monthlyAverage = monthlyAverages.reduce((sum, avg) => sum + avg, 0) / 6;

        // Categoria com maior gasto no mês
        const categoryTotals = {};
        this.expenses
            .filter(expense => new Date(expense.date) >= monthStart)
            .forEach(expense => {
                categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
            });

        const topCategory = Object.entries(categoryTotals)
            .sort(([,a], [,b]) => b - a)[0] || ['-', 0];

        // Dia da semana com mais gastos
        const dayTotals = {};
        last30DaysExpenses.forEach(expense => {
            const day = new Date(expense.date).toLocaleDateString('pt-AO', { weekday: 'long' });
            dayTotals[day] = (dayTotals[day] || 0) + expense.amount;
        });

        const topDay = Object.entries(dayTotals)
            .sort(([,a], [,b]) => b - a)[0] || ['-', 0];

        // Previsão do mês
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        const daysPassed = now.getDate();
        const monthForecast = daysPassed > 0
            ? (monthTotal / daysPassed) * daysInMonth
            : 0;

        // Comparativo com mês anterior
        const monthComparison = lastMonthTotal > 0
            ? ((monthTotal - lastMonthTotal) / lastMonthTotal) * 100
            : 0;

        // Economia mensal sugerida (10% da média mensal)
        const monthlySavings = monthlyAverage * 0.1;

        // Atualiza os elementos da interface
        document.getElementById('weekTotal').textContent = this.formatCurrency(weekTotal);
        document.getElementById('monthTotal').textContent = this.formatCurrency(monthTotal);
        document.getElementById('total').textContent = this.formatCurrency(total);
        document.getElementById('dailyAverage').textContent = this.formatCurrency(dailyAverage);
        document.getElementById('monthlyAverage').textContent = this.formatCurrency(monthlyAverage);
        document.getElementById('topCategory').textContent = `${topCategory[0]} (${this.formatCurrency(topCategory[1])})`;
        document.getElementById('topDay').textContent = `${topDay[0]} (${this.formatCurrency(topDay[1])})`;
        document.getElementById('monthForecast').textContent = this.formatCurrency(monthForecast);
        document.getElementById('monthComparison').textContent = `${monthComparison.toFixed(1)}%`;
        document.getElementById('monthlySavings').textContent = this.formatCurrency(monthlySavings);

        // Adiciona classe de cor ao comparativo
        const comparisonElement = document.getElementById('monthComparison');
        comparisonElement.classList.remove('text-success', 'text-danger');
        if (monthComparison > 0) {
            comparisonElement.classList.add('text-danger');
        } else if (monthComparison < 0) {
            comparisonElement.classList.add('text-success');
        }
    }

    updateCharts() {
        this.updateCategoryChart();
        this.updateDailyChart();
        this.updateMonthlyChart();
        this.updateTopCategoriesChart();
    }

    updateCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        
        const categoryTotals = {};
        this.expenses.forEach(expense => {
            categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
        });

        if (this.charts.category) {
            this.charts.category.destroy();
        }

        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryTotals),
                datasets: [{
                    data: Object.values(categoryTotals),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    updateDailyChart() {
        const ctx = document.getElementById('dailyChart').getContext('2d');
        
        const dailyTotals = {};
        this.expenses.forEach(expense => {
            const date = new Date(expense.date).toLocaleDateString('pt-BR');
            dailyTotals[date] = (dailyTotals[date] || 0) + expense.amount;
        });

        const sortedDates = Object.keys(dailyTotals).sort((a, b) => new Date(a) - new Date(b));
        const last7Days = sortedDates.slice(-7);

        if (this.charts.daily) {
            this.charts.daily.destroy();
        }

        this.charts.daily = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Gastos Diários',
                    data: last7Days.map(date => dailyTotals[date]),
                    backgroundColor: '#0d6efd'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateMonthlyChart() {
        const ctx = document.getElementById('monthlyChart').getContext('2d');
        
        const monthlyTotals = {};
        this.expenses.forEach(expense => {
            const date = new Date(expense.date);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            monthlyTotals[monthYear] = (monthlyTotals[monthYear] || 0) + expense.amount;
        });

        const sortedMonths = Object.keys(monthlyTotals).sort((a, b) => {
            const [monthA, yearA] = a.split('/');
            const [monthB, yearB] = b.split('/');
            return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
        });

        if (this.charts.monthly) {
            this.charts.monthly.destroy();
        }

        this.charts.monthly = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedMonths,
                datasets: [{
                    label: 'Evolução Mensal',
                    data: sortedMonths.map(month => monthlyTotals[month]),
                    borderColor: '#0d6efd',
                    tension: 0.4,
                    fill: true,
                    backgroundColor: 'rgba(13, 110, 253, 0.1)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateTopCategoriesChart() {
        const ctx = document.getElementById('topCategoriesChart').getContext('2d');
        
        const categoryTotals = {};
        this.expenses.forEach(expense => {
            categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
        });

        const sortedCategories = Object.entries(categoryTotals)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);

        if (this.charts.topCategories) {
            this.charts.topCategories.destroy();
        }

        this.charts.topCategories = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: sortedCategories.map(([category]) => category),
                datasets: [{
                    label: 'Top Categorias',
                    data: sortedCategories.map(([,amount]) => amount),
                    backgroundColor: '#0d6efd'
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateCategoryFilter() {
        const select = document.getElementById('categoryFilter');
        select.innerHTML = '<option value="">Todas as categorias</option>';
        this.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
    }

    showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Atualiza os dados da seção quando ela é exibida
        this.updateAll();
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const icon = document.querySelector('#darkModeToggle i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
            localStorage.setItem('darkMode', 'true');
        } else {
            icon.classList.remove('bi-sun');
            icon.classList.add('bi-moon');
            localStorage.setItem('darkMode', 'false');
        }
    }

    setupDarkMode() {
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            const icon = document.querySelector('#darkModeToggle i');
            icon.classList.remove('bi-moon');
            icon.classList.add('bi-sun');
        }
    }

    clearAllData() {
        this.expenses = [];
        this.saveExpenses();
        this.updateExpensesList();
        this.updateStatistics();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA'
        }).format(amount);
    }

    initializeCharts() {
        // Inicializa os gráficos com dados vazios
        this.categoryChart = new Chart(document.getElementById('categoryChart'), {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#0d6efd',
                        '#198754',
                        '#ffc107',
                        '#dc3545',
                        '#0dcaf0',
                        '#6c757d'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        this.dailyChart = new Chart(document.getElementById('dailyChart'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Gastos Diários',
                    data: [],
                    borderColor: '#0d6efd',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        this.monthlyChart = new Chart(document.getElementById('monthlyChart'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Gastos Mensais',
                    data: [],
                    backgroundColor: '#0d6efd'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        this.expensesChart = new Chart(document.getElementById('expensesChart'), {
            type: 'pie',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#0d6efd',
                        '#198754',
                        '#ffc107',
                        '#dc3545',
                        '#0dcaf0',
                        '#6c757d'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        this.topCategoriesChart = new Chart(document.getElementById('topCategoriesChart'), {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Top Categorias',
                    data: [],
                    backgroundColor: '#0d6efd'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y'
            }
        });
    }
}

// Inicializa o gerenciador de gastos quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.expenseManager = new ExpenseManager();
}); 