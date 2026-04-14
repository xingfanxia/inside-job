import { useCallback, useEffect, useRef, useState } from 'react'
import { useGame } from './state.jsx'

// --- Clue registry ---
// Descriptive metadata only. The registry is NOT used to gate discovery —
// any clue ID dispatched through useClue/useScrollClue will register. Prefix
// determines dispatch type: 'mirror-*' -> ADD_MIRROR_CLUE, else -> ADD_CLUE.
//
// Totals are derived from this registry so the taskbar counter ("X/Y") and
// report phase thresholds stay in sync as content is added or removed.

// 36 regular clues — discovered by reading emails, slack, HR profiles,
// access logs, documents, CCTV footage, and IT tickets.
export const CLUES = {
  // Emails (5)
  'email-leaked-doc':             { category: 'evidence',       app: 'email' },
  'email-financial-distribution': { category: 'access',         app: 'email' },
  'email-patent-access':          { category: 'access',         app: 'email' },
  'email-pricing-access':         { category: 'access',         app: 'email' },
  'email-elena-access-request':   { category: 'suspect',        app: 'email' },

  // Slack (5)
  'slack-public-wifi-cafe':       { category: 'systemic',       app: 'slack' },
  'slack-pricing-discussion':     { category: 'systemic',       app: 'slack' },
  'slack-priya-ethics':           { category: 'lighthouse',     app: 'slack' },
  'slack-elena-netwatch':         { category: 'suspect',        app: 'slack' },
  'slack-elena-suspicious-dm':    { category: 'suspect',        app: 'slack' },

  // HR / PeopleHub (6)
  'hr-your-audit-gap':            { category: 'mirror-adjacent', app: 'peoplehub' },
  'hr-david-financial-pressure':  { category: 'suspect',         app: 'peoplehub' },
  'hr-priya-ethics-flag':         { category: 'lighthouse',      app: 'peoplehub' },
  'hr-james-ec-friend':           { category: 'suspect',         app: 'peoplehub' },
  'hr-elena-meridian-history':    { category: 'suspect',         app: 'peoplehub' },
  'hr-ryan-comp-grievance':       { category: 'suspect',         app: 'peoplehub' },

  // Access log / badge records (2)
  'access-elena-latenight':       { category: 'suspect',        app: 'accesslog' },
  'access-david-earlypattern':    { category: 'systemic',       app: 'accesslog' },

  // Print log (3)
  'print-david-early':            { category: 'systemic',       app: 'printtrace' },
  'print-elena-saturday':         { category: 'suspect',        app: 'printtrace' },
  'print-no-physical-leak':       { category: 'evidence',       app: 'printtrace' },

  // VPN / NetWatch (3)
  'net-david-public-wifi':        { category: 'systemic',       app: 'netwatch' },
  'net-elena-saturday-vpn':       { category: 'suspect',        app: 'netwatch' },
  'net-external-patent-access':   { category: 'evidence',       app: 'netwatch' },

  // CCTV (3)
  'cctv-elena-arrival':           { category: 'suspect',        app: 'cctv' },
  'cctv-elena-server-room':       { category: 'suspect',        app: 'cctv' },
  'cctv-elena-copying':           { category: 'suspect',        app: 'cctv' },

  // DocVault + SecureFiles (6)
  'doc-board-access-log':             { category: 'access',      app: 'docvault' },
  'doc-patent-external-ip':           { category: 'evidence',    app: 'docvault' },
  'sec-lighthouse-contract':          { category: 'lighthouse',  app: 'secfiles' },
  'sec-board-surveillance-discussion':{ category: 'lighthouse',  app: 'secfiles' },
  'sec-watermark-match':              { category: 'smoking-gun', app: 'secfiles' },
  'sec-whistleblower-email':          { category: 'smoking-gun', app: 'secfiles' },

  // IT Desk (2)
  'it-elena-netwatch-request':    { category: 'suspect',        app: 'itdesk' },
  'it-david-vpn-warning':         { category: 'systemic',       app: 'itdesk' },

  // Calendar (1)
  'calendar-lighthouse-cancelled':{ category: 'lighthouse',     app: 'calendar' },
}

// 7 mirror clues — evidence that reflects back on the player (Alex Chen).
// These surface the investigator's own complicity in the breach.
export const MIRROR_CLUES = {
  'mirror-your-audit-gap':     { app: 'peoplehub' },
  'mirror-audit-overdue':      { app: 'email' },
  'mirror-vpn-exception':      { app: 'email' },
  'mirror-byod-approval':      { app: 'netwatch' },
  'mirror-audit-postponed':    { app: 'calendar' },
  'mirror-audit-postponement': { app: 'itdesk' },
  'mirror-anomaly-unresolved': { app: 'itdesk' },
}

// Human-readable titles for each clue (displayed in the Clues Notebook).
// Keep both locales in sync with CLUES + MIRROR_CLUES keys.
export const CLUE_NAMES = {
  en: {
    // Emails
    'email-leaked-doc':             'CEO forwarded the leaked board minutes',
    'email-financial-distribution': 'Q4 Financial Model sent to 4 recipients',
    'email-patent-access':          'Patent Gap Analysis — restricted distribution',
    'email-pricing-access':         'Meridian pricing strategy email',
    'email-elena-access-request':   'Elena requested system access review',
    // Slack
    'slack-public-wifi-cafe':       'Team mentions the cafe with "great wifi"',
    'slack-pricing-discussion':     'James states exact pricing floor in #deals',
    'slack-priya-ethics':           'Priya: "we\'re building surveillance tools"',
    'slack-elena-netwatch':         'Elena requested NetWatch admin access',
    'slack-elena-suspicious-dm':    'Elena DM\'d documents to an unknown contact',
    // HR
    'hr-your-audit-gap':            'Your last audit was 14 months ago',
    'hr-david-financial-pressure':  'David flagged for personal legal matter',
    'hr-priya-ethics-flag':         'Priya raised Lighthouse ethics concerns',
    'hr-james-ec-friend':           'James\'s emergency contact works at Meridian',
    'hr-elena-meridian-history':    'Elena worked at Meridian 2018-2024',
    'hr-ryan-comp-grievance':       'Ryan underpaid, promotion denied',
    // Access
    'access-elena-latenight':       'Elena badged in Saturday 23:47',
    'access-david-earlypattern':    'David badges in ~6 AM consistently',
    // Print
    'print-david-early':            'David printed financial model at 6:03 AM',
    'print-elena-saturday':         'Elena printed audit template Saturday 23:52',
    'print-no-physical-leak':       'No print record for leaked board minutes',
    // Network
    'net-david-public-wifi':        'David used cafe public wifi 3 times',
    'net-elena-saturday-vpn':       'Elena VPN\'d from office Saturday night',
    'net-external-patent-access':   'External IP from Meridian consultant accessed patents',
    // CCTV
    'cctv-elena-arrival':           'Elena entered building Saturday night',
    'cctv-elena-server-room':       'Elena went to Floor 3 server room',
    'cctv-elena-copying':           'Elena copying files at workstation',
    // Documents
    'doc-board-access-log':              '5 people accessed board minutes',
    'doc-patent-external-ip':            'External IP accessed Patent Gap Analysis',
    'sec-lighthouse-contract':           'Project Lighthouse surveillance contract',
    'sec-board-surveillance-discussion': 'Board voted to hide surveillance use',
    'sec-watermark-match':               'Leaked watermark identifies the mole',
    'sec-whistleblower-email':           '"They chose profit. Someone needs to see this."',
    // IT
    'it-elena-netwatch-request':    'Elena\'s NetWatch access ticket',
    'it-david-vpn-warning':         'IT warned David about public wifi',
    // Calendar
    'calendar-lighthouse-cancelled':'CEO cancelled Lighthouse ethics review',
  },
  zh: {
    'email-leaked-doc':             'CEO 转发了泄露的董事会纪要',
    'email-financial-distribution': 'Q4 财务模型分发给了 4 个人',
    'email-patent-access':          '专利漏洞分析 — 受限分发',
    'email-pricing-access':         '鼎盛集团定价策略邮件',
    'email-elena-access-request':   '赵敏申请系统访问审查',
    'slack-public-wifi-cafe':       '团队提到"楼下瑞幸 wifi 不错"',
    'slack-pricing-discussion':     '张伟杰在 #交易组 说出底价',
    'slack-priya-ethics':           '林佳慧："我们做的就是监控工具"',
    'slack-elena-netwatch':         '赵敏申请网安监控管理权限',
    'slack-elena-suspicious-dm':    '赵敏私聊发送文件给陌生联系人',
    'hr-your-audit-gap':            '你上次审计是 14 个月前',
    'hr-david-financial-pressure':  '李大卫被标记个人法律问题',
    'hr-priya-ethics-flag':         '林佳慧提出灯塔计划伦理问题',
    'hr-james-ec-friend':           '张伟杰紧急联系人在鼎盛集团',
    'hr-elena-meridian-history':    '赵敏 2018-2024 在鼎盛集团工作',
    'hr-ryan-comp-grievance':       '金瑞恩薪资偏低，调岗被拒',
    'access-elena-latenight':       '赵敏周六 23:47 刷卡进入',
    'access-david-earlypattern':    '李大卫每天 6 点左右打卡',
    'print-david-early':            '李大卫凌晨 6:03 打印财务模型',
    'print-elena-saturday':         '赵敏周六 23:52 打印审计模板',
    'print-no-physical-leak':       '泄露的董事会纪要没有打印记录',
    'net-david-public-wifi':        '李大卫 3 次使用咖啡馆公共 wifi',
    'net-elena-saturday-vpn':       '赵敏周六晚从办公室 VPN 登录',
    'net-external-patent-access':   '鼎盛顾问公司 IP 访问了专利分析',
    'cctv-elena-arrival':           '赵敏周六深夜进入大楼',
    'cctv-elena-server-room':       '赵敏去了 3 楼机房',
    'cctv-elena-copying':           '赵敏在工位复制文件',
    'doc-board-access-log':              '5 人访问了董事会纪要',
    'doc-patent-external-ip':            '外部 IP 访问了专利漏洞分析',
    'sec-lighthouse-contract':           '灯塔计划监控合同',
    'sec-board-surveillance-discussion': '董事会投票决定隐瞒监控用途',
    'sec-watermark-match':               '泄露文件水印指向内鬼',
    'sec-whistleblower-email':           '"他们选择了利润。有人需要看到这个。"',
    'it-elena-netwatch-request':    '赵敏的网安监控访问工单',
    'it-david-vpn-warning':         'IT 警告李大卫不要用公共 wifi',
    'calendar-lighthouse-cancelled':'CEO 取消了灯塔计划伦理评审',
  },
}

// Mirror clue titles — the player's own failures
export const MIRROR_CLUE_NAMES = {
  en: {
    'mirror-your-audit-gap':     'Last audit: 14 months ago',
    'mirror-audit-overdue':      'Ignored HR\'s 3rd reminder',
    'mirror-vpn-exception':      'You approved BYOD VPN exceptions',
    'mirror-byod-approval':      '12 personal devices, all approved by you',
    'mirror-audit-postponed':    'Rescheduled security audit 3 times',
    'mirror-audit-postponement': 'IT ticket: audit postponed "for Q4"',
    'mirror-anomaly-unresolved': 'Open anomaly alert — assigned to you',
  },
  zh: {
    'mirror-your-audit-gap':     '上次审计：14 个月前',
    'mirror-audit-overdue':      '忽略了 HR 的第 3 次提醒',
    'mirror-vpn-exception':      '你批准了 BYOD VPN 例外',
    'mirror-byod-approval':      '12 台个人设备，全都是你批的',
    'mirror-audit-postponed':    '你把安全审计推迟了 3 次',
    'mirror-audit-postponement': 'IT 工单：审计推迟"等 Q4 再说"',
    'mirror-anomaly-unresolved': '未处理的异常告警 — 负责人是你',
  },
}

export const TOTAL_CLUES = Object.keys(CLUES).length
export const TOTAL_MIRROR_CLUES = Object.keys(MIRROR_CLUES).length

// App labels grouping for the Clues Notebook display
export const CLUE_APPS = {
  en: {
    email: 'Email',
    slack: 'Slack',
    peoplehub: 'PeopleHub',
    accesslog: 'AccessLog',
    printtrace: 'PrintTrace',
    netwatch: 'NetWatch',
    cctv: 'CCTV',
    docvault: 'DocVault',
    secfiles: 'SecureFiles',
    itdesk: 'ITDesk',
    calendar: 'Calendar',
  },
  zh: {
    email: '邮箱',
    slack: '飞书',
    peoplehub: '人事通',
    accesslog: '门禁记录',
    printtrace: '打印记录',
    netwatch: '网安监控',
    cctv: '监控',
    docvault: '文档中心',
    secfiles: '加密文件',
    itdesk: 'IT 工单',
    calendar: '日历',
  },
}

// --- Thresholds ---
// Recalibrated for ~36 total clues.
export const LIGHTHOUSE_UNLOCK_CLUES = 18 // 50% — unlocks the hidden app
export const ENDING_AVAILABLE_CLUES = 30  // ~80% — report phase 5

// How long the discovery-flash class stays applied after a clue is found.
const FLASH_DURATION_MS = 2000

// --- Helpers ---
function isMirrorClueId(id) {
  return typeof id === 'string' && id.startsWith('mirror-')
}

/**
 * Hook: returns { found, discover, justFound } for a given clue ID.
 * `justFound` is true for 2 seconds after the clue is first discovered so
 * components can apply a brief visual flash.
 *
 * Discovery is NOT gated by the CLUES/MIRROR_CLUES registries — any ID will
 * register. The registry is metadata only.
 */
export function useClue(clueId) {
  const { state, dispatch } = useGame()
  const found =
    !!clueId &&
    (state.cluesFound.includes(clueId) || state.mirrorClues.includes(clueId))
  const record = CLUES[clueId] || MIRROR_CLUES[clueId] || null

  const [justFound, setJustFound] = useState(false)
  const firedRef = useRef(false)

  const discover = useCallback(() => {
    if (!clueId || found) return
    dispatch({
      type: isMirrorClueId(clueId) ? 'ADD_MIRROR_CLUE' : 'ADD_CLUE',
      payload: clueId,
    })
  }, [clueId, found, dispatch])

  // Trigger the flash once, the first time we observe this clue become found.
  useEffect(() => {
    if (found && !firedRef.current) {
      firedRef.current = true
      setJustFound(true)
      const t = setTimeout(() => setJustFound(false), FLASH_DURATION_MS)
      return () => clearTimeout(t)
    }
    return undefined
  }, [found])

  return { found, record, discover, justFound }
}

/**
 * Hook: returns a ref to attach to a scrollable element.
 * When the element scrolls into view, the clue is discovered.
 *
 * Not gated by registry — any ID will register.
 */
export function useScrollClue(clueId) {
  const ref = useRef(null)
  const { state, dispatch } = useGame()
  const alreadyFound =
    !!clueId &&
    (state.cluesFound.includes(clueId) || state.mirrorClues.includes(clueId))

  useEffect(() => {
    if (!clueId || alreadyFound || !ref.current) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            dispatch({
              type: isMirrorClueId(clueId) ? 'ADD_MIRROR_CLUE' : 'ADD_CLUE',
              payload: clueId,
            })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [alreadyFound, clueId, dispatch])

  return ref
}
