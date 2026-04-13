import { useState, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

const AUTO_FILL_DELAY = 1000    // ms before password auto-fills
const TRANSITION_DELAY = 2000   // ms after auto-fill before desktop

export default function BootScreen() {
  const { state, dispatch, localeData } = useGame()
  const boot = localeData.opening.bootScreen
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [welcomeVisible, setWelcomeVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Auto-fill password after delay
    const fillTimer = setTimeout(() => {
      setPasswordVisible(true)
    }, AUTO_FILL_DELAY)

    return () => clearTimeout(fillTimer)
  }, [])

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

  return (
    <div className={`boot-screen ${fadeOut ? 'boot-fadeout' : ''}`}>
      <div className="boot-container">
        <div className="boot-logo">{boot.logo}</div>
        <div className="boot-tagline">{boot.tagline}</div>

        <div className="boot-form">
          <div className="boot-field">
            <label className="boot-label">
              {state.locale === 'zh' ? '用户名' : 'Username'}
            </label>
            <div className="boot-input boot-input-filled">
              {boot.username}
            </div>
          </div>

          <div className="boot-field">
            <label className="boot-label">
              {state.locale === 'zh' ? '密码' : 'Password'}
            </label>
            <div className={`boot-input ${passwordVisible ? 'boot-input-filled' : ''}`}>
              {passwordVisible ? '••••••••••••' : ''}
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
