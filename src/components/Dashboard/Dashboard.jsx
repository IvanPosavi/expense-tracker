import ExpenseList from '../ExpenseList/ExpenseList'
import ExpenseSummary from '../ExpenseSummary/ExpenseSummary'
import CategoryStats from '../CategoryStats/CategoryStats'
import { sortExpensesByNewest } from '../../utils/sortExpenses'
import { getDashboardStats } from '../../utils/expenseCalculations'
import { formatCurrency } from '../../utils/formatCurrency'
import './Dashboard.css'

function Dashboard({ expenses, onEditExpense, onDeleteExpense }) {
  const recentExpenses = sortExpensesByNewest(expenses).slice(0, 5)
  const stats = getDashboardStats(expenses)

  return (
    <section className="dashboard" aria-labelledby="dashboard-heading">
      <p id="dashboard-heading" className="dashboard__intro">
        Overview of your spending. Average expense:{' '}
        {formatCurrency(stats.average)}.
      </p>

      <ExpenseSummary stats={stats} />

      <div className="dashboard__panels">
        <section className="panel" aria-labelledby="category-heading">
          <h2 id="category-heading">Spending by category</h2>
          <p className="panel__hint">Charts will be added in the next phase.</p>
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
