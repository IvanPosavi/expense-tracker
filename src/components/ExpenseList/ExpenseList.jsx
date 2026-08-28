import ExpenseItem from '../ExpenseItem/ExpenseItem'
import EmptyState from '../EmptyState/EmptyState'
import { sortExpensesByNewest } from '../../utils/sortExpenses'
import './ExpenseList.css'

function ExpenseList({ expenses, emptyTitle, emptyDescription }) {
  const sortedExpenses = sortExpensesByNewest(expenses)

  if (sortedExpenses.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <ul className="expense-list">
      {sortedExpenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseItem expense={expense} />
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList
