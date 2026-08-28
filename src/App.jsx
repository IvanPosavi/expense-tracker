import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import PagePlaceholder from './components/PagePlaceholder/PagePlaceholder'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {currentPage === 'dashboard' ? <Dashboard /> : null}
      {currentPage === 'expenses' ? (
        <PagePlaceholder
          title="Expenses"
          description="The expense list and add form will be built in the next phases."
        />
      ) : null}
      {currentPage === 'categories' ? (
        <PagePlaceholder
          title="Categories"
          description="Category insights will appear here after expense data is in place."
        />
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
