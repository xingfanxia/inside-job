import { useCallback } from 'react'
import { useGame } from '../game/state.jsx'
import { getIcon, LockIcon } from '../styles/icons.jsx'

export default function DesktopIcon({ appConfig }) {
  const { state, dispatch } = useGame()

  const isLocked = appConfig.password && !state.unlockedApps.includes(appConfig.id)
  const isHidden = appConfig.unlockAtClues && !state.unlockedApps.includes(appConfig.id)

  const handleDoubleClick = useCallback(() => {
    dispatch({ type: 'OPEN_WINDOW', payload: { appId: appConfig.id } })
  }, [dispatch, appConfig.id])

  // Don't render apps that require clue-based unlock and aren't unlocked yet
  if (isHidden) return null

  const IconComponent = getIcon(appConfig.icon)

  return (
    <div className="desktop-icon" onDoubleClick={handleDoubleClick}>
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
