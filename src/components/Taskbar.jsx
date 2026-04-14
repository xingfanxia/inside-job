import { useCallback, useState, useEffect, useRef } from 'react'
import { useGame } from '../game/state.jsx'
import { TOTAL_CLUES } from '../game/clues.js'
import { getIcon } from '../styles/icons.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function Taskbar() {
  const { state, dispatch, localeData } = useGame()
  const config = localeData.config
  const isZh = state.locale === 'zh'

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

  // Pulse the clue counter briefly whenever it increments
  const [pulseClues, setPulseClues] = useState(false)
  const prevCountRef = useRef(state.cluesFound.length)
  useEffect(() => {
    if (state.cluesFound.length > prevCountRef.current) {
      setPulseClues(true)
      const t = setTimeout(() => setPulseClues(false), 650)
      return () => clearTimeout(t)
    }
    prevCountRef.current = state.cluesFound.length
  }, [state.cluesFound.length])

  // Menu state
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    function onClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  const handleSaveQuit = useCallback(() => {
    setMenuOpen(false)
    dispatch({ type: 'MANUAL_SAVE' })
    // Send the player back to the opening screen — a save already exists,
    // so the next visit will offer Resume.
    setTimeout(() => {
      dispatch({ type: 'SET_SCREEN', payload: 'boot' })
    }, 50)
  }, [dispatch])

  const handleReset = useCallback(() => {
    setMenuOpen(false)
    const confirmMsg = isZh
      ? '确定要重置进度？此操作无法撤销。'
      : 'Reset all progress? This cannot be undone.'
    if (typeof window !== 'undefined' && !window.confirm(confirmMsg)) return
    dispatch({ type: 'RESET_GAME' })
    dispatch({ type: 'SET_SCREEN', payload: 'opening' })
  }, [dispatch, isZh])

  const savedLabel = (() => {
    if (!state.savedAt) return isZh ? '尚未保存' : 'Not saved yet'
    const d = new Date(state.savedAt)
    return (isZh ? '已保存 ' : 'Saved ') + d.toLocaleTimeString(isZh ? 'zh-CN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  })()

  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <div className="taskbar-menu" ref={menuRef}>
          <button
            type="button"
            className={`taskbar-menu-btn ${menuOpen ? 'taskbar-menu-btn-open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label={isZh ? '菜单' : 'Menu'}
          >
            <span className="taskbar-menu-dots">
              <span /><span /><span />
            </span>
          </button>
          {menuOpen && (
            <div className="taskbar-menu-panel" role="menu">
              <div className="taskbar-menu-meta">{savedLabel}</div>
              <button
                type="button"
                role="menuitem"
                className="taskbar-menu-item"
                onClick={handleSaveQuit}
              >
                {isZh ? '保存并退出' : 'Save & Quit'}
              </button>
              <button
                type="button"
                role="menuitem"
                className="taskbar-menu-item taskbar-menu-item-danger"
                onClick={handleReset}
              >
                {isZh ? '重置游戏' : 'Reset Game'}
              </button>
            </div>
          )}
        </div>
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
        <LanguageSwitcher />
        <span
          className="taskbar-phase-dot"
          style={{ background: phaseColors[state.reportPhase] || 'var(--text-dim)' }}
          title={`Report Phase ${state.reportPhase}`}
        />
        <span className={`taskbar-clues taskbar-clue-counter ${pulseClues ? 'pulse' : ''}`}>
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
      type="button"
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
