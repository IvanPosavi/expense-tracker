import ExpenseList from '../ExpenseList/ExpenseList'
import ExpenseSummary from '../ExpenseSummary/ExpenseSummary'
import CategoryStats from '../CategoryStats/CategoryStats'
import CategoryChart from '../ExpenseChart/CategoryChart'
import MonthlyChart from '../ExpenseChart/MonthlyChart'
import { sortExpensesByNewest } from '../../utils/sortExpenses'
import {
  getDashboardStats,
  getMonthlySpending,
} from '../../utils/expenseCalculations'
import { formatCurrency } from '../../utils/formatCurrency'
import './Dashboard.css'

function Dashboard({ expenses, onEditExpense, onDeleteExpense }) {
  const recentExpenses = sortExpensesByNewest(expenses).slice(0, 5)
  const stats = getDashboardStats(expenses)
  const monthlySpending = getMonthlySpending(expenses)

  return (
    <section className="dashboard" aria-labelledby="dashboard-heading">
      <h2 id="dashboard-heading" className="dashboard__intro">
        Overview of your spending. Average expense:{' '}
        {formatCurrency(stats.average)}.
      </h2>

      <ExpenseSummary stats={stats} />

      <div className="dashboard__charts">
        <section className="panel" aria-labelledby="category-chart-heading">
          <h2 id="category-chart-heading">Spending by category</h2>
          <CategoryChart spendingByCategory={stats.spendingByCategory} />
        </section>
        <section className="panel" aria-labelledby="monthly-chart-heading">
          <h2 id="monthly-chart-heading">Spending over time</h2>
          <MonthlyChart monthlySpending={monthlySpending} />
        </section>
      </div>

      <div className="dashboard__panels">
        <section className="panel" aria-labelledby="category-heading">
          <h2 id="category-heading">Category totals</h2>
          <CategoryStats spendingByCategory={stats.spendingByCategory} />
        </section>
        <section className="panel" aria-labelledby="recent-heading">
          <h2 id="recent-heading">Recent expenses</h2>
          <ExpenseList
            expenses={recentExpenses}
            emptyTitle="No expenses yet"
            emptyDescription="Start tracking your spending by adding your first expense."
            onEdit={onEditExpense}
            onDelete={onDeleteExpense}
          />
        </section>
      </div>
    </section>
  )
}

export default Dashboard
