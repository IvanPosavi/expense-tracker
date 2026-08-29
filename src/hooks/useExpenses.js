import { useState } from 'react'
import { SAMPLE_EXPENSES } from '../data/sampleExpenses'
import { createExpense } from '../utils/createExpense'
import { loadExpenses, saveExpenses } from '../utils/storage'
import { validateExpense } from '../utils/validateExpense'

const STORAGE_WARNING =
  'Your expenses could not be saved on this device. You can keep using the app, but changes may be lost after refresh.'

function toExpenseFields(expenseInput) {
  return {
    title: expenseInput.title.trim(),
    amount: Number(expenseInput.amount),
    category: expenseInput.category,
    date: expenseInput.date,
    description: expenseInput.description?.trim() ?? '',
  }
}

function getInitialExpenses() {
  const storedExpenses = loadExpenses()

  if (storedExpenses === null) {
    return SAMPLE_EXPENSES
  }

  return storedExpenses
}

export function useExpenses() {
  const [expenses, setExpenses] = useState(getInitialExpenses)
  const [didSave, setDidSave] = useState(() => {
    const storedExpenses = loadExpenses()

    if (storedExpenses === null) {
      return saveExpenses(SAMPLE_EXPENSES)
    }

    return true
  })

  function persist(nextExpenses) {
    setExpenses(nextExpenses)
    setDidSave(saveExpenses(nextExpenses))
  }

  function addExpense(expenseInput) {
    const fields = toExpenseFields(expenseInput)
    const errors = validateExpense(fields)

    if (Object.keys(errors).length > 0) {
      return null
    }

    const expense = createExpense(fields)
    persist([expense, ...expenses])
    return expense
  }

  function updateExpense(id, expenseInput) {
    const fields = toExpenseFields(expenseInput)
    const errors = validateExpense(fields)

    if (Object.keys(errors).length > 0) {
      return false
    }

    persist(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, ...fields } : expense,
      ),
    )
    return true
  }

  function deleteExpense(id) {
    persist(expenses.filter((expense) => expense.id !== id))
  }

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    storageWarning: didSave ? null : STORAGE_WARNING,
  }
}
