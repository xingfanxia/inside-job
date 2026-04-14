import { useEffect, useState, useRef } from 'react'
import { useGame } from '../game/state.jsx'
import { TOTAL_CLUES } from '../game/clues.js'

const TOAST_DURATION = 3500 // ms

export default function ClueToast() {
  const { state } = useGame()
  const isZh = state.locale === 'zh'
  const [toasts, setToasts] = useState([])
  const prevCluesRef = useRef(state.cluesFound.length)
  const prevMirrorRef = useRef(state.mirrorClues.length)

  // Watch for new clues
  useEffect(() => {
    if (state.cluesFound.length > prevCluesRef.current) {
      const newCount = state.cluesFound.length
      const id = `clue-${newCount}-${Date.now()}`
      setToasts((prev) => [
        ...prev,
        {
          id,
          kind: 'clue',
          title: isZh ? '发现新线索' : 'New clue discovered',
          detail: `${newCount} / ${TOTAL_CLUES}`,
        },
      ])
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, TOAST_DURATION)
      prevCluesRef.current = newCount
      return () => clearTimeout(timer)
    }
  }, [state.cluesFound.length, isZh])

  // Watch for new mirror clues
  useEffect(() => {
    if (state.mirrorClues.length > prevMirrorRef.current) {
      const id = `mirror-${state.mirrorClues.length}-${Date.now()}`
      setToasts((prev) => [
        ...prev,
        {
          id,
          kind: 'mirror',
          title: isZh ? '你的失职' : 'Your failure',
          detail: isZh ? '事故报告已更新' : 'Incident report updated',
        },
      ])
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, TOAST_DURATION)
      prevMirrorRef.current = state.mirrorClues.length
      return () => clearTimeout(timer)
    }
  }, [state.mirrorClues.length, isZh])

  // Watch for report phase unlocks
  const prevPhaseRef = useRef(state.reportPhase)
  useEffect(() => {
    if (state.reportPhase > prevPhaseRef.current) {
      const id = `phase-${state.reportPhase}-${Date.now()}`
      const phaseNames = isZh
        ? { 2: '嫌疑人', 3: '根本原因', 4: '调查结论', 5: '报告建议' }
        : { 2: 'Suspects', 3: 'Root Cause', 4: 'Findings', 5: 'Recommendation' }
      setToasts((prev) => [
        ...prev,
        {
          id,
          kind: 'phase',
          title: isZh ? '报告已解锁新章节' : 'Report section unlocked',
          detail: phaseNames[state.reportPhase] || `Phase ${state.reportPhase}`,
        },
      ])
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, TOAST_DURATION + 1000)
      prevPhaseRef.current = state.reportPhase
      return () => clearTimeout(timer)
    }
  }, [state.reportPhase, isZh])

  if (toasts.length === 0) return null

  return (
    <div className="clue-toast-stack">
      {toasts.map((t) => (
        <div key={t.id} className={`clue-toast clue-toast-${t.kind}`}>
          <div className="clue-toast-title">{t.title}</div>
          <div className="clue-toast-detail">{t.detail}</div>
        </div>
      ))}
    </div>
  )
}
