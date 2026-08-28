import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatCompactCurrency, formatCurrency } from '../../utils/formatCurrency'
import EmptyState from '../EmptyState/EmptyState'
import './ExpenseChart.css'

function MonthlyTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="expense-chart__tooltip">
      <p>{label}</p>
      <p>{formatCurrency(payload[0].value)}</p>
    </div>
  )
}

function MonthlyChart({ monthlySpending }) {
  const hasSpending = monthlySpending.some((item) => item.amount > 0)

  if (!hasSpending) {
    return (
      <EmptyState
        title="Not enough data"
        description="Add some expenses to see your spending insights."
      />
    )
  }

  return (
    <div
      className="expense-chart"
      role="img"
      aria-label="Monthly spending"
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={monthlySpending} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(value) => formatCompactCurrency(value)}
          />
          <Tooltip content={MonthlyTooltip} cursor={{ fill: 'var(--primary-soft)' }} />
          <Bar
            dataKey="amount"
            fill="var(--primary)"
            radius={[6, 6, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyChart
