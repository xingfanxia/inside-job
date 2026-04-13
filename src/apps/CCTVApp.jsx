import { useState, useEffect, useRef, useMemo } from 'react'
import { useGame } from '../game/state.jsx'
import { useScrollClue } from '../game/clues.js'

/**
 * Typewriter text that reveals character by character when scrolled into view.
 */
function TypewriterText({ text }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || visibleCount >= text.length) return
    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1)
    }, 25)
    return () => clearTimeout(timer)
  }, [started, visibleCount, text.length])

  return (
    <span ref={ref} className="cctv-typewriter">
      {started ? text.slice(0, visibleCount) : ''}
      {started && visibleCount < text.length && (
        <span className="cctv-typewriter-cursor">|</span>
      )}
    </span>
  )
}

/**
 * Entry content shared between clue and non-clue variants.
 */
function CCTVEntryContent({ entry }) {
  const isElena = entry.subject === 'Elena Vasquez'
  const isCopying = entry.id === 'cctv-012' // the copying files entry

  return (
    <>
      <div className="cctv-entry-header">
        <span className="cctv-camera-badge">CAM</span>
        <span className="cctv-camera-id">{entry.camera}</span>
        <span className={`cctv-timestamp ${isElena && entry.highlight ? 'cctv-timestamp-red' : ''}`}>
          {entry.time}
        </span>
      </div>
      <div className="cctv-entry-body">
        <span className="cctv-subject">[{entry.subject}]</span>
        {isCopying ? (
          <TypewriterText text={entry.description} />
        ) : (
          <span className="cctv-description">{entry.description}</span>
        )}
      </div>
    </>
  )
}

/**
 * Entry with scroll-triggered clue discovery.
 */
function CCTVClueEntry({ entry }) {
  const clueRef = useScrollClue(entry.clueId)

  return (
    <div
      ref={clueRef}
      className={`cctv-entry ${entry.highlight ? 'cctv-entry-highlight' : ''}`}
    >
      <CCTVEntryContent entry={entry} />
    </div>
  )
}

/**
 * Single CCTV entry row — delegates to clue variant if needed.
 */
function CCTVEntry({ entry }) {
  if (entry.clueId) {
    return <CCTVClueEntry entry={entry} />
  }

  return (
    <div className={`cctv-entry ${entry.highlight ? 'cctv-entry-highlight' : ''}`}>
      <CCTVEntryContent entry={entry} />
    </div>
  )
}

/**
 * CCTVApp — security camera footage log (text-based, terminal aesthetic).
 */
export default function CCTVApp() {
  const { localeData } = useGame()
  const records = localeData.logs.cctv.records

  // Group entries by date
  const groupedByDate = useMemo(() => {
    const groups = []
    let currentDate = null
    let currentGroup = null

    for (const entry of records) {
      if (entry.date !== currentDate) {
        currentDate = entry.date
        currentGroup = { date: currentDate, entries: [] }
        groups.push(currentGroup)
      }
      currentGroup.entries.push(entry)
    }

    return groups
  }, [records])

  return (
    <div className="cctv-app">
      <div className="cctv-header">
        <span className="cctv-header-icon">&#x25C9;</span>
        <span className="cctv-header-title">CCTV SURVEILLANCE LOG</span>
        <span className="cctv-header-status">REC</span>
      </div>

      <div className="cctv-feed">
        {groupedByDate.map((group) => (
          <div key={group.date} className="cctv-date-group">
            <div className="cctv-date-header">
              <span className="cctv-date-line" />
              <span className="cctv-date-label">{group.date}</span>
              <span className="cctv-date-line" />
            </div>
            {group.entries.map((entry) => (
              <CCTVEntry key={entry.id} entry={entry} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
