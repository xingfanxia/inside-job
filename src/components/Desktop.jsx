import { useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import DesktopIcon from './DesktopIcon.jsx'
import Window from './Window.jsx'
import Taskbar from './Taskbar.jsx'
import IncidentReport from './IncidentReport.jsx'

export default function Desktop() {
  const { state, dispatch, localeData } = useGame()
  const config = localeData.config

  // Get ordered list of apps for the icon grid
  const apps = useMemo(() => {
    return Object.values(config.apps)
  }, [config.apps])

  // Tick the game clock every 30 seconds of real time = 1 game minute
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK_TIME' })
    }, 30000)
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <div className="desktop">
      <div className="desktop-main">
        <div className="desktop-icons">
          {apps.map((app) => (
            <DesktopIcon key={app.id} appConfig={app} />
          ))}
        </div>

        <div className="desktop-windows">
          {state.openWindows.map((win) => (
            <Window key={win.id} windowData={win} />
          ))}
        </div>
      </div>

      <IncidentReport />
      <Taskbar />
    </div>
  )
}
