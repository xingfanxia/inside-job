import { useState, useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import { useClue } from '../game/clues.js'

const FLAG_COLORS = {
  AUDIT_OVERDUE: 'var(--danger)',
  PERSONAL_LEGAL_MATTER: 'var(--warning)',
  ETHICS_FLAG_ON_FILE: 'var(--warning)',
  PRIOR_EMPLOYER_COMPETITOR: 'var(--danger)',
  COMP_BELOW_BAND: 'var(--warning)',
  TRANSFER_REQUEST_PENDING: 'var(--accent)',
}

function ProfileClueRecorder({ clueId }) {
  const { discover } = useClue(clueId)

  useEffect(() => {
    discover()
  }, [discover])

  return null
}

function FlagBadge({ flag }) {
  const color = FLAG_COLORS[flag] || 'var(--text-dim)'

  return (
    <span
      className="peoplehub-flag"
      style={{ color, borderColor: color }}
    >
      {flag.replace(/_/g, ' ')}
    </span>
  )
}

function EmployeeListItem({ employee, isSelected, onSelect, isSuspect }) {
  const initial = employee.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  const isMirror = !!employee.mirrorId

  return (
    <div
      className={`peoplehub-list-item ${isSelected ? 'peoplehub-list-item-selected' : ''}`}
      style={isMirror ? { borderLeft: '3px solid var(--warning)' } : undefined}
      onClick={onSelect}
    >
      <div className="peoplehub-list-avatar">{initial}</div>
      <div className="peoplehub-list-info">
        <div className="peoplehub-list-name">
          {employee.name}
          {isSuspect && <span className="peoplehub-suspect-dot" />}
        </div>
        <div className="peoplehub-list-title">{employee.title}</div>
        <div className="peoplehub-list-dept">{employee.department}</div>
      </div>
    </div>
  )
}

function EmployeeDetail({ employee }) {
  if (!employee) {
    return (
      <div className="peoplehub-detail-empty">
        <span>Select an employee to view profile</span>
      </div>
    )
  }

  const isMirror = !!employee.mirrorId
  const initial = employee.name
    .split(' ')
    .map((n) => n[0])
    .join('')

  return (
    <div
      className={`peoplehub-detail ${isMirror ? 'peoplehub-detail-mirror' : ''}`}
    >
      <div className="peoplehub-detail-header">
        <div className="peoplehub-detail-avatar">{initial}</div>
        <div>
          <h2 className="peoplehub-detail-name">{employee.name}</h2>
          <div className="peoplehub-detail-title">{employee.title}</div>
          <div className="peoplehub-detail-dept">{employee.department}</div>
        </div>
      </div>

      <div className="peoplehub-detail-grid">
        <div className="peoplehub-field">
          <span className="peoplehub-field-label">Email</span>
          <span className="peoplehub-field-value">{employee.email}</span>
        </div>
        <div className="peoplehub-field">
          <span className="peoplehub-field-label">Phone</span>
          <span className="peoplehub-field-value">{employee.phone}</span>
        </div>
        <div className="peoplehub-field">
          <span className="peoplehub-field-label">Hire Date</span>
          <span className="peoplehub-field-value">{employee.hireDate}</span>
        </div>
        {employee.salary && (
          <div className="peoplehub-field">
            <span className="peoplehub-field-label">Salary</span>
            <span className="peoplehub-field-value">{employee.salary}</span>
          </div>
        )}
      </div>

      {employee.emergencyContact && (
        <div className="peoplehub-section">
          <h3 className="peoplehub-section-title">Emergency Contact</h3>
          <div className="peoplehub-emergency">
            <span>{employee.emergencyContact.name}</span>
            <span className="peoplehub-emergency-relation">
              ({employee.emergencyContact.relation})
            </span>
            <span>{employee.emergencyContact.phone}</span>
          </div>
        </div>
      )}

      {employee.performanceNotes && (
        <div className="peoplehub-section">
          <h3 className="peoplehub-section-title">Performance Notes</h3>
          <div className="peoplehub-notes">{employee.performanceNotes}</div>
        </div>
      )}

      {employee.flags && employee.flags.length > 0 && (
        <div className="peoplehub-section">
          <h3 className="peoplehub-section-title">Flags</h3>
          <div className="peoplehub-flags">
            {employee.flags.map((flag) => (
              <FlagBadge key={flag} flag={flag} />
            ))}
          </div>
        </div>
      )}

      {employee.clueId && <ProfileClueRecorder clueId={employee.clueId} />}
    </div>
  )
}

export default function PeopleHubApp() {
  const { localeData } = useGame()
  const employees = localeData.employees

  const [selectedId, setSelectedId] = useState(null)

  // Sorted list: directory (suspects) first, then otherEmployees
  const allEmployees = useMemo(() => {
    const directory = employees.directory || []
    const others = employees.otherEmployees || []
    return [...directory, ...others]
  }, [employees])

  const directoryIds = useMemo(
    () => new Set((employees.directory || []).map((e) => e.id)),
    [employees]
  )

  const selectedEmployee = useMemo(
    () => allEmployees.find((e) => e.id === selectedId) ?? null,
    [allEmployees, selectedId]
  )

  return (
    <div className="peoplehub-app">
      <div className="peoplehub-layout">
        <div className="peoplehub-list">
          <div className="peoplehub-list-header">Employee Directory</div>
          {allEmployees.map((emp) => (
            <EmployeeListItem
              key={emp.id}
              employee={emp}
              isSelected={selectedId === emp.id}
              isSuspect={directoryIds.has(emp.id)}
              onSelect={() => setSelectedId(emp.id)}
            />
          ))}
        </div>
        <div className="peoplehub-detail-pane">
          <EmployeeDetail employee={selectedEmployee} />
        </div>
      </div>
    </div>
  )
}
