import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameProvider } from './game/state.jsx'
import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>,
)
