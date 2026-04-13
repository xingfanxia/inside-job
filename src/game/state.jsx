import { createContext, useContext, useReducer, useMemo, useCallback } from 'react'
import { getLocaleData } from '../config/locales.js'
import { TOTAL_CLUES } from './clues.js'

// --- Report phase thresholds ---
function calcReportPhase(clueCount) {
  if (clueCount >= 18) return 5
  if (clueCount >= 15) return 4
  if (clueCount >= 11) return 3
  if (clueCount >= 6) return 2
  return 1
}

// --- Derive default unlocked apps from config ---
function getDefaultUnlocked(config) {
  return Object.values(config.apps)
    .filter((app) => app.defaultUnlocked)
    .map((app) => app.id)
}

// --- Initial state factory ---
function createInitialState(locale = 'en') {
  const data = getLocaleData(locale)
  return {
    screen: 'opening',
    locale,
    openWindows: [],
    activeWindow: null,
    cluesFound: [],
    mirrorClues: [],
    appsOpened: [],
    unlockedApps: getDefaultUnlocked(data.config),
    reportPhase: 1,
    gamePhase: 'investigating',
    nextZIndex: 100,
    gameTimeMinutes: 555, // 9:15 AM
    selectedEnding: null,
  }
}

// --- Window ID generator ---
let windowCounter = 0
function nextWindowId() {
  windowCounter += 1
  return `win-${windowCounter}`
}

// --- Reducer ---
function gameReducer(state, action) {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const { appId } = action.payload
      // Don't open duplicate windows for the same app
      const existing = state.openWindows.find((w) => w.appId === appId)
      if (existing) {
        // Just activate the existing one
        return {
          ...state,
          activeWindow: existing.id,
          openWindows: state.openWindows.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: state.nextZIndex }
              : w
          ),
          nextZIndex: state.nextZIndex + 1,
          appsOpened: state.appsOpened.includes(appId)
            ? state.appsOpened
            : [...state.appsOpened, appId],
        }
      }

      const win = {
        id: nextWindowId(),
        appId,
        x: 80 + (state.openWindows.length % 5) * 30,
        y: 40 + (state.openWindows.length % 5) * 30,
        width: 700,
        height: 500,
        zIndex: state.nextZIndex,
        isMinimized: false,
        isMaximized: false,
        preMaxRect: null,
      }

      return {
        ...state,
        openWindows: [...state.openWindows, win],
        activeWindow: win.id,
        nextZIndex: state.nextZIndex + 1,
        appsOpened: state.appsOpened.includes(appId)
          ? state.appsOpened
          : [...state.appsOpened, appId],
      }
    }

    case 'CLOSE_WINDOW': {
      const { windowId } = action.payload
      const remaining = state.openWindows.filter((w) => w.id !== windowId)
      return {
        ...state,
        openWindows: remaining,
        activeWindow:
          state.activeWindow === windowId
            ? (remaining.length > 0 ? remaining[remaining.length - 1].id : null)
            : state.activeWindow,
      }
    }

    case 'MINIMIZE_WINDOW': {
      const { windowId } = action.payload
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === windowId ? { ...w, isMinimized: true } : w
        ),
        activeWindow:
          state.activeWindow === windowId
            ? null
            : state.activeWindow,
      }
    }

    case 'RESTORE_WINDOW': {
      const { windowId } = action.payload
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === windowId
            ? { ...w, isMinimized: false, zIndex: state.nextZIndex }
            : w
        ),
        activeWindow: windowId,
        nextZIndex: state.nextZIndex + 1,
      }
    }

    case 'ACTIVATE_WINDOW': {
      const { windowId } = action.payload
      if (state.activeWindow === windowId) return state
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === windowId
            ? { ...w, zIndex: state.nextZIndex }
            : w
        ),
        activeWindow: windowId,
        nextZIndex: state.nextZIndex + 1,
      }
    }

    case 'MOVE_WINDOW': {
      const { windowId, x, y } = action.payload
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === windowId ? { ...w, x, y } : w
        ),
      }
    }

    case 'RESIZE_WINDOW': {
      const { windowId, width, height } = action.payload
      return {
        ...state,
        openWindows: state.openWindows.map((w) =>
          w.id === windowId ? { ...w, width, height } : w
        ),
      }
    }

    case 'MAXIMIZE_WINDOW': {
      const { windowId } = action.payload
      return {
        ...state,
        openWindows: state.openWindows.map((w) => {
          if (w.id !== windowId) return w
          if (w.isMaximized) {
            // Restore from maximized
            return {
              ...w,
              isMaximized: false,
              x: w.preMaxRect?.x ?? 80,
              y: w.preMaxRect?.y ?? 40,
              width: w.preMaxRect?.width ?? 700,
              height: w.preMaxRect?.height ?? 500,
              preMaxRect: null,
            }
          }
          // Maximize
          return {
            ...w,
            isMaximized: true,
            preMaxRect: { x: w.x, y: w.y, width: w.width, height: w.height },
            x: 0,
            y: 0,
            width: window.innerWidth - 260, // leave room for report panel
            height: window.innerHeight - 44, // leave room for taskbar
          }
        }),
      }
    }

    case 'ADD_CLUE': {
      const clueId = action.payload
      if (state.cluesFound.includes(clueId)) return state

      const newClues = [...state.cluesFound, clueId]
      const newPhase = calcReportPhase(newClues.length)
      const shouldUnlockLighthouse = newClues.length >= 15

      return {
        ...state,
        cluesFound: newClues,
        reportPhase: newPhase,
        unlockedApps: shouldUnlockLighthouse && !state.unlockedApps.includes('lighthouse')
          ? [...state.unlockedApps, 'lighthouse']
          : state.unlockedApps,
      }
    }

    case 'ADD_MIRROR_CLUE': {
      const clueId = action.payload
      if (state.mirrorClues.includes(clueId)) return state
      return {
        ...state,
        mirrorClues: [...state.mirrorClues, clueId],
      }
    }

    case 'UNLOCK_APP': {
      const { appId } = action.payload
      if (state.unlockedApps.includes(appId)) return state
      return {
        ...state,
        unlockedApps: [...state.unlockedApps, appId],
      }
    }

    case 'SET_SCREEN': {
      return { ...state, screen: action.payload }
    }

    case 'SET_LOCALE': {
      const newLocale = action.payload
      const data = getLocaleData(newLocale)
      return {
        ...state,
        locale: newLocale,
        unlockedApps: getDefaultUnlocked(data.config),
      }
    }

    case 'TICK_TIME': {
      return {
        ...state,
        gameTimeMinutes: state.gameTimeMinutes + 1,
      }
    }

    case 'SET_PHASE': {
      return { ...state, gamePhase: action.payload }
    }

    case 'SELECT_ENDING': {
      return {
        ...state,
        selectedEnding: action.payload,
        gamePhase: 'ending',
      }
    }

    default:
      return state
  }
}

// --- Context ---
const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, 'en', createInitialState)

  const localeData = useMemo(() => getLocaleData(state.locale), [state.locale])

  const value = useMemo(
    () => ({ state, dispatch, localeData }),
    [state, dispatch, localeData]
  )

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return ctx
}
