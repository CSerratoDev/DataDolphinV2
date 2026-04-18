import { useState, useEffect } from 'react'
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx'
import Upload from './components/Upload.jsx'
import Validation from './components/Validation.jsx'
import Schedule from './components/Schedule.jsx'
import Confirmation from './components/Confirmation.jsx'

const SAFE_SCREENS = ['login', 'dashboard']

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('dd-user')) } catch { return null }
  })
  const [screen, setScreen] = useState(() => {
    try {
      const saved = window.localStorage.getItem('dd-screen')
      // Si la pantalla guardada requiere estado que no podemos recuperar, volvemos al dashboard
      return SAFE_SCREENS.includes(saved) ? saved : (JSON.parse(window.localStorage.getItem('dd-user')) ? 'dashboard' : 'login')
    } catch { return 'login' }
  })
  const [selectedTramite, setSelectedTramite] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [validationResult, setValidationResult] = useState(null)
  const [appointment, setAppointment] = useState(null)
  const [inProgressTramites, setInProgressTramites] = useState(() => {
    try {
      const stored = window.localStorage.getItem('dd-in-progress')
      return stored ? JSON.parse(stored) : []
    } catch { return [] }
  })
  const [processMode, setProcessMode] = useState('validate')

  // Persistir usuario
  useEffect(() => {
    try { window.localStorage.setItem('dd-user', JSON.stringify(user)) } catch {}
  }, [user])

  // Persistir pantalla (solo las seguras)
  useEffect(() => {
    try {
      if (SAFE_SCREENS.includes(screen)) {
        window.localStorage.setItem('dd-screen', screen)
      }
    } catch {}
  }, [screen])

  // Persistir trámites en progreso
  useEffect(() => {
    try { window.localStorage.setItem('dd-in-progress', JSON.stringify(inProgressTramites)) } catch (error) {
      console.warn('No se pudo guardar el estado de trámites en proceso.', error)
    }
  }, [inProgressTramites])

  const handleLogin = (userData) => {
    setUser(userData)
    setScreen('dashboard')
  }

  const handleSelectTramite = (tramite) => {
    setSelectedTramite(tramite)
    setUploadedFile(null)
    setValidationResult(null)
    setScreen('upload')
  }

  const handleFileUploaded = (file, mode) => {
    setUploadedFile(file)
    setProcessMode(mode)
    setScreen('validation')
  }

  const handleValidationDone = (result) => {
    setValidationResult(result)
  }

  const handleSchedule = (apt) => {
    setAppointment(apt)
    setInProgressTramites(prev => [...prev, apt])
    setScreen('confirmation')
  }

  const handleLogout = () => {
    setUser(null)
    setScreen('login')
    setSelectedTramite(null)
    setUploadedFile(null)
    setValidationResult(null)
    setAppointment(null)
    try {
      window.localStorage.removeItem('dd-user')
      window.localStorage.removeItem('dd-screen')
    } catch {}
  }

  const getStep = () => {
    const steps = { upload: 1, validation: 2, schedule: 3, confirmation: 4 }
    return steps[screen] || 0
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deep)' }} className="grid-bg">
      {screen === 'login' && <Login onLogin={handleLogin} />}

      {screen === 'dashboard' && (
        <Dashboard
          user={user}
          onSelectTramite={handleSelectTramite}
          onLogout={handleLogout}
          inProgress={inProgressTramites}
        />
      )}

      {screen === 'upload' && (
        <Upload
          user={user}
          tramite={selectedTramite}
          processMode={processMode}
          onModeChange={setProcessMode}
          onFileUploaded={handleFileUploaded}
          onBack={() => setScreen('dashboard')}
          step={getStep()}
        />
      )}

      {screen === 'validation' && (
        <Validation
          user={user}
          tramite={selectedTramite}
          file={uploadedFile}
          result={validationResult}
          mode={processMode}
          onValidationDone={handleValidationDone}
          onSchedule={() => setScreen('schedule')}
          onRetry={() => setScreen('upload')}
          onBack={() => setScreen('dashboard')}
          step={getStep()}
        />
      )}

      {screen === 'schedule' && (
        <Schedule
          user={user}
          tramite={selectedTramite}
          onSchedule={handleSchedule}
          onBack={() => setScreen('validation')}
          step={getStep()}
        />
      )}

      {screen === 'confirmation' && (
        <Confirmation
          user={user}
          tramite={selectedTramite}
          appointment={appointment}
          onDone={() => setScreen('dashboard')}
          step={getStep()}
        />
      )}
    </div>
  )
}