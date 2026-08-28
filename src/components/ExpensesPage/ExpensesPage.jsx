import { useState } from 'react'
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import ExpenseList from '../ExpenseList/ExpenseList'
import ExpenseFilters from '../ExpenseFilters/ExpenseFilters'
import { formatCurrency } from '../../utils/formatCurrency'
import { filterExpenses } from '../../utils/filterExpenses'
import { sortExpenses } from '../../utils/sortExpenses'
import './ExpensesPage.css'

function ExpensesPage({ expenses, onAddExpense, onEditExpense, onDeleteExpense }) {
  const [successMessage, setSuccessMessage] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [dateRange, setDateRange] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const visibleExpenses = sortExpenses(
    filterExpenses(expenses, { search, category, dateRange }),
    sortBy,
  )

  const hasActiveFilters =
    search.trim() !== '' || category !== 'all' || dateRange !== 'all'

  function handleAddExpense(expenseInput) {
    const expense = onAddExpense(expenseInput)
    setSuccessMessage(
      `${expense.title} was added for ${formatCurrency(expense.amount)}.`,
    )
  }

  const emptyTitle = hasActiveFilters
    ? 'No matching expenses'
    : 'No expenses yet'
  const emptyDescription = hasActiveFilters
    ? 'Try another search term or change your filters.'
    : 'Start tracking your spending by adding your first expense.'

  return (
    <section className="expenses-page" aria-labelledby="expenses-heading">
      <div className="expenses-page__intro">
        <h2 id="expenses-heading">Expenses</h2>
        <p>
          Showing {visibleExpenses.length} of {expenses.length}{' '}
          {expenses.length === 1 ? 'expense' : 'expenses'}.
        </p>
      </div>

      {successMessage ? (
        <p className="expenses-page__success" role="status">
          {successMessage}
        </p>
      ) : null}

      <div className="expenses-page__card">
        <h3 className="expenses-page__card-title">Add an expense</h3>
        <ExpenseForm onSubmit={handleAddExpense} />
      </div>

      <div className="expenses-page__list">
        <h3 className="expenses-page__list-title">All expenses</h3>
        <ExpenseFilters
          search={search}
          category={category}
          dateRange={dateRange}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onDateRangeChange={setDateRange}
          onSortChange={setSortBy}
        />
        <ExpenseList
          expenses={visibleExpenses}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          onEdit={onEditExpense}
          onDelete={onDeleteExpense}
        />
      </div>
    </section>
  )
}

export default ExpensesPage
