import { useEffect, useState } from 'react'
import { SAMPLE_EXPENSES } from '../data/sampleExpenses'
import { createExpense } from '../utils/createExpense'
import { loadExpenses, saveExpenses } from '../utils/storage'
import { validateExpense } from '../utils/validateExpense'

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
  const [didSave, setDidSave] = useState(true)

  useEffect(() => {
    setDidSave(saveExpenses(expenses))
  }, [expenses])

  function addExpense(expenseInput) {
    const fields = toExpenseFields(expenseInput)
    const errors = validateExpense(fields)

    if (Object.keys(errors).length > 0) {
      return null
    }

    const expense = createExpense(fields)
    setExpenses((current) => [expense, ...current])
    return expense
  }

  function updateExpense(id, expenseInput) {
    const fields = toExpenseFields(expenseInput)
    const errors = validateExpense(fields)

    if (Object.keys(errors).length > 0) {
      return
    }

    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id ? { ...expense, ...fields } : expense,
      ),
    )
  }

  function deleteExpense(id) {
    setExpenses((current) => current.filter((expense) => expense.id !== id))
  }

  return {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    storageWarning: didSave
      ? null
      : 'Your expenses could not be saved on this device. You can keep using the app, but changes may be lost after refresh.',
  }
}
