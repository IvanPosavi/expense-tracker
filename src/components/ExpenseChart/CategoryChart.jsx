import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { CATEGORY_COLORS } from '../../data/categories'
import { formatCurrency } from '../../utils/formatCurrency'
import EmptyState from '../EmptyState/EmptyState'
import './ExpenseChart.css'

function CategoryTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0]

  return (
    <div className="expense-chart__tooltip">
      <p>{item.name}</p>
      <p>{formatCurrency(item.value)}</p>
    </div>
  )
}

function CategoryChart({ spendingByCategory }) {
  const data = spendingByCategory.filter((item) => item.amount > 0)

  if (data.length === 0) {
    return (
      <EmptyState
        title="Not enough data"
        description="Add some expenses to see your spending insights."
      />
    )
  }

  const summary = data
    .map((item) => `${item.category} ${formatCurrency(item.amount)}`)
    .join(', ')

  return (
    <figure className="expense-chart">
      <figcaption className="visually-hidden">
        Spending by category: {summary}.
      </figcaption>
      <div className="expense-chart__canvas" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
            >
              {data.map((item) => (
                <Cell
                  key={item.category}
                  fill={CATEGORY_COLORS[item.category] ?? 'var(--chart-8)'}
                />
              ))}
            </Pie>
            <Tooltip content={CategoryTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </figure>
  )
}

export default CategoryChart
