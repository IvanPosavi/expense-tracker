import CategoryStats from '../CategoryStats/CategoryStats'
import { getSpendingByCategory } from '../../utils/expenseCalculations'
import './CategoriesPage.css'

function CategoriesPage({ expenses }) {
  const spendingByCategory = getSpendingByCategory(expenses)

  return (
    <section className="categories-page" aria-labelledby="categories-heading">
      <div className="categories-page__intro">
        <h2 id="categories-heading">Categories</h2>
        <p>Spending totals come from your saved expenses.</p>
      </div>

      <div className="categories-page__card">
        <CategoryStats spendingByCategory={spendingByCategory} />
      </div>
    </section>
  )
}

export default CategoriesPage
