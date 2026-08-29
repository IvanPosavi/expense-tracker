export const THEME_STORAGE_KEY = 'acme-expense-tracker-theme'

export function loadTheme() {
  try {
    if (typeof localStorage === 'undefined') {
      return 'light'
    }

    const value = localStorage.getItem(THEME_STORAGE_KEY)

    if (value === 'dark' || value === 'light') {
      return value
    }
  } catch {
    // Ignore unreadable storage so the app still starts in light mode.
  }

  return 'light'
}

export function saveTheme(theme) {
  try {
    if (typeof localStorage === 'undefined') {
      return
    }

    if (theme !== 'dark' && theme !== 'light') {
      return
    }

    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore quota errors and private-mode restrictions.
  }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
}
