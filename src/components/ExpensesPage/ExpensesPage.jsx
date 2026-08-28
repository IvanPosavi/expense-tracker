import { useState } from 'react'
import ExpenseForm from '../ExpenseForm/ExpenseForm'
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
        <h2 id="expenses-heading">Add an expense</h2>
        <p>
          You currently have {expenses.length} expenses. The full list view will
          be added next.
        </p>
      </div>

      {successMessage ? (
        <p className="expenses-page__success" role="status">
          {successMessage}
        </p>
      ) : null}

      <div className="expenses-page__card">
        <ExpenseForm onSubmit={handleAddExpense} />
      </div>
    </section>
  )
}

export default ExpensesPage
