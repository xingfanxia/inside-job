import { useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import {
  CLUES,
  MIRROR_CLUES,
  CLUE_NAMES,
  MIRROR_CLUE_NAMES,
  CLUE_APPS,
  TOTAL_CLUES,
  TOTAL_MIRROR_CLUES,
} from '../game/clues.js'

/**
 * Modal overlay listing every discovered clue, grouped by source app.
 * Only shows clues the player has already found (no spoilers for the rest).
 * Mirror clues shown in a separate collapsible section with amber styling.
 */
export default function CluesNotebook({ onClose }) {
  const { state } = useGame()
  const isZh = state.locale === 'zh'
  const names = isZh ? CLUE_NAMES.zh : CLUE_NAMES.en
  const mirrorNames = isZh ? MIRROR_CLUE_NAMES.zh : MIRROR_CLUE_NAMES.en
  const appLabels = isZh ? CLUE_APPS.zh : CLUE_APPS.en

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Group discovered clues by source app — only show apps with at least one find
  const groups = useMemo(() => {
    const byApp = {}
    for (const clueId of state.cluesFound) {
      const meta = CLUES[clueId]
      if (!meta) continue
      const app = meta.app || 'other'
      if (!byApp[app]) {
        byApp[app] = { found: [], totalInApp: 0 }
      }
      byApp[app].found.push(clueId)
    }
    // Count totals for each app that has at least one discovered clue
    for (const app of Object.keys(byApp)) {
      byApp[app].totalInApp = Object.values(CLUES).filter((c) => c.app === app).length
    }
    return byApp
  }, [state.cluesFound])

  const foundMirror = state.mirrorClues

  return (
    <div className="notebook-overlay" onClick={onClose}>
      <div className="notebook-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notebook-header">
          <div className="notebook-title">
            <span className="notebook-icon">📓</span>
            <h2>{isZh ? '线索笔记本' : 'Clues Notebook'}</h2>
          </div>
          <div className="notebook-stats">
            <span className="notebook-stat notebook-stat-clues">
              {state.cluesFound.length} / {TOTAL_CLUES}
            </span>
            {foundMirror.length > 0 && (
              <span className="notebook-stat notebook-stat-mirror">
                {foundMirror.length} / {TOTAL_MIRROR_CLUES} {isZh ? '镜子' : 'mirror'}
              </span>
            )}
          </div>
          <button
            type="button"
            className="notebook-close"
            onClick={onClose}
            aria-label={isZh ? '关闭' : 'Close'}
          >
            ×
          </button>
        </div>

        <div className="notebook-body">
          {state.cluesFound.length === 0 ? (
            <div className="notebook-empty">
              <p className="notebook-empty-title">
                {isZh ? '暂无线索' : 'No clues yet'}
              </p>
              <p className="notebook-empty-hint">
                {isZh
                  ? '开始翻阅应用 — 每当你发现关键信息，笔记会自动记录。'
                  : 'Start exploring apps — every critical finding gets logged here automatically.'}
              </p>
            </div>
          ) : (
            <>
              {Object.entries(groups).map(([app, data]) => (
                <section key={app} className="notebook-group">
                  <div className="notebook-group-header">
                    <span className="notebook-group-label">
                      {appLabels[app] || app}
                    </span>
                    <span className="notebook-group-count">
                      {data.found.length} / {data.totalInApp}
                    </span>
                  </div>
                  <ul className="notebook-list">
                    {data.found.map((clueId) => (
                      <li key={clueId} className="notebook-item">
                        <span className="notebook-item-bullet">▸</span>
                        <span className="notebook-item-text">
                          {names[clueId] || clueId}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}

              {foundMirror.length > 0 && (
                <section className="notebook-group notebook-group-mirror">
                  <div className="notebook-group-header">
                    <span className="notebook-group-label">
                      ⚠ {isZh ? '你的失职' : 'Your failures'}
                    </span>
                    <span className="notebook-group-count">
                      {foundMirror.length} / {TOTAL_MIRROR_CLUES}
                    </span>
                  </div>
                  <ul className="notebook-list">
                    {foundMirror.map((id) => (
                      <li key={id} className="notebook-item notebook-item-mirror">
                        <span className="notebook-item-bullet">⚠</span>
                        <span className="notebook-item-text">
                          {mirrorNames[id] || id}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </>
          )}
        </div>

        <div className="notebook-footer">
          {isZh
            ? '提示：按 Esc 或点击外部区域关闭'
            : 'Tip: Press Esc or click outside to close'}
        </div>
      </div>
    </div>
  )
}
