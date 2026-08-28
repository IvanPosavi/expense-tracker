import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import PagePlaceholder from './components/PagePlaceholder/PagePlaceholder'
import { CATEGORIES } from './data/categories'
import { SAMPLE_EXPENSES } from './data/sampleExpenses'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [expenses] = useState(SAMPLE_EXPENSES)

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' ? <Dashboard /> : null}
      {currentPage === 'expenses' ? (
        <PagePlaceholder
          title="Expenses"
          description={`${expenses.length} sample expenses are loaded for development. The list and add form will be built next.`}
        />
      ) : null}
      {currentPage === 'categories' ? (
        <PagePlaceholder
          title="Categories"
          description="These names come from one shared list. Spending by category will be added later."
        >
          <ul className="page-placeholder__list">
            {CATEGORIES.map((category) => (
              <li key={category} className="page-placeholder__chip">
                {category}
              </li>
            ))}
          </ul>
        </PagePlaceholder>
      ) : null}
      {currentPage === 'settings' ? (
        <PagePlaceholder
          title="Settings"
          description="Theme and preferences will be added later. For now this page is a layout placeholder."
        />
      ) : null}
    </Layout>
  )
}

export default App
