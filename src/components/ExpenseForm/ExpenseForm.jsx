import { useState } from 'react'
import { CATEGORIES } from '../../data/categories'
import { validateExpense } from '../../utils/validateExpense'
import './ExpenseForm.css'

function getTodayDate() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getEmptyForm() {
  return {
    title: '',
    amount: '',
    category: '',
    date: getTodayDate(),
    description: '',
  }
}

function ExpenseForm({ onSubmit }) {
  const [values, setValues] = useState(getEmptyForm)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateExpense(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit({
      title: values.title.trim(),
      amount: Number(values.amount),
      category: values.category,
      date: values.date,
      description: values.description.trim(),
    })

    setValues(getEmptyForm())
    setErrors({})
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      <div className="expense-form__field">
        <label htmlFor="expense-title">Title</label>
        <input
          id="expense-title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'expense-title-error' : undefined}
          autoComplete="off"
        />
        {errors.title ? (
          <p id="expense-title-error" className="expense-form__error" role="alert">
            {errors.title}
          </p>
        ) : null}
      </div>

      <div className="expense-form__row">
        <div className="expense-form__field">
          <label htmlFor="expense-amount">Amount (€)</label>
          <input
            id="expense-amount"
            name="amount"
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            value={values.amount}
            onChange={handleChange}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={errors.amount ? 'expense-amount-error' : undefined}
          />
          {errors.amount ? (
            <p id="expense-amount-error" className="expense-form__error" role="alert">
              {errors.amount}
            </p>
          ) : null}
        </div>

        <div className="expense-form__field">
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            name="category"
            value={values.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={
              errors.category ? 'expense-category-error' : undefined
            }
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <p
              id="expense-category-error"
              className="expense-form__error"
              role="alert"
            >
              {errors.category}
            </p>
          ) : null}
        </div>
      </div>

      <div className="expense-form__field">
        <label htmlFor="expense-date">Date</label>
        <input
          id="expense-date"
          name="date"
          type="date"
          value={values.date}
          onChange={handleChange}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? 'expense-date-error' : undefined}
        />
        {errors.date ? (
          <p id="expense-date-error" className="expense-form__error" role="alert">
            {errors.date}
          </p>
        ) : null}
      </div>

      <div className="expense-form__field">
        <label htmlFor="expense-description">
          Description <span className="expense-form__optional">(optional)</span>
        </label>
        <textarea
          id="expense-description"
          name="description"
          rows="3"
          value={values.description}
          onChange={handleChange}
        />
      </div>

      <div className="expense-form__actions">
        <button type="submit" className="expense-form__submit">
          Add expense
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm
