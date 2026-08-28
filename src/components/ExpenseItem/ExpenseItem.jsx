import { Pencil, Trash2 } from 'lucide-react'
import { getCategoryIcon } from '../../utils/getCategoryIcon'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'
import './ExpenseItem.css'

function ExpenseItem({ expense, onEdit, onDelete }) {
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

      <div className="expense-item__actions">
        <button
          type="button"
          className="expense-item__action"
          aria-label={`Edit ${expense.title}`}
          onClick={() => onEdit(expense)}
        >
          <Pencil size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="expense-item__action expense-item__action--danger"
          aria-label={`Delete ${expense.title}`}
          onClick={() => onDelete(expense)}
        >
          <Trash2 size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

export default ExpenseItem
