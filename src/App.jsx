import { useGame } from './game/state.jsx'
import Opening from './components/Opening.jsx'
import BootScreen from './components/BootScreen.jsx'
import Desktop from './components/Desktop.jsx'

export default function App() {
  const { state } = useGame()

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
