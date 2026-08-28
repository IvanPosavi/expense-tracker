import { generateId } from './generateId'

export function createExpense({
  title,
  amount,
  category,
  date,
  description = '',
}) {
  return {
    id: generateId(),
    title,
    amount: Number(amount),
    category,
    date,
    description,
  }
}
