import { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useGame } from '../game/state.jsx'
import { sounds } from '../game/sounds.js'
import { TOTAL_CLUES } from '../game/clues.js'

// Typewriter timing
const CHAR_DELAY_MS = 45
const BETWEEN_LINE_MS = 550
const PRE_CLOSING_PAUSE_MS = 1800
const TITLE_HOLD_MS = 1000
const FADE_IN_MS = 1000

const TOTAL_MIRROR = 6

// Variant → CSS class suffix
function variantClass(endingId) {
  switch (endingId) {
    case 'ending-a': return 'ending-variant-truth'
    case 'ending-b': return 'ending-variant-coverup'
    case 'ending-c': return 'ending-variant-whistleblower'
    case 'ending-d': return 'ending-variant-hidden'
    default: return 'ending-variant-truth'
  }
}

export default function EndingScreen() {
  const { state, dispatch, localeData } = useGame()
  const endings = localeData.endings
  const isZh = state.locale === 'zh'

  const ending = useMemo(
    () => endings.find((e) => e.id === state.selectedEnding),
    [endings, state.selectedEnding]
  )

  // Phase: fadeIn -> titleHold -> typing -> preClosing -> closing -> done
  const [phase, setPhase] = useState('fadeIn')
  const [completedLines, setCompletedLines] = useState([]) // string[] of already-typed lines
  const [currentLine, setCurrentLine] = useState('')       // the line being typed right now
  const [currentLineIdx, setCurrentLineIdx] = useState(0)
  const [currentCharIdx, setCurrentCharIdx] = useState(0)
  const [closingVisible, setClosingVisible] = useState(false)

  // Prevent double-fire of per-char sound if effect re-runs
  const lastTickAtRef = useRef(0)

  // Safety: if no ending found, bail.
  if (!ending) return null

  const lines = ending.lines || []
  const closingLine = ending.closingLine || ''

  // Phase transitions ---------------------------------------------------------

  // fadeIn -> titleHold
  useEffect(() => {
    if (phase !== 'fadeIn') return
    const t = setTimeout(() => setPhase('titleHold'), FADE_IN_MS)
    return () => clearTimeout(t)
  }, [phase])

  // titleHold -> typing
  useEffect(() => {
    if (phase !== 'titleHold') return
    const t = setTimeout(() => setPhase('typing'), TITLE_HOLD_MS)
    return () => clearTimeout(t)
  }, [phase])

  // Typing driver: one char at a time, with inter-line pauses
  useEffect(() => {
    if (phase !== 'typing') return

    // All lines typed?
    if (currentLineIdx >= lines.length) {
      const t = setTimeout(() => setPhase('preClosing'), BETWEEN_LINE_MS)
      return () => clearTimeout(t)
    }

    const line = lines[currentLineIdx]

    // Empty line — commit immediately and advance
    if (line === '') {
      const t = setTimeout(() => {
        setCompletedLines((prev) => [...prev, ''])
        setCurrentLine('')
        setCurrentCharIdx(0)
        setCurrentLineIdx((i) => i + 1)
      }, BETWEEN_LINE_MS / 2)
      return () => clearTimeout(t)
    }

    // Finished typing this line?
    if (currentCharIdx >= line.length) {
      const t = setTimeout(() => {
        setCompletedLines((prev) => [...prev, line])
        setCurrentLine('')
        setCurrentCharIdx(0)
        setCurrentLineIdx((i) => i + 1)
      }, BETWEEN_LINE_MS)
      return () => clearTimeout(t)
    }

    // Type next character
    const t = setTimeout(() => {
      const nextChar = line[currentCharIdx]
      setCurrentLine((prev) => prev + nextChar)
      setCurrentCharIdx((i) => i + 1)
      // Only tick for visible characters, and not too often
      const now = Date.now()
      if (nextChar && nextChar !== ' ' && now - lastTickAtRef.current > 35) {
        sounds.typewriterTick()
        lastTickAtRef.current = now
      }
    }, CHAR_DELAY_MS)
    return () => clearTimeout(t)
  }, [phase, currentLineIdx, currentCharIdx, lines])

  // preClosing -> closing (show closing line)
  useEffect(() => {
    if (phase !== 'preClosing') return
    const t = setTimeout(() => {
      setClosingVisible(true)
      setPhase('closing')
    }, PRE_CLOSING_PAUSE_MS)
    return () => clearTimeout(t)
  }, [phase])

  // closing -> done (show stats + buttons)
  useEffect(() => {
    if (phase !== 'closing') return
    const t = setTimeout(() => setPhase('done'), 2200)
    return () => clearTimeout(t)
  }, [phase])

  // Actions -------------------------------------------------------------------
  const handleRestart = useCallback(() => {
    // Full reload is the cleanest reset
    if (typeof window !== 'undefined') window.location.reload()
  }, [])

  const handleViewCredits = useCallback(() => {
    // Credits = stay on ending screen but toggle an alternate view.
    // Minimal: we dispatch SET_PHASE to 'credits' so downstream could route.
    dispatch({ type: 'SET_PHASE', payload: 'credits' })
  }, [dispatch])

  // Render --------------------------------------------------------------------
  const mirrorCount = state.mirrorClues.length
  const clueCount = state.cluesFound.length

  const mirrorDescription = mirrorDescriptionText(mirrorCount, isZh)

  return (
    <div className={`ending-screen ${variantClass(ending.id)} ending-phase-${phase}`}>
      {ending.id === 'ending-d' && <div className="ending-scanlines" />}

      <div className="ending-container">
        <h1 className="ending-title">{ending.title}</h1>

        {ending.subtitle && (
          <p className="ending-subtitle">{ending.subtitle}</p>
        )}

        <div className="ending-body">
          {completedLines.map((line, i) => (
            <p
              key={i}
              className={`ending-line ${line === '' ? 'ending-line-blank' : ''}`}
            >
              {line || '\u00A0'}
            </p>
          ))}

          {phase === 'typing' && currentLine !== '' && (
            <p className="ending-line ending-line-typing">
              {currentLine}
              <span className="ending-cursor">|</span>
            </p>
          )}
        </div>

        {closingVisible && (
          <p className="ending-closing">{closingLine}</p>
        )}

        {phase === 'done' && (
          <div className="ending-aftermath">
            {ending.tag && (
              <p className="ending-tag">{ending.tag}</p>
            )}

            <div className="ending-stats">
              <p className="ending-stat">
                {isZh
                  ? `找到线索：${clueCount} / ${TOTAL_CLUES}`
                  : `Clues found: ${clueCount} / ${TOTAL_CLUES}`}
              </p>
              <p className="ending-stat">
                {isZh
                  ? `镜面线索：${mirrorCount} / ${TOTAL_MIRROR}`
                  : `Mirror clues: ${mirrorCount} / ${TOTAL_MIRROR}`}
              </p>
              <p className="ending-stat ending-stat-note">{mirrorDescription}</p>
            </div>

            <p className="ending-theend">
              {isZh ? '完' : 'The End'}
            </p>

            <div className="ending-actions">
              <button className="ending-button" onClick={handleRestart}>
                {isZh ? '重新开始' : 'Restart'}
              </button>
              <button className="ending-button ending-button-ghost" onClick={handleViewCredits}>
                {isZh ? '查看制作名单' : 'View Credits'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Short interpretive line on what the player's mirror count means
function mirrorDescriptionText(count, isZh) {
  if (isZh) {
    if (count === 0) return '你没有照镜子。'
    if (count <= 2) return '你开始怀疑自己。'
    if (count <= 4) return '你看清了自己的位置。'
    return '你看见了全部——包括你自己。'
  }
  if (count === 0) return 'You never looked in the mirror.'
  if (count <= 2) return 'You started to doubt yourself.'
  if (count <= 4) return 'You saw your part in it.'
  return 'You saw everything — including yourself.'
}
