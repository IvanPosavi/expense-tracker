import { CATEGORIES } from '../data/categories'
import { isValidExpenseDate, MAX_EXPENSE_AMOUNT } from './validateExpense'

export const EXPENSES_STORAGE_KEY = 'acme-expense-tracker-expenses'

export function loadExpenses() {
  try {
    if (typeof localStorage === 'undefined') {
      return null
    }

    const raw = localStorage.getItem(EXPENSES_STORAGE_KEY)

    if (raw === null) {
      return null
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.map(sanitizeExpense).filter(Boolean)
  } catch {
    return []
  }
}

export function saveExpenses(expenses) {
  try {
    if (typeof localStorage === 'undefined') {
      return
    }

    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses))
  } catch {
    // Ignore quota errors and private-mode restrictions so the UI keeps working.
  }
}

function sanitizeExpense(value) {
  if (!value || typeof value !== 'object') {
    return null
  }

  const id = typeof value.id === 'string' ? value.id.trim() : ''
  const title = typeof value.title === 'string' ? value.title.trim() : ''
  const amount = Number(value.amount)
  const category = typeof value.category === 'string' ? value.category : ''
  const date = typeof value.date === 'string' ? value.date : ''
  const description =
    typeof value.description === 'string' ? value.description : ''

  if (!id || title.length < 2) {
    return null
  }

  if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_EXPENSE_AMOUNT) {
    return null
  }

  if (!CATEGORIES.includes(category) || !isValidExpenseDate(date)) {
    return null
  }

  return {
    id,
    title,
    amount,
    category,
    date,
    description,
  }
}
