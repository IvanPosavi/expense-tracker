import { useEffect, useState } from 'react'
import { SAMPLE_EXPENSES } from '../data/sampleExpenses'
import { createExpense } from '../utils/createExpense'
import { loadExpenses, saveExpenses } from '../utils/storage'

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

  useEffect(() => {
    saveExpenses(expenses)
  }, [expenses])

  function addExpense(expenseInput) {
    const expense = createExpense(toExpenseFields(expenseInput))
    setExpenses((current) => [expense, ...current])
    return expense
  }

  function updateExpense(id, expenseInput) {
    const fields = toExpenseFields(expenseInput)

    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id ? { ...expense, ...fields } : expense,
      ),
    )
  }

  function deleteExpense(id) {
    setExpenses((current) => current.filter((expense) => expense.id !== id))
  }

  return { expenses, addExpense, updateExpense, deleteExpense }
}
