import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Dashboard from './components/Dashboard/Dashboard'
import ExpensesPage from './components/ExpensesPage/ExpensesPage'
import CategoriesPage from './components/CategoriesPage/CategoriesPage'
import SettingsPage from './components/SettingsPage/SettingsPage'
import Modal from './components/Modal/Modal'
import ExpenseForm from './components/ExpenseForm/ExpenseForm'
import { useExpenses } from './hooks/useExpenses'
import { useTheme } from './hooks/useTheme'
import { formatCurrency } from './utils/formatCurrency'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const { theme, setTheme, toggleTheme } = useTheme()
  const { expenses, addExpense, updateExpense, deleteExpense, storageWarning } =
    useExpenses()
  const [editingExpense, setEditingExpense] = useState(null)
  const [deletingExpense, setDeletingExpense] = useState(null)

  function handleEditExpense(expense) {
    setDeletingExpense(null)
    setEditingExpense(expense)
  }

  function handleDeleteExpense(expense) {
    setEditingExpense(null)
    setDeletingExpense(expense)
  }

  function handleUpdateExpense(expenseInput) {
    updateExpense(editingExpense.id, expenseInput)
    setEditingExpense(null)
  }

  function handleConfirmDelete() {
    deleteExpense(deletingExpense.id)
    setDeletingExpense(null)
  }

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        theme={theme}
        onToggleTheme={toggleTheme}
        storageWarning={storageWarning}
        inert={Boolean(editingExpense || deletingExpense)}
      >
        {currentPage === 'dashboard' ? (
          <Dashboard
            expenses={expenses}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        ) : null}
        {currentPage === 'expenses' ? (
          <ExpensesPage
            expenses={expenses}
            onAddExpense={addExpense}
            onEditExpense={handleEditExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        ) : null}
        {currentPage === 'categories' ? (
          <CategoriesPage expenses={expenses} />
        ) : null}
        {currentPage === 'settings' ? (
          <SettingsPage theme={theme} onThemeChange={setTheme} />
        ) : null}
      </Layout>

      {editingExpense ? (
        <Modal title="Edit expense" onClose={() => setEditingExpense(null)}>
          <ExpenseForm
            key={editingExpense.id}
            initialValues={editingExpense}
            submitLabel="Save changes"
            onSubmit={handleUpdateExpense}
          />
        </Modal>
      ) : null}

      {deletingExpense ? (
        <Modal
          title="Delete expense"
          role="alertdialog"
          descriptionId="delete-expense-description"
          onClose={() => setDeletingExpense(null)}
        >
          <p id="delete-expense-description" className="modal__text">
            Delete {deletingExpense.title} (
            {formatCurrency(deletingExpense.amount)})? This cannot be undone.
          </p>
          <div className="modal__actions">
            <button
              type="button"
              className="modal__button modal__button--secondary"
              onClick={() => setDeletingExpense(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="modal__button modal__button--danger"
              onClick={handleConfirmDelete}
            >
              Delete
            </button>
          </div>
        </Modal>
      ) : null}
    </>
  )
}

export default App
