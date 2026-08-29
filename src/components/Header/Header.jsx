import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Header.css'

function Header({ title, isSidebarOpen, onMenuClick, theme, onToggleTheme }) {
  return (
    <header className="header">
      <button
        type="button"
        className="header__menu"
        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isSidebarOpen}
        aria-controls="app-sidebar"
        onClick={onMenuClick}
      >
        {isSidebarOpen ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
      </button>
      <h1 className="header__title">{title}</h1>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

export default Header
