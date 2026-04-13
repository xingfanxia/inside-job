import { useState, useMemo, useEffect } from 'react'
import { useGame } from '../game/state.jsx'
import { useClue, useScrollClue } from '../game/clues.js'

function ScrollClueMessage({ msg, isElenaUnknownDm }) {
  const ref = useScrollClue(msg.clueId)

  return (
    <div
      ref={ref}
      className={`slack-message ${isElenaUnknownDm ? 'slack-message-suspicious' : ''}`}
    >
      <div
        className="slack-avatar"
        style={{ backgroundColor: msg.author.color }}
      >
        {msg.author.avatar}
      </div>
      <div className="slack-message-content">
        <div className="slack-message-header">
          <span className="slack-author">{msg.author.name}</span>
          <span className="slack-time">{msg.time}</span>
        </div>
        <div className="slack-text">{msg.text}</div>
      </div>
    </div>
  )
}

function RegularMessage({ msg, isElenaUnknownDm }) {
  return (
    <div
      className={`slack-message ${isElenaUnknownDm ? 'slack-message-suspicious' : ''}`}
    >
      <div
        className="slack-avatar"
        style={{ backgroundColor: msg.author.color }}
      >
        {msg.author.avatar}
      </div>
      <div className="slack-message-content">
        <div className="slack-message-header">
          <span className="slack-author">{msg.author.name}</span>
          <span className="slack-time">{msg.time}</span>
        </div>
        <div className="slack-text">{msg.text}</div>
      </div>
    </div>
  )
}

function DmSidebarItemWithClue({ dm, isSelected, onSelect }) {
  const clueMsg = dm.messages.find((m) => m.clueType === 'click')
  const { discover } = useClue(clueMsg.clueId)
  const isElenaUnknown = dm.id === 'dm-elena-unknown'

  const handleClick = () => {
    discover()
    onSelect()
  }

  return (
    <div
      className={`slack-sidebar-item ${isSelected ? 'slack-sidebar-item-active' : ''} ${isElenaUnknown ? 'slack-sidebar-item-suspicious' : ''}`}
      onClick={handleClick}
    >
      <span className="slack-sidebar-icon">&#128172;</span>
      <span className="slack-sidebar-name">{dm.participants.join(', ')}</span>
    </div>
  )
}

function DmSidebarItem({ dm, isSelected, onSelect }) {
  const hasClickClue = dm.messages.some((m) => m.clueType === 'click')

  if (hasClickClue) {
    return (
      <DmSidebarItemWithClue
        dm={dm}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    )
  }

  const isElenaUnknown = dm.id === 'dm-elena-unknown'

  return (
    <div
      className={`slack-sidebar-item ${isSelected ? 'slack-sidebar-item-active' : ''} ${isElenaUnknown ? 'slack-sidebar-item-suspicious' : ''}`}
      onClick={onSelect}
    >
      <span className="slack-sidebar-icon">&#128172;</span>
      <span className="slack-sidebar-name">{dm.participants.join(', ')}</span>
    </div>
  )
}

export default function SlackApp() {
  const { localeData } = useGame()
  const slack = localeData.slack

  const [selectedType, setSelectedType] = useState('channel')
  const [selectedId, setSelectedId] = useState(null)

  // Auto-select first channel on mount
  useEffect(() => {
    if (slack.channels.length > 0 && selectedId === null) {
      setSelectedId(slack.channels[0].id)
      setSelectedType('channel')
    }
  }, [slack.channels, selectedId])

  const selectedItem = useMemo(() => {
    if (selectedType === 'channel') {
      return slack.channels.find((c) => c.id === selectedId) ?? null
    }
    return slack.dms.find((d) => d.id === selectedId) ?? null
  }, [slack, selectedType, selectedId])

  const messages = selectedItem?.messages ?? []
  const isElenaUnknownDm = selectedType === 'dm' && selectedId === 'dm-elena-unknown'

  return (
    <div className="slack-app">
      <div className="slack-sidebar">
        <div className="slack-sidebar-section">
          <div className="slack-sidebar-heading">Channels</div>
          {slack.channels.map((ch) => (
            <div
              key={ch.id}
              className={`slack-sidebar-item ${selectedType === 'channel' && selectedId === ch.id ? 'slack-sidebar-item-active' : ''}`}
              onClick={() => { setSelectedType('channel'); setSelectedId(ch.id) }}
            >
              <span className="slack-sidebar-icon">#</span>
              <span className="slack-sidebar-name">{ch.name.replace('#', '')}</span>
              <span className="slack-sidebar-count">{ch.members}</span>
            </div>
          ))}
        </div>
        <div className="slack-sidebar-section">
          <div className="slack-sidebar-heading">Direct Messages</div>
          {slack.dms.map((dm) => (
            <DmSidebarItem
              key={dm.id}
              dm={dm}
              isSelected={selectedType === 'dm' && selectedId === dm.id}
              onSelect={() => { setSelectedType('dm'); setSelectedId(dm.id) }}
            />
          ))}
        </div>
      </div>
      <div className="slack-main">
        <div className="slack-main-header">
          {selectedItem && (
            <div className="slack-channel-info">
              <span className="slack-channel-name">
                {selectedType === 'channel'
                  ? selectedItem.name
                  : selectedItem.participants.join(' & ')}
              </span>
              {selectedType === 'channel' && (
                <span className="slack-channel-members">
                  {selectedItem.members} members
                  {selectedItem.restricted && (
                    <span className="slack-restricted-badge">RESTRICTED</span>
                  )}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="slack-messages">
          {messages.map((msg) => {
            if (msg.clueId && msg.clueType === 'scroll') {
              return (
                <ScrollClueMessage
                  key={msg.id}
                  msg={msg}
                  isElenaUnknownDm={isElenaUnknownDm}
                />
              )
            }
            return (
              <RegularMessage
                key={msg.id}
                msg={msg}
                isElenaUnknownDm={isElenaUnknownDm}
              />
            )
          })}
          {messages.length === 0 && (
            <div className="slack-empty">Select a conversation</div>
          )}
        </div>
      </div>
    </div>
  )
}
