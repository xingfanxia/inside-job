import { useState, useMemo } from 'react'
import { useGame } from '../game/state.jsx'
import { useScrollClue } from '../game/clues.js'

const CLUE_MAP = {
  'access-elena-latenight': 'log-badge-elena-saturday',
  'access-david-earlypattern': 'log-david-early-access',
}

function ClueRow({ record, children }) {
  const mappedId = CLUE_MAP[record.clueId]
  const ref = useScrollClue(mappedId || '__noop__')

  return (
    <tr
      ref={mappedId ? ref : undefined}
      className={`accesslog-row ${record.highlight ? 'accesslog-row-highlight' : ''}`}
    >
      {children}
    </tr>
  )
}

export default function AccessLogApp() {
  const { localeData, state } = useGame()
  const records = localeData.logs.badge.records
  const isZh = state.locale === 'zh'

  const employees = useMemo(() => {
    const names = [...new Set(records.map((r) => r.employee))]
    return names.sort()
  }, [records])

  const [filter, setFilter] = useState('all')

  const filtered = useMemo(() => {
    const list = filter === 'all'
      ? records
      : records.filter((r) => r.employee === filter)
    return [...list].sort((a, b) => {
      const dateComp = b.date.localeCompare(a.date)
      if (dateComp !== 0) return dateComp
      return (b.badgeIn || '').localeCompare(a.badgeIn || '')
    })
  }, [records, filter])

  return (
    <div className="accesslog-app">
      <div className="accesslog-header">
        <h2 className="accesslog-title">
          {isZh ? '门禁记录 — 最近7天' : 'Access Records — Last 7 Days'}
        </h2>
        <div className="accesslog-controls">
          <select
            className="accesslog-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">{isZh ? '全部员工' : 'All Employees'}</option>
            {employees.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="accesslog-table-wrap">
        <table className="accesslog-table">
          <thead>
            <tr>
              <th>{isZh ? '日期' : 'Date'}</th>
              <th>{isZh ? '员工' : 'Employee'}</th>
              <th>{isZh ? '刷卡进入' : 'Badge In'}</th>
              <th>{isZh ? '刷卡离开' : 'Badge Out'}</th>
              <th>{isZh ? '入口' : 'Door'}</th>
              <th>{isZh ? '备注' : 'Notes'}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <ClueRow key={record.id} record={record}>
                <td>{record.date}</td>
                <td>{record.employee}</td>
                <td>{record.badgeIn}</td>
                <td>{record.badgeOut}</td>
                <td>{record.door}</td>
                <td className="accesslog-note">{record.note || '—'}</td>
              </ClueRow>
            ))}
          </tbody>
        </table>
      </div>

      <div className="accesslog-footer">
        <span className="accesslog-count">
          {isZh
            ? `${filtered.length} 条记录`
            : `${filtered.length} records`}
        </span>
      </div>
    </div>
  )
}
