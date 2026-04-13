/**
 * Validate a password attempt for a given app.
 * Returns true if correct or if no password is required.
 */
export function validatePassword(appId, input, localeConfig) {
  const app = localeConfig.apps[appId]
  if (!app?.password) return true
  return input === app.password
}

/**
 * Returns hint text based on failed attempt count.
 * - At 3 failures: general pattern hint
 * - At 5 failures: app-specific hint (secfiles gets a special one)
 */
export function getPasswordHints(appId, attempts, localeConfig) {
  if (attempts < 3) return null

  if (attempts >= 5 && appId === 'secfiles') {
    return localeConfig.secFilesHint
  }

  if (attempts >= 5) {
    const app = localeConfig.apps[appId]
    const prefix = app?.id?.toUpperCase() || '???'
    return localeConfig.locale === 'zh'
      ? `提示: 前缀是 "${prefix}"，格式为 ${localeConfig.passwordPattern}`
      : `Hint: The prefix is "${prefix}", format is ${localeConfig.passwordPattern}`
  }

  if (attempts >= 3) {
    return localeConfig.passwordHint
  }

  return null
}
