import ExpenseItem from '../ExpenseItem/ExpenseItem'
import EmptyState from '../EmptyState/EmptyState'
import './ExpenseList.css'

function ExpenseList({
  expenses,
  emptyTitle,
  emptyDescription,
  onEdit,
  onDelete,
}) {
  if (expenses.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <ul className="expense-list" aria-label="Expenses">
      {expenses.map((expense) => (
        <li key={expense.id}>
          <ExpenseItem
            expense={expense}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList
