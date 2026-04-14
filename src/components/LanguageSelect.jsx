import { useCallback } from 'react'
import { useGame } from '../game/state.jsx'

const LOCALE_KEY = 'inside-job-locale'

export default function LanguageSelect({ onPicked }) {
  const { dispatch } = useGame()

  const pick = useCallback((locale) => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LOCALE_KEY, locale)
      } catch { /* noop */ }
    }
    dispatch({ type: 'SET_LOCALE', payload: locale })
    if (onPicked) onPicked()
  }, [dispatch, onPicked])

  return (
    <div className="language-select-screen">
      <div className="language-select-container">
        <div className="language-select-logo">NovaTech</div>
        <div className="language-select-tagline">Internal Portal</div>

        <div className="language-select-prompt">
          <span>Choose your language</span>
          <span className="language-select-prompt-zh">选择语言</span>
        </div>

        <div className="language-select-options">
          <button
            type="button"
            className="language-select-btn"
            onClick={() => pick('en')}
          >
            <div className="language-select-btn-primary">English</div>
            <div className="language-select-btn-secondary">International</div>
          </button>

          <button
            type="button"
            className="language-select-btn"
            onClick={() => pick('zh')}
          >
            <div className="language-select-btn-primary">中文</div>
            <div className="language-select-btn-secondary">简体中文</div>
          </button>
        </div>

        <div className="language-select-footer">
          You can change this later in the taskbar
          <span className="language-select-footer-sep">·</span>
          之后可以在任务栏切换
        </div>
      </div>
    </div>
  )
}

export { LOCALE_KEY }
