import './SettingsPage.css'

function SettingsPage({ theme, onThemeChange }) {
  return (
    <section className="settings-page" aria-labelledby="settings-heading">
      <div className="settings-page__intro">
        <h2 id="settings-heading">Settings</h2>
        <p>Choose a light or dark appearance. Your choice is saved on this device.</p>
      </div>

      <div className="settings-page__card">
        <h3 className="settings-page__label">Appearance</h3>
        <div className="settings-page__options" role="group" aria-label="Color theme">
          <button
            type="button"
            className={
              theme === 'light'
                ? 'settings-page__option is-active'
                : 'settings-page__option'
            }
            aria-pressed={theme === 'light'}
            onClick={() => onThemeChange('light')}
          >
            Light
          </button>
          <button
            type="button"
            className={
              theme === 'dark'
                ? 'settings-page__option is-active'
                : 'settings-page__option'
            }
            aria-pressed={theme === 'dark'}
            onClick={() => onThemeChange('dark')}
          >
            Dark
          </button>
        </div>
      </div>
    </section>
  )
}

export default SettingsPage
