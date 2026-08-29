import { Calendar, CalendarRange, ListOrdered, Wallet } from 'lucide-react'
import { formatCurrency } from '../../utils/formatCurrency'
import './ExpenseSummary.css'

function formatChange(percent) {
  if (!Number.isFinite(percent)) {
    return null
  }

  const absolute = Math.abs(percent).toFixed(1)
  const sign = percent > 0 ? '+' : percent < 0 ? '−' : ''

  return `${sign}${absolute}%`
}

function ExpenseSummary({ stats }) {
  const cards = [
    {
      id: 'total',
      label: 'Total Expenses',
      value: formatCurrency(stats.total),
      extra: `${stats.count} ${stats.count === 1 ? 'expense' : 'expenses'}`,
      icon: Wallet,
    },
    {
      id: 'month',
      label: 'This Month',
      value: formatCurrency(stats.thisMonthTotal),
      change: formatChange(stats.monthChange),
      changeLabel: 'vs last month',
      noChangeLabel: 'No previous month to compare',
      icon: Calendar,
    },
    {
      id: 'week',
      label: 'This Week',
      value: formatCurrency(stats.thisWeekTotal),
      change: formatChange(stats.weekChange),
      changeLabel: 'vs last week',
      icon: CalendarRange,
    },
    {
      id: 'count',
      label: 'Number of Expenses',
      value: String(stats.count),
      extra: `Average ${formatCurrency(stats.average)}`,
      icon: ListOrdered,
    },
  ]

  return (
    <div className="summary-grid">
      {cards.map((card) => {
        const Icon = card.icon
        const isNegative = card.change?.startsWith('−')
        const isPositive = card.change?.startsWith('+')

        return (
          <article key={card.id} className="summary-card">
            <div className="summary-card__header">
              <p className="summary-card__label">{card.label}</p>
              <span className="summary-card__icon" aria-hidden="true">
                <Icon size={18} />
              </span>
            </div>
            <p className="summary-card__value">{card.value}</p>
            {card.change ? (
              <p
                className={
                  isNegative
                    ? 'summary-card__change summary-card__change--down'
                    : isPositive
                      ? 'summary-card__change summary-card__change--up'
                      : 'summary-card__change'
                }
              >
                <span className="visually-hidden">
                  {isNegative
                    ? 'Decrease of '
                    : isPositive
                      ? 'Increase of '
                      : 'Change of '}
                </span>
                {card.change} {card.changeLabel}
              </p>
            ) : card.extra ? (
              <p className="summary-card__change">{card.extra}</p>
            ) : (
              <p className="summary-card__change">
                {card.noChangeLabel ?? 'No previous period to compare'}
              </p>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default ExpenseSummary
