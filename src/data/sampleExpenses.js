import { createExpense } from '../utils/createExpense'

/**
 * Development sample data only.
 * Remove this import (or empty the array) before treating the app as production.
 */
export const SAMPLE_EXPENSES = [
  createExpense({
    title: 'Groceries',
    amount: 64.5,
    category: 'Food',
    date: '2026-08-23',
    description: 'Weekly groceries',
  }),
  createExpense({
    title: 'Fuel',
    amount: 55,
    category: 'Transport',
    date: '2026-08-25',
    description: 'Full tank',
  }),
  createExpense({
    title: 'Netflix',
    amount: 12.99,
    category: 'Entertainment',
    date: '2026-08-01',
    description: 'Monthly subscription',
  }),
  createExpense({
    title: 'Electricity',
    amount: 85,
    category: 'Bills',
    date: '2026-08-15',
    description: 'August bill',
  }),
]
