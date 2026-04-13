import { useState, useEffect, useCallback } from 'react'
import { useGame } from '../game/state.jsx'
import { useScrollClue } from '../game/clues.js'

// Map data-level clue IDs to game-level CLUES IDs (from clues.js)
const CLUE_MAP = {
  'net-external-patent-access': 'log-vpn-external-anomaly',
}

function VpnClueRow({ record, children }) {
  const mappedId = CLUE_MAP[record.clueId] || record.clueId
  const ref = useScrollClue(mappedId || '__noop__')

  return (
    <tr
      ref={record.clueId ? ref : undefined}
      className={`netwatch-row ${record.highlight ? 'netwatch-row-highlight' : ''}`}
    >
      {children}
    </tr>
  )
}

function ExternalClueRow({ record, children }) {
  const mappedId = CLUE_MAP[record.clueId] || record.clueId
  const ref = useScrollClue(mappedId || '__noop__')

  return (
    <tr
      ref={record.clueId ? ref : undefined}
      className="netwatch-row netwatch-row-anomaly"
    >
      {children}
    </tr>
  )
}

function VpnTab({ records, isZh }) {
  return (
    <div className="netwatch-table-wrap">
      <table className="netwatch-table">
        <thead>
          <tr>
            <th>{isZh ? '日期' : 'Date'}</th>
            <th>{isZh ? '时间' : 'Time'}</th>
            <th>{isZh ? '员工' : 'Employee'}</th>
            <th>{isZh ? '源IP' : 'Source IP'}</th>
            <th>{isZh ? '位置' : 'Location'}</th>
            <th>{isZh ? '时长' : 'Duration'}</th>
            <th>{isZh ? '访问系统' : 'Accessed Systems'}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <VpnClueRow key={record.id} record={record}>
              <td>{record.date}</td>
              <td>{record.time}</td>
              <td>{record.employee}</td>
              <td className="netwatch-mono">{record.sourceIp}</td>
              <td>{record.location}</td>
              <td>{record.duration}</td>
              <td>
                {record.accessedSystems.join(', ')}
                {record.note && (
                  <div className="netwatch-row-note">{record.note}</div>
                )}
              </td>
            </VpnClueRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ExternalTab({ records, isZh }) {
  return (
    <div className="netwatch-table-wrap">
      <table className="netwatch-table">
        <thead>
          <tr>
            <th>{isZh ? '日期' : 'Date'}</th>
            <th>{isZh ? '时间' : 'Time'}</th>
            <th>{isZh ? '源IP' : 'Source IP'}</th>
            <th>{isZh ? '地理位置' : 'Geo Location'}</th>
            <th>{isZh ? '目标系统' : 'Target System'}</th>
            <th>{isZh ? '状态' : 'Status'}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <ExternalClueRow key={record.id} record={record}>
              <td>{record.date}</td>
              <td>{record.time}</td>
              <td className="netwatch-mono">{record.sourceIp}</td>
              <td>{record.geoLocation}</td>
              <td>{record.targetSystem}</td>
              <td>
                <span className="netwatch-status-badge">{record.status}</span>
                {record.note && (
                  <div className="netwatch-row-note">{record.note}</div>
                )}
              </td>
            </ExternalClueRow>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ByodTab({ records, isZh, onView }) {
  useEffect(() => {
    onView()
  }, [onView])

  return (
    <div className="netwatch-table-wrap">
      <table className="netwatch-table">
        <thead>
          <tr>
            <th>{isZh ? '设备' : 'Device'}</th>
            <th>{isZh ? '员工' : 'Employee'}</th>
            <th>{isZh ? '批准人' : 'Approved By'}</th>
            <th>{isZh ? '日期' : 'Date'}</th>
            <th>{isZh ? '访问权限' : 'Access Level'}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="netwatch-row">
              <td>{record.device}</td>
              <td>{record.deviceOwner}</td>
              <td className="netwatch-mirror-text">{record.approvedBy}</td>
              <td>{record.approvedDate}</td>
              <td>{record.accessLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="netwatch-byod-note">
        <p className="netwatch-byod-note-text">
          {isZh
            ? '所有12个BYOD例外均由陈明轩（信息安全总监）批准。标准政策要求IT安全委员会审批访问文档中心或财务系统的设备。这12台设备均无委员会签字记录。'
            : 'All 12 BYOD exceptions were approved by Alex Chen (Head of Security). Standard policy requires IT Security committee approval for devices accessing DocVault or financial systems. No committee sign-off on record for any of these 12 devices.'}
        </p>
      </div>
    </div>
  )
}

export default function NetWatchApp() {
  const { localeData, state, dispatch } = useGame()
  const vpn = localeData.logs.vpn
  const isZh = state.locale === 'zh'
  const [activeTab, setActiveTab] = useState('vpn')

  const tabs = [
    { id: 'vpn', label: isZh ? 'VPN 连接' : 'VPN Connections' },
    { id: 'external', label: isZh ? '外部访问' : 'External Access' },
    { id: 'byod', label: isZh ? 'BYOD 例外' : 'BYOD Exceptions' },
  ]

  const handleByodView = useCallback(() => {
    if (!state.mirrorClues.includes('mirror-byod-approval')) {
      dispatch({ type: 'ADD_MIRROR_CLUE', payload: 'mirror-byod-approval' })
    }
  }, [state.mirrorClues, dispatch])

  return (
    <div className="netwatch-app">
      <div className="netwatch-header">
        <h2 className="netwatch-title">
          {isZh ? 'VPN / 网络监控' : 'VPN / Network Monitoring'}
        </h2>
      </div>

      <div className="netwatch-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`netwatch-tab ${activeTab === tab.id ? 'netwatch-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="netwatch-content">
        {activeTab === 'vpn' && (
          <VpnTab records={vpn.records} isZh={isZh} />
        )}
        {activeTab === 'external' && (
          <ExternalTab records={vpn.externalAccess} isZh={isZh} />
        )}
        {activeTab === 'byod' && (
          <ByodTab
            records={vpn.byodExceptions}
            isZh={isZh}
            onView={handleByodView}
          />
        )}
      </div>
    </div>
  )
}
