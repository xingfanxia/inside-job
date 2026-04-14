import { useState } from 'react'
import { useGame } from './game/state.jsx'
import Opening from './components/Opening.jsx'
import BootScreen from './components/BootScreen.jsx'
import Desktop from './components/Desktop.jsx'
import EndingScreen from './components/EndingScreen.jsx'
import LanguageSelect, { LOCALE_KEY } from './components/LanguageSelect.jsx'

// Check if user has picked a language before. Runs once on initial render.
function hasPickedLanguage() {
  if (typeof window === 'undefined') return true
  try {
    return window.localStorage.getItem(LOCALE_KEY) !== null
  } catch {
    return true
  }
}

export default function App() {
  const { state } = useGame()
  const [languagePicked, setLanguagePicked] = useState(hasPickedLanguage)

  // First-time visitors see the language picker before anything else
  if (!languagePicked) {
    return <LanguageSelect onPicked={() => setLanguagePicked(true)} />
  }

  // Ending sequence takes over the full screen once the player commits
  if (state.gamePhase === 'ending' && state.selectedEnding) {
    return <EndingScreen />
  }

  switch (state.screen) {
    case 'opening':
      return <Opening />
    case 'boot':
      return <BootScreen />
    case 'desktop':
      return <Desktop />
    default:
      return <Opening />
  }
}
