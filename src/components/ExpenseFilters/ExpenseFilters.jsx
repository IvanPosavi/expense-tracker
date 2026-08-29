import { Search } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import { DATE_FILTERS } from '../../utils/filterExpenses'
import { SORT_OPTIONS } from '../../utils/sortExpenses'
import './ExpenseFilters.css'

function ExpenseFilters({
  search,
  category,
  dateRange,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onDateRangeChange,
  onSortChange,
}) {
  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form
      className="expense-filters"
      role="search"
      aria-label="Filter expenses"
      onSubmit={handleSubmit}
    >
      <div className="expense-filters__search">
        <label htmlFor="expense-search" className="expense-filters__label">
          Search
        </label>
        <div className="expense-filters__search-field">
          <Search size={16} aria-hidden="true" />
          <input
            id="expense-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search expenses..."
            autoComplete="off"
          />
        </div>
      </div>

      <div className="expense-filters__group">
        <label htmlFor="expense-filter-category" className="expense-filters__label">
          Category
        </label>
        <select
          id="expense-filter-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="all">All</option>
          {CATEGORIES.map((categoryName) => (
            <option key={categoryName} value={categoryName}>
              {categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="expense-filters__group">
        <label htmlFor="expense-filter-date" className="expense-filters__label">
          Date
        </label>
        <select
          id="expense-filter-date"
          value={dateRange}
          onChange={(event) => onDateRangeChange(event.target.value)}
        >
          {DATE_FILTERS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="expense-filters__group">
        <label htmlFor="expense-filter-sort" className="expense-filters__label">
          Sort
        </label>
        <select
          id="expense-filter-sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  )
}

export default ExpenseFilters
