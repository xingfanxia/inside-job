import { useCallback, useEffect, useRef } from 'react'
import { useGame } from './state.jsx'

// 18 primary clues — universal IDs, locale-independent
export const CLUES = {
  'email-leaked-doc':             { category: 'evidence',  app: 'email',      type: 'auto'   },
  'email-financial-distribution': { category: 'access',    app: 'email',      type: 'click'  },
  'email-patent-access':          { category: 'access',    app: 'email',      type: 'click'  },
  'email-pricing-access':         { category: 'access',    app: 'email',      type: 'click'  },
  'email-elena-access-request':   { category: 'access',    app: 'email',      type: 'click'  },
  'slack-james-meridian-contact': { category: 'connection',app: 'slack',      type: 'scroll' },
  'slack-priya-ethics-concern':   { category: 'motive',    app: 'slack',      type: 'scroll' },
  'slack-elena-late-night':       { category: 'behavior',  app: 'slack',      type: 'scroll' },
  'doc-board-access-log':         { category: 'evidence',  app: 'docvault',   type: 'click'  },
  'doc-watermark-analysis':       { category: 'evidence',  app: 'docvault',   type: 'click'  },
  'hr-david-financial-pressure':  { category: 'motive',    app: 'peoplehub',  type: 'click'  },
  'hr-priya-ethics-flag':         { category: 'motive',    app: 'peoplehub',  type: 'click'  },
  'hr-elena-meridian-history':    { category: 'connection',app: 'peoplehub',  type: 'click'  },
  'hr-ryan-comp-grievance':       { category: 'motive',    app: 'peoplehub',  type: 'click'  },
  'hr-james-ec-friend':           { category: 'connection',app: 'peoplehub',  type: 'click'  },
  'log-badge-elena-saturday':     { category: 'behavior',  app: 'accesslog',  type: 'scroll' },
  'log-david-early-access':       { category: 'behavior',  app: 'accesslog',  type: 'scroll' },
  'log-vpn-external-anomaly':     { category: 'evidence',  app: 'netwatch',   type: 'scroll' },
}

// 6 mirror clues — reflect back on the player (Alex Chen)
export const MIRROR_CLUES = {
  'mirror-your-audit-gap':    { category: 'mirror', app: 'peoplehub',  type: 'click'  },
  'mirror-audit-overdue':     { category: 'mirror', app: 'email',      type: 'auto'   },
  'mirror-vpn-exception':     { category: 'mirror', app: 'email',      type: 'auto'   },
  'mirror-byod-approved':     { category: 'mirror', app: 'itdesk',     type: 'scroll' },
  'mirror-security-postponed':{ category: 'mirror', app: 'itdesk',     type: 'scroll' },
  'mirror-anomaly-ignored':   { category: 'mirror', app: 'netwatch',   type: 'scroll' },
}

export const TOTAL_CLUES = Object.keys(CLUES).length
export const TOTAL_MIRROR_CLUES = Object.keys(MIRROR_CLUES).length

/**
 * Hook: returns { found, record } for a given clue ID
 */
export function useClue(clueId) {
  const { state, dispatch } = useGame()
  const found = state.cluesFound.includes(clueId)
  const record = CLUES[clueId] || MIRROR_CLUES[clueId] || null

  const discover = useCallback(() => {
    if (!found && record) {
      if (CLUES[clueId]) {
        dispatch({ type: 'ADD_CLUE', payload: clueId })
      } else {
        dispatch({ type: 'ADD_MIRROR_CLUE', payload: clueId })
      }
    }
  }, [found, record, clueId, dispatch])

  return { found, record, discover }
}

/**
 * Hook: returns a ref to attach to a scrollable element.
 * When the element scrolls into view, the clue is discovered.
 */
export function useScrollClue(clueId) {
  const ref = useRef(null)
  const { state, dispatch } = useGame()
  const alreadyFound = state.cluesFound.includes(clueId) || state.mirrorClues.includes(clueId)

  useEffect(() => {
    if (alreadyFound || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (CLUES[clueId]) {
              dispatch({ type: 'ADD_CLUE', payload: clueId })
            } else if (MIRROR_CLUES[clueId]) {
              dispatch({ type: 'ADD_MIRROR_CLUE', payload: clueId })
            }
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
