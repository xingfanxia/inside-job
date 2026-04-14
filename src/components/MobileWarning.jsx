import { useState } from 'react'
import { useGame } from '../game/state.jsx'

/**
 * MobileWarning — shown via CSS media query on screens < 768px.
 * The player can dismiss it and continue, but layouts will be cramped.
 */
export default function MobileWarning() {
  const { state } = useGame()
  const [dismissed, setDismissed] = useState(false)
  const isZh = state.locale === 'zh'

  if (dismissed) return null

  return (
    <div className="mobile-warning" role="dialog" aria-modal="true">
      <div className="mobile-warning-icon" aria-hidden="true">
        {/* Simple monitor glyph */}
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="6" y="10" width="52" height="36" rx="3" />
          <line x1="20" y1="56" x2="44" y2="56" />
          <line x1="32" y1="46" x2="32" y2="56" />
        </svg>
      </div>
      <h2 className="mobile-warning-title">
        {isZh ? '需要更大的屏幕' : 'Desktop Recommended'}
      </h2>
      <p className="mobile-warning-text">
        {isZh
          ? 'Inside Job 为桌面体验设计。请使用至少 1024px 宽度的屏幕以获得最佳体验。'
          : 'Inside Job is designed for desktop. For the best experience, please use a screen at least 1024px wide.'}
      </p>
      <button
        type="button"
        className="mobile-warning-btn"
        onClick={() => setDismissed(true)}
      >
        {isZh ? '仍要继续' : 'Continue anyway'}
      </button>
    </div>
  )
}
