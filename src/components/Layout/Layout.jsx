import { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { PAGE_TITLES } from '../../data/navigation'
import './Layout.css'

function Layout({
  currentPage,
  onNavigate,
  children,
  theme,
  onToggleTheme,
  storageWarning,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function handleNavigate(pageId) {
    onNavigate(pageId)
    closeSidebar()
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isSidebarOpen) {
      return
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeSidebar()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSidebarOpen])

  return (
    <div className="layout">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {isSidebarOpen ? (
        <button
          type="button"
          className="layout__overlay"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      ) : null}

      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isOpen={isSidebarOpen}
      />

      <div className="layout__main">
        <Header
          title={PAGE_TITLES[currentPage]}
          isSidebarOpen={isSidebarOpen}
          onMenuClick={() => setIsSidebarOpen((open) => !open)}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />
        <main id="main-content" className="layout__content">
          {storageWarning ? (
            <p className="layout__banner" role="status">
              {storageWarning}
            </p>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
