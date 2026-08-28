export function sortExpensesByNewest(expenses) {
  return [...expenses].sort((first, second) => {
    if (first.date === second.date) {
      return 0
    }

    return second.date.localeCompare(first.date)
  })
}
