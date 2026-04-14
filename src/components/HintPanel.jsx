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
          "The first email in your inbox is the forwarded leak. Read it.",
          '收件箱第一封就是 CEO 转给你的泄露文件。打开读一下。',
        ),
      }
    }
    if (!has('slack-public-wifi-cafe')) {
      return {
        title: t("Check Slack", '看看飞书'),
        body: t(
          "People talk about things they shouldn't. Scroll — don't just skim the top messages.",
          '有人在群里说了不该说的事。往下滚一滚 — 别只看最顶上的几条。',
        ),
      }
    }
    if (!unlocked.has('peoplehub')) {
      return {
        title: t("Read all the emails first", '先把邮件都读一遍'),
        body: t(
          "Eight emails in your inbox. One of them explains the company's password format — you'll need it to unlock locked apps.",
          '收件箱一共 8 封邮件。其中有一封说明了公司的密码格式 — 解锁其他应用会用到。',
        ),
      }
    }
    return {
      title: t("Look at employee profiles", '翻翻员工档案'),
      body: t(
        "PeopleHub has HR records for everyone. Each person has something worth noting.",
        '人事通里有每个人的 HR 档案。每个人身上都有值得注意的东西。',
      ),
    }
  }

  // Phase 2: Mid exploration — the key insight is that ONE email explains
  // the password pattern for ALL standard-format apps. Hints point at that
  // email rather than giving passwords away.
  if (count < 15) {
    const hasNoUnlockedPasswordApp =
      !unlocked.has('docvault') &&
      !unlocked.has('peoplehub') &&
      !unlocked.has('printtrace') &&
      !unlocked.has('netwatch') &&
      !unlocked.has('cctv')

    if (hasNoUnlockedPasswordApp) {
      return {
        title: t("Find the IT email", '找 IT 部的邮件'),
        body: t(
          "One of your emails is from IT and explains the password format. The same pattern works for all standard apps.",
          '你收件箱里有一封 IT 部发的邮件，说明了密码格式。所有标准应用都用同一套格式。',
        ),
      }
    }
    if (!unlocked.has('docvault')) {
      return {
        title: t("Unlock DocVault", '解锁文档中心'),
        body: t(
          "Apply the IT password format here too — the prefix comes from the app's purpose.",
          '这里也适用 IT 邮件里那套格式 — 前缀来自应用的用途。',
        ),
      }
    }
    if (!unlocked.has('netwatch')) {
      return {
        title: t("Unlock NetWatch", '解锁网安监控'),
        body: t(
          "Same password pattern. VPN logs will show who connected from where.",
          '密码格式一样。VPN 日志会显示谁从哪里连过内网。',
        ),
      }
    }
    if (!unlocked.has('cctv')) {
      return {
        title: t("Unlock CCTV", '解锁监控'),
        body: t(
          "Same password pattern. Camera footage logs line up with badge and VPN times.",
          '密码格式一样。监控记录和门禁、VPN 的时间戳能对得上。',
        ),
      }
    }
    if (!has('access-elena-latenight')) {
      return {
        title: t("Check AccessLog", '查看门禁记录'),
        body: t(
          "Badge records show who was in the building and when. Look for activity outside normal hours.",
          '门禁记录每个人的进出时间。看看下班时间之后有没有人还在。',
        ),
      }
    }
    return {
      title: t("Cross-reference the logs", '交叉对比日志'),
      body: t(
        "Badge + VPN + CCTV should tell the same story for whoever was there.",
        '门禁、VPN、监控三个日志如果对得上，说明的是同一个人的行动。',
      ),
    }
  }

  // Phase 3: Unlocking SecureFiles — password is NOT in the standard format
  if (count < 22) {
    if (!unlocked.has('secfiles')) {
      return {
        title: t("The Secure Vault", '加密文件保险箱'),
        body: t(
          "This one breaks the standard pattern. The second word in the password is a project name — someone mentioned it in Slack with concern.",
          '这个不按常规格式走。密码中间那个词是一个项目名字 — 有人在飞书里带着担忧提过它。',
        ),
      }
    }
    if (!has('sec-lighthouse-contract')) {
      return {
        title: t("Read the files inside", '读里面的文件'),
        body: t(
          "SecureFiles has contracts and transcripts about what the company is actually selling.",
          '加密文件里有一些合同和会议记录，揭示了公司到底在卖什么。',
        ),
      }
    }
  }

  // Phase 4: Finding the mole
  if (count < 30) {
    if (!has('sec-watermark-match')) {
      return {
        title: t("Check the comparison document", '看那份比对分析'),
        body: t(
          "One of the files in SecureFiles compares the leaked version to internal copies. That's how the source gets identified.",
          '加密文件里有一份把泄露版本和内部副本对比的分析。源头就是这么被识别的。',
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
