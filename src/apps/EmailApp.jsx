import { useState, useEffect, useMemo, useCallback } from 'react'
import { useGame } from '../game/state.jsx'
import { useClue } from '../game/clues.js'

const TABS = ['inbox', 'drafts', 'sent']

// Session-level read tracking — persisted across re-opens of the window via
// a module-level Set. We don't push this into the reducer/save-file because
// it's purely UX sugar (not a clue). Clearing window.localStorage or Reset
// Game naturally wipes it when the page reloads.
const readEmailIds = new Set()

function EmailClueRecorder({ clueId, clueType }) {
  const { discover } = useClue(clueId)

  useEffect(() => {
    if (clueType === 'auto' || clueType === 'click') {
      discover()
    }
  }, [clueType, discover])

  return null
}

// Mirror clues (failures) fire as soon as the email is viewed — no clueType gate.
function EmailMirrorRecorder({ mirrorId }) {
  const { discover } = useClue(mirrorId)

  useEffect(() => {
    discover()
  }, [discover])

  return null
}

function EmailListItem({ email, isSelected, onSelect, tab, readSet }) {
  const from = tab === 'sent'
    ? email.to
    : email.from

  // Unread if: originally marked unread in data AND player hasn't selected it yet
  const isUnread = tab === 'inbox' && email.isRead === false && !readSet.has(email.id)
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

function EmailDetail({ email, tab, onOpenAttachment, isZh }) {
  if (!email) {
    return (
      <div className="email-detail-empty">
        <span className="email-detail-empty-text">
          {isZh ? '选择一封邮件阅读' : 'Select an email to read'}
        </span>
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
          <div className="email-attachments-label">
            {isZh ? '附件：' : 'Attachments:'}
          </div>
          {email.attachments.map((att) => (
            <button
              key={att.name}
              type="button"
              className="email-attachment"
              onClick={() => onOpenAttachment(att)}
              title={isZh ? '点击预览' : 'Click to preview'}
            >
              <span className="email-attachment-icon">&#128206;</span>
              <span className="email-attachment-name">{att.name}</span>
              <span className="email-attachment-size">({att.size})</span>
            </button>
          ))}
        </div>
      )}

      {email.clueId && (
        <EmailClueRecorder clueId={email.clueId} clueType={email.clueType} />
      )}
      {email.mirrorId && (
        <EmailMirrorRecorder mirrorId={email.mirrorId} />
      )}
    </div>
  )
}

function AttachmentPreview({ attachment, isZh, onClose }) {
  if (!attachment) return null

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Figure out file type from extension for the preview placeholder
  const ext = attachment.name.split('.').pop()?.toLowerCase() || 'file'
  const typeLabel = {
    pdf: 'PDF', xlsx: 'Excel', xls: 'Excel', docx: 'Word', doc: 'Word',
    pptx: 'PowerPoint', ppt: 'PowerPoint', txt: 'Text', csv: 'CSV',
  }[ext] || ext.toUpperCase()

  return (
    <div className="email-attachment-overlay" onClick={onClose}>
      <div className="email-attachment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="email-attachment-modal-header">
          <div className="email-attachment-modal-icon">&#128206;</div>
          <div className="email-attachment-modal-info">
            <div className="email-attachment-modal-name">{attachment.name}</div>
            <div className="email-attachment-modal-meta">
              {typeLabel} · {attachment.size}
            </div>
          </div>
          <button
            type="button"
            className="email-attachment-modal-close"
            onClick={onClose}
            aria-label={isZh ? '关闭' : 'Close'}
          >×</button>
        </div>
        <div className="email-attachment-modal-body">
          <div className="email-attachment-preview">
            <div className="email-attachment-preview-watermark">CONFIDENTIAL</div>
            <div className="email-attachment-preview-header">
              <div className="email-attachment-preview-line" style={{ width: '70%' }} />
              <div className="email-attachment-preview-line" style={{ width: '40%' }} />
            </div>
            <div className="email-attachment-preview-body">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="email-attachment-preview-line"
                  style={{ width: `${60 + (i * 7) % 35}%` }}
                />
              ))}
            </div>
          </div>
          <div className="email-attachment-hint">
            {isZh
              ? '📁 预览仅显示文件存在。完整内容请在 DocVault（文档中心）中查阅。'
              : '📁 Preview shows the file exists. For full content, check DocVault.'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EmailApp() {
  const { state, localeData } = useGame()
  const emails = localeData.emails
  const isZh = state.locale === 'zh'

  const [activeTab, setActiveTab] = useState('inbox')
  const [selectedId, setSelectedId] = useState(null)
  const [attachmentPreview, setAttachmentPreview] = useState(null)
  // Force re-render when readEmailIds changes (it's a module-level Set)
  const [, bumpRead] = useState(0)

  const currentList = useMemo(() => emails[activeTab] || [], [emails, activeTab])

  const selectedEmail = useMemo(
    () => currentList.find((e) => e.id === selectedId) ?? null,
    [currentList, selectedId]
  )

  // Auto-select first inbox email on mount (CEO email with auto clue)
  useEffect(() => {
    if (emails.inbox.length > 0 && selectedId === null) {
      setSelectedId(emails.inbox[0].id)
      // Auto-selected email should also be marked read
      readEmailIds.add(emails.inbox[0].id)
      bumpRead((n) => n + 1)
    }
  }, [emails.inbox, selectedId])

  // Reset selection when switching tabs
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
    setSelectedId(null)
  }, [])

  const handleSelectEmail = useCallback((email) => {
    setSelectedId(email.id)
    if (!readEmailIds.has(email.id)) {
      readEmailIds.add(email.id)
      bumpRead((n) => n + 1)
    }
  }, [])

  const unreadCount = useMemo(
    () => emails.inbox.filter((e) => e.isRead === false && !readEmailIds.has(e.id)).length,
    [emails.inbox] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <div className="email-app">
      <div className="email-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`email-tab ${activeTab === tab ? 'email-tab-active' : ''}`}
            onClick={() => handleTabChange(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {tab === 'inbox' && unreadCount > 0 && (
              <span className="email-tab-badge">{unreadCount}</span>
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
              readSet={readEmailIds}
            />
          ))}
          {currentList.length === 0 && (
            <div className="email-list-empty">
              {isZh ? '暂无邮件' : 'No emails'}
            </div>
          )}
        </div>
        <div className="email-detail-pane">
          <EmailDetail
            email={selectedEmail}
            tab={activeTab}
            isZh={isZh}
            onOpenAttachment={setAttachmentPreview}
          />
        </div>
      </div>

      {attachmentPreview && (
        <AttachmentPreview
          attachment={attachmentPreview}
          isZh={isZh}
          onClose={() => setAttachmentPreview(null)}
        />
      )}
    </div>
  )
}
