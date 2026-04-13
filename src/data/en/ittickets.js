export default [
  {
    id: 'ticket-4401',
    number: '#4401',
    type: 'Service Request',
    priority: 'Medium',
    requester: 'Ryan Kim',
    requesterTitle: 'Executive Assistant',
    subject: 'USB Drive Write Access — Board Meeting Prep',
    status: 'Resolved',
    assignedTo: 'Chris Wong',
    createdDate: '2026-04-08 09:22',
    resolvedDate: '2026-04-08 10:45',
    description: `Requesting temporary USB drive write access for my workstation (WS-1204).

CEO has asked me to prepare physical copies of the Q4 board meeting materials for Thursday's session. Need to:
1. Print 6 copies of the board minutes
2. Save a digital backup to USB drive per CEO's standing instructions

This is standard board meeting prep — same process as Q2 and Q3.

Please enable USB write for today and tomorrow only.`,
    resolution: `USB write access enabled for WS-1204 per standard board prep protocol.

Verified: requester confirmed this is per CEO directive (email from Sarah Park on file).
Infosec sign-off obtained from Alex Chen (email approval 2026-04-08 17:12).

Access window: April 8-10, auto-revokes April 11 00:00.
Logged in device access register.`,
    clueId: null,
    mirrorId: null,
  },
  {
    id: 'ticket-4387',
    number: '#4387',
    type: 'Access Request',
    priority: 'Medium',
    requester: 'Elena Vasquez',
    requesterTitle: 'Operations Director',
    subject: 'NetWatch Admin Access — Internal Process Review',
    status: 'Resolved',
    assignedTo: 'Chris Wong',
    createdDate: '2026-03-28 14:05',
    resolvedDate: '2026-03-30 15:30',
    description: `I'm conducting an internal operations process review and need admin-level access to NetWatch.

Specifically, I need visibility into:
- VPN connection logs (past 90 days)
- Network access patterns by department
- Remote work infrastructure utilization metrics

This is for an efficiency assessment of our remote work policies. I'll be generating a report for Sarah with recommendations.

My current access level is read-only. Need admin for export capabilities and full historical data.

Note: I've emailed Alex Chen directly for InfoSec sign-off (see separate email thread).`,
    resolution: `NetWatch admin access provisioned for elena.vasquez@novatech.io.

InfoSec approval received from Alex Chen (email 2026-03-30 14:45).
Access level: Admin (read + export)
Duration: 30 days (expires 2026-04-29)
Default credentials issued per standard protocol.

Reminder sent to requester: please review NetWatch acceptable use policy before accessing sensitive log data.`,
    clueId: 'it-elena-netwatch-request',
    mirrorId: null,
  },
  {
    id: 'ticket-4392',
    number: '#4392',
    type: 'Incident',
    priority: 'Low',
    requester: 'David Reeves',
    requesterTitle: 'CFO',
    subject: 'VPN Password Reset — Locked Out',
    status: 'Resolved',
    assignedTo: 'Chris Wong',
    createdDate: '2026-04-02 06:18',
    resolvedDate: '2026-04-02 08:30',
    description: `Got locked out of VPN this morning. Must have mistyped my password too many times.

Need a reset ASAP — I'm working remotely today and need access to the financial systems.

Thanks.`,
    resolution: `VPN credentials reset for david.reeves@novatech.io.
New temp password sent to registered mobile device.

NOTE TO USER: Our logs show 3 recent VPN connections from public/unrecognized networks (café Wi-Fi, hotel lobby). As a reminder, NovaTech security policy (Section 3.2) recommends against accessing confidential systems from public networks. Please use mobile hotspot or wait until you're on a trusted network.

If you need to work from public locations frequently, please contact InfoSec about provisioning a dedicated mobile hotspot device.

This is an advisory — no action required at this time.`,
    clueId: 'it-david-vpn-warning',
    mirrorId: null,
  },
  {
    id: 'ticket-4356',
    number: '#4356',
    type: 'Change Request',
    priority: 'Low',
    requester: 'Alex Chen',
    requesterTitle: 'Head of Information Security',
    subject: 'Security Audit Postponement — Reschedule to January',
    status: 'Resolved',
    assignedTo: 'Rachel Moore',
    createdDate: '2025-12-18 16:40',
    resolvedDate: '2025-12-19 09:15',
    description: `Requesting formal postponement of the annual security infrastructure audit originally scheduled for January 15, 2026.

Reason: Q4 priorities require my team's full attention through year-end. The Meridian due diligence prep is consuming most of our bandwidth.

Proposed new date: Week of January 27, 2026.

I'll submit the formal postponement justification to HR separately.`,
    resolution: `Postponement logged per InfoSec manager authority.

Audit rescheduled: January 15 → January 27, 2026.
HR notified. Calendar updated.

NOTE: This is the third postponement of this audit cycle.
Previous reschedules:
  - Original: September 2025 → November 2025
  - Second: November 2025 → January 15, 2026
  - Current: January 15 → January 27, 2026

Per compliance policy (Section 4.2.1), if audit is not completed within 30 days of the latest scheduled date, automatic escalation to CEO's office will be triggered.

Compliance team has been notified of the pattern.`,
    clueId: null,
    mirrorId: 'mirror-audit-postponement',
  },
  {
    id: 'ticket-4410',
    number: '#4410',
    type: 'Security Alert',
    priority: 'High',
    requester: 'System (Automated)',
    requesterTitle: 'NovaTech Security Monitoring',
    subject: 'ANOMALY: External IP Access to DocVault — Credential Pattern',
    status: 'Open',
    assignedTo: 'Alex Chen',
    createdDate: '2026-04-09 14:45',
    resolvedDate: null,
    description: `AUTOMATED SECURITY ALERT

An external IP address (203.45.67.89) accessed the DocVault system and retrieved the following document:

  Document: Patent Portfolio Gap Analysis
  Access time: 2026-04-09 14:22
  Access method: Direct URL with valid session token
  IP geolocation: Consulting firm, 415 Madison Ave, New York
  Associated entity: Whitmore & Associates (known Meridian Group vendor)

Access pattern analysis:
- Single document accessed (targeted, not exploratory)
- Valid session token used — suggests credential theft or sharing
- No brute-force indicators
- Session token traces to a BYOD-exempted device

RECOMMENDED ACTION:
1. Immediately revoke the compromised session token
2. Audit all BYOD-exempted device credentials
3. Contact the employee associated with the session token
4. Escalate to incident response if credential theft is confirmed

This alert requires manual triage by the assigned InfoSec officer.

CURRENT STATUS: OPEN — No action taken.
ASSIGNED TO: Alex Chen, Head of Information Security
LAST UPDATED: 2026-04-09 14:45 (auto-generated)`,
    resolution: null,
    clueId: null,
    mirrorId: 'mirror-anomaly-unresolved',
  },
  {
    id: 'ticket-4389',
    number: '#4389',
    type: 'Service Request',
    priority: 'Low',
    requester: 'Elena Vasquez',
    requesterTitle: 'Operations Director',
    subject: 'PrintTrace Admin View — Department Usage Audit',
    status: 'Resolved',
    assignedTo: 'Chris Wong',
    createdDate: '2026-03-28 14:30',
    resolvedDate: '2026-03-29 11:00',
    description: `Also need admin-level access to PrintTrace for the same internal ops review (see ticket #4387 for context).

Need to audit print queue usage across all departments for the past 6 months. Looking at:
- Print volume by department
- Color vs. B&W ratios
- Cost allocation accuracy

This is for a cost optimization report. Current read-only access doesn't include historical export.`,
    resolution: `PrintTrace admin access provisioned for elena.vasquez@novatech.io.

Access level: Admin (read + export + historical)
Duration: 30 days (expires 2026-04-28)
No InfoSec sign-off required for PrintTrace (standard ops tool).

Default credentials issued per standard protocol.`,
    clueId: null,
    mirrorId: null,
  },
]
