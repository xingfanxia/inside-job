import { createContext, useContext, useReducer, useMemo, useCallback, useEffect, useRef } from 'react'
import { getLocaleData } from '../config/locales.js'
import { LIGHTHOUSE_UNLOCK_CLUES, ENDING_AVAILABLE_CLUES } from './clues.js'
import { sounds } from './sounds.js'

// --- Persistence ---
export const SAVE_KEY = 'inside-job-save'

// Fields to persist to localStorage. UI-only fields (openWindows,
// activeWindow, nextZIndex, lastFoundClueId, lastFoundClueAt) are excluded.
const PERSISTED_FIELDS = [
  'locale',
  'cluesFound',
  'mirrorClues',
  'appsOpened',
  'unlockedApps',
  'reportPhase',
  'gamePhase',
  'gameTimeMinutes',
  'selectedEnding',
  'screen',
]

function serializeState(state) {
  const out = {}
  for (const key of PERSISTED_FIELDS) out[key] = state[key]
  out.savedAt = Date.now()
  return out
}

export function loadSave() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (!Array.isArray(parsed.cluesFound)) return null
    return parsed
  } catch (err) {
    console.warn('Failed to load save:', err)
    return null
  }
}

function writeSave(state) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(serializeState(state)))
  } catch (err) {
    console.warn('Failed to persist save:', err)
  }
}

export function clearSave() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(SAVE_KEY)
  } catch (err) {
    console.warn('Failed to clear save:', err)
  }
}

export function hasSave() {
  return loadSave() !== null
}

// --- Report phase thresholds ---
// Recalibrated for ~36 total clues. Phase 5 gates the ending choices and
// matches ENDING_AVAILABLE_CLUES so thresholds stay consistent between the
// state machine and the report data.
function calcReportPhase(clueCount) {
  if (clueCount >= ENDING_AVAILABLE_CLUES) return 5 // 30
  if (clueCount >= 22) return 4
  if (clueCount >= 14) return 3
  if (clueCount >= 7) return 2
  return 1
}

// --- Derive default unlocked apps from config ---
function getDefaultUnlocked(config) {
  return Object.values(config.apps)
    .filter((app) => app.defaultUnlocked)
    .map((app) => app.id)
}

// --- Locale preference (independent of save file — device-level) ---
const LOCALE_KEY = 'inside-job-locale'

function readStoredLocale() {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(LOCALE_KEY)
    return v === 'en' || v === 'zh' ? v : null
  } catch {
    return null
  }
}

function writeStoredLocale(locale) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOCALE_KEY, locale)
  } catch { /* noop */ }
}

// --- Initial state factory ---
function createInitialState(locale) {
  const resolvedLocale = locale || readStoredLocale() || 'en'
  const data = getLocaleData(resolvedLocale)
  return {
    screen: 'opening',
    locale: resolvedLocale,
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
    savedAt: null,
    // UI state — tracked so components can flash the most recently found clue
    lastFoundClueId: null,
    lastFoundClueAt: 0,
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
      const shouldUnlockLighthouse = newClues.length >= LIGHTHOUSE_UNLOCK_CLUES

      return {
        ...state,
        cluesFound: newClues,
        reportPhase: newPhase,
        unlockedApps: shouldUnlockLighthouse && !state.unlockedApps.includes('lighthouse')
          ? [...state.unlockedApps, 'lighthouse']
          : state.unlockedApps,
        lastFoundClueId: clueId,
        lastFoundClueAt: Date.now(),
      }
    }

    case 'ADD_MIRROR_CLUE': {
      const clueId = action.payload
      if (state.mirrorClues.includes(clueId)) return state
      return {
        ...state,
        mirrorClues: [...state.mirrorClues, clueId],
        lastFoundClueId: clueId,
        lastFoundClueAt: Date.now(),
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
      const defaults = getDefaultUnlocked(data.config)
      // Persist device-level locale preference immediately — survives save
      // clears, works across browser sessions without a game save.
      writeStoredLocale(newLocale)
      // Preserve progress — merge the new locale's defaults with whatever
      // the player has already unlocked. Switching languages should not wipe
      // their password-gated apps or lighthouse unlock.
      return {
        ...state,
        locale: newLocale,
        unlockedApps: [...new Set([...state.unlockedApps, ...defaults])],
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

    case 'LOAD_SAVE': {
      const saved = action.payload || {}
      // Start from a clean baseline so UI-only fields are reset correctly,
      // then overlay the saved snapshot.
      const baseline = createInitialState(saved.locale || state.locale)
      const merged = { ...baseline }
      for (const key of PERSISTED_FIELDS) {
        if (saved[key] !== undefined) merged[key] = saved[key]
      }
      merged.savedAt = typeof saved.savedAt === 'number' ? saved.savedAt : null
      return merged
    }

    case 'RESET_GAME': {
      clearSave()
      return createInitialState(state.locale)
    }

    case 'MANUAL_SAVE': {
      return { ...state, savedAt: Date.now() }
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

  // --- Sound side effects: watch state changes and play corresponding sounds ---
  const prevCluesRef = useRef(0)
  const prevMirrorRef = useRef(0)
  const prevPhaseRef = useRef(state.reportPhase)
  const prevUnlockedRef = useRef(state.unlockedApps)

  // Only fire sounds on single-step increases — prevents a burst of sounds
  // when LOAD_SAVE rehydrates a save with many clues at once.
  useEffect(() => {
    const prev = prevCluesRef.current
    const curr = state.cluesFound.length
    if (curr === prev + 1) sounds.clueFound()
    prevCluesRef.current = curr
  }, [state.cluesFound.length])

  useEffect(() => {
    const prev = prevMirrorRef.current
    const curr = state.mirrorClues.length
    if (curr === prev + 1) sounds.mirrorClueFound()
    prevMirrorRef.current = curr
  }, [state.mirrorClues.length])

  useEffect(() => {
    const prev = prevPhaseRef.current
    const curr = state.reportPhase
    if (curr === prev + 1) sounds.reportPhaseUnlock()
    prevPhaseRef.current = curr
  }, [state.reportPhase])

  useEffect(() => {
    const prev = prevUnlockedRef.current
    const curr = state.unlockedApps
    // Play only on a single-app unlock (skip bulk save load / locale reset)
    const added = curr.filter((id) => !prev.includes(id))
    if (added.length === 1 && curr.length === prev.length + 1) {
      sounds.passwordUnlock()
    }
    prevUnlockedRef.current = curr
  }, [state.unlockedApps])

  // --- Persistence: write to localStorage whenever any persisted field changes.
  // Skip while the player is still on the opening screen with zero progress,
  // so merely launching the game doesn't create a spurious save.
  useEffect(() => {
    const hasProgress =
      state.screen !== 'opening' ||
      state.cluesFound.length > 0 ||
      state.mirrorClues.length > 0 ||
      state.appsOpened.length > 0
    if (hasProgress) {
      writeSave(state)
    }
  }, [
    state.screen,
    state.locale,
    state.cluesFound,
    state.mirrorClues,
    state.appsOpened,
    state.unlockedApps,
    state.reportPhase,
    state.gamePhase,
    state.gameTimeMinutes,
    state.selectedEnding,
  ])

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
