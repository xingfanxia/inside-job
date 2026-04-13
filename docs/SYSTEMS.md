# Inside Job — System Design

## Screen Flow

```
Opening (typewriter: CEO's call) → Boot (NovaTech login screen) → Desktop (the game)
```

### Opening Sequence
Typewriter effect, line by line:

```
Monday. 9:07 AM.
You scan your badge. The elevator's quiet. 
Sarah's assistant meets you on 12.
"She's waiting."
The glass door closes behind you.
"Sit down, Alex."
She slides a printed page across the desk.
It's NovaTech's board minutes from last Thursday.
Except you're reading it on Meridian's letterhead.
"Find them. Before tomorrow at 9."
```

### Boot Screen
NovaTech corporate login:
- Username: `alex.chen` (pre-filled)
- Password: `••••••••` (auto-fills after 1s delay)
- "Welcome back, Alex. You have 14 unread messages."

---

## Desktop Layout

### App Grid (11 apps + 1 hidden)

```
┌─────────┬─────────┬─────────┬─────────┐
│  Email  │  Slack  │ DocVault│ PeopleHub│
├─────────┼─────────┼─────────┼─────────┤
│AccessLog│PrintTrace│NetWatch │ Calendar │
├─────────┼─────────┼─────────┼─────────┤
│  CCTV   │ ITDesk  │SecFiles │ [hidden] │
└─────────┴─────────┴─────────┴─────────┘
```

### Taskbar (bottom)
- NovaTech logo + "Internal Portal"
- Open window tabs
- Tray: Investigation phase indicator | Clue counter (x/18) | Clock (starts 9:15 AM)

### Persistent Panel (right side)
**Incident Report** — always visible, compact by default, expandable.
Starts as a blank form. Sections unlock as you discover evidence.

---

## App Definitions

### 1. Email (Outlook-style)
**Default unlocked**

**Inbox (8 emails):**
1. **From: Sarah Park (CEO)** — "RE: Meridian Due Diligence" — Forward of the board minutes with "THIS IS WHAT THEY HAD" [clue: email-leaked-doc]
2. **From: IT Department** — Password reset reminder: "Default format reminder: FirstName + department code + year" [hints at other passwords]
3. **From: David Reeves (CFO)** — "Q4 Financial Model — CONFIDENTIAL" — attachment, forwarded to 4 people [clue: email-financial-distribution]
4. **From: Priya Sharma (CTO)** — "Patent Portfolio Gap Analysis" — sent to CEO and legal only [clue: email-patent-access]
5. **From: HR** — "Annual Security Audit — OVERDUE (3rd reminder)" — dated 6 weeks ago, you never responded [mirror: email-audit-overdue]
6. **From: James Whitfield** — "Meridian Pricing Strategy" — casual tone, "let's keep this tight" [clue: email-pricing-access]
7. **From: Elena Vasquez** — "System Access Review Request" — she requested admin logs 2 weeks ago [clue: email-elena-access-request]
8. **From: IT Department** — "VPN Exception Approved" — signed by you, allowing personal device VPN access [mirror: email-vpn-exception]

**Drafts (1):**
- Unfinished reply to HR about the security audit: "Thanks for the reminder, I'll schedule this for..." (never sent)

**Sent (notable):**
- You approved Ryan's request to print board minutes for physical copies [context for Ryan's USB activity]

### 2. Slack
**Default unlocked**

**Channels:**
- **#general** — Office chatter. Someone mentions the new cafe across the street ("great wifi, whole team goes there for lunch")  [clue: slack-public-wifi-cafe]
- **#deals** — Restricted channel. Meridian pricing discussion. Members: Sarah, David, James, Priya, you. James says "floor is 2.8, ceiling is 3.5, we'd take 3.1 happily" [clue: slack-pricing-discussion]
- **#engineering** — Priya venting about product direction: "We're building surveillance tools and calling it 'enterprise analytics'. I didn't sign up for this." [clue: slack-priya-ethics]
- **#random** — Ryan posts a meme about being underpaid. Elena responds with "hang in there." Others ignore it.
- **#it-support** — Elena asked for NetWatch admin access "for an internal process review." IT granted it. [clue: slack-elena-netwatch]

**DMs (accessible via investigation access):**
- **James ↔ External (Mark Torres)** — "Hey man, can we grab a call tonight? Need your take on something personal." Mark: "Sure, 10pm?" [red herring: personal investment talk]
- **Priya ↔ Recruiter** — "I'm interested in exploring opportunities. Can we keep this confidential?" [red herring: job hunting]
- **David ↔ His lawyer** — "Transfer the funds Tuesday. She can't know." [red herring: divorce asset protection]
- **Ryan ↔ Sarah (CEO)** — Ryan: "Board meeting prep done. Printed 6 copies, saved digital backup to USB per your request." Sarah: "Thanks Ryan." [context: exonerates Ryan's USB activity]
- **Elena ↔ Unknown contact** — "The documents are in the shared folder. Use the link before Friday." [clue: slack-elena-suspicious-dm — but who is this contact?]

### 3. DocVault (Document Management)
**Password required:** `DOC-NovaTech-2026` 
**Hint source:** IT email mentions "default format: system prefix + company + year"

Contains version-tracked documents:
- Board Minutes (v3.2) — accessed by: Sarah, David, Ryan, Priya, Elena [clue: doc-board-access-log]
- Financial Model — 3 versions, last edited by David
- Patent Gap Analysis — accessed by Priya and one external IP [clue: doc-patent-external-ip]
- **Document watermarks**: each user's downloaded copy has a unique invisible watermark ID. The leaked copy's watermark = **[the mole's ID]** [clue: doc-watermark-trace — THIS IS THE KEY EVIDENCE]

### 4. PeopleHub (HR / Employee Directory)
**Password required:** `HR-NovaTech-2026`
**Hint source:** Same IT email pattern

Employee profiles with:
- David Reeves — "Personal leave requested: 3 days last month (divorce proceedings)" [context]
- Priya Sharma — Performance review: "Exceptional technical leader. Noted: raised ethics concerns about Project Lighthouse in Q3 review." [clue: hr-priya-ethics-flag]
- James Whitfield — Emergency contact: Mark Torres (listed as "friend") [connects to Slack DMs]
- Elena Vasquez — Employment history: "2018-2024: Meridian Group, Director of Operations" [clue: hr-elena-meridian-history]
- Ryan Kim — Salary: visibly below market rate. Review note: "Recommended for promotion — declined by management." [context]
- **Alex Chen (you)** — "Hired 2023. Security audit schedule: OVERDUE. Last completed audit: 14 months ago." [mirror: hr-your-audit-gap]

### 5. AccessLog (Badge Records)
**Default unlocked** (you're Head of Security)

Badge in/out for all employees, past 30 days.

Key entries:
- Elena Vasquez: badged in at 11:47 PM last Saturday. Badged out 12:31 AM. [clue: access-elena-latenight]
- David Reeves: badged in at 6:02 AM on 3 occasions (before anyone else). Leaves by 6:30. [red herring: he's working early to handle divorce stress]
- Ryan Kim: consistent 8:30AM-7:00PM every day. No anomalies. [context: he's just always there]
- James Whitfield: left early (3:30 PM) on the day the financial model was accessed externally. [red herring: he had a dentist appointment, visible in Calendar]
- **Alex Chen (you):** No Saturday/Sunday badges for 4 months. [mirror: you're not monitoring off-hours access because you're never there]

### 6. PrintTrace (Print Queue)
**Password required:** `PRINT-NovaTech-2026`
**Hint source:** IT email pattern

Print log with timestamps and document names:
- Ryan Kim printed "Board Minutes Q4" x6 copies, Thursday 4:15 PM [context: per CEO's request]
- David Reeves printed "Financial Model CONFIDENTIAL" at 6:03 AM on a Tuesday [clue: print-david-early — but why so early?]
- Elena Vasquez printed "System Access Audit Template" last Saturday 11:52 PM [clue: print-elena-saturday — matches her badge-in time]
- Priya Sharma printed "Patent Portfolio — INTERNAL ONLY" on the day she had lunch outside [red herring: she was reviewing for a legitimate meeting]
- **No print record for the leaked board minutes version** — it was sent digitally [clue: print-no-physical-leak]

### 7. NetWatch (VPN / Network Logs)
**Password required:** `NET-NovaTech-2026`
**Hint source:** IT email pattern. OR: Elena's Slack request for NetWatch access provides the hint that IT granted her access with default creds

VPN connection logs:
- David Reeves: connected from IP `café-public-wifi` on 3 occasions [clue: net-david-public-wifi — matches the Slack #general cafe mention]
- Priya Sharma: connected from `unknown-IP-1` once — geolocates to the office of a recruiting firm [red herring: job interview]
- James Whitfield: no VPN anomalies, all connections from home/office [context]
- Elena Vasquez: connected from `office-IP` at 11:49 PM Saturday [clue: net-elena-saturday-vpn — matches badge and print logs]
- External access to DocVault: `unknown-IP-2` accessed Patent Gap Analysis — geolocates to a consulting firm associated with Meridian [clue: net-external-patent-access]
- **BYOD Policy Exception Log**: 12 personal devices approved. Approved by: Alex Chen. [mirror: net-byod-your-approval]

### 8. Calendar
**Default unlocked**

Notable entries:
- Thursday: "Board Meeting — Q4 Review" (the meeting whose minutes leaked)
- Friday: James — "Dentist 3:30 PM" [exonerates his early departure]
- Saturday: No official events. But Elena's badge says she was here.
- Last month: "Security Audit — RESCHEDULED" appears 3 times, each pushed later [mirror: calendar-audit-postponed x3]
- 2 weeks ago: Priya — "1:1 with Sarah — Project Lighthouse Ethics Review" — CANCELLED by Sarah [clue: calendar-lighthouse-cancelled]
- This morning: "CEO — Alex Chen — URGENT — 9:00 AM" [the game's starting event]

### 9. CCTV (Security Footage Log)
**Password required:** `CCTV-NovaTech-2026`
**Hint source:** AccessLog interface mentions "CCTV timestamps synced — use security credentials"

Text-based logs (no actual video — described as "[Camera 3, Lobby] 23:47 — Female, dark coat, enters through side door"):
- Saturday 23:47: "Female, dark coat, enters side door, badge scan" — Elena [clue: cctv-elena-arrival]
- Saturday 23:53: "Same individual proceeds to Floor 3 (server room)" [clue: cctv-elena-server-room]
- Saturday 00:12: "Individual at workstation, Floor 3, appears to be copying files" [clue: cctv-elena-copying]
- Saturday 00:28: "Individual exits Floor 3, proceeds to lobby, exits building" [context]
- Weekday mornings: David Reeves enters at ~6 AM on several occasions, goes to his office, leaves by 6:30. Nothing suspicious. [context]

### 10. ITDesk (IT Support Tickets)
**Default unlocked**

Tickets:
- Ticket #4401: Ryan requests USB drive usage permission — "CEO asked me to prepare physical board meeting materials." Approved by IT. [exonerates Ryan]
- Ticket #4387: Elena requests NetWatch admin access — "Process review for operations." Approved. [clue: it-elena-netwatch-request]
- Ticket #4392: David reports "forgot VPN password, reset needed." IT response: "Reset done. Reminder: avoid public networks for confidential work." [clue: it-david-vpn-warning — IT warned him, he didn't listen]
- Ticket #4356: **Alex Chen** requests postponement of security audit — "Q4 priorities. Will reschedule to January." [mirror: it-your-audit-postponement]
- Ticket #4410: Anomaly alert — "External IP accessed DocVault. Pattern consistent with credential stuffing. No action taken." Assigned to: **Alex Chen**. Status: **Open**. [mirror: it-anomaly-unresolved — you ignored a security alert]

### 11. SecureFiles (Encrypted Vault)
**Password required:** `SEC-Lighthouse-2026`
**Hint source:** Priya's Slack ethics comment mentions "Project Lighthouse". Calendar shows cancelled ethics review. Combine with standard password pattern.

Contains:
- **Project Lighthouse Contract** — NovaTech sold its "behavior analytics" AI to a government agency. The contract includes "population-scale behavioral monitoring." [clue: sec-lighthouse-contract]
- **Board discussion transcript** — CEO: "This is our highest-margin contract. The board agrees to continue. We will not proactively disclose the end-use case." Board: "Agreed." [clue: sec-board-surveillance-discussion]
- **The leaked document comparison** — Side by side: NovaTech's version vs. what Meridian had. The watermark on Meridian's copy traces to: **[the mole]** [clue: sec-watermark-match — THE SMOKING GUN]
- **Email from mole to anonymous recipient** — A forwarded copy of the board minutes with one line added: "They know what they're selling and they chose profit. Someone needs to see this." [clue: sec-whistleblower-email]

### 12. [Hidden App] — Lighthouse Terminal
**Unlock condition:** Find 15+ of 18 clues

A hidden terminal appears on the desktop. Opening it shows:
```
> PROJECT LIGHTHOUSE — ADMIN CONSOLE
> Status: ACTIVE
> Monitored endpoints: 2,847,331
> Last sync: TODAY, 08:47 AM
> 
> Welcome, Alex. You had access all along.
> You just never looked.
```

This reveals the full scope of Project Lighthouse — and that your security credentials have had access to this system the entire time. You could have discovered this months ago.

---

## Password System

All passwords follow a discoverable pattern hinted in the IT email (inbox item #2): `[SYSTEM PREFIX]-NovaTech-2026`

| App | Password | Prefix Source |
|-----|----------|---------------|
| DocVault | `DOC-NovaTech-2026` | "DOC" from document management |
| PeopleHub | `HR-NovaTech-2026` | "HR" from human resources |
| PrintTrace | `PRINT-NovaTech-2026` | "PRINT" from print system |
| NetWatch | `NET-NovaTech-2026` | "NET" from network |
| CCTV | `CCTV-NovaTech-2026` | "CCTV" from security cameras |
| SecureFiles | `SEC-Lighthouse-2026` | "SEC" + "Lighthouse" from Priya's ethics concerns + calendar |

The first 5 follow a predictable pattern (once you crack one, you can guess others). SecureFiles breaks the pattern — it requires knowledge of Project Lighthouse, which you can only learn from Slack + Calendar + HR records.

---

## Clue System (18 total)

### Discovery Mechanisms
- **Auto-trigger on open:** clues that fire when you open an app/email
- **Click-trigger:** clues from clicking specific items
- **Scroll-trigger (IntersectionObserver):** Slack messages, long documents
- **Cross-reference trigger:** some clues only activate after you've found related clues

### Complete Clue Map

| # | ID | App | Content | Type | Category |
|---|---|-----|---------|------|----------|
| 1 | email-leaked-doc | Email | CEO's forwarded leaked document | auto | evidence |
| 2 | email-financial-distribution | Email | Financial model sent to 4 people | click | access |
| 3 | email-patent-access | Email | Patent analysis — limited distribution | click | access |
| 4 | slack-public-wifi-cafe | Slack | Team mentions cafe with "great wifi" | scroll | systemic |
| 5 | slack-pricing-discussion | Slack #deals | James states exact floor price | scroll | systemic |
| 6 | slack-priya-ethics | Slack #engineering | Priya calls product "surveillance tools" | scroll | lighthouse |
| 7 | slack-elena-suspicious-dm | Slack DMs | Elena sends documents to unknown contact | click | suspect |
| 8 | doc-board-access-log | DocVault | 5 people accessed board minutes | click | access |
| 9 | doc-watermark-trace | DocVault | Leaked copy's watermark identifies source | click | **smoking gun** |
| 10 | hr-elena-meridian-history | PeopleHub | Elena worked at Meridian for 6 years | click | suspect |
| 11 | hr-priya-ethics-flag | PeopleHub | Priya raised Lighthouse ethics concern | click | lighthouse |
| 12 | access-elena-latenight | AccessLog | Elena badged in at 11:47 PM Saturday | auto | suspect |
| 13 | net-david-public-wifi | NetWatch | David used public wifi for confidential work | click | systemic |
| 14 | net-elena-saturday-vpn | NetWatch | Elena VPN'd in Saturday night | click | suspect |
| 15 | cctv-elena-server-room | CCTV | Elena went to server room Saturday night | scroll | suspect |
| 16 | sec-lighthouse-contract | SecureFiles | Government surveillance contract | click | lighthouse |
| 17 | sec-board-surveillance-discussion | SecureFiles | Board agreed to hide surveillance use | click | lighthouse |
| 18 | sec-whistleblower-email | SecureFiles | Mole's email: "They chose profit" | click | **smoking gun** |

### Mirror Clues (tracked separately — player's own failures)
These don't count toward the 18 but affect the Incident Report:

| ID | App | Content |
|---|-----|---------|
| mirror-audit-overdue | Email | HR's 3rd reminder about security audit |
| mirror-vpn-exception | Email | You approved BYOD VPN exceptions |
| mirror-your-audit-gap | PeopleHub | Your last audit was 14 months ago |
| mirror-byod-approval | NetWatch | 12 personal devices approved by you |
| mirror-audit-postponed | Calendar | Security audit rescheduled 3 times |
| mirror-anomaly-unresolved | ITDesk | You ignored an external access anomaly |

---

## Incident Report (The Mirror)

### Structure
The report form sits in the right panel. It evolves as clues are found.

**Phase 1 (0-5 clues): Blank Form**
```
NOVATECH SECURITY INCIDENT REPORT
Case: Confidential Information Breach
Investigator: Alex Chen
Status: In Progress

[ Sections locked — insufficient evidence ]
```

**Phase 2 (6-10 clues): Suspects Section Unlocks**
```
SECTION 1: IDENTIFIED PERSONS OF INTEREST
Based on access patterns and behavioral indicators:
□ David Reeves — Financial access, irregular hours
□ Priya Sharma — Technical access, ethics concerns
□ James Whitfield — Deal knowledge, external contacts  
□ Elena Vasquez — System access, Meridian history
□ Ryan Kim — Document handling, proximity to CEO
```

**Phase 3 (11-14 clues): Root Cause Section Unlocks**
```
SECTION 2: ROOT CAUSE ANALYSIS
The investigation reveals systemic security failures:
⚠ BYOD policy allowed unmonitored personal device access
  — Approved by: Alex Chen
⚠ Security audit overdue by 14 months
  — Responsible party: Alex Chen  
⚠ External access anomaly detected but not investigated
  — Assigned to: Alex Chen. Status: Open.
⚠ VPN exceptions granted without review
  — Authorized by: Alex Chen
```

**Phase 4 (15-17 clues): Findings Section Unlocks**
```
SECTION 3: FINDINGS
Evidence indicates both systemic and deliberate breach:

SYSTEMIC: Multiple employees inadvertently exposed fragments 
through poor security practices enabled by [inadequate security 
policies].

DELIBERATE: One individual forwarded confidential board minutes 
to an external party. Document watermark analysis identifies 
the source copy.

COMPLICATION: The deliberate leak appears motivated by 
concerns about [Project Lighthouse] — see SecureFiles.
```

**Phase 5 (18/18 clues): Recommendation Section Unlocks**
The player must choose what to write. This determines the ending.

```
SECTION 4: RECOMMENDATION
Select your recommendation:

[A] Full Disclosure — Report all findings including your own 
    failures and Project Lighthouse concerns
    
[B] Systemic Focus — Attribute breach to security gaps. 
    No individual accountability. No Lighthouse disclosure.
    
[C] Whistleblower Protection — Recommend investigation of 
    Project Lighthouse. Protect the source.
```

---

## Game State

```javascript
{
  openWindows: [],
  activeWindow: null,
  cluesFound: [],          // max 18
  mirrorClues: [],         // player's own failures
  appsOpened: [],
  unlockedApps: ['email', 'slack', 'accesslog', 'calendar', 'itdesk'],
  reportPhase: 1,          // 1-5, based on clue count
  gamePhase: 'investigating', // investigating → confronting → ending
  nextZIndex: 100,
  gameTimeMinutes: 555,    // 9:15 AM
  selectedEnding: null,    // A, B, C, or D
}
```

### Reducer Actions
- `OPEN_WINDOW` / `CLOSE_WINDOW` / `MINIMIZE_WINDOW` / `RESTORE_WINDOW`
- `ACTIVATE_WINDOW` / `MOVE_WINDOW` / `RESIZE_WINDOW` / `MAXIMIZE_WINDOW`
- `ADD_CLUE` — adds clue, checks report phase transition, checks hidden app unlock
- `ADD_MIRROR_CLUE` — tracks player's own failures (separate from investigation clues)
- `UNLOCK_APP` — adds app to unlockedApps
- `TICK_TIME` — advances clock
- `SET_PHASE` — changes gamePhase
- `SELECT_ENDING` — player's final choice

### Phase Transitions
- `investigating` → `confronting`: triggered when 18/18 clues found and report Section 4 is active
- `confronting` → `ending`: triggered when player selects an ending recommendation

### Hidden App Unlock
- Lighthouse Terminal appears at 15+ clues
- Counts as a "bonus" discovery, not one of the 18

---

## Ending Sequences

### Ending A — Full Disclosure
```
You click "Submit Report."
The screen goes black for 2 seconds.

Tuesday. 9:00 AM. Board Room.

Sarah reads your report aloud. 
The room is silent.

David Reeves stares at the table.
Priya Sharma exhales.
Elena Vasquez doesn't blink.

"And the security failures," Sarah continues.
She looks up at you.
"Your assessment is that this was preventable."

You nod.

"It was."

[REPORT FILED: FULL DISCLOSURE]
Sometimes the hardest report to file 
is the one about yourself.
```

### Ending B — Cover-up
```
You click "Submit Report."

Tuesday. 9:00 AM. Board Room.

Sarah summarizes your findings.
"Systemic gaps. No single bad actor."

The board nods.
"Acceptable. Upgrade the security infrastructure."
"What about Project Lighthouse?"
"What about it?"

Meeting adjourns in 12 minutes.
Nothing changes.

[REPORT FILED: SYSTEMIC FOCUS]
The report was technically accurate.
It was also a lie of omission.
```

### Ending C — Whistleblower
```
You delete the incident report.

Then you open a new document.

SUBJECT: Project Lighthouse — Internal Disclosure
TO: [Board of Directors, Legal Counsel, Press]

You attach everything.
The surveillance contract.
The board discussion.
The 2.8 million monitored endpoints.

You hit send.

Your badge stops working at 11:47 AM.

[REPORT DELETED. TRUTH SENT.]
You wrote a different kind of report.
```

### Hidden Ending D — The Full Picture
```
You submit your report.
Then your email pings.

FROM: Sarah Park
SUBJECT: FW: Meridian — Revised Offer
 
"Alex, 

Disregard the investigation. Meridian came back 
at 2.4. The board accepted this morning.

The leak actually helped — they think they have 
leverage, so they came in low. We were going to 
take 2.8. They offered 2.4 thinking they're 
squeezing us.

We would have taken 2.0.

Thanks for your work this weekend. Consider the 
security audit handled — I'll tell HR.

- S"

The deal was never dead.
You were never really investigating.
You were buying time.

[THE DEAL CLOSES TUESDAY]
Everyone played their part. Including you.
```

---

## Internationalization (i18n)

### Architecture
```
src/
  data/
    en/                    ← English (international tech company)
      config.js            ← company names, app labels, password patterns
      emails.js
      slack.js
      employees.js
      logs.js              ← badge, print, vpn, cctv
      documents.js
      report.js            ← incident report text for all 5 phases
      endings.js
      opening.js           ← typewriter intro
    zh/                    ← Chinese (中国科技公司)
      config.js
      emails.js
      slack.js
      employees.js
      logs.js
      documents.js
      report.js
      endings.js
      opening.js
  config/
    locales.js             ← locale registry + language switcher config
  game/                    ← locale-independent
    state.js               ← useReducer (clue IDs are universal)
    clues.js               ← clue definitions (IDs + discovery mechanics)
    passwords.js           ← password validation (reads pattern from locale config)
    windows.js             ← window manager
```

### Locale Config Shape
```javascript
// en/config.js
export default {
  locale: 'en',
  company: 'NovaTech',
  acquirer: 'Meridian Group',
  project: 'Project Lighthouse',
  apps: {
    email: { label: 'Email', icon: 'outlook' },
    slack: { label: 'Slack', icon: 'slack' },
    docvault: { label: 'DocVault', icon: 'folder' },
    peoplehub: { label: 'PeopleHub', icon: 'people' },
    accesslog: { label: 'AccessLog', icon: 'badge' },
    printtrace: { label: 'PrintTrace', icon: 'printer' },
    netwatch: { label: 'NetWatch', icon: 'network' },
    calendar: { label: 'Calendar', icon: 'calendar' },
    cctv: { label: 'CCTV', icon: 'camera' },
    itdesk: { label: 'ITDesk', icon: 'ticket' },
    secfiles: { label: 'SecureFiles', icon: 'lock' },
    lighthouse: { label: '???', icon: 'terminal' },
  },
  characters: {
    player: { name: 'Alex Chen', title: 'Head of Information Security' },
    ceo: { name: 'Sarah Park', title: 'CEO' },
    cfo: { name: 'David Reeves', title: 'CFO' },
    cto: { name: 'Priya Sharma', title: 'CTO' },
    vpSales: { name: 'James Whitfield', title: 'VP Sales' },
    opsDir: { name: 'Elena Vasquez', title: 'Operations Director' },
    ea: { name: 'Ryan Kim', title: 'Executive Assistant' },
  },
  passwordPattern: '{PREFIX}-NovaTech-2026',
  passwordHint: 'Default format: system prefix + company name + year',
}

// zh/config.js
export default {
  locale: 'zh',
  company: '星辰科技',
  acquirer: '鼎盛集团',
  project: '灯塔计划',
  apps: {
    email: { label: '邮箱', icon: 'outlook' },
    slack: { label: '飞书', icon: 'feishu' },
    docvault: { label: '文档中心', icon: 'folder' },
    peoplehub: { label: '人事通', icon: 'people' },
    accesslog: { label: '门禁记录', icon: 'badge' },
    printtrace: { label: '打印记录', icon: 'printer' },
    netwatch: { label: '网安监控', icon: 'network' },
    calendar: { label: '日历', icon: 'calendar' },
    cctv: { label: '监控', icon: 'camera' },
    itdesk: { label: 'IT工单', icon: 'ticket' },
    secfiles: { label: '加密文件', icon: 'lock' },
    lighthouse: { label: '???', icon: 'terminal' },
  },
  characters: {
    player: { name: '陈明轩', title: '信息安全总监' },
    ceo: { name: '孙雪梅', title: 'CEO' },
    cfo: { name: '李大卫', title: 'CFO' },
    cto: { name: '林佳慧', title: 'CTO' },
    vpSales: { name: '张伟杰', title: '销售VP' },
    opsDir: { name: '赵敏', title: '运营总监' },
    ea: { name: '金瑞恩', title: 'CEO助理' },
  },
  passwordPattern: '{PREFIX}-StarChen-2026',
  passwordHint: '默认格式：系统前缀 + 公司英文名 + 年份',
}
```

### Clue IDs Are Universal
Clue IDs (`email-leaked-doc`, `slack-priya-ethics`, etc.) are the same in both locales. The game logic references IDs only. All display text comes from the locale data files.

### Language Switcher
- Toggle in the boot/login screen before game starts
- Also accessible from taskbar tray during gameplay
- Switching mid-game reloads all display text but preserves game state

### Cultural Detail Differences

| Element | English | 中文 |
|---------|---------|------|
| Company | NovaTech | 星辰科技 |
| Acquirer | Meridian Group | 鼎盛集团 |
| Chat tool | Slack | 飞书 |
| Email | Outlook-style | 企业邮箱 |
| Cafe wifi | "Great wifi cafe across the street" | "楼下瑞幸wifi不错" |
| CFO secret | Expensive divorce, hiding assets | 股票被套，高利贷还房贷 |
| EA grievance | Underpaid, passed over for promotion | 年终奖被砍，调岗申请被拒 |
| CTO vent | "Building surveillance tools" | "做的就是监控，说什么企业分析" |
| Password hint | "FirstName + dept code + year" | "系统前缀 + 公司英文名 + 年份" |
| Project name | Project Lighthouse | 灯塔计划 |

---

## Visual Theme

### Color Palette
```css
--bg: #0c1222          /* deep corporate navy */
--accent: #3b82f6      /* corporate blue */
--accent-bright: #60a5fa
--panel: #1a2744       /* panel background */
--text: #e2e8f0        /* light gray text */
--text-dim: #94a3b8    /* muted text */
--danger: #ef4444      /* red — suspects, warnings */
--warning: #f59e0b     /* amber — mirror clues */
--success: #22c55e     /* green — confirmed evidence */
--terminal: #00ff88    /* green terminal — Lighthouse only */
```

### Font Stack
- **UI/Headers:** Inter, system-ui (clean corporate)
- **Body:** Inter, system-ui
- **Code/Terminal:** JetBrains Mono, monospace (Lighthouse, logs)
- All pixel-art is in SVG, not font-dependent

### Effects
- Subtle scanline overlay (very faint — corporate monitor, not CRT)
- Screen flicker on major revelations
- Red pulse on suspect evidence
- Amber glow on mirror clues (your own failures)
- Green terminal aesthetic ONLY for Lighthouse hidden app
