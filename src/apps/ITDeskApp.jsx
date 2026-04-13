import { useState, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import { useClue } from '../game/clues.js'

/**
 * Status badge with color coding.
 */
function StatusBadge({ status }) {
  const colorClass =
    status === 'Open' ? 'itdesk-status-open' :
    status === 'Resolved' ? 'itdesk-status-resolved' :
    status === 'In Progress' ? 'itdesk-status-progress' :
    ''

  return (
    <span className={`itdesk-status-badge ${colorClass}`}>
      {status}
    </span>
  )
}

/**
 * Single ticket row in the list panel.
 */
function TicketListItem({ ticket, isSelected, onSelect }) {
  const isAnomaly = ticket.id === 'ticket-4410'
  const hasMirror = !!ticket.mirrorId

  return (
    <div
      className={[
        'itdesk-ticket-item',
        isSelected ? 'itdesk-ticket-item-selected' : '',
        isAnomaly ? 'itdesk-ticket-item-anomaly' : '',
      ].filter(Boolean).join(' ')}
      style={hasMirror ? { borderLeft: '3px solid var(--warning)' } : undefined}
      onClick={onSelect}
    >
      <div className="itdesk-ticket-item-top">
        <span className="itdesk-ticket-number">{ticket.number}</span>
        <StatusBadge status={ticket.status} />
      </div>
      <div className="itdesk-ticket-item-subject">{ticket.subject}</div>
      <div className="itdesk-ticket-item-meta">
        <span>{ticket.requester}</span>
        {ticket.priority === 'High' && (
          <span className="itdesk-priority-high">HIGH</span>
        )}
      </div>
    </div>
  )
}

/**
 * Clue trigger — fires discover when the ticket is selected.
 */
function TicketClueRecorder({ clueId }) {
  const { discover } = useClue(clueId)

  useEffect(() => {
    discover()
  }, [discover])

  return null
}

/**
 * Mirror clue trigger — fires on selection.
 */
function MirrorClueRecorder({ mirrorId }) {
  const { discover } = useClue(mirrorId)

  useEffect(() => {
    discover()
  }, [discover])

  return null
}

/**
 * Right panel — full ticket detail.
 */
function TicketDetail({ ticket }) {
  return (
    <div className="itdesk-detail">
      <div className="itdesk-detail-header">
        <div className="itdesk-detail-number">{ticket.number}</div>
        <StatusBadge status={ticket.status} />
      </div>

      <h2 className="itdesk-detail-subject">{ticket.subject}</h2>

      <div className="itdesk-detail-meta">
        <div className="itdesk-detail-meta-row">
          <span className="itdesk-detail-label">Type</span>
          <span className="itdesk-detail-value">{ticket.type}</span>
        </div>
        <div className="itdesk-detail-meta-row">
          <span className="itdesk-detail-label">Priority</span>
          <span className={`itdesk-detail-value ${ticket.priority === 'High' ? 'itdesk-text-danger' : ''}`}>
            {ticket.priority}
          </span>
        </div>
        <div className="itdesk-detail-meta-row">
          <span className="itdesk-detail-label">Requester</span>
          <span className="itdesk-detail-value">{ticket.requester} ({ticket.requesterTitle})</span>
        </div>
        <div className="itdesk-detail-meta-row">
          <span className="itdesk-detail-label">Assigned To</span>
          <span className="itdesk-detail-value">{ticket.assignedTo}</span>
        </div>
        <div className="itdesk-detail-meta-row">
          <span className="itdesk-detail-label">Created</span>
          <span className="itdesk-detail-value">{ticket.createdDate}</span>
        </div>
        {ticket.resolvedDate && (
          <div className="itdesk-detail-meta-row">
            <span className="itdesk-detail-label">Resolved</span>
            <span className="itdesk-detail-value">{ticket.resolvedDate}</span>
          </div>
        )}
      </div>

      <div className="itdesk-detail-section">
        <h3 className="itdesk-detail-section-title">Description</h3>
        <pre className="itdesk-detail-body">{ticket.description}</pre>
      </div>

      {ticket.resolution && (
        <div className="itdesk-detail-section">
          <h3 className="itdesk-detail-section-title">Resolution</h3>
          <pre className="itdesk-detail-body">{ticket.resolution}</pre>
        </div>
      )}

      {!ticket.resolution && ticket.status === 'Open' && (
        <div className="itdesk-detail-section itdesk-detail-unresolved">
          <h3 className="itdesk-detail-section-title">Resolution</h3>
          <div className="itdesk-detail-no-resolution">
            No action taken. This ticket remains open.
          </div>
        </div>
      )}

      {ticket.clueId && <TicketClueRecorder clueId={ticket.clueId} />}
      {ticket.mirrorId && <MirrorClueRecorder mirrorId={ticket.mirrorId} />}
    </div>
  )
}

/**
 * ITDeskApp — IT support ticket system (Jira/ServiceNow style).
 */
export default function ITDeskApp() {
  const { localeData } = useGame()
  const tickets = localeData.ittickets.tickets || localeData.ittickets
  const [selectedId, setSelectedId] = useState(null)

  const selectedTicket = tickets.find((t) => t.id === selectedId) || null

  return (
    <div className="itdesk-app">
      <div className="itdesk-list-panel">
        <div className="itdesk-list-header">
          <span className="itdesk-list-header-title">Tickets</span>
          <span className="itdesk-list-header-count">{tickets.length}</span>
        </div>
        <div className="itdesk-list-scroll">
          {tickets.map((ticket) => (
            <TicketListItem
              key={ticket.id}
              ticket={ticket}
              isSelected={ticket.id === selectedId}
              onSelect={() => setSelectedId(ticket.id)}
            />
          ))}
        </div>
      </div>

      <div className="itdesk-detail-panel">
        {selectedTicket ? (
          <TicketDetail ticket={selectedTicket} />
        ) : (
          <div className="itdesk-empty">
            <span className="itdesk-empty-icon">&#x1F3AB;</span>
            <span className="itdesk-empty-text">Select a ticket to view details</span>
          </div>
        )}
      </div>
    </div>
  )
}
