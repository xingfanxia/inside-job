import { useCallback, useRef, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import { sounds } from '../game/sounds.js'
import { getIcon } from '../styles/icons.jsx'
import PasswordGate from './PasswordGate.jsx'

export default function Window({ windowData, children }) {
  const { state, dispatch, localeData } = useGame()
  const dragRef = useRef(null)
  const config = localeData.config
  const app = config.apps[windowData.appId]
  const isActive = state.activeWindow === windowData.id
  const needsPassword = app?.password && !state.unlockedApps.includes(windowData.appId)
  const IconComponent = app ? getIcon(app.icon) : null

  // Handle drag start on title bar
  const handleDragStart = useCallback((e) => {
    if (windowData.isMaximized) return
    e.preventDefault()

    const startX = e.clientX
    const startY = e.clientY
    const startWinX = windowData.x
    const startWinY = windowData.y

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX
      const dy = moveEvent.clientY - startY
      dispatch({
        type: 'MOVE_WINDOW',
        payload: {
          windowId: windowData.id,
          x: startWinX + dx,
          y: startWinY + dy,
        },
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [windowData.id, windowData.x, windowData.y, windowData.isMaximized, dispatch])

  // Bring to front on click anywhere in window
  const handleActivate = useCallback(() => {
    dispatch({ type: 'ACTIVATE_WINDOW', payload: { windowId: windowData.id } })
  }, [dispatch, windowData.id])

  // Play open/close sounds as the component mounts / unmounts
  useEffect(() => {
    sounds.windowOpen()
    return () => {
      sounds.windowClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = useCallback((e) => {
    e.stopPropagation()
    dispatch({ type: 'CLOSE_WINDOW', payload: { windowId: windowData.id } })
  }, [dispatch, windowData.id])

  const handleMinimize = useCallback((e) => {
    e.stopPropagation()
    dispatch({ type: 'MINIMIZE_WINDOW', payload: { windowId: windowData.id } })
  }, [dispatch, windowData.id])

  const handleMaximize = useCallback((e) => {
    e.stopPropagation()
    dispatch({ type: 'MAXIMIZE_WINDOW', payload: { windowId: windowData.id } })
  }, [dispatch, windowData.id])

  if (windowData.isMinimized) return null

  const style = {
    position: 'absolute',
    left: windowData.x,
    top: windowData.y,
    width: windowData.width,
    height: windowData.height,
    zIndex: windowData.zIndex,
  }

  return (
    <div
      className={`window ${isActive ? 'window-active' : 'window-inactive'}`}
      style={style}
      onMouseDown={handleActivate}
      ref={dragRef}
    >
      <div className="titlebar" onMouseDown={handleDragStart}>
        <div className="titlebar-left">
          {IconComponent && (
            <span className="titlebar-icon">
              <IconComponent size={16} />
            </span>
          )}
          <span className="titlebar-title">{app?.label || windowData.appId}</span>
        </div>
        <div className="titlebar-buttons">
          <button type="button" className="titlebar-btn titlebar-btn-minimize" onClick={handleMinimize}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="1" y="5" width="8" height="1" fill="currentColor" />
            </svg>
          </button>
          <button type="button" className="titlebar-btn titlebar-btn-maximize" onClick={handleMaximize}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <rect x="1" y="1" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
          <button type="button" className="titlebar-btn titlebar-btn-close" onClick={handleClose}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="1" y1="1" x2="9" y2="9" stroke="currentColor" strokeWidth="1.5" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>
      <div className="window-content">
        {needsPassword
          ? <PasswordGate appId={windowData.appId} appLabel={app.label} />
          : (children || <WindowPlaceholder appId={windowData.appId} appLabel={app?.label} />)
        }
      </div>
    </div>
  )
}

function WindowPlaceholder({ appId, appLabel }) {
  return (
    <div className="window-placeholder">
      <div className="window-placeholder-icon">
        {(() => { const I = getIcon(appId === 'lighthouse' ? 'terminal' : appId); return <I size={48} /> })()}
      </div>
      <p className="window-placeholder-text">{appLabel || appId}</p>
      <p className="window-placeholder-sub">Application content loading...</p>
    </div>
  )
}
