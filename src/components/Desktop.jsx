import { useMemo, useEffect, useState, useCallback } from 'react'
import { useGame } from '../game/state.jsx'
import DesktopIcon from './DesktopIcon.jsx'
import Window from './Window.jsx'
import Taskbar from './Taskbar.jsx'
import IncidentReport from './IncidentReport.jsx'
import MobileWarning from './MobileWarning.jsx'
import Onboarding from './Onboarding.jsx'
import ClueToast from './ClueToast.jsx'
import CluesNotebook from './CluesNotebook.jsx'
import HintPanel from './HintPanel.jsx'
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
  const [notebookOpen, setNotebookOpen] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)

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

  // Mirror the current locale onto <html> so locale-specific CSS
  // (e.g. the desktop watermark) can switch without a JS round trip.
  useEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('lang', state.locale)
    document.body.setAttribute('data-locale', state.locale)
  }, [state.locale])

  const openHint = useCallback(() => setHintOpen(true), [])
  const closeHint = useCallback(() => setHintOpen(false), [])
  const openNotebook = useCallback(() => setNotebookOpen(true), [])
  const closeNotebook = useCallback(() => setNotebookOpen(false), [])

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
      <Taskbar onOpenHint={openHint} onOpenNotebook={openNotebook} />
      <MobileWarning />
      <Onboarding />
      <ClueToast />
      {notebookOpen && <CluesNotebook onClose={closeNotebook} />}
      {hintOpen && <HintPanel onClose={closeHint} />}
    </div>
  )
}
