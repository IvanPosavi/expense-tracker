export const DATE_FILTERS = [
  { id: 'all', label: 'All time' },
  { id: 'this-month', label: 'This month' },
  { id: 'last-month', label: 'Last month' },
  { id: 'this-year', label: 'This year' },
]

export function filterExpenses(
  expenses,
  { search = '', category = 'all', dateRange = 'all' },
) {
  const query = search.trim().toLowerCase()

  return expenses.filter((expense) => {
    const matchesSearch =
      query === '' ||
      expense.title.toLowerCase().includes(query) ||
      (expense.description ?? '').toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query)

    const matchesCategory =
      category === 'all' || expense.category === category

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDateRange(expense.date, dateRange)
    )
  })
}

function matchesDateRange(dateString, dateRange) {
  if (dateRange === 'all') {
    return true
  }

  const expenseDate = parseIsoDate(dateString)

  if (!expenseDate) {
    return false
  }

  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  if (dateRange === 'this-month') {
    return (
      expenseDate.getFullYear() === currentYear &&
      expenseDate.getMonth() === currentMonth
    )
  }

  if (dateRange === 'last-month') {
    const lastMonthDate = new Date(currentYear, currentMonth - 1, 1)

    return (
      expenseDate.getFullYear() === lastMonthDate.getFullYear() &&
      expenseDate.getMonth() === lastMonthDate.getMonth()
    )
  }

  if (dateRange === 'this-year') {
    return expenseDate.getFullYear() === currentYear
  }

  return true
}

function parseIsoDate(dateString) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateString)

  if (!match) {
    return null
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
}
