import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import ExpensesPage from './components/ExpensesPage/ExpensesPage'
import PagePlaceholder from './components/PagePlaceholder/PagePlaceholder'
import { CATEGORIES } from './data/categories'
import { useExpenses } from './hooks/useExpenses'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { expenses, addExpense } = useExpenses()

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' ? <Dashboard /> : null}
      {currentPage === 'expenses' ? (
        <ExpensesPage expenses={expenses} onAddExpense={addExpense} />
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
