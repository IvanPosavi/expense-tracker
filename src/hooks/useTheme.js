import { useEffect, useState } from 'react'
import { applyTheme, loadTheme, saveTheme } from '../utils/theme'

export function useTheme() {
  const [theme, setThemeState] = useState(loadTheme)

  useEffect(() => {
    applyTheme(theme)
    saveTheme(theme)
  }, [theme])

  function setTheme(nextTheme) {
    if (nextTheme !== 'light' && nextTheme !== 'dark') {
      return
    }

    setThemeState(nextTheme)
  }

  function toggleTheme() {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return { theme, setTheme, toggleTheme }
}
