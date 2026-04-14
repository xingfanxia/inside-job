import { useCallback, useEffect, useRef, useState } from 'react'
import { useGame } from './state.jsx'

// --- Clue registry ---
// Descriptive metadata only. The registry is NOT used to gate discovery —
// any clue ID dispatched through useClue/useScrollClue will register. Prefix
// determines dispatch type: 'mirror-*' -> ADD_MIRROR_CLUE, else -> ADD_CLUE.
//
// Totals are derived from this registry so the taskbar counter ("X/Y") and
// report phase thresholds stay in sync as content is added or removed.

// 36 regular clues — discovered by reading emails, slack, HR profiles,
// access logs, documents, CCTV footage, and IT tickets.
export const CLUES = {
  // Emails (5)
  'email-leaked-doc':             { category: 'evidence',       app: 'email' },
  'email-financial-distribution': { category: 'access',         app: 'email' },
  'email-patent-access':          { category: 'access',         app: 'email' },
  'email-pricing-access':         { category: 'access',         app: 'email' },
  'email-elena-access-request':   { category: 'suspect',        app: 'email' },

  // Slack (5)
  'slack-public-wifi-cafe':       { category: 'systemic',       app: 'slack' },
  'slack-pricing-discussion':     { category: 'systemic',       app: 'slack' },
  'slack-priya-ethics':           { category: 'lighthouse',     app: 'slack' },
  'slack-elena-netwatch':         { category: 'suspect',        app: 'slack' },
  'slack-elena-suspicious-dm':    { category: 'suspect',        app: 'slack' },

  // HR / PeopleHub (6)
  'hr-your-audit-gap':            { category: 'mirror-adjacent', app: 'peoplehub' },
  'hr-david-financial-pressure':  { category: 'suspect',         app: 'peoplehub' },
  'hr-priya-ethics-flag':         { category: 'lighthouse',      app: 'peoplehub' },
  'hr-james-ec-friend':           { category: 'suspect',         app: 'peoplehub' },
  'hr-elena-meridian-history':    { category: 'suspect',         app: 'peoplehub' },
  'hr-ryan-comp-grievance':       { category: 'suspect',         app: 'peoplehub' },

  // Access log / badge records (2)
  'access-elena-latenight':       { category: 'suspect',        app: 'accesslog' },
  'access-david-earlypattern':    { category: 'systemic',       app: 'accesslog' },

  // Print log (3)
  'print-david-early':            { category: 'systemic',       app: 'printtrace' },
  'print-elena-saturday':         { category: 'suspect',        app: 'printtrace' },
  'print-no-physical-leak':       { category: 'evidence',       app: 'printtrace' },

  // VPN / NetWatch (3)
  'net-david-public-wifi':        { category: 'systemic',       app: 'netwatch' },
  'net-elena-saturday-vpn':       { category: 'suspect',        app: 'netwatch' },
  'net-external-patent-access':   { category: 'evidence',       app: 'netwatch' },

  // CCTV (3)
  'cctv-elena-arrival':           { category: 'suspect',        app: 'cctv' },
  'cctv-elena-server-room':       { category: 'suspect',        app: 'cctv' },
  'cctv-elena-copying':           { category: 'suspect',        app: 'cctv' },

  // DocVault + SecureFiles (6)
  'doc-board-access-log':             { category: 'access',      app: 'docvault' },
  'doc-patent-external-ip':           { category: 'evidence',    app: 'docvault' },
  'sec-lighthouse-contract':          { category: 'lighthouse',  app: 'secfiles' },
  'sec-board-surveillance-discussion':{ category: 'lighthouse',  app: 'secfiles' },
  'sec-watermark-match':              { category: 'smoking-gun', app: 'secfiles' },
  'sec-whistleblower-email':          { category: 'smoking-gun', app: 'secfiles' },

  // IT Desk (2)
  'it-elena-netwatch-request':    { category: 'suspect',        app: 'itdesk' },
  'it-david-vpn-warning':         { category: 'systemic',       app: 'itdesk' },

  // Calendar (1)
  'calendar-lighthouse-cancelled':{ category: 'lighthouse',     app: 'calendar' },
}

// 7 mirror clues — evidence that reflects back on the player (Alex Chen).
// These surface the investigator's own complicity in the breach.
export const MIRROR_CLUES = {
  'mirror-your-audit-gap':     { app: 'peoplehub' },
  'mirror-audit-overdue':      { app: 'email' },
  'mirror-vpn-exception':      { app: 'email' },
  'mirror-byod-approval':      { app: 'netwatch' },
  'mirror-audit-postponed':    { app: 'calendar' },
  'mirror-audit-postponement': { app: 'itdesk' },
  'mirror-anomaly-unresolved': { app: 'itdesk' },
}

export const TOTAL_CLUES = Object.keys(CLUES).length
export const TOTAL_MIRROR_CLUES = Object.keys(MIRROR_CLUES).length

// --- Thresholds ---
// Recalibrated for ~36 total clues.
export const LIGHTHOUSE_UNLOCK_CLUES = 18 // 50% — unlocks the hidden app
export const ENDING_AVAILABLE_CLUES = 30  // ~80% — report phase 5

// How long the discovery-flash class stays applied after a clue is found.
const FLASH_DURATION_MS = 2000

// --- Helpers ---
function isMirrorClueId(id) {
  return typeof id === 'string' && id.startsWith('mirror-')
}

/**
 * Hook: returns { found, discover, justFound } for a given clue ID.
 * `justFound` is true for 2 seconds after the clue is first discovered so
 * components can apply a brief visual flash.
 *
 * Discovery is NOT gated by the CLUES/MIRROR_CLUES registries — any ID will
 * register. The registry is metadata only.
 */
export function useClue(clueId) {
  const { state, dispatch } = useGame()
  const found =
    !!clueId &&
    (state.cluesFound.includes(clueId) || state.mirrorClues.includes(clueId))
  const record = CLUES[clueId] || MIRROR_CLUES[clueId] || null

  const [justFound, setJustFound] = useState(false)
  const firedRef = useRef(false)

  const discover = useCallback(() => {
    if (!clueId || found) return
    dispatch({
      type: isMirrorClueId(clueId) ? 'ADD_MIRROR_CLUE' : 'ADD_CLUE',
      payload: clueId,
    })
  }, [clueId, found, dispatch])

  // Trigger the flash once, the first time we observe this clue become found.
  useEffect(() => {
    if (found && !firedRef.current) {
      firedRef.current = true
      setJustFound(true)
      const t = setTimeout(() => setJustFound(false), FLASH_DURATION_MS)
      return () => clearTimeout(t)
    }
    return undefined
  }, [found])

  return { found, record, discover, justFound }
}

/**
 * Hook: returns a ref to attach to a scrollable element.
 * When the element scrolls into view, the clue is discovered.
 *
 * Not gated by registry — any ID will register.
 */
export function useScrollClue(clueId) {
  const ref = useRef(null)
  const { state, dispatch } = useGame()
  const alreadyFound =
    !!clueId &&
    (state.cluesFound.includes(clueId) || state.mirrorClues.includes(clueId))

  useEffect(() => {
    if (!clueId || alreadyFound || !ref.current) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            dispatch({
              type: isMirrorClueId(clueId) ? 'ADD_MIRROR_CLUE' : 'ADD_CLUE',
              payload: clueId,
            })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [alreadyFound, clueId, dispatch])

  return ref
}
