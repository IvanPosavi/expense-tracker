import { CATEGORIES } from '../data/categories'

export const MAX_EXPENSE_AMOUNT = 1_000_000
export const MAX_TITLE_LENGTH = 80
export const MAX_DESCRIPTION_LENGTH = 300
export const MIN_EXPENSE_YEAR = 2000
export const MAX_EXPENSE_YEAR = 2100

export const EXPENSE_FIELD_ORDER = [
  'title',
  'amount',
  'category',
  'date',
  'description',
]

export function validateExpense(values) {
  const errors = {}
  const title = String(values.title ?? '').trim()
  const amountText = String(values.amount ?? '').trim()
  const description = String(values.description ?? '').trim()

  if (!title) {
    errors.title = 'Enter a title.'
  } else if (title.length < 2) {
    errors.title = 'Title must be at least 2 characters.'
  } else if (title.length > MAX_TITLE_LENGTH) {
    errors.title = `Title cannot be more than ${MAX_TITLE_LENGTH} characters.`
  }

  if (amountText === '') {
    errors.amount = 'Enter an amount.'
  } else {
    const amountValue = Number(amountText)

    if (!Number.isFinite(amountValue)) {
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
  } else if (!isValidExpenseDate(values.date)) {
    errors.date = 'Enter a valid date.'
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `Description cannot be more than ${MAX_DESCRIPTION_LENGTH} characters.`
  }

  return errors
}

export function getFirstErrorField(errors) {
  return EXPENSE_FIELD_ORDER.find((field) => errors[field])
}

export function isValidExpenseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return false
  }

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(year, month - 1, day)

  if (year < MIN_EXPENSE_YEAR || year > MAX_EXPENSE_YEAR) {
    return false
  }

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}
