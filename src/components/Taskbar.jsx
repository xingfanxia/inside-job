import { useCallback } from 'react'
import { useGame } from '../game/state.jsx'
import { TOTAL_CLUES } from '../game/clues.js'
import { getIcon } from '../styles/icons.jsx'

export default function Taskbar() {
  const { state, dispatch, localeData } = useGame()
  const config = localeData.config

  // Format game time (minutes since midnight) to HH:MM
  const hours = Math.floor(state.gameTimeMinutes / 60)
  const minutes = state.gameTimeMinutes % 60
  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

  // Report phase color
  const phaseColors = {
    1: 'var(--text-dim)',
    2: 'var(--accent)',
    3: 'var(--warning)',
    4: 'var(--danger)',
    5: 'var(--success)',
  }

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <span className="taskbar-company">{config.company}</span>
      </div>

      <div className="taskbar-center">
        {state.openWindows.map((win) => {
          const app = config.apps[win.appId]
          const IconComponent = app ? getIcon(app.icon) : null
          return (
            <TaskbarTab
              key={win.id}
              windowData={win}
              label={app?.label || win.appId}
              icon={IconComponent}
              isActive={state.activeWindow === win.id}
              dispatch={dispatch}
            />
          )
        })}
      </div>

      <div className="taskbar-right">
        <span
          className="taskbar-phase-dot"
          style={{ background: phaseColors[state.reportPhase] || 'var(--text-dim)' }}
          title={`Report Phase ${state.reportPhase}`}
        />
        <span className="taskbar-clues">
          {state.cluesFound.length}/{TOTAL_CLUES}
        </span>
        <span className="taskbar-clock">{timeStr}</span>
      </div>
    </div>
  )
}

function TaskbarTab({ windowData, label, icon: IconComponent, isActive, dispatch }) {
  const handleClick = useCallback(() => {
    if (windowData.isMinimized) {
      dispatch({ type: 'RESTORE_WINDOW', payload: { windowId: windowData.id } })
    } else if (isActive) {
      dispatch({ type: 'MINIMIZE_WINDOW', payload: { windowId: windowData.id } })
    } else {
      dispatch({ type: 'ACTIVATE_WINDOW', payload: { windowId: windowData.id } })
    }
  }, [windowData.id, windowData.isMinimized, isActive, dispatch])

  return (
    <button
      className={`taskbar-tab ${isActive ? 'taskbar-tab-active' : ''} ${windowData.isMinimized ? 'taskbar-tab-minimized' : ''}`}
      onClick={handleClick}
    >
      {IconComponent && (
        <span className="taskbar-tab-icon">
          <IconComponent size={14} />
        </span>
      )}
      <span className="taskbar-tab-label">{label}</span>
    </button>
  )
}
