export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
  { id: 'highest', label: 'Highest amount' },
  { id: 'lowest', label: 'Lowest amount' },
]

export function sortExpensesByNewest(expenses) {
  return sortExpenses(expenses, 'newest')
}

export function sortExpenses(expenses, sortBy = 'newest') {
  const sorted = [...expenses]

  sorted.sort((first, second) => {
    if (sortBy === 'oldest') {
      return compareDates(first.date, second.date)
    }

    if (sortBy === 'highest') {
      return second.amount - first.amount
    }

    if (sortBy === 'lowest') {
      return first.amount - second.amount
    }

    return compareDates(second.date, first.date)
  })

  return sorted
}

function compareDates(firstDate, secondDate) {
  return firstDate.localeCompare(secondDate)
}
