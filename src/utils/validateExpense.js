import { CATEGORIES } from '../data/categories'

export const MAX_EXPENSE_AMOUNT = 1_000_000

export function validateExpense(values) {
  const errors = {}
  const title = values.title.trim()

  if (!title) {
    errors.title = 'Enter a title.'
  } else if (title.length < 2) {
    errors.title = 'Title must be at least 2 characters.'
  }

  if (values.amount === '' || values.amount === null || values.amount === undefined) {
    errors.amount = 'Enter an amount.'
  } else {
    const amountValue = Number(values.amount)

    if (Number.isNaN(amountValue)) {
      errors.amount = 'Enter a valid amount.'
    } else if (amountValue <= 0) {
      errors.amount = 'Amount must be greater than 0.'
    } else if (amountValue > MAX_EXPENSE_AMOUNT) {
      errors.amount = 'Amount cannot be more than 1,000,000.'
    }
  }

  if (!values.category) {
    errors.category = 'Choose a category.'
  } else if (!CATEGORIES.includes(values.category)) {
    errors.category = 'Choose a valid category.'
  }

  if (!values.date) {
    errors.date = 'Choose a date.'
  } else if (!isValidDate(values.date)) {
    errors.date = 'Enter a valid date.'
  }

  return errors
}

function isValidDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}
