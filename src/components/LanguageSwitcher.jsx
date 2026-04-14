import { useGame } from '../game/state.jsx'

export default function LanguageSwitcher() {
  const { state, dispatch } = useGame()

  const toggle = () => {
    const next = state.locale === 'en' ? 'zh' : 'en'
    dispatch({ type: 'SET_LOCALE', payload: next })
  }

  return (
    <button type="button" className="language-switcher" onClick={toggle}>
      {state.locale === 'en' ? 'EN / 中文' : '中文 / EN'}
    </button>
  )
}
