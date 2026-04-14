import { useState, useEffect, useCallback, useMemo } from 'react'
import { useGame } from '../game/state.jsx'

const ONBOARDING_KEY = 'inside-job-onboarded'

export default function Onboarding() {
  const { state } = useGame()
  const isZh = state.locale === 'zh'

  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(ONBOARDING_KEY) === '1'
  })
  const [step, setStep] = useState(0)

  // Steps defined before any callbacks reference it — avoids TDZ on handleNext.
  const steps = useMemo(() => {
    return isZh
      ? [
          {
            title: '你是信息安全总监',
            body: '今天早上 9:07，CEO 告诉你：收购谈判崩了。有内鬼泄露了机密。你有 24 小时找出来。',
            cta: '继续',
          },
          {
            title: '点击桌面图标打开应用',
            body: '从邮箱开始 — CEO 刚给你发了泄露的文件。需要密码的应用在其他地方能找到密码提示。',
            cta: '继续',
          },
          {
            title: '右侧是事故报告',
            body: '随着发现线索，报告会自动填充。找到足够线索后，你需要决定如何写这份报告 — 你的选择决定结局。',
            cta: '开始调查',
          },
        ]
      : [
          {
            title: "You're the Head of Security",
            body: '9:07 AM Monday. The CEO just told you: the acquisition deal collapsed. Someone leaked secrets. You have 24 hours to find them.',
            cta: 'Continue',
          },
          {
            title: 'Click icons to open apps',
            body: 'Start with Email — the CEO just forwarded you the leaked document. Apps that need passwords have hints hidden in other apps.',
            cta: 'Continue',
          },
          {
            title: 'Incident Report is on the right',
            body: "As you find evidence, the report fills itself in. Find enough clues and you'll write the final report — your choices determine the ending.",
            cta: 'Start investigating',
          },
        ]
  }, [isZh])

  const handleDismiss = useCallback(() => {
    setDismissed(true)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(ONBOARDING_KEY, '1')
    }
  }, [])

  const handleNext = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      handleDismiss()
    }
  }, [step, steps.length, handleDismiss])

  // Auto-dismiss in effect, not during render — player is clearly figuring it out.
  useEffect(() => {
    if (!dismissed && state.cluesFound.length >= 3) {
      handleDismiss()
    }
  }, [dismissed, state.cluesFound.length, handleDismiss])

  if (dismissed) return null

  const current = steps[step]

  return (
    <div className="onboarding-overlay" onClick={handleNext}>
      <div className="onboarding-card" onClick={(e) => e.stopPropagation()}>
        <div className="onboarding-progress">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`onboarding-dot ${i === step ? 'onboarding-dot-active' : ''} ${i < step ? 'onboarding-dot-done' : ''}`}
            />
          ))}
        </div>
        <h2 className="onboarding-title">{current.title}</h2>
        <p className="onboarding-body">{current.body}</p>
        <div className="onboarding-actions">
          <button
            type="button"
            className="onboarding-skip"
            onClick={handleDismiss}
          >
            {isZh ? '跳过引导' : 'Skip'}
          </button>
          <button
            type="button"
            className="onboarding-next"
            onClick={handleNext}
          >
            {current.cta}
          </button>
        </div>
      </div>
    </div>
  )
}
