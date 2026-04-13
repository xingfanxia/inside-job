/**
 * Pixel-art SVG icons for all apps.
 * Each icon is a 32x32 SVG using rect elements with crispEdges rendering.
 * Uses the corporate blue palette.
 */

const P = '#3b82f6' // primary blue
const B = '#60a5fa' // bright blue
const D = '#1e40af' // dark blue
const W = '#e2e8f0' // white/light
const G = '#94a3b8' // gray
const R = '#ef4444' // red/danger
const Y = '#f59e0b' // yellow/warning
const T = '#00ff88' // terminal green

function Pixel({ x, y, fill, size = 2 }) {
  return <rect x={x * size} y={y * size} width={size} height={size} fill={fill} />
}

function IconSvg({ children, size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  )
}

export function EmailIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Envelope body */}
      <rect x="4" y="8" width="24" height="16" fill={D} />
      <rect x="5" y="9" width="22" height="14" fill={P} />
      {/* Flap (V shape) */}
      <Pixel x={2} y={4} fill={B} />
      <Pixel x={3} y={4} fill={B} />
      <Pixel x={4} y={5} fill={B} />
      <Pixel x={5} y={5} fill={B} />
      <Pixel x={6} y={6} fill={B} />
      <Pixel x={7} y={6} fill={B} />
      <Pixel x={7} y={7} fill={B} />
      <Pixel x={8} y={7} fill={W} />
      <Pixel x={13} y={4} fill={B} />
      <Pixel x={12} y={4} fill={B} />
      <Pixel x={11} y={5} fill={B} />
      <Pixel x={10} y={5} fill={B} />
      <Pixel x={9} y={6} fill={B} />
      <Pixel x={8} y={6} fill={B} />
      {/* Lines inside */}
      <rect x="8" y="14" width="16" height="1" fill={W} opacity="0.4" />
      <rect x="8" y="17" width="12" height="1" fill={W} opacity="0.3" />
      {/* Red notification dot */}
      <rect x="24" y="6" width="4" height="4" rx="1" fill={R} />
    </IconSvg>
  )
}

export function SlackIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Chat bubble */}
      <rect x="4" y="4" width="24" height="18" fill={D} />
      <rect x="5" y="5" width="22" height="16" fill={P} />
      {/* Tail */}
      <Pixel x={3} y={11} fill={P} />
      <Pixel x={3} y={12} fill={P} />
      <Pixel x={2} y={12} fill={P} />
      {/* Chat lines */}
      <rect x="8" y="9" width="14" height="1" fill={W} opacity="0.6" />
      <rect x="8" y="12" width="10" height="1" fill={B} opacity="0.6" />
      <rect x="8" y="15" width="12" height="1" fill={W} opacity="0.4" />
      {/* Dot indicator */}
      <rect x="24" y="4" width="4" height="4" fill={T} />
    </IconSvg>
  )
}

export function FeishuIcon({ size = 32 }) {
  // Alias for slack in Chinese locale
  return <SlackIcon size={size} />
}

export function FolderIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Tab */}
      <rect x="4" y="6" width="10" height="4" fill={D} />
      {/* Body */}
      <rect x="4" y="10" width="24" height="16" fill={D} />
      <rect x="5" y="11" width="22" height="14" fill={P} />
      {/* Lock overlay */}
      <rect x="13" y="14" width="6" height="6" fill={Y} />
      <rect x="14" y="15" width="4" height="4" fill={D} />
      <rect x="15" y="11" width="2" height="4" fill={Y} />
    </IconSvg>
  )
}

export function PeopleIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Person 1 - head */}
      <rect x="8" y="4" width="6" height="6" fill={B} />
      {/* Person 1 - body */}
      <rect x="6" y="12" width="10" height="8" fill={P} />
      {/* Person 2 - head */}
      <rect x="18" y="6" width="6" height="6" fill={B} />
      {/* Person 2 - body */}
      <rect x="16" y="14" width="10" height="8" fill={D} />
      {/* Badge lines */}
      <rect x="8" y="22" width="16" height="1" fill={G} opacity="0.5" />
      <rect x="8" y="24" width="12" height="1" fill={G} opacity="0.3" />
    </IconSvg>
  )
}

export function BadgeIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Card body */}
      <rect x="6" y="4" width="20" height="24" fill={D} />
      <rect x="7" y="5" width="18" height="22" fill={P} />
      {/* Photo area */}
      <rect x="10" y="7" width="8" height="8" fill={B} />
      {/* Text lines */}
      <rect x="9" y="17" width="14" height="1" fill={W} opacity="0.6" />
      <rect x="9" y="20" width="10" height="1" fill={W} opacity="0.4" />
      {/* Stripe */}
      <rect x="7" y="23" width="18" height="2" fill={Y} />
      {/* Clip hole */}
      <rect x="14" y="2" width="4" height="4" fill={G} />
    </IconSvg>
  )
}

export function PrinterIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Paper top */}
      <rect x="9" y="2" width="14" height="6" fill={W} />
      {/* Printer body */}
      <rect x="4" y="8" width="24" height="12" fill={D} />
      <rect x="5" y="9" width="22" height="10" fill={P} />
      {/* Paper output */}
      <rect x="9" y="20" width="14" height="8" fill={W} />
      {/* Print lines */}
      <rect x="11" y="22" width="10" height="1" fill={G} opacity="0.5" />
      <rect x="11" y="24" width="8" height="1" fill={G} opacity="0.3" />
      <rect x="11" y="26" width="6" height="1" fill={G} opacity="0.3" />
      {/* Status light */}
      <rect x="22" y="11" width="3" height="2" fill={T} />
    </IconSvg>
  )
}

export function NetworkIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Central node */}
      <rect x="13" y="13" width="6" height="6" fill={B} />
      {/* Top node */}
      <rect x="14" y="2" width="4" height="4" fill={P} />
      <rect x="15" y="6" width="2" height="7" fill={G} />
      {/* Bottom node */}
      <rect x="14" y="26" width="4" height="4" fill={P} />
      <rect x="15" y="19" width="2" height="7" fill={G} />
      {/* Left node */}
      <rect x="2" y="14" width="4" height="4" fill={P} />
      <rect x="6" y="15" width="7" height="2" fill={G} />
      {/* Right node */}
      <rect x="26" y="14" width="4" height="4" fill={P} />
      <rect x="19" y="15" width="7" height="2" fill={G} />
      {/* Alert */}
      <rect x="22" y="4" width="6" height="4" fill={R} />
      <rect x="24" y="5" width="2" height="1" fill={W} />
      <rect x="24" y="7" width="2" height="1" fill={W} />
    </IconSvg>
  )
}

export function CalendarIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Body */}
      <rect x="4" y="6" width="24" height="22" fill={D} />
      <rect x="5" y="10" width="22" height="17" fill={P} />
      {/* Header */}
      <rect x="4" y="6" width="24" height="4" fill={R} />
      {/* Rings */}
      <rect x="9" y="4" width="2" height="4" fill={G} />
      <rect x="21" y="4" width="2" height="4" fill={G} />
      {/* Grid lines */}
      <rect x="5" y="14" width="22" height="1" fill={D} opacity="0.3" />
      <rect x="5" y="19" width="22" height="1" fill={D} opacity="0.3" />
      <rect x="5" y="24" width="22" height="1" fill={D} opacity="0.3" />
      <rect x="12" y="10" width="1" height="17" fill={D} opacity="0.3" />
      <rect x="19" y="10" width="1" height="17" fill={D} opacity="0.3" />
      {/* Highlight day */}
      <rect x="13" y="15" width="5" height="3" fill={B} />
    </IconSvg>
  )
}

export function CameraIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Body */}
      <rect x="4" y="8" width="24" height="18" fill={D} />
      <rect x="5" y="9" width="22" height="16" fill={P} />
      {/* Lens */}
      <rect x="11" y="11" width="10" height="10" fill={D} />
      <rect x="13" y="13" width="6" height="6" fill={B} />
      <rect x="14" y="14" width="2" height="2" fill={W} />
      {/* Flash */}
      <rect x="10" y="4" width="8" height="4" fill={G} />
      {/* REC indicator */}
      <rect x="22" y="10" width="3" height="2" fill={R} />
    </IconSvg>
  )
}

export function TicketIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Ticket body */}
      <rect x="4" y="6" width="24" height="20" fill={D} />
      <rect x="5" y="7" width="22" height="18" fill={P} />
      {/* Perforated line */}
      <rect x="4" y="14" width="2" height="2" fill="#0c1222" />
      <rect x="8" y="14" width="2" height="2" fill="#0c1222" />
      <rect x="12" y="14" width="2" height="2" fill="#0c1222" />
      <rect x="16" y="14" width="2" height="2" fill="#0c1222" />
      <rect x="20" y="14" width="2" height="2" fill="#0c1222" />
      <rect x="24" y="14" width="2" height="2" fill="#0c1222" />
      {/* Text lines */}
      <rect x="8" y="9" width="12" height="1" fill={W} opacity="0.6" />
      <rect x="8" y="11" width="8" height="1" fill={W} opacity="0.3" />
      {/* Number */}
      <rect x="8" y="18" width="6" height="2" fill={Y} />
      <rect x="8" y="22" width="10" height="1" fill={W} opacity="0.3" />
    </IconSvg>
  )
}

export function LockIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Shackle */}
      <rect x="10" y="4" width="12" height="10" fill={Y} />
      <rect x="12" y="6" width="8" height="6" fill="#0c1222" />
      {/* Lock body */}
      <rect x="8" y="14" width="16" height="14" fill={D} />
      <rect x="9" y="15" width="14" height="12" fill={Y} />
      {/* Keyhole */}
      <rect x="14" y="19" width="4" height="4" fill={D} />
      <rect x="15" y="23" width="2" height="3" fill={D} />
    </IconSvg>
  )
}

export function TerminalIcon({ size = 32 }) {
  return (
    <IconSvg size={size}>
      {/* Window */}
      <rect x="2" y="4" width="28" height="24" fill={D} />
      <rect x="3" y="8" width="26" height="19" fill="#0c1222" />
      {/* Title bar dots */}
      <rect x="4" y="5" width="2" height="2" fill={R} />
      <rect x="8" y="5" width="2" height="2" fill={Y} />
      <rect x="12" y="5" width="2" height="2" fill={T} />
      {/* Prompt */}
      <rect x="5" y="10" width="2" height="2" fill={T} />
      <rect x="9" y="10" width="10" height="2" fill={T} opacity="0.7" />
      {/* Output lines */}
      <rect x="5" y="14" width="16" height="1" fill={T} opacity="0.4" />
      <rect x="5" y="17" width="12" height="1" fill={T} opacity="0.3" />
      <rect x="5" y="20" width="14" height="1" fill={T} opacity="0.3" />
      {/* Blinking cursor */}
      <rect x="5" y="23" width="2" height="2" fill={T} />
    </IconSvg>
  )
}

// Icon registry — maps icon name from config to component
const iconMap = {
  email: EmailIcon,
  slack: SlackIcon,
  feishu: FeishuIcon,
  folder: FolderIcon,
  people: PeopleIcon,
  badge: BadgeIcon,
  printer: PrinterIcon,
  network: NetworkIcon,
  calendar: CalendarIcon,
  camera: CameraIcon,
  ticket: TicketIcon,
  lock: LockIcon,
  terminal: TerminalIcon,
}

export function getIcon(name) {
  return iconMap[name] || FolderIcon
}
