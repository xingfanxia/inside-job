import { useState, useEffect, useCallback } from 'react'
import { useGame } from '../game/state.jsx'

const CHAR_DELAY = 40       // ms per character
const LINE_PAUSE = 800      // ms pause between lines
const FINAL_PAUSE = 2000    // ms after last line before transitioning

export default function Opening() {
  const { state, dispatch, localeData } = useGame()
  const lines = localeData.opening.lines
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [displayedLines, setDisplayedLines] = useState([])
  const [isTyping, setIsTyping] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  // Skip handler — advance to boot screen immediately
  const handleSkip = useCallback(() => {
    setFadeOut(true)
    setTimeout(() => {
      dispatch({ type: 'SET_SCREEN', payload: 'boot' })
    }, 500)
  }, [dispatch])

  // Typewriter effect
  useEffect(() => {
    if (fadeOut) return
    if (currentLine >= lines.length) {
      // All lines done — wait then transition
      const timer = setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          dispatch({ type: 'SET_SCREEN', payload: 'boot' })
        }, 500)
      }, FINAL_PAUSE)
      return () => clearTimeout(timer)
    }

    const line = lines[currentLine]

    if (currentChar < line.length) {
      // Still typing current line
      const timer = setTimeout(() => {
        setCurrentChar((c) => c + 1)
      }, CHAR_DELAY)
      return () => clearTimeout(timer)
    }

    // Line complete — pause, then advance
    setIsTyping(false)
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line])
      setCurrentLine((l) => l + 1)
      setCurrentChar(0)
      setIsTyping(true)
    }, LINE_PAUSE)
    return () => clearTimeout(timer)
  }, [currentLine, currentChar, lines, fadeOut, dispatch])

  const currentText = currentLine < lines.length
    ? lines[currentLine].slice(0, currentChar)
    : ''

  return (
    <div className={`opening-screen ${fadeOut ? 'opening-fadeout' : ''}`}>
      <div className="opening-text">
        {displayedLines.map((line, i) => (
          <p key={i} className="opening-line opening-line-done">{line}</p>
        ))}
        {currentLine < lines.length && (
          <p className="opening-line opening-line-typing">
            {currentText}
            <span className={`cursor ${isTyping ? 'cursor-blink' : ''}`}>|</span>
          </p>
        )}
      </div>
      <button type="button" className="opening-skip" onClick={handleSkip}>
        {state.locale === 'zh' ? '[ 跳过 ]' : '[ Skip ]'}
      </button>
    </div>
  )
}
