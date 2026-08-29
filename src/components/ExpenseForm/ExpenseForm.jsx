import { useId, useState } from 'react'
import { CATEGORIES } from '../../data/categories'
import {
  getFirstErrorField,
  MAX_DESCRIPTION_LENGTH,
  MAX_TITLE_LENGTH,
  validateExpense,
} from '../../utils/validateExpense'
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

function getFormValues(expense) {
  if (!expense) {
    return getEmptyForm()
  }

  return {
    title: expense.title,
    amount: String(expense.amount),
    category: expense.category,
    date: expense.date,
    description: expense.description ?? '',
  }
}

function ExpenseForm({
  onSubmit,
  initialValues = null,
  submitLabel = 'Add expense',
}) {
  const fieldId = useId()
  const [values, setValues] = useState(() => getFormValues(initialValues))
  const [errors, setErrors] = useState({})
  const errorCount = Object.keys(errors).length

  function handleChange(event) {
    const { name, value } = event.target

    setValues((current) => ({
      ...current,
      [name]: value,
    }))

    setErrors((current) => {
      if (!current[name]) {
        return current
      }

      const nextErrors = { ...current }
      delete nextErrors[name]
      return nextErrors
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nextErrors = validateExpense(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const firstField = getFirstErrorField(nextErrors)
      const field = event.currentTarget.elements.namedItem(firstField)
      field?.focus()
      return
    }

    onSubmit({
      title: values.title.trim(),
      amount: Number(values.amount),
      category: values.category,
      date: values.date,
      description: values.description.trim(),
    })

    if (!initialValues) {
      setValues(getEmptyForm())
    }

    setErrors({})
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit} noValidate>
      {errorCount > 0 ? (
        <p className="expense-form__summary" role="alert">
          Please fix {errorCount} {errorCount === 1 ? 'error' : 'errors'}{' '}
          before continuing.
        </p>
      ) : null}

      <div className="expense-form__field">
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? `${fieldId}-title-error` : undefined}
          autoComplete="off"
          maxLength={MAX_TITLE_LENGTH}
        />
        {errors.title ? (
          <p id={`${fieldId}-title-error`} className="expense-form__error">
            {errors.title}
          </p>
        ) : null}
      </div>

      <div className="expense-form__row">
        <div className="expense-form__field">
          <label htmlFor={`${fieldId}-amount`}>Amount (€)</label>
          <input
            id={`${fieldId}-amount`}
            name="amount"
            type="number"
            inputMode="decimal"
            min="0.01"
            step="0.01"
            value={values.amount}
            onChange={handleChange}
            aria-invalid={Boolean(errors.amount)}
            aria-describedby={
              errors.amount ? `${fieldId}-amount-error` : undefined
            }
          />
          {errors.amount ? (
            <p id={`${fieldId}-amount-error`} className="expense-form__error">
              {errors.amount}
            </p>
          ) : null}
        </div>

        <div className="expense-form__field">
          <label htmlFor={`${fieldId}-category`}>Category</label>
          <select
            id={`${fieldId}-category`}
            name="category"
            value={values.category}
            onChange={handleChange}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={
              errors.category ? `${fieldId}-category-error` : undefined
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
            <p id={`${fieldId}-category-error`} className="expense-form__error">
              {errors.category}
            </p>
          ) : null}
        </div>
      </div>

      <div className="expense-form__field">
        <label htmlFor={`${fieldId}-date`}>Date</label>
        <input
          id={`${fieldId}-date`}
          name="date"
          type="date"
          min="2000-01-01"
          max="2100-12-31"
          value={values.date}
          onChange={handleChange}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? `${fieldId}-date-error` : undefined}
        />
        {errors.date ? (
          <p id={`${fieldId}-date-error`} className="expense-form__error">
            {errors.date}
          </p>
        ) : null}
      </div>

      <div className="expense-form__field">
        <label htmlFor={`${fieldId}-description`}>
          Description <span className="expense-form__optional">(optional)</span>
        </label>
        <textarea
          id={`${fieldId}-description`}
          name="description"
          rows="3"
          maxLength={MAX_DESCRIPTION_LENGTH}
          value={values.description}
          onChange={handleChange}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={
            errors.description ? `${fieldId}-description-error` : undefined
          }
        />
        {errors.description ? (
          <p
            id={`${fieldId}-description-error`}
            className="expense-form__error"
          >
            {errors.description}
          </p>
        ) : null}
      </div>

      <div className="expense-form__actions">
        <button type="submit" className="expense-form__submit">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ExpenseForm
