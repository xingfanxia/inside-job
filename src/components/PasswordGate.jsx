import { useState, useCallback } from 'react'
import { useGame } from '../game/state.jsx'
import { validatePassword, getPasswordHints } from '../game/passwords.js'
import { sounds } from '../game/sounds.js'
import { LockIcon } from '../styles/icons.jsx'

export default function PasswordGate({ appId, appLabel }) {
  const { dispatch, localeData } = useGame()
  const config = localeData.config
  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [shake, setShake] = useState(false)

  const hint = getPasswordHints(appId, attempts, config)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (validatePassword(appId, input, config)) {
      dispatch({ type: 'UNLOCK_APP', payload: { appId } })
    } else {
      sounds.passwordFail()
      setAttempts((a) => a + 1)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }, [appId, input, config, dispatch])

  const isZh = config.locale === 'zh'

  return (
    <div className="password-gate">
      <div className="password-gate-icon">
        <LockIcon size={48} />
      </div>
      <h3 className="password-gate-title">
        {isZh ? `${appLabel} - 需要密码` : `${appLabel} - Password Required`}
      </h3>
      <form className={`password-gate-form ${shake ? 'password-shake' : ''}`} onSubmit={handleSubmit}>
        <input
          type="password"
          className="password-gate-input"
          placeholder={isZh ? '输入密码' : 'Enter password'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
        <button type="submit" className="password-gate-submit">
          {isZh ? '解锁' : 'Unlock'}
        </button>
      </form>
      {attempts > 0 && (
        <div className="password-gate-attempts">
          {isZh
            ? `失败 ${attempts} 次`
            : `${attempts} failed attempt${attempts > 1 ? 's' : ''}`}
        </div>
      )}
      {hint && (
        <div className="password-gate-hint">{hint}</div>
      )}
    </div>
  )
}
