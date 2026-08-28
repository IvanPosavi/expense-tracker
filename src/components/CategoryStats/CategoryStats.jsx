import { getCategoryIcon } from '../../utils/getCategoryIcon'
import { formatCurrency } from '../../utils/formatCurrency'
import EmptyState from '../EmptyState/EmptyState'
import './CategoryStats.css'

function CategoryStats({ spendingByCategory }) {
  const hasSpending = spendingByCategory.some((item) => item.amount > 0)

  if (!hasSpending) {
    return (
      <EmptyState
        title="No category data"
        description="Add some expenses to see spending by category."
      />
    )
  }

  return (
    <ul className="category-stats">
      {spendingByCategory.map((item) => {
        const Icon = getCategoryIcon(item.category)

        return (
          <li key={item.category} className="category-stats__row">
            <span className="category-stats__icon" aria-hidden="true">
              <Icon size={16} />
            </span>
            <span className="category-stats__name">{item.category}</span>
            <span className="category-stats__amount">
              {formatCurrency(item.amount)}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default CategoryStats
