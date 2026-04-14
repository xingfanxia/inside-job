import { useState, useEffect, useCallback } from 'react'
import { useGame, loadSave } from '../game/state.jsx'
import { resumeAudio } from '../game/sounds.js'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const AUTO_FILL_DELAY = 1000    // ms before password auto-fills
const TRANSITION_DELAY = 2000   // ms after auto-fill before desktop

export default function BootScreen() {
  const { state, dispatch, localeData } = useGame()
  const boot = localeData.opening.bootScreen
  const isZh = state.locale === 'zh'

  // Check for save on mount (only once). If a save exists, show a Resume/Fresh
  // chooser before running the normal boot sequence.
  const [savedGame, setSavedGame] = useState(() => loadSave())
  const [resumeChoiceMade, setResumeChoiceMade] = useState(() => loadSave() === null)

  const [passwordVisible, setPasswordVisible] = useState(false)
  const [welcomeVisible, setWelcomeVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  const handleResume = useCallback(() => {
    if (!savedGame) return
    resumeAudio()
    dispatch({ type: 'LOAD_SAVE', payload: savedGame })
    setFadeOut(true)
    setTimeout(() => {
      // Resume at desktop — opening/boot don't make sense to resume into.
      const target =
        !savedGame.screen || savedGame.screen === 'opening' || savedGame.screen === 'boot'
          ? 'desktop'
          : savedGame.screen
      dispatch({ type: 'SET_SCREEN', payload: target })
    }, 400)
  }, [savedGame, dispatch])

  const handleStartFresh = useCallback(() => {
    resumeAudio()
    dispatch({ type: 'RESET_GAME' })
    setSavedGame(null)
    setResumeChoiceMade(true)
  }, [dispatch])

  useEffect(() => {
    if (!resumeChoiceMade) return
    // Auto-fill password after delay
    const fillTimer = setTimeout(() => {
      setPasswordVisible(true)
    }, AUTO_FILL_DELAY)

    return () => clearTimeout(fillTimer)
  }, [resumeChoiceMade])

  useEffect(() => {
    if (!passwordVisible) return
    // Show welcome message and schedule transition
    const welcomeTimer = setTimeout(() => {
      setWelcomeVisible(true)
    }, 400)

    const transitionTimer = setTimeout(() => {
      setFadeOut(true)
      setTimeout(() => {
        dispatch({ type: 'SET_SCREEN', payload: 'desktop' })
      }, 500)
    }, TRANSITION_DELAY)

    return () => {
      clearTimeout(welcomeTimer)
      clearTimeout(transitionTimer)
    }
  }, [passwordVisible, dispatch])

  // --- Resume chooser screen ---
  if (savedGame && !resumeChoiceMade) {
    const savedDate = savedGame.savedAt ? new Date(savedGame.savedAt) : null
    const savedLabel = savedDate
      ? savedDate.toLocaleString(isZh ? 'zh-CN' : 'en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : ''

    return (
      <div className="boot-screen" onClick={resumeAudio}>
        <div className="boot-container">
          <div className="boot-logo">{boot.logo}</div>
          <div className="boot-tagline">{boot.tagline}</div>

          <div className="boot-form boot-resume">
            <p className="boot-resume-prompt">
              {isZh ? '检测到先前的调查记录' : 'Previous investigation detected'}
            </p>
            {savedLabel && (
              <p className="boot-resume-meta">
                {isZh ? '最后保存：' : 'Last saved: '}{savedLabel}
                {' \u2014 '}
                {isZh
                  ? `已发现 ${savedGame.cluesFound?.length ?? 0} 条线索`
                  : `${savedGame.cluesFound?.length ?? 0} clues found`}
              </p>
            )}
            <div className="boot-resume-buttons">
              <button
                type="button"
                className="boot-resume-btn boot-resume-primary"
                onClick={handleResume}
              >
                {isZh ? '继续调查' : 'Resume Investigation'}
              </button>
              <button
                type="button"
                className="boot-resume-btn boot-resume-secondary"
                onClick={handleStartFresh}
              >
                {isZh ? '重新开始' : 'Start Fresh'}
              </button>
            </div>
          </div>
        </div>

        <div className="boot-language">
          <LanguageSwitcher />
        </div>

        <div className="boot-footer">
          <span className="boot-copyright">
            {localeData.config.companyFull} {String.fromCharCode(169)} 2026
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`boot-screen ${fadeOut ? 'boot-fadeout' : ''}`}
      onClick={resumeAudio}
    >
      <div className="boot-container">
        <div className="boot-logo">{boot.logo}</div>
        <div className="boot-tagline">{boot.tagline}</div>

        <div className="boot-form">
          <div className="boot-field">
            <label className="boot-label">
              {isZh ? '用户名' : 'Username'}
            </label>
            <div className="boot-input boot-input-filled">
              {boot.username}
            </div>
          </div>

          <div className="boot-field">
            <label className="boot-label">
              {isZh ? '密码' : 'Password'}
            </label>
            <div className={`boot-input ${passwordVisible ? 'boot-input-filled' : ''}`}>
              {passwordVisible ? '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022' : ''}
              {!passwordVisible && <span className="cursor cursor-blink">|</span>}
            </div>
          </div>

          {welcomeVisible && (
            <div className="boot-welcome">{boot.welcomeMessage}</div>
          )}
        </div>
      </div>

      <div className="boot-language">
        <LanguageSwitcher />
      </div>

      <div className="boot-footer">
        <span className="boot-copyright">
          {localeData.config.companyFull} {String.fromCharCode(169)} 2026
        </span>
      </div>
    </div>
  )
}
