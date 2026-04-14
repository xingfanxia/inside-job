import { useCallback, useEffect, useState } from 'react'
import { useGame } from '../game/state.jsx'
import { sounds } from '../game/sounds.js'
import { getIcon, LockIcon } from '../styles/icons.jsx'

// How long (ms) the lighthouse icon pulses red on first unlock before
// the player can click it.
const LIGHTHOUSE_UNLOCK_PULSE_MS = 3000

export default function DesktopIcon({ appConfig }) {
  const { state, dispatch } = useGame()

  const isLocked = appConfig.password && !state.unlockedApps.includes(appConfig.id)
  const isHidden = appConfig.unlockAtClues && !state.unlockedApps.includes(appConfig.id)

  // Lighthouse-specific: track first unlock so we can show a dramatic intro
  // pulse before the icon becomes clickable.
  const isLighthouse = appConfig.id === 'lighthouse'
  const lighthouseUnlocked = state.unlockedApps.includes('lighthouse')
  const [lighthouseUnlocking, setLighthouseUnlocking] = useState(false)

  useEffect(() => {
    if (!isLighthouse || !lighthouseUnlocked) return undefined
    setLighthouseUnlocking(true)
    const t = setTimeout(() => setLighthouseUnlocking(false), LIGHTHOUSE_UNLOCK_PULSE_MS)
    return () => clearTimeout(t)
  }, [isLighthouse, lighthouseUnlocked])

  const handleOpen = useCallback(() => {
    if (lighthouseUnlocking) return
    sounds.click()
    dispatch({ type: 'OPEN_WINDOW', payload: { appId: appConfig.id } })
  }, [dispatch, appConfig.id, lighthouseUnlocking])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleOpen()
    }
  }, [handleOpen])

  // Don't render apps that require clue-based unlock and aren't unlocked yet
  if (isHidden) return null

  const IconComponent = getIcon(appConfig.icon)

  const className = [
    'desktop-icon',
    lighthouseUnlocking ? 'desktop-icon-lighthouse-pulse' : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={className}
      onDoubleClick={handleOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={appConfig.label}
    >
      <div className="desktop-icon-image">
        <IconComponent size={40} />
        {isLocked && (
          <div className="desktop-icon-lock">
            <LockIcon size={14} />
          </div>
        )}
      </div>
      <span className="desktop-icon-label">{appConfig.label}</span>
    </div>
  )
}
