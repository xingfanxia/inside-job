import { useState, useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import { useClue } from '../game/clues.js'

const CLASSIFICATION_COLORS = {
  CONFIDENTIAL: 'var(--warning)',
  'TOP SECRET': 'var(--danger)',
  'INTERNAL ONLY': 'var(--accent)',
  INTERNAL: 'var(--accent)',
}

function DocClueRecorder({ clueId }) {
  const { discover } = useClue(clueId)

  useEffect(() => {
    discover()
  }, [discover])

  return null
}

function ClassificationBadge({ classification }) {
  const color = CLASSIFICATION_COLORS[classification] || 'var(--text-dim)'

  return (
    <span
      className="docvault-classification"
      style={{ color, borderColor: color }}
    >
      {classification}
    </span>
  )
}

function AccessLogTable({ accessLog }) {
  return (
    <table className="docvault-access-table">
      <thead>
        <tr>
          <th>User</th>
          <th>Date</th>
          <th>Action</th>
          <th>Flag</th>
        </tr>
      </thead>
      <tbody>
        {accessLog.map((entry, i) => (
          <tr
            key={`${entry.user}-${i}`}
            className={entry.flag === 'ANOMALY' ? 'docvault-anomaly-row' : ''}
          >
            <td>{entry.user}</td>
            <td>{entry.date}</td>
            <td>{entry.action}</td>
            <td>
              {entry.flag && (
                <span className="docvault-flag-badge">{entry.flag}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function WatermarkSection({ watermarks }) {
  if (!watermarks) return null

  return (
    <div className="docvault-watermark-section">
      <div className="docvault-watermark-title">Watermark Registry</div>
      <div className="docvault-watermark-list">
        {Object.entries(watermarks).map(([name, code]) => (
          <div key={code} className="docvault-watermark-entry">
            <span className="docvault-watermark-code">{code}</span>
            <span className="docvault-watermark-name">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DocDetail({ doc, isSecure }) {
  if (!doc) {
    return (
      <div className="docvault-detail-empty">
        <span>Select a document to view</span>
      </div>
    )
  }

  return (
    <div className={`docvault-detail ${isSecure ? 'docvault-detail-secure' : ''}`}>
      <div className="docvault-detail-header">
        <h2 className="docvault-detail-title">{doc.title}</h2>
        <ClassificationBadge classification={doc.classification} />
        {doc.lastModified && (
          <span className="docvault-detail-date">Last modified: {doc.lastModified}</span>
        )}
      </div>

      <div className="docvault-detail-content">{doc.content}</div>

      {doc.watermarks && <WatermarkSection watermarks={doc.watermarks} />}

      {doc.accessLog && doc.accessLog.length > 0 && (
        <div className="docvault-access-section">
          <div className="docvault-access-title">Access Log</div>
          <AccessLogTable accessLog={doc.accessLog} />
        </div>
      )}

      {doc.clueId && <DocClueRecorder clueId={doc.clueId} />}
    </div>
  )
}

export default function DocVaultApp() {
  const { localeData } = useGame()
  const documents = localeData.documents

  const [activeTab, setActiveTab] = useState('docvault')
  const [selectedId, setSelectedId] = useState(null)

  const currentList = useMemo(() => {
    if (activeTab === 'docvault') return documents.docvault || []
    return documents.secureFiles || []
  }, [documents, activeTab])

  const selectedDoc = useMemo(
    () => currentList.find((d) => d.id === selectedId) ?? null,
    [currentList, selectedId]
  )

  // Reset selection when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedId(null)
  }

  const isSecure = activeTab === 'secureFiles'

  return (
    <div className={`docvault-app ${isSecure ? 'docvault-app-secure' : ''}`}>
      <div className="docvault-tabs">
        <button
          className={`docvault-tab ${activeTab === 'docvault' ? 'docvault-tab-active' : ''}`}
          onClick={() => handleTabChange('docvault')}
        >
          Documents
        </button>
        <button
          className={`docvault-tab ${activeTab === 'secureFiles' ? 'docvault-tab-active docvault-tab-secure' : ''}`}
          onClick={() => handleTabChange('secureFiles')}
        >
          Secure Vault
        </button>
      </div>
      <div className="docvault-layout">
        <div className={`docvault-list ${isSecure ? 'docvault-list-secure' : ''}`}>
          {currentList.map((doc) => (
            <div
              key={doc.id}
              className={`docvault-list-item ${selectedId === doc.id ? 'docvault-list-item-selected' : ''}`}
              onClick={() => setSelectedId(doc.id)}
            >
              <div className="docvault-list-item-title">{doc.title}</div>
              <div className="docvault-list-item-meta">
                <ClassificationBadge classification={doc.classification} />
                {doc.lastModified && (
                  <span className="docvault-list-item-date">{doc.lastModified}</span>
                )}
              </div>
            </div>
          ))}
          {currentList.length === 0 && (
            <div className="docvault-list-empty">No documents</div>
          )}
        </div>
        <div className="docvault-detail-pane">
          <DocDetail doc={selectedDoc} isSecure={isSecure} />
        </div>
      </div>
    </div>
  )
}
