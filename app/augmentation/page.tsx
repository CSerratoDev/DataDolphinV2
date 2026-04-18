'use client'
import { useState, useEffect } from 'react'
import Dashboard from '../components/Dashboard'
import Upload from '../components/Upload'
import Validation from '../components/Validation'
import Schedule from '../components/Schedule'
import Confirmation from '../components/Confirmation'

type User = { name: string; email: string } | null
type Screen = 'dashboard' | 'upload' | 'validation' | 'schedule' | 'confirmation'

const SAFE_SCREENS: Screen[] = ['dashboard']

export default function AugmentationPage() {
  const [user, setUser] = useState<User>({ name: 'Usuario', email: 'user@datadolphin.mx' })
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [selectedTramite, setSelectedTramite] = useState<any>(null)
  const [uploadedFile, setUploadedFile] = useState<any>(null)
  const [validationResult, setValidationResult] = useState<any>(null)
  const [appointment, setAppointment] = useState<any>(null)
  const [processMode, setProcessMode] = useState<'validate' | 'approve'>('validate')
  const [inProgressTramites, setInProgressTramites] = useState<any[]>([])

  useEffect(() => {
    try {
      const savedScreen = window.localStorage.getItem('dd-screen')
      const savedUser = JSON.parse(window.localStorage.getItem('dd-user') || 'null')
      if (savedUser) setUser(savedUser)
      if (savedScreen && SAFE_SCREENS.includes(savedScreen as Screen)) {
        setScreen(savedScreen as Screen)
      }
    } catch {}

    try {
      const stored = window.localStorage.getItem('dd-in-progress')
      if (stored) setInProgressTramites(JSON.parse(stored))
    } catch {}
  }, [])

  useEffect(() => {
    try { window.localStorage.setItem('dd-user', JSON.stringify(user)) } catch {}
  }, [user])

  useEffect(() => {
    try {
      if (SAFE_SCREENS.includes(screen)) {
        window.localStorage.setItem('dd-screen', screen)
      }
    } catch {}
  }, [screen])

  useEffect(() => {
    try { window.localStorage.setItem('dd-in-progress', JSON.stringify(inProgressTramites)) } catch {}
  }, [inProgressTramites])

  const handleSelectTramite = (tramite: any) => {
    setSelectedTramite(tramite)
    setUploadedFile(null)
    setValidationResult(null)
    setScreen('upload')
  }

  const handleFileUploaded = (file: any, mode: any) => {
    setUploadedFile(file)
    setProcessMode(mode)
    setScreen('validation')
  }

  const handleValidationDone = (result: any) => {
    setValidationResult(result)
  }

  const handleSchedule = (apt: any) => {
    setAppointment(apt)
    setInProgressTramites((prev: any[]) => [...prev, apt])
    setScreen('confirmation')
  }

  const handleLogout = () => {
    setUser(null)
    setScreen('dashboard')
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
    const steps: Record<string, number> = { upload: 1, validation: 2, schedule: 3, confirmation: 4 }
    return steps[screen || ''] || 0
  }

  return (
    <div className="augmentation-shell">
      {screen === 'dashboard' && (
        <Dashboard user={user} onSelectTramite={handleSelectTramite} onLogout={handleLogout} inProgress={inProgressTramites} />
      )}
      {screen === 'upload' && (
        <Upload user={user} tramite={selectedTramite} processMode={processMode} onModeChange={setProcessMode} onFileUploaded={handleFileUploaded} onBack={() => setScreen('dashboard')} step={getStep()} />
      )}
      {screen === 'validation' && (
        <Validation user={user} tramite={selectedTramite} file={uploadedFile} result={validationResult} mode={processMode} onValidationDone={handleValidationDone} onSchedule={() => setScreen('schedule')} onRetry={() => setScreen('upload')} onBack={() => setScreen('dashboard')} step={getStep()} />
      )}
      {screen === 'schedule' && (
        <Schedule user={user} tramite={selectedTramite} onSchedule={handleSchedule} onBack={() => setScreen('validation')} step={getStep()} />
      )}
      {screen === 'confirmation' && (
        <Confirmation user={user} tramite={selectedTramite} appointment={appointment} onDone={() => setScreen('dashboard')} step={getStep()} />
      )}
    </div>
  )
}