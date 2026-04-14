import { useState, useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import { useClue } from '../game/clues.js'

// The watermark analysis file is the smoking gun — pulsing red border + emphasized watermark line.
const SMOKING_GUN_ID = 'sec-leaked-comparison'
// The whistleblower email gets emotional serif typography.
const EMOTIONAL_ID = 'sec-whistleblower-email'

function SecFilesClueRecorder({ clueId }) {
  const { discover } = useClue(clueId)

  useEffect(() => {
    discover()
  }, [discover])

  return null
}

function ClassificationBadge({ classification }) {
  const isTopSecret = classification === 'TOP SECRET' || classification === '绝密'
  return (
    <span
      className={`secfiles-classification ${isTopSecret ? 'secfiles-classification-top' : ''}`}
    >
      {isTopSecret && <span className="secfiles-blink-dot" />}
      {classification}
    </span>
  )
}

// Highlight the line that reveals the watermark match (the smoking gun reveal).
// Match patterns in both locales. Highlights the whole line that contains the marker.
function renderWatermarkContent(content) {
  const lines = content.split('\n')
  return lines.map((line, i) => {
    const isWatermarkMatch =
      line.includes('LEAKED COPY WATERMARK') ||
      line.includes('泄露副本水印')
    if (isWatermarkMatch) {
      return (
        <div key={i} className="secfiles-watermark-highlight">
          {line}
        </div>
      )
    }
    return <div key={i}>{line || '\u00A0'}</div>
  })
}

function SecFilesDetail({ doc, isZh }) {
  if (!doc) {
    return (
      <div className="secfiles-empty">
        <span className="secfiles-empty-icon">&#x1F512;</span>
        <span className="secfiles-empty-text">
          {isZh ? '选择文件以查看' : 'Select a file to view'}
        </span>
      </div>
    )
  }

  const isSmokingGun = doc.id === SMOKING_GUN_ID
  const isEmotional = doc.id === EMOTIONAL_ID

  const wrapperClass = isSmokingGun
    ? 'secfiles-viewer secfiles-viewer-smoking-gun'
    : 'secfiles-viewer'

  const contentClass = isEmotional
    ? 'secfiles-viewer-content secfiles-viewer-emotional'
    : 'secfiles-viewer-content'

  return (
    <div className={wrapperClass}>
      <div className="secfiles-viewer-header">
        <ClassificationBadge classification={doc.classification} />
        <h2 className="secfiles-viewer-title">{doc.title}</h2>
      </div>

      <div className={contentClass}>
        {isSmokingGun ? renderWatermarkContent(doc.content) : doc.content}
      </div>

      {doc.clueId && <SecFilesClueRecorder clueId={doc.clueId} />}
    </div>
  )
}

export default function SecureFilesApp() {
  const { state, localeData } = useGame()
  const isZh = state.locale === 'zh'
  const secureFiles = useMemo(
    () => localeData.documents.secureFiles || [],
    [localeData.documents]
  )

  const [selectedId, setSelectedId] = useState(null)

  const selectedDoc = useMemo(
    () => secureFiles.find((d) => d.id === selectedId) ?? null,
    [secureFiles, selectedId]
  )

  return (
    <div className="secfiles-app">
      <div className="secfiles-list-panel">
        <div className="secfiles-list-header">
          <span className="secfiles-list-header-icon">&#x1F512;</span>
          <span className="secfiles-list-header-title">
            {isZh ? '安全文件' : 'SECURE FILES'}
          </span>
        </div>
        <div className="secfiles-list-scroll">
          {secureFiles.map((doc) => {
            const isSelected = selectedId === doc.id
            const isSmokingGun = doc.id === SMOKING_GUN_ID
            const classes = [
              'secfiles-list-item',
              isSelected ? 'secfiles-list-item-selected' : '',
              isSmokingGun ? 'secfiles-list-item-smoking-gun' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <div
                key={doc.id}
                className={classes}
                onClick={() => setSelectedId(doc.id)}
              >
                <div className="secfiles-list-item-top">
                  <span className="secfiles-lock-icon">&#x1F512;</span>
                  <ClassificationBadge classification={doc.classification} />
                </div>
                <div className="secfiles-list-item-title">{doc.title}</div>
              </div>
            )
          })}
          {secureFiles.length === 0 && (
            <div className="secfiles-empty">
              <span className="secfiles-empty-text">
                {isZh ? '无文件' : 'No files'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="secfiles-detail-panel">
        <SecFilesDetail doc={selectedDoc} isZh={isZh} />
      </div>
    </div>
  )
}
