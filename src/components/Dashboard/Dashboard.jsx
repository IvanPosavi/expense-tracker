import './Dashboard.css'

const SUMMARY_CARDS = [
  { id: 'total', label: 'Total Expenses' },
  { id: 'month', label: 'This Month' },
  { id: 'week', label: 'This Week' },
  { id: 'count', label: 'Number of Expenses' },
]

function Dashboard() {
  return (
    <section className="dashboard" aria-labelledby="dashboard-heading">
      <p id="dashboard-heading" className="dashboard__intro">
        Overview of your spending. Real totals will appear once expenses are
        added.
      </p>

      <div className="summary-grid">
        {SUMMARY_CARDS.map((card) => (
          <article key={card.id} className="summary-card">
            <p className="summary-card__label">{card.label}</p>
            <p className="summary-card__value">—</p>
          </article>
        ))}
      </div>

      <div className="dashboard__panels">
        <section className="panel" aria-labelledby="chart-heading">
          <h2 id="chart-heading">Spending overview</h2>
          <p>Charts will be added in a later phase.</p>
        </section>
        <section className="panel" aria-labelledby="recent-heading">
          <h2 id="recent-heading">Recent expenses</h2>
          <p>Your latest expenses will show up here.</p>
        </section>
      </div>
    </section>
  )
}

export default Dashboard
