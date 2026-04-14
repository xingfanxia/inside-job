import { useGame } from './game/state.jsx'
import Opening from './components/Opening.jsx'
import BootScreen from './components/BootScreen.jsx'
import Desktop from './components/Desktop.jsx'
import EndingScreen from './components/EndingScreen.jsx'

export default function App() {
  const { state } = useGame()

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
