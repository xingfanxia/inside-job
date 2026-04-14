/**
 * Validate a password attempt for a given app.
 * Trims whitespace and matches exact case to tolerate mobile keyboard autofill
 * trailing spaces while still requiring the correct casing.
 */
export function validatePassword(appId, input, localeConfig) {
  const app = localeConfig.apps[appId]
  if (!app?.password) return true
  if (typeof input !== 'string') return false
  return input.trim() === app.password
}

/**
 * Extract the system prefix from a password string.
 * Passwords follow `{PREFIX}-{Company}-{Year}` so the prefix is everything
 * before the first dash. This is the single source of truth for prefix hints
 * — no need to derive from app.id, which doesn't always match.
 */
function extractPrefix(password) {
  if (typeof password !== 'string') return '???'
  const dashIdx = password.indexOf('-')
  return dashIdx > 0 ? password.slice(0, dashIdx) : password
}

/**
 * Returns hint text based on failed attempt count.
 * - At 3 failures: general pattern hint from locale config
 * - At 5 failures: app-specific hint with actual prefix extracted from password
 *   (secfiles gets a unique hint since it breaks the standard pattern)
 */
export function getPasswordHints(appId, attempts, localeConfig) {
  if (attempts < 3) return null

  // Secfiles breaks the pattern — has its own hint pointing at the project name
  if (attempts >= 5 && appId === 'secfiles') {
    return localeConfig.secFilesHint
  }

  if (attempts >= 5) {
    const app = localeConfig.apps[appId]
    const prefix = extractPrefix(app?.password)
    return localeConfig.locale === 'zh'
      ? `提示：前缀是 "${prefix}"，格式为 ${localeConfig.passwordPattern}`
      : `Hint: The prefix is "${prefix}", format is ${localeConfig.passwordPattern}`
  }

  // attempts >= 3 and < 5
  return localeConfig.passwordHint
}
