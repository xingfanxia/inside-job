// Sound engine — pure Web Audio API, zero audio files.
// Corporate-subtle, not gamey. Low gains (0.03-0.07).
// Silence is a design choice — don't wire this into "reveals".

let audioContext = null

function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    try {
      const Ctor = window.AudioContext || window.webkitAudioContext
      if (!Ctor) return null
      audioContext = new Ctor()
    } catch {
      return null
    }
  }
  return audioContext
}

function resumeAudio() {
  const ctx = getAudioContext()
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {})
  }
}

/**
 * Play a sequence of notes.
 * notes: [{ frequency, duration, type, gain, delay }]
 *   - frequency: Hz
 *   - duration: seconds (note envelope length)
 *   - type: 'sine' | 'triangle' | 'square' | 'sawtooth'
 *   - gain: peak gain (0-1), default 0.05
 *   - delay: seconds from now before this note starts (default 0)
 */
function playNotes(notes) {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime

  for (const note of notes) {
    const freq = note.frequency
    const dur = note.duration ?? 0.08
    const type = note.type ?? 'triangle'
    const peak = note.gain ?? 0.05
    const delay = note.delay ?? 0
    const start = now + delay
    const end = start + dur

    try {
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()

      osc.type = type
      osc.frequency.setValueAtTime(freq, start)

      // If the note specifies a target frequency, sweep to it (used for window open/close)
      if (note.frequencyTo != null) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(1, note.frequencyTo),
          end,
        )
      }

      // Envelope: quick attack, exponential decay
      gainNode.gain.setValueAtTime(0.0001, start)
      gainNode.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0001), start + 0.005)
      gainNode.gain.exponentialRampToValueAtTime(0.0001, end)

      osc.connect(gainNode)
      gainNode.connect(ctx.destination)
      osc.start(start)
      osc.stop(end + 0.02)
    } catch {
      // Swallow — audio is non-critical
    }
  }
}

// --- Sound vocabulary ---
export const sounds = {
  // Soft UI click — 400Hz square, 30ms
  click: () => {
    playNotes([{ frequency: 400, duration: 0.03, type: 'square', gain: 0.04 }])
  },

  // Ascending 2-note for a found clue — subtle, brief
  clueFound: () => {
    playNotes([
      { frequency: 880, duration: 0.09, type: 'triangle', gain: 0.05, delay: 0 },
      { frequency: 1320, duration: 0.12, type: 'triangle', gain: 0.05, delay: 0.09 },
    ])
  },

  // Descending 2-note — sadder (mirror clue reflects back at you)
  mirrorClueFound: () => {
    playNotes([
      { frequency: 660, duration: 0.1, type: 'triangle', gain: 0.05, delay: 0 },
      { frequency: 440, duration: 0.14, type: 'triangle', gain: 0.05, delay: 0.1 },
    ])
  },

  // C-E-G chord for an unlock — 200ms total, warm
  passwordUnlock: () => {
    playNotes([
      { frequency: 523.25, duration: 0.2, type: 'triangle', gain: 0.05, delay: 0 },
      { frequency: 659.25, duration: 0.2, type: 'triangle', gain: 0.05, delay: 0.04 },
      { frequency: 783.99, duration: 0.2, type: 'triangle', gain: 0.05, delay: 0.08 },
    ])
  },

  // Harsh descending — failed password
  passwordFail: () => {
    playNotes([
      { frequency: 400, duration: 0.09, type: 'square', gain: 0.06, delay: 0 },
      { frequency: 200, duration: 0.14, type: 'square', gain: 0.06, delay: 0.08 },
    ])
  },

  // Brief rising sweep — window open
  windowOpen: () => {
    playNotes([
      {
        frequency: 300,
        frequencyTo: 600,
        duration: 0.06,
        type: 'sine',
        gain: 0.04,
      },
    ])
  },

  // Brief falling sweep — window close
  windowClose: () => {
    playNotes([
      {
        frequency: 600,
        frequencyTo: 300,
        duration: 0.04,
        type: 'sine',
        gain: 0.04,
      },
    ])
  },

  // 4-note arpeggio — warm triangle — when a new report phase unlocks
  reportPhaseUnlock: () => {
    playNotes([
      { frequency: 523.25, duration: 0.12, type: 'triangle', gain: 0.05, delay: 0 },
      { frequency: 659.25, duration: 0.12, type: 'triangle', gain: 0.05, delay: 0.08 },
      { frequency: 783.99, duration: 0.12, type: 'triangle', gain: 0.05, delay: 0.16 },
      { frequency: 1046.5, duration: 0.2, type: 'triangle', gain: 0.05, delay: 0.24 },
    ])
  },

  // Solemn 2-note — ending chosen
  endingSelect: () => {
    playNotes([
      { frequency: 523.25, duration: 0.3, type: 'triangle', gain: 0.06, delay: 0 },
      { frequency: 392.0, duration: 0.45, type: 'triangle', gain: 0.06, delay: 0.3 },
    ])
  },

  // Lighthouse boot — 3 short blips + a low drone
  lighthouseBoot: () => {
    playNotes([
      { frequency: 1200, duration: 0.04, type: 'square', gain: 0.04, delay: 0 },
      { frequency: 1200, duration: 0.04, type: 'square', gain: 0.04, delay: 0.12 },
      { frequency: 1200, duration: 0.04, type: 'square', gain: 0.04, delay: 0.24 },
      { frequency: 90, duration: 0.9, type: 'sawtooth', gain: 0.03, delay: 0.3 },
    ])
  },

  // Typewriter tick — extremely quiet; used per character
  typewriterTick: () => {
    playNotes([{ frequency: 2000, duration: 0.01, type: 'square', gain: 0.015 }])
  },
}

export { resumeAudio }
