import { CATEGORIES } from '../data/categories'

export function sumExpenses(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export function getAverageExpense(expenses) {
  if (expenses.length === 0) {
    return 0
  }

  return sumExpenses(expenses) / expenses.length
}

export function getSpendingByCategory(expenses) {
  return CATEGORIES.map((category) => ({
    category,
    amount: sumExpenses(
      expenses.filter((expense) => expense.category === category),
    ),
  })).sort((first, second) => second.amount - first.amount)
}

export function getDashboardStats(expenses, now = new Date()) {
  const thisMonth = getMonthRange(now, 0)
  const lastMonth = getMonthRange(now, -1)
  const thisWeek = getWeekRange(now, 0)
  const lastWeek = getWeekRange(now, -1)

  const total = sumExpenses(expenses)
  const thisMonthTotal = sumExpenses(inDateRange(expenses, thisMonth))
  const lastMonthTotal = sumExpenses(inDateRange(expenses, lastMonth))
  const thisWeekTotal = sumExpenses(inDateRange(expenses, thisWeek))
  const lastWeekTotal = sumExpenses(inDateRange(expenses, lastWeek))

  return {
    total,
    thisMonthTotal,
    thisWeekTotal,
    count: expenses.length,
    average: getAverageExpense(expenses),
    monthChange: getPercentChange(thisMonthTotal, lastMonthTotal),
    weekChange: getPercentChange(thisWeekTotal, lastWeekTotal),
    spendingByCategory: getSpendingByCategory(expenses),
  }
}

export function getMonthlySpending(expenses, now = new Date(), monthCount = 6) {
  const months = []

  for (let offset = monthCount - 1; offset >= 0; offset -= 1) {
    const range = getMonthRange(now, -offset)
    months.push({
      month: range.start.slice(0, 7),
      label: formatMonthLabel(range.start),
      amount: sumExpenses(inDateRange(expenses, range)),
    })
  }

  return months
}

export function getPercentChange(current, previous) {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) {
    return null
  }

  const change = ((current - previous) / previous) * 100

  if (!Number.isFinite(change)) {
    return null
  }

  return change
}

function inDateRange(expenses, range) {
  return expenses.filter(
    (expense) => expense.date >= range.start && expense.date <= range.end,
  )
}

function getMonthRange(now, monthOffset) {
  const date = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
  const start = formatIsoDate(date)
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

  return {
    start,
    end: formatIsoDate(endDate),
  }
}

function getWeekRange(now, weekOffset) {
  const start = startOfWeek(now)
  start.setDate(start.getDate() + weekOffset * 7)

  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)

  return {
    start: formatIsoDate(start),
    end: formatIsoDate(end),
  }
}

function startOfWeek(now) {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const day = date.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  date.setDate(date.getDate() + mondayOffset)
  return date
}

function formatIsoDate(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatMonthLabel(isoDate) {
  const year = Number(isoDate.slice(0, 4))
  const month = Number(isoDate.slice(5, 7))
  const date = new Date(year, month - 1, 1)

  return new Intl.DateTimeFormat('en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(date)
}
