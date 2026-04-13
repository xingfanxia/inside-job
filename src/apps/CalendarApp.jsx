import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
// Direct dispatch used instead of useClue/useScrollClue since calendar
// clue IDs are app-specific and not registered in the shared CLUES map

const events = {
  en: [
    { date: '2026-04-10', title: 'Board Meeting — Q4 Review', color: 'accent', clueId: null, mirrorId: null },
    { date: '2026-04-11', title: 'James — Dentist 3:30 PM', color: 'gray', clueId: null, mirrorId: null },
    { date: '2026-04-13', title: 'CEO — Alex Chen — URGENT — 9:00 AM', color: 'danger', clueId: null, mirrorId: null },
    { date: '2026-02-15', title: 'Security Audit — RESCHEDULED', color: 'warning', clueId: null, mirrorId: 'mirror-audit-postponed', strikethrough: true },
    { date: '2026-03-01', title: 'Security Audit — RESCHEDULED', color: 'warning', clueId: null, mirrorId: 'mirror-audit-postponed', strikethrough: true },
    { date: '2026-03-15', title: 'Security Audit — RESCHEDULED', color: 'warning', clueId: null, mirrorId: 'mirror-audit-postponed', strikethrough: true },
    { date: '2026-03-30', title: 'Priya — 1:1 with Sarah — Project Lighthouse Ethics Review — CANCELLED by Sarah', color: 'danger', clueId: 'calendar-lighthouse-cancelled', mirrorId: null },
  ],
  zh: [
    { date: '2026-04-10', title: '董事会会议 — Q4战略评审', color: 'accent', clueId: null, mirrorId: null },
    { date: '2026-04-11', title: '张伟杰 — 看牙医 3:30 PM', color: 'gray', clueId: null, mirrorId: null },
    { date: '2026-04-13', title: 'CEO — 陈明轩 — 紧急 — 9:00 AM', color: 'danger', clueId: null, mirrorId: null },
    { date: '2026-02-15', title: '安全审计 — 已改期', color: 'warning', clueId: null, mirrorId: 'mirror-audit-postponed', strikethrough: true },
    { date: '2026-03-01', title: '安全审计 — 已改期', color: 'warning', clueId: null, mirrorId: 'mirror-audit-postponed', strikethrough: true },
    { date: '2026-03-15', title: '安全审计 — 已改期', color: 'warning', clueId: null, mirrorId: 'mirror-audit-postponed', strikethrough: true },
    { date: '2026-03-30', title: '林佳慧 — 与孙雪梅1:1 — 灯塔计划伦理评审 — 被孙雪梅取消', color: 'danger', clueId: 'calendar-lighthouse-cancelled', mirrorId: null },
  ],
}

const DAY_NAMES = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  zh: ['日', '一', '二', '三', '四', '五', '六'],
}

const MONTH_NAMES = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function MirrorEvent({ event }) {
  const ref = useRef(null)
  const { state, dispatch } = useGame()
  const alreadyFound = state.mirrorClues.includes(event.mirrorId)

  useEffect(() => {
    if (alreadyFound || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            dispatch({ type: 'ADD_MIRROR_CLUE', payload: event.mirrorId })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [alreadyFound, event.mirrorId, dispatch])

  return (
    <div
      ref={ref}
      className={`calendar-event calendar-event-${event.color} ${event.strikethrough ? 'calendar-event-strikethrough' : ''}`}
    >
      {event.title}
    </div>
  )
}

function ClueEvent({ event }) {
  const { state, dispatch } = useGame()
  const found = state.cluesFound.includes(event.clueId)

  const handleClick = useCallback(() => {
    if (!found) {
      dispatch({ type: 'ADD_CLUE', payload: event.clueId })
    }
  }, [found, event.clueId, dispatch])

  return (
    <div
      className={`calendar-event calendar-event-${event.color} calendar-event-clickable`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick() }}
    >
      {event.title}
    </div>
  )
}

function PlainEvent({ event }) {
  return (
    <div className={`calendar-event calendar-event-${event.color} ${event.strikethrough ? 'calendar-event-strikethrough' : ''}`}>
      {event.title}
    </div>
  )
}

function EventPill({ event }) {
  if (event.mirrorId) return <MirrorEvent event={event} />
  if (event.clueId) return <ClueEvent event={event} />
  return <PlainEvent event={event} />
}

export default function CalendarApp() {
  const { state } = useGame()
  const locale = state.locale === 'zh' ? 'zh' : 'en'

  // Default to April 2026
  const [viewYear, setViewYear] = useState(2026)
  const [viewMonth, setViewMonth] = useState(3) // 0-indexed, 3 = April

  const calendarEvents = events[locale] || events.en
  const dayNames = DAY_NAMES[locale] || DAY_NAMES.en
  const monthNames = MONTH_NAMES[locale] || MONTH_NAMES.en

  const eventsForMonth = useMemo(() => {
    const map = {}
    const monthStr = String(viewMonth + 1).padStart(2, '0')
    const prefix = `${viewYear}-${monthStr}`
    for (const evt of calendarEvents) {
      if (evt.date.startsWith(prefix)) {
        const day = parseInt(evt.date.split('-')[2], 10)
        if (!map[day]) map[day] = []
        map[day].push(evt)
      }
    }
    return map
  }, [calendarEvents, viewYear, viewMonth])

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth)

  const calendarCells = useMemo(() => {
    const cells = []
    // Empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
      cells.push({ day: null, key: `empty-${i}` })
    }
    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, key: `day-${d}` })
    }
    return cells
  }, [firstDay, daysInMonth])

  const goToPrevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }, [viewMonth, viewYear])

  const goToNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }, [viewMonth, viewYear])

  const todayDay = viewYear === 2026 && viewMonth === 3 ? 13 : null

  return (
    <div className="calendar-app">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={goToPrevMonth}>&lt;</button>
        <h2 className="calendar-title">
          {monthNames[viewMonth]} {viewYear}
        </h2>
        <button className="calendar-nav-btn" onClick={goToNextMonth}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {dayNames.map((name) => (
          <div key={name} className="calendar-dayname">{name}</div>
        ))}

        {calendarCells.map((cell) => (
          <div
            key={cell.key}
            className={`calendar-cell ${cell.day === null ? 'calendar-cell-empty' : ''} ${cell.day === todayDay ? 'calendar-cell-today' : ''}`}
          >
            {cell.day !== null && (
              <>
                <span className="calendar-day-number">{cell.day}</span>
                <div className="calendar-events">
                  {(eventsForMonth[cell.day] || []).map((evt, idx) => (
                    <EventPill key={idx} event={evt} />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
