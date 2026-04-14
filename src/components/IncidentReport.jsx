import { useState, useCallback, useMemo } from 'react'
import { useGame } from '../game/state.jsx'
import { sounds } from '../game/sounds.js'

export default function IncidentReport() {
  const { state, dispatch, localeData } = useGame()
  const [collapsed, setCollapsed] = useState(false)
  const report = localeData.report

  const toggle = useCallback(() => {
    setCollapsed((c) => !c)
  }, [])

  // Determine which phases to show based on current reportPhase
  const visiblePhases = useMemo(() => {
    return report.phases.filter((phase) => {
      const minClues = phase.minClues
      return state.cluesFound.length >= minClues
    })
  }, [report.phases, state.cluesFound.length])

  const isZh = state.locale === 'zh'

  return (
    <div className={`report-panel ${collapsed ? 'report-collapsed' : ''}`}>
      <button type="button" className="report-toggle" onClick={toggle}>
        {collapsed
          ? (isZh ? '[ 展开报告 ]' : '[ Expand Report ]')
          : (isZh ? '[ 收起 ]' : '[ Collapse ]')
        }
      </button>

      {!collapsed && (
        <div className="report-content">
          <div className="report-header">
            <h2 className="report-title">{report.title}</h2>
            <p className="report-meta">{report.caseLabel}</p>
            <p className="report-meta">{report.investigatorLabel}</p>
            <p className="report-meta report-status">{report.statusLabel}</p>
          </div>

          {visiblePhases.map((phase) => (
            <ReportPhase key={phase.id} phase={phase} gameState={state} dispatch={dispatch} />
          ))}
        </div>
      )}
    </div>
  )
}

function ReportPhase({ phase, gameState, dispatch }) {
  return (
    <div className="report-phase">
      {phase.sections.map((section, i) => (
        <ReportSection key={i} section={section} gameState={gameState} dispatch={dispatch} />
      ))}
    </div>
  )
}

function ReportSection({ section, gameState, dispatch }) {
  return (
    <div className="report-section">
      {section.heading && (
        <h3 className="report-section-heading">{section.heading}</h3>
      )}

      {section.lines && section.lines.map((line, i) => (
        <p key={i} className={`report-line ${line === '' ? 'report-line-blank' : ''}`}>
          {line}
        </p>
      ))}

      {/* Suspects list (phase 2) */}
      {section.suspects && (
        <div className="report-suspects">
          {section.suspects.map((s, i) => (
            <div key={i} className="report-suspect">
              <span className="report-suspect-name">{s.name}</span>
              <span className="report-suspect-note">{s.note}</span>
            </div>
          ))}
        </div>
      )}

      {/* Findings list (phase 3) — mirror clues glow amber */}
      {section.findings && (
        <div className="report-findings">
          {section.findings.map((f, i) => (
            <div key={i} className="report-finding report-mirror-glow">
              <span className="report-finding-icon">{f.icon === 'warning' ? '\u26A0' : '\u2022'}</span>
              <div className="report-finding-body">
                <p className="report-finding-text">{f.text}</p>
                <p className="report-finding-attr">{f.attribution}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analysis blocks (phase 4) */}
      {section.blocks && (
        <div className="report-blocks">
          {section.blocks.map((b, i) => (
            <div key={i} className={`report-block ${b.label === 'THE MIRROR' ? 'report-mirror-glow' : ''}`}>
              <span className="report-block-label">{b.label}</span>
              <p className="report-block-text">{b.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Ending choices (phase 5) */}
      {section.choices && (
        <div className="report-choices">
          {section.choices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              className={`report-choice ${gameState.selectedEnding === choice.id ? 'report-choice-selected' : ''}`}
              onClick={() => {
                sounds.endingSelect()
                dispatch({ type: 'SELECT_ENDING', payload: choice.id })
                dispatch({ type: 'SET_PHASE', payload: 'ending' })
              }}
            >
              <span className="report-choice-label">{choice.label}</span>
              <span className="report-choice-title">{choice.title}</span>
              <p className="report-choice-desc">{choice.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
