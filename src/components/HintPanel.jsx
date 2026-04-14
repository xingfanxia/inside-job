import { useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'

/**
 * Progressive hint system — tells the player what to try next WITHOUT
 * spoiling the mystery. Hints escalate based on state:
 *   - 0 clues       → "Start with email"
 *   - few clues     → suggest unlocking next password app
 *   - mid-game      → point at logs/CCTV
 *   - late game     → hint at SecureFiles + watermark
 *   - near complete → point at specific missing clues by app
 *
 * Each hint is ONE short suggestion, not a full guide.
 */
function computeHint(state, isZh) {
  const clues = new Set(state.cluesFound)
  const unlocked = new Set(state.unlockedApps)
  const has = (id) => clues.has(id)
  const count = state.cluesFound.length

  const t = (en, zh) => (isZh ? zh : en)

  // Phase 1: Starting out
  if (count === 0) {
    return {
      title: t("Start with Email", '从邮箱开始'),
      body: t(
        "The CEO just forwarded you the leaked document. It's the first email in your inbox.",
        'CEO 刚把泄露的文件转发给了你，就在你收件箱的第一封邮件。'
      ),
    }
  }

  if (count < 5) {
    if (!has('email-leaked-doc')) {
      return {
        title: t("Open the CEO's email", '打开 CEO 的邮件'),
        body: t(
          "There's an email from Sarah Park with the leaked document — click it.",
          '孙雪梅给你发了一封带附件的邮件 — 点开看看。',
        ),
      }
    }
    if (!has('slack-public-wifi-cafe')) {
      return {
        title: t("Check Slack", '看看飞书'),
        body: t(
          "Scroll through #general and #deals — people mention things that shouldn't be said publicly.",
          '在 #general 和 #deals 频道里往下滚 — 有人说了不该公开说的事。',
        ),
      }
    }
    if (!unlocked.has('peoplehub')) {
      return {
        title: t("Unlock PeopleHub", '解锁人事通'),
        body: t(
          "The IT email shows the password pattern. Try HR-NovaTech-2026.",
          'IT 部的邮件给了密码格式提示。试试 HR-XingChen-2026。',
        ),
      }
    }
    return {
      title: t("Read the other emails", '读读其他邮件'),
      body: t(
        "There are 8 emails in your inbox. Some mention who has access to what.",
        '收件箱一共 8 封邮件，里面有谁能接触到哪些文件的信息。',
      ),
    }
  }

  // Phase 2: Mid exploration
  if (count < 15) {
    if (!unlocked.has('docvault')) {
      return {
        title: t("Unlock DocVault", '解锁文档中心'),
        body: t(
          "Try DOC-NovaTech-2026. The leaked document originated from there — see who downloaded it.",
          '试试 DOC-XingChen-2026。泄露的文件就是从这里出来的 — 看看谁下载过。',
        ),
      }
    }
    if (!unlocked.has('netwatch')) {
      return {
        title: t("Unlock NetWatch", '解锁网安监控'),
        body: t(
          "NET-NovaTech-2026. VPN logs will show who connected from unusual places.",
          'NET-XingChen-2026。VPN 日志会显示谁从奇怪的地方连过内网。',
        ),
      }
    }
    if (!unlocked.has('cctv')) {
      return {
        title: t("Unlock CCTV", '解锁监控'),
        body: t(
          "CCTV-NovaTech-2026. Someone came into the building Saturday night.",
          'CCTV-XingChen-2026。有人周六深夜进了大楼。',
        ),
      }
    }
    if (!has('access-elena-latenight')) {
      return {
        title: t("Check AccessLog", '查看门禁记录'),
        body: t(
          "Badge records show who was in the building and when. Filter by employee.",
          '门禁记录显示每个人的进出时间。按员工筛选看看。',
        ),
      }
    }
    return {
      title: t("Cross-reference the logs", '交叉对比日志'),
      body: t(
        "Badge + VPN + CCTV timestamps should line up for the same person.",
        '门禁 + VPN + 监控的时间戳应该指向同一个人。',
      ),
    }
  }

  // Phase 3: Unlocking SecureFiles
  if (count < 22) {
    if (!unlocked.has('secfiles')) {
      return {
        title: t("The Secure Vault", '加密文件保险箱'),
        body: t(
          "SecureFiles password breaks the standard pattern. Remember what Priya called the product in Slack.",
          '加密文件的密码不按常规格式。记得林佳慧在飞书里怎么形容公司的产品吗？',
        ),
      }
    }
    if (!has('sec-lighthouse-contract')) {
      return {
        title: t("Read the Lighthouse contract", '读灯塔计划合同'),
        body: t(
          "SecureFiles has a contract that explains what the company is actually selling.",
          '加密文件里有一份合同，说明了公司实际上在卖什么。',
        ),
      }
    }
  }

  // Phase 4: Finding the mole
  if (count < 30) {
    if (!has('sec-watermark-match')) {
      return {
        title: t("The watermark identifies the mole", '水印指向内鬼'),
        body: t(
          "SecureFiles has a comparison of the leaked copy. Every download has a unique watermark.",
          '加密文件里有一份泄露副本的比对分析。每个下载的文件都有独特水印。',
        ),
      }
    }
    // Scan for gaps — suggest an app with findable clues
    const appsToCheck = ['calendar', 'itdesk', 'printtrace', 'cctv']
    for (const app of appsToCheck) {
      if (unlocked.has(app) || app === 'calendar' || app === 'itdesk') {
        const appClues = {
          calendar: ['calendar-lighthouse-cancelled'],
          itdesk: ['it-elena-netwatch-request', 'it-david-vpn-warning'],
          printtrace: ['print-david-early', 'print-elena-saturday', 'print-no-physical-leak'],
          cctv: ['cctv-elena-arrival', 'cctv-elena-server-room', 'cctv-elena-copying'],
        }[app] || []
        if (appClues.some((id) => !has(id))) {
          const names = {
            en: { calendar: 'Calendar', itdesk: 'ITDesk', printtrace: 'PrintTrace', cctv: 'CCTV' },
            zh: { calendar: '日历', itdesk: 'IT 工单', printtrace: '打印记录', cctv: '监控' },
          }
          const appName = (isZh ? names.zh : names.en)[app]
          return {
            title: t(`Look at ${appName}`, `看看${appName}`),
            body: t(
              `There are clues you haven't found in ${appName}.`,
              `${appName}里还有你没看过的线索。`,
            ),
          }
        }
      }
    }
  }

  // Phase 5: Near the end
  if (count < 36) {
    const remaining = 36 - count
    return {
      title: t(`${remaining} clues remaining`, `还差 ${remaining} 条线索`),
      body: t(
        "Scroll through Slack channels you haven't finished. Check every tab in NetWatch. Every person in PeopleHub.",
        '没看完的飞书频道往下滚。网安监控的每个 tab。人事通里每个人的档案。',
      ),
    }
  }

  // All found
  return {
    title: t("All clues found", '全部找齐了'),
    body: t(
      "You can now select any ending in the Incident Report — including the hidden Ending D.",
      '现在事故报告里所有结局都解锁了 — 包括隐藏结局 D。',
    ),
  }
}

export default function HintPanel({ onClose }) {
  const { state } = useGame()
  const isZh = state.locale === 'zh'

  const hint = useMemo(() => computeHint(state, isZh), [state, isZh])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="hint-overlay" onClick={onClose}>
      <div className="hint-panel" onClick={(e) => e.stopPropagation()}>
        <div className="hint-header">
          <span className="hint-icon">💡</span>
          <span className="hint-heading">
            {isZh ? '下一步建议' : 'Next step'}
          </span>
          <button
            type="button"
            className="hint-close"
            onClick={onClose}
            aria-label={isZh ? '关闭' : 'Close'}
          >×</button>
        </div>
        <div className="hint-body">
          <h3 className="hint-title">{hint.title}</h3>
          <p className="hint-text">{hint.body}</p>
        </div>
        <div className="hint-footer">
          {isZh
            ? '提示不会剧透答案 — 只会告诉你该去哪里找。'
            : "Hints don't spoil the answer — they just point you in the right direction."}
        </div>
      </div>
    </div>
  )
}
