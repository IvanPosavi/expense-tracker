import {
  LayoutDashboard,
  Receipt,
  Tags,
  Settings,
  Wallet,
} from 'lucide-react'
import { NAV_ITEMS, SETTINGS_ITEM } from '../../data/navigation'
import './Sidebar.css'

const ICONS = {
  dashboard: LayoutDashboard,
  expenses: Receipt,
  categories: Tags,
  settings: Settings,
}

function NavButton({ item, currentPage, onNavigate }) {
  const Icon = ICONS[item.id]
  const isActive = currentPage === item.id

  return (
    <button
      type="button"
      className={isActive ? 'sidebar__link is-active' : 'sidebar__link'}
      aria-current={isActive ? 'page' : undefined}
      onClick={() => onNavigate(item.id)}
    >
      <Icon size={18} aria-hidden="true" />
      {item.label}
    </button>
  )
}

function Sidebar({ currentPage, onNavigate, isOpen }) {
  return (
    <aside
      id="app-sidebar"
      className={isOpen ? 'sidebar is-open' : 'sidebar'}
      aria-label="Application"
    >
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden="true">
          <Wallet size={18} />
        </div>
        <div>
          <p className="sidebar__product">Expense Tracker</p>
          <p className="sidebar__company">ACME</p>
        </div>
      </div>

      <nav className="sidebar__nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            item={item}
            currentPage={currentPage}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="sidebar__footer">
        <NavButton
          item={SETTINGS_ITEM}
          currentPage={currentPage}
          onNavigate={onNavigate}
        />
      </div>
    </aside>
  )
}

export default Sidebar
