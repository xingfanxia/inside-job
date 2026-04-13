import { useState, useEffect, useMemo } from 'react'
import { useGame } from '../game/state.jsx'
import { useClue } from '../game/clues.js'

const TABS = ['inbox', 'drafts', 'sent']

function EmailClueRecorder({ clueId, clueType }) {
  const { discover } = useClue(clueId)

  useEffect(() => {
    if (clueType === 'auto' || clueType === 'click') {
      discover()
    }
  }, [clueType, discover])

  return null
}

function EmailListItem({ email, isSelected, onSelect, tab }) {
  const from = tab === 'sent'
    ? email.to
    : email.from

  const isUnread = tab === 'inbox' && email.isRead === false
  const hasMirror = !!email.mirrorId

  return (
    <div
      className={`email-list-item ${isSelected ? 'email-list-item-selected' : ''}`}
      style={hasMirror ? { borderLeft: '3px solid var(--warning)' } : undefined}
      onClick={onSelect}
    >
      <div className="email-list-item-header">
        {isUnread && <span className="email-unread-dot" />}
        <span className="email-list-item-from">
          {tab === 'sent' ? `To: ${from.name}` : from.name}
        </span>
        <span className="email-list-item-date">{email.date}</span>
      </div>
      <div className="email-list-item-subject">{email.subject}</div>
    </div>
  )
}

function EmailDetail({ email, tab }) {
  if (!email) {
    return (
      <div className="email-detail-empty">
        <span className="email-detail-empty-text">Select an email to read</span>
      </div>
    )
  }

  const from = email.from
  const to = email.to

  return (
    <div className="email-detail">
      <div className="email-detail-header">
        <h2 className="email-detail-subject">{email.subject}</h2>
        <div className="email-detail-meta">
          {from && (
            <div><span className="email-meta-label">From:</span> {from.name} &lt;{from.email}&gt;</div>
          )}
          {to && (
            <div><span className="email-meta-label">To:</span> {to.name} &lt;{to.email}&gt;</div>
          )}
          {email.cc && email.cc.length > 0 && (
            <div>
              <span className="email-meta-label">CC:</span>{' '}
              {email.cc.map((c) => c.name).join(', ')}
            </div>
          )}
          <div><span className="email-meta-label">Date:</span> {email.date}</div>
        </div>
      </div>
      <div className="email-detail-body">{email.body}</div>
      {email.attachments && email.attachments.length > 0 && (
        <div className="email-detail-attachments">
          <div className="email-attachments-label">Attachments:</div>
          {email.attachments.map((att) => (
            <div key={att.name} className="email-attachment">
              <span className="email-attachment-icon">&#128206;</span>
              <span className="email-attachment-name">{att.name}</span>
              <span className="email-attachment-size">({att.size})</span>
            </div>
          ))}
        </div>
      )}

      {email.clueId && (
        <EmailClueRecorder clueId={email.clueId} clueType={email.clueType} />
      )}
    </div>
  )
}

export default function EmailApp() {
  const { localeData } = useGame()
  const emails = localeData.emails

  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedId, setSelectedId] = useState(null)

  const currentList = useMemo(() => emails[activeTab] || [], [emails, activeTab])

  const selectedEmail = useMemo(
    () => currentList.find((e) => e.id === selectedId) ?? null,
    [currentList, selectedId]
  )

  // Auto-select first inbox email on mount (CEO email with auto clue)
  useEffect(() => {
    if (emails.inbox.length > 0 && selectedId === null) {
      setSelectedId(emails.inbox[0].id)
    }
  }, [emails.inbox, selectedId])

  // Reset selection when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedId(null)
  }

  const handleSelectEmail = (email) => {
    setSelectedId(email.id)
  }

  return (
    <div className="email-app">
      <div className="email-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`email-tab ${activeTab === tab ? 'email-tab-active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'inbox' && emails.inbox.filter((e) => !e.isRead).length > 0 && (
              <span className="email-tab-badge">
                {emails.inbox.filter((e) => !e.isRead).length}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="email-layout">
        <div className="email-list">
          {currentList.map((email) => (
            <EmailListItem
              key={email.id}
              email={email}
              tab={activeTab}
              isSelected={selectedId === email.id}
              onSelect={() => handleSelectEmail(email)}
            />
          ))}
          {currentList.length === 0 && (
            <div className="email-list-empty">No emails</div>
          )}
        </div>
        <div className="email-detail-pane">
          <EmailDetail email={selectedEmail} tab={activeTab} />
        </div>
      </div>
    </div>
  )
}
