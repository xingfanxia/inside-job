import { useState, useMemo } from 'react'
import { useGame } from '../game/state.jsx'
import { useScrollClue } from '../game/clues.js'

function ClueRow({ record, children }) {
  const ref = useScrollClue(record.clueId || '__noop__')

  return (
    <tr
      ref={record.clueId ? ref : undefined}
      className={`printtrace-row ${record.highlight ? 'printtrace-row-highlight' : ''}`}
    >
      {children}
    </tr>
  )
}

function AnnotationClue({ annotation }) {
  const ref = useScrollClue(annotation.clueId || '__noop__')

  return (
    <div
      ref={annotation.clueId ? ref : undefined}
      className={`printtrace-annotation ${annotation.highlight ? 'printtrace-annotation-critical' : ''}`}
    >
      <div className="printtrace-annotation-header">
        <span className="printtrace-annotation-source">{annotation.generatedBy}</span>
        <span className="printtrace-annotation-date">{annotation.date}</span>
      </div>
      <p className="printtrace-annotation-text">{annotation.note}</p>
    </div>
  )
}

export default function PrintTraceApp() {
  const { localeData, state } = useGame()
  const records = localeData.logs.print.records
  const annotations = localeData.logs.print.systemAnnotations || []
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
      return (b.time || '').localeCompare(a.time || '')
    })
  }, [records, filter])

  return (
    <div className="printtrace-app">
      <div className="printtrace-header">
        <h2 className="printtrace-title">
          {isZh ? '打印队列日志' : 'Print Queue Log'}
        </h2>
        <div className="printtrace-controls">
          <select
            className="printtrace-filter"
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

      <div className="printtrace-table-wrap">
        <table className="printtrace-table">
          <thead>
            <tr>
              <th>{isZh ? '日期' : 'Date'}</th>
              <th>{isZh ? '时间' : 'Time'}</th>
              <th>{isZh ? '员工' : 'Employee'}</th>
              <th>{isZh ? '文档' : 'Document'}</th>
              <th>{isZh ? '页数' : 'Pages'}</th>
              <th>{isZh ? '份数' : 'Copies'}</th>
              <th>{isZh ? '打印机' : 'Printer'}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((record) => (
              <ClueRow key={record.id} record={record}>
                <td>{record.date}</td>
                <td>{record.time}</td>
                <td>{record.employee}</td>
                <td>
                  {record.document}
                  {record.note && (
                    <div className="printtrace-row-note">{record.note}</div>
                  )}
                </td>
                <td>{record.pages}</td>
                <td>{record.copies}</td>
                <td>{record.printer}</td>
              </ClueRow>
            ))}
          </tbody>
        </table>
      </div>

      {annotations.length > 0 && (
        <div className="printtrace-annotations">
          <h3 className="printtrace-annotations-title">
            {isZh ? '系统注释' : 'System Annotations'}
          </h3>
          {annotations.map((ann) => (
            <AnnotationClue key={ann.id} annotation={ann} />
          ))}
        </div>
      )}
    </div>
  )
}
