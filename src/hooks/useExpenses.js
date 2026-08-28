import { useState } from 'react'
import { SAMPLE_EXPENSES } from '../data/sampleExpenses'
import { createExpense } from '../utils/createExpense'

export function useExpenses() {
  const [expenses, setExpenses] = useState(SAMPLE_EXPENSES)

  function addExpense(expenseInput) {
    const expense = createExpense({
      title: expenseInput.title.trim(),
      amount: expenseInput.amount,
      category: expenseInput.category,
      date: expenseInput.date,
      description: expenseInput.description?.trim() ?? '',
    })

    setExpenses((current) => [expense, ...current])
    return expense
  }

  return { expenses, addExpense }
}
