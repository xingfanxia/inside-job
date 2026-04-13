import { useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import DesktopIcon from './DesktopIcon.jsx'
import Window from './Window.jsx'
import Taskbar from './Taskbar.jsx'
import IncidentReport from './IncidentReport.jsx'
import EmailApp from '../apps/EmailApp.jsx'
import SlackApp from '../apps/SlackApp.jsx'
import DocVaultApp from '../apps/DocVaultApp.jsx'
import PeopleHubApp from '../apps/PeopleHubApp.jsx'
import AccessLogApp from '../apps/AccessLogApp.jsx'
import PrintTraceApp from '../apps/PrintTraceApp.jsx'
import NetWatchApp from '../apps/NetWatchApp.jsx'
import CalendarApp from '../apps/CalendarApp.jsx'
import CCTVApp from '../apps/CCTVApp.jsx'
import ITDeskApp from '../apps/ITDeskApp.jsx'
import SecureFilesApp from '../apps/SecureFilesApp.jsx'
import LighthouseApp from '../apps/LighthouseApp.jsx'

const appComponents = {
  email: EmailApp,
  slack: SlackApp,
  docvault: DocVaultApp,
  peoplehub: PeopleHubApp,
  accesslog: AccessLogApp,
  printtrace: PrintTraceApp,
  netwatch: NetWatchApp,
  calendar: CalendarApp,
  cctv: CCTVApp,
  itdesk: ITDeskApp,
  secfiles: SecureFilesApp,
  lighthouse: LighthouseApp,
}

function getAppContent(appId) {
  const Component = appComponents[appId]
  if (!Component) return null
  return <Component />
}

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
            <Window key={win.id} windowData={win}>
              {getAppContent(win.appId)}
            </Window>
          ))}
        </div>
      </div>

      <IncidentReport />
      <Taskbar />
    </div>
  )
}
