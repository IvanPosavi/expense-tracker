import { useState } from 'react'
import ExpenseForm from '../ExpenseForm/ExpenseForm'
import ExpenseList from '../ExpenseList/ExpenseList'
import { formatCurrency } from '../../utils/formatCurrency'
import './ExpensesPage.css'

function ExpensesPage({ expenses, onAddExpense }) {
  const [successMessage, setSuccessMessage] = useState('')

  function handleAddExpense(expenseInput) {
    const expense = onAddExpense(expenseInput)
    setSuccessMessage(
      `${expense.title} was added for ${formatCurrency(expense.amount)}.`,
    )
  }

  return (
    <section className="expenses-page" aria-labelledby="expenses-heading">
      <div className="expenses-page__intro">
        <h2 id="expenses-heading">Expenses</h2>
        <p>
          You currently have {expenses.length}{' '}
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
        <ExpenseList
          expenses={expenses}
          emptyTitle="No expenses yet"
          emptyDescription="Start tracking your spending by adding your first expense."
        />
      </div>
    </section>
  )
}

export default ExpensesPage
