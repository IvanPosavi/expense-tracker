import { getCategoryIcon } from '../../utils/getCategoryIcon'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import './ExpenseItem.css'

function ExpenseItem({ expense }) {
  const CategoryIcon = getCategoryIcon(expense.category)

  return (
    <article className="expense-item">
      <div className="expense-item__icon" aria-hidden="true">
        <CategoryIcon size={18} />
      </div>

      <div className="expense-item__details">
        <h3 className="expense-item__title">{expense.title}</h3>
        <p className="expense-item__meta">
          {expense.category} · {formatDate(expense.date)}
        </p>
      </div>

      <p className="expense-item__amount">{formatCurrency(expense.amount)}</p>
    </article>
  )
}

export default ExpenseItem
