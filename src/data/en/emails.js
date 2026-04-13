export default {
  inbox: [
    {
      id: 'email-1',
      from: { name: 'Sarah Park', email: 'sarah.park@novatech.io', title: 'CEO' },
      to: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      subject: 'FW: Meridian Due Diligence — READ NOW',
      date: '2026-04-13 08:42',
      body: `Alex,

Drop everything. Look at the attachment.

This is the document Meridian had during Friday's negotiation session. Word for word — our board minutes from last Thursday. OUR formatting, OUR headers, OUR confidential watermark stripped out.

THIS IS WHAT THEY HAD.

I need to know who did this. You have until tomorrow's board meeting at 9 AM. Full systems access authorized. Do not loop in anyone else.

— Sarah

---------- Forwarded message ----------
From: Marcus Webb <m.webb@meridiangroup.com>
Date: Fri, Apr 10, 2026 at 6:18 PM
Subject: Re: Acquisition Terms — Final Round

Sarah,

We've had a chance to review additional materials that came to our attention this week. Given what we now understand about NovaTech's current IP position and board-level pricing discussions, we believe the terms need to be revisited substantially.

Attached: NovaTech_Board_Minutes_Q4_Review.pdf

We look forward to a productive conversation.

Best,
Marcus Webb
SVP Corporate Development
Meridian Group`,
      attachments: [
        { name: 'NovaTech_Board_Minutes_Q4_Review.pdf', size: '2.4 MB' }
      ],
      isRead: false,
      clueId: 'email-leaked-doc',
      clueType: 'auto',
    },
    {
      id: 'email-2',
      from: { name: 'IT Department', email: 'it-noreply@novatech.io', title: 'IT Support' },
      to: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      subject: 'ACTION REQUIRED: Quarterly Password Rotation',
      date: '2026-04-12 09:15',
      body: `Hi Alex,

This is your quarterly password rotation reminder. Our records show your credentials for the following internal systems haven't been updated in 90+ days:

  - DocVault
  - PeopleHub
  - PrintTrace
  - NetWatch
  - CCTV Portal

Please update your passwords at your earliest convenience.

REMINDER: All internal portal passwords follow the company standard format:

    [SYSTEM PREFIX] - [CompanyName] - [Year]

For example, your IT portal password uses the format IT-NovaTech-2026. Please follow this convention for all system passwords to maintain consistency across our security infrastructure.

If you've forgotten your system prefix, refer to the portal login page — the prefix matches the system abbreviation shown in the header bar.

Thank you,
NovaTech IT Support
Ticket auto-ref: #SYS-PWD-4415`,
      attachments: [],
      isRead: true,
      clueId: null,
      clueType: null,
    },
    {
      id: 'email-3',
      from: { name: 'David Reeves', email: 'david.reeves@novatech.io', title: 'CFO' },
      to: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      cc: [
        { name: 'Sarah Park', email: 'sarah.park@novatech.io' },
        { name: 'Priya Sharma', email: 'priya.sharma@novatech.io' },
        { name: 'James Whitfield', email: 'james.whitfield@novatech.io' },
      ],
      subject: 'Q4 Financial Model — CONFIDENTIAL',
      date: '2026-04-08 14:22',
      body: `Team,

Attached is the updated Q4 financial model incorporating the revised revenue projections and Meridian deal scenarios. This document is classified CONFIDENTIAL — do not forward, print, or discuss outside this distribution list.

Key changes from v2:
- Adjusted ARR forecast based on Q3 actuals
- Added Meridian acquisition scenarios at $2.8B, $3.1B, and $3.5B valuations
- Updated burn rate assumptions for post-acquisition integration

Please review before Thursday's board meeting and flag any concerns directly to me.

David Reeves
Chief Financial Officer
NovaTech, Inc.

CONFIDENTIALITY NOTICE: This email and any attachments are for the exclusive use of the intended recipient(s). If you have received this in error, please delete immediately.`,
      attachments: [
        { name: 'NovaTech_Q4_Financial_Model_v3_CONFIDENTIAL.xlsx', size: '4.7 MB' }
      ],
      isRead: true,
      clueId: 'email-financial-distribution',
      clueType: 'click',
    },
    {
      id: 'email-4',
      from: { name: 'Priya Sharma', email: 'priya.sharma@novatech.io', title: 'CTO' },
      to: { name: 'Sarah Park', email: 'sarah.park@novatech.io' },
      cc: [
        { name: 'Legal Team', email: 'legal@novatech.io' },
      ],
      subject: 'Patent Portfolio Gap Analysis — INTERNAL ONLY',
      date: '2026-04-07 11:03',
      body: `Sarah,

Following up on our conversation last week. I've completed the patent gap analysis for the core AI/ML portfolio. Copying legal only per your request.

Summary of findings:
- 3 of our 7 filed patents have significant prior art overlap (see pages 12-18)
- The behavioral analytics engine (our primary differentiator) relies on 2 algorithms that are technically derivative of published academic work
- Our "novel" clustering approach has been independently developed by at least 2 competitors
- Filing gap: we have NO patent coverage on the real-time inference pipeline, which is arguably our most defensible technology

This is material to the Meridian valuation. If their technical due diligence team identifies these gaps, it could reduce the IP component of the deal by $200-400M.

I've flagged this before (see my Q3 board memo) but want to make sure it's documented ahead of Thursday.

Priya Sharma
Chief Technology Officer
NovaTech, Inc.

CC'd to Alex Chen for InfoSec awareness — this analysis should be restricted-access in DocVault.`,
      attachments: [
        { name: 'Patent_Gap_Analysis_2026Q1.pdf', size: '1.8 MB' }
      ],
      isRead: true,
      clueId: 'email-patent-access',
      clueType: 'click',
    },
    {
      id: 'email-5',
      from: { name: 'HR Department', email: 'hr@novatech.io', title: 'Human Resources' },
      to: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      subject: 'Annual Security Audit — OVERDUE (3rd Reminder)',
      date: '2026-03-02 10:45',
      body: `Hi Alex,

This is our THIRD reminder regarding the annual security infrastructure audit, originally scheduled for January 15, 2026.

Current status: OVERDUE (46 days past deadline)

Previous reminders sent:
  - January 20, 2026 (1st reminder)
  - February 10, 2026 (2nd reminder)

Per NovaTech compliance policy (Section 4.2.1), the Head of Information Security is required to complete or delegate the annual audit within 30 days of the scheduled date. We are now well past that window.

Items pending your review:
  ☐ Physical access control assessment
  ☐ Network perimeter vulnerability scan
  ☐ Employee credential rotation compliance
  ☐ BYOD policy effectiveness review
  ☐ VPN access log audit
  ☐ Third-party vendor security assessment

Please schedule this audit IMMEDIATELY or provide a formal postponement request with justification.

This matter will be escalated to the CEO's office if not addressed by March 15.

Best regards,
NovaTech Human Resources
Compliance & Risk Management`,
      attachments: [],
      isRead: true,
      clueId: null,
      clueType: null,
      mirrorId: 'mirror-audit-overdue',
    },
    {
      id: 'email-6',
      from: { name: 'James Whitfield', email: 'james.whitfield@novatech.io', title: 'VP Sales' },
      to: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      subject: 'RE: Meridian Pricing Strategy — keep this tight',
      date: '2026-04-09 16:55',
      body: `Alex,

Hey — heads up, I put together the pricing deck for the Meridian conversations. Sarah wants infosec to sign off on the distribution list before I send it wider. Can you confirm the attached is marked appropriately?

Between us: the numbers in there are the real ones. Floor is 2.8, target is 3.1, stretch is 3.5. Sarah doesn't want these floating around. I've only shared with the deal team (Sarah, David, Priya, you, me) and it should stay that way.

Also — don't put this in DocVault. Sarah specifically said to keep it in email only for now. Less of a paper trail.

Cheers,
James

P.S. Drinks Thursday after the board meeting? Could use one after this week lol`,
      attachments: [
        { name: 'Meridian_Pricing_Strategy_DRAFT.pptx', size: '3.2 MB' }
      ],
      isRead: true,
      clueId: 'email-pricing-access',
      clueType: 'click',
    },
    {
      id: 'email-7',
      from: { name: 'Elena Vasquez', email: 'elena.vasquez@novatech.io', title: 'Operations Director' },
      to: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      subject: 'System Access Review Request',
      date: '2026-03-30 09:18',
      body: `Hi Alex,

I'm conducting an internal operations process review and need temporary elevated access to a few systems:

1. NetWatch — I need admin-level visibility into VPN connection logs and network access patterns for the past 90 days. This is to assess our remote work infrastructure efficiency.

2. AccessLog — Full export capability for badge records (already have read access, need export permissions).

3. PrintTrace — Admin view to audit print queue usage across departments for cost optimization.

I've submitted IT tickets for #1 and #3 (see tickets #4387 and #4389). IT said they need your sign-off as Head of Security for NetWatch admin access specifically.

Can you approve? Happy to discuss the scope of the review if you have questions.

Thanks,
Elena Vasquez
Director of Operations
NovaTech, Inc.`,
      attachments: [],
      isRead: true,
      clueId: 'email-elena-access-request',
      clueType: 'click',
    },
    {
      id: 'email-8',
      from: { name: 'IT Department', email: 'it-noreply@novatech.io', title: 'IT Support' },
      to: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      subject: 'VPN Exception Approved — Personal Device Access',
      date: '2026-03-15 11:30',
      body: `VPN EXCEPTION REQUEST — APPROVED

Request ID: VPN-EX-2026-0047
Submitted by: IT Security Administration
Approved by: Alex Chen, Head of Information Security

Exception Details:
  Type: Personal device VPN access (BYOD)
  Scope: 12 employee devices added to allow-list
  Duration: Permanent (until next policy review)
  Justification: "Employee productivity — remote work flexibility"

Affected Users:
  - David Reeves (iPad Pro, personal)
  - Priya Sharma (MacBook Air, personal)
  - James Whitfield (iPhone 15, personal)
  - Elena Vasquez (ThinkPad X1, personal)
  - Ryan Kim (Galaxy S24, personal)
  - ... and 7 additional employees

NOTE: This exception bypasses the standard device enrollment and MDM requirements per Section 3.4 of the NovaTech Security Policy. The approving officer (Alex Chen) has accepted liability for any security incidents arising from unmanaged device access.

This is an automated notification. No action required.

NovaTech IT Security`,
      attachments: [],
      isRead: true,
      clueId: null,
      clueType: null,
      mirrorId: 'mirror-vpn-exception',
    },
  ],
  drafts: [
    {
      id: 'draft-1',
      to: { name: 'HR Department', email: 'hr@novatech.io' },
      subject: 'RE: Annual Security Audit — OVERDUE (3rd Reminder)',
      date: '2026-03-02 16:33',
      body: `Hi,

Thanks for the reminder. I understand this is overdue and I take full responsibility for the delay. I'll schedule the audit for the week of March 17th and will personally oversee the following items:

- Physical access control assessment
- Network perimeter scan
- Credential rotation compliance check

Regarding the BYOD policy review, I think we should also look at`,
      clueId: null,
      mirrorId: 'mirror-audit-overdue',
    },
  ],
  sent: [
    {
      id: 'sent-1',
      from: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      to: { name: 'Ryan Kim', email: 'ryan.kim@novatech.io' },
      subject: 'RE: Board Meeting Prep — Print Request',
      date: '2026-04-08 17:12',
      body: `Ryan,

Approved. You're cleared to print 6 copies of the board minutes and prepare the USB backup per Sarah's instructions. I've notified IT to grant temporary USB write access to your workstation.

Please make sure all physical copies are accounted for after the meeting and returned to Sarah's office.

Thanks,
Alex Chen
Head of Information Security
NovaTech, Inc.`,
      attachments: [],
      clueId: null,
    },
    {
      id: 'sent-2',
      from: { name: 'Alex Chen', email: 'alex.chen@novatech.io' },
      to: { name: 'Elena Vasquez', email: 'elena.vasquez@novatech.io' },
      subject: 'RE: System Access Review Request',
      date: '2026-03-30 14:45',
      body: `Elena,

Approved for NetWatch admin access. I've notified IT to provision your account. Access will be granted for 30 days — let me know if you need an extension.

For AccessLog exports, you should already have the permissions. Try again and let me know if there's still an issue.

Best,
Alex`,
      attachments: [],
      clueId: null,
    },
  ],
}
