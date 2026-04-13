import { useState, useEffect, useRef } from 'react'
import { useGame } from '../game/state.jsx'

const BOOT_LINES_EN = [
  '> PROJECT LIGHTHOUSE \u2014 ADMIN CONSOLE',
  '> Status: ACTIVE',
  '> Monitored endpoints: 2,847,331',
  '> Last sync: TODAY, 08:47 AM',
  '',
  '> Welcome, Alex. You had access all along.',
  '> You just never looked.',
]

const BOOT_LINES_ZH = [
  '> \u706F\u5854\u8BA1\u5212 \u2014 \u7BA1\u7406\u63A7\u5236\u53F0',
  '> \u72B6\u6001: \u8FD0\u884C\u4E2D',
  '> \u76D1\u63A7\u7EC8\u7AEF\u6570: 2,847,331',
  '> \u6700\u540E\u540C\u6B65: \u4ECA\u5929 08:47',
  '',
  '> \u6B22\u8FCE\u56DE\u6765\uFF0C\u660E\u8F69\u3002\u4F60\u4E00\u76F4\u90FD\u6709\u6743\u9650\u3002',
  '> \u4F60\u53EA\u662F\u4ECE\u6765\u6CA1\u770B\u8FC7\u3002',
]

const DASHBOARD_LINES_EN = [
  '',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
  '  MONITORING DASHBOARD',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
  '  Active endpoints:     2,847,331',
  '  Data streams:         Mobile / Desktop / IoT',
  '  Behavioral alerts:    1,247 (last 24h)',
  '  Anomaly detections:   89 (last 24h)',
  '  Geospatial tracking:  ACTIVE',
  '  Predictive models:    12 running',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
  '  Contract:  $47.2M / 36mo',
  '  Client:    [REDACTED]',
  '  Clearance: Alex Chen \u2014 VALID (unused)',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
]

const DASHBOARD_LINES_ZH = [
  '',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
  '  \u76D1\u63A7\u4EEA\u8868\u76D8',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
  '  \u6D3B\u8DC3\u7EC8\u7AEF:       2,847,331',
  '  \u6570\u636E\u6D41:         \u79FB\u52A8 / \u684C\u9762 / \u7269\u8054\u7F51',
  '  \u884C\u4E3A\u8B66\u62A5:       1,247 (\u8FC724\u5C0F\u65F6)',
  '  \u5F02\u5E38\u68C0\u6D4B:       89 (\u8FC724\u5C0F\u65F6)',
  '  \u5730\u7406\u8FFD\u8E2A:       \u8FD0\u884C\u4E2D',
  '  \u9884\u6D4B\u6A21\u578B:       12 \u8FD0\u884C\u4E2D',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
  '  \u5408\u540C:    4720\u4E07\u7F8E\u5143 / 36\u6708',
  '  \u5BA2\u6237:    [\u5DF2\u7F16\u8F91]',
  '  \u5B89\u5168\u8BB8\u53EF: \u660E\u8F69 \u2014 \u6709\u6548 (\u672A\u4F7F\u7528)',
  '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500',
]

/**
 * LighthouseApp — hidden terminal (Project Lighthouse admin console).
 * Only visible when player finds 15+ clues.
 * CRT aesthetic, typewriter boot sequence, dashboard reveal.
 */
export default function LighthouseApp() {
  const { state } = useGame()
  const locale = state.locale
  const isZh = locale === 'zh'

  const bootLines = isZh ? BOOT_LINES_ZH : BOOT_LINES_EN
  const dashboardLines = isZh ? DASHBOARD_LINES_ZH : DASHBOARD_LINES_EN

  const [phase, setPhase] = useState('flicker') // flicker -> boot -> dashboard -> idle
  const [visibleLines, setVisibleLines] = useState([])
  const [currentLineChars, setCurrentLineChars] = useState(0)
  const [currentLineIdx, setCurrentLineIdx] = useState(0)
  const terminalRef = useRef(null)

  const allLines = [...bootLines, ...dashboardLines]

  // CRT flicker on first open — 800ms
  useEffect(() => {
    if (phase !== 'flicker') return
    const timer = setTimeout(() => setPhase('boot'), 800)
    return () => clearTimeout(timer)
  }, [phase])

  // Typewriter effect: reveal characters line by line
  useEffect(() => {
    if (phase !== 'boot') return
    if (currentLineIdx >= allLines.length) {
      setPhase('idle')
      return
    }

    const line = allLines[currentLineIdx]

    // Empty line — add immediately and advance
    if (line === '') {
      setVisibleLines((prev) => [...prev, ''])
      setCurrentLineIdx((i) => i + 1)
      setCurrentLineChars(0)
      return
    }

    if (currentLineChars >= line.length) {
      // Line complete — add it and advance to next line
      setVisibleLines((prev) => [...prev, line])
      setCurrentLineIdx((i) => i + 1)
      setCurrentLineChars(0)
      return
    }

    // Reveal next character
    const delay = currentLineIdx < bootLines.length ? 30 : 12
    const timer = setTimeout(() => {
      setCurrentLineChars((c) => c + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [phase, currentLineIdx, currentLineChars, allLines, bootLines.length])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [visibleLines, currentLineChars])

  const currentPartialLine =
    phase === 'boot' && currentLineIdx < allLines.length
      ? allLines[currentLineIdx].slice(0, currentLineChars)
      : null

  return (
    <div className={`lighthouse-app ${phase === 'flicker' ? 'lighthouse-flicker' : ''}`}>
      <div className="lighthouse-scanlines" />
      <div className="lighthouse-terminal" ref={terminalRef}>
        {visibleLines.map((line, i) => (
          <div key={i} className="lighthouse-line">
            {line || '\u00A0'}
          </div>
        ))}

        {currentPartialLine !== null && (
          <div className="lighthouse-line lighthouse-line-typing">
            {currentPartialLine}
            <span className="lighthouse-cursor">&#x2588;</span>
          </div>
        )}

        {phase === 'idle' && (
          <div className="lighthouse-line lighthouse-prompt">
            {'> '}<span className="lighthouse-cursor lighthouse-cursor-blink">&#x2588;</span>
          </div>
        )}
      </div>
    </div>
  )
}
