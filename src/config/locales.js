import enConfig from '../data/en/config.js'
import enEmails from '../data/en/emails.js'
import enSlack from '../data/en/slack.js'
import enEmployees from '../data/en/employees.js'
import enLogs from '../data/en/logs.js'
import enDocuments from '../data/en/documents.js'
import enIttickets from '../data/en/ittickets.js'
import enOpening from '../data/en/opening.js'
import enEndings from '../data/en/endings.js'
import enReport from '../data/en/report.js'

import zhConfig from '../data/zh/config.js'
import zhEmails from '../data/zh/emails.js'
import zhSlack from '../data/zh/slack.js'
import zhEmployees from '../data/zh/employees.js'
import zhLogs from '../data/zh/logs.js'
import zhDocuments from '../data/zh/documents.js'
import zhIttickets from '../data/zh/ittickets.js'
import zhOpening from '../data/zh/opening.js'
import zhEndings from '../data/zh/endings.js'
import zhReport from '../data/zh/report.js'

const locales = {
  en: {
    config: enConfig,
    emails: enEmails,
    slack: enSlack,
    employees: enEmployees,
    logs: enLogs,
    documents: enDocuments,
    ittickets: enIttickets,
    opening: enOpening,
    endings: enEndings,
    report: enReport,
  },
  zh: {
    config: zhConfig,
    emails: zhEmails,
    slack: zhSlack,
    employees: zhEmployees,
    logs: zhLogs,
    documents: zhDocuments,
    ittickets: zhIttickets,
    opening: zhOpening,
    endings: zhEndings,
    report: zhReport,
  },
}

export function getLocaleData(locale) {
  return locales[locale] || locales.en
}

export function getSupportedLocales() {
  return Object.keys(locales)
}
