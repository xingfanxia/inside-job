import { useGame } from '../game/state.jsx'

export default function LanguageSwitcher() {
  const { state, dispatch } = useGame()

  const toggle = () => {
    const next = state.locale === 'en' ? 'zh' : 'en'
    dispatch({ type: 'SET_LOCALE', payload: next })
  }

  const isEn = state.locale === 'en'
  const label = isEn ? '中文' : 'EN'
  const title = isEn ? 'Switch to Chinese / 切换到中文' : 'Switch to English / 切换到英文'

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={toggle}
      title={title}
      aria-label={title}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1" />
        <ellipse cx="7" cy="7" rx="2.5" ry="5.5" stroke="currentColor" strokeWidth="1" />
        <line x1="1.5" y1="7" x2="12.5" y2="7" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="language-switcher-label">{label}</span>
    </button>
  )
}
