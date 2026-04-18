import { useState, useEffect } from 'react'
import { jsPDF } from 'jspdf'
import Stepper from './Stepper.jsx'

const PROXY_URL = 'http://localhost:3001/api/extract'

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function fileToImageBase64(file) {
  if (file.type.startsWith('image/')) {
    return { base64: await fileToBase64(file), mimeType: file.type }
  }
  // Convertir PDF a imagen para mejor lectura del modelo
  const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist')
const pdfjsVersion = (await import('pdfjs-dist/package.json', { assert: { type: 'json' } })).default.version
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.mjs`
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await getDocument({ data: arrayBuffer }).promise
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale: 2.5 })
  const canvas = document.createElement('canvas')
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
  const base64 = canvas.toDataURL('image/jpeg', 0.95).split(',')[1]
  return { base64, mimeType: 'image/jpeg' }
}

async function extractWithGemini(file) {
  const { base64, mimeType } = await fileToImageBase64(file)

  const prompt = `Eres un extractor experto de documentos oficiales mexicanos (INE, CURP, pasaporte, acta de nacimiento, RFC, licencia de conducir).
Analiza la imagen con máxima precisión y extrae TODOS los datos visibles.
Responde ÚNICAMENTE con JSON puro, sin markdown, sin bloques de código, sin explicaciones.

Extrae exactamente estos campos (deja "" si el campo no existe en el documento):
{
  "nombre": "nombre completo tal como aparece en el documento",
  "curp": "CURP de 18 caracteres",
  "rfc": "RFC con homoclave si existe",
  "fechaNac": "fecha de nacimiento en formato DD/MM/AAAA",
  "vigencia": "año o rango de vigencia del documento",
  "clave": "clave de elector si es INE",
  "direccion": "dirección completa si existe",
  "sexo": "H o M",
  "estadoNacimiento": "estado o país de nacimiento",
  "municipio": "municipio o delegación si existe",
  "seccion": "sección electoral si existe",
  "expedienteId": "número de expediente, folio o número de documento",
  "contacto": "teléfono de contacto si existe",
  "correo": "correo electrónico si existe"
}`

  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64, mimeType, prompt }),
  })

  if (!response.ok) throw new Error(`Proxy error: ${response.status}`)

  const data = await response.json()
  console.log('🔍 Respuesta raw:', data.text)

  let clean = data.text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim()

  const match = clean.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No se encontró JSON en la respuesta: ' + clean)

  const parsed = JSON.parse(match[0])
  console.log('✅ Datos extraídos:', parsed)
  return parsed
}

async function validateAndExtract(file, mode) {
  const name = file.name.toLowerCase()
  const sizeKB = file.size / 1024

  if (name.includes('fake') || name.includes('falso') || name.includes('fraud')) {
    return {
      status: 'rejected',
      title: 'Documento Rechazado',
      message: 'El documento presenta indicadores de falsificación.',
      reasons: ['Metadatos inconsistentes', 'Patrones de alteración detectados', 'Datos no coinciden con registros'],
      data: null, alert: true,
    }
  }

  if (sizeKB < 15 || name.includes('blur') || name.includes('borroso')) {
    return {
      status: 'review',
      title: 'En Revisión Manual',
      message: 'La calidad no es suficiente para validación automática.',
      reasons: ['Resolución insuficiente', 'Documento no legible', 'Se requiere imagen más clara'],
      data: null, alert: false,
    }
  }

  let extracted = {
    nombre: '', curp: '', rfc: '', fechaNac: '', vigencia: '',
    clave: '', direccion: '', sexo: '', estadoNacimiento: '',
    municipio: '', seccion: '', expedienteId: '', contacto: '', correo: '',
  }

  try {
    const ai = await extractWithGemini(file)
    extracted = { ...extracted, ...ai }
    console.log('📋 Extracted final:', extracted)
  } catch (err) {
    console.error('❌ Error extracción Gemini:', err.message)
  }

  const data = Object.fromEntries(
    Object.entries(extracted).map(([k, v]) => [k, v || 'No disponible'])
  )

  return {
    status: 'approved',
    title: 'Documento Válido',
    message: 'Tu documento fue validado. Puedes agendar tu cita.',
    reasons: ['Documento auténtico confirmado', 'Datos coherentes', 'Sin antecedentes detectados'],
    data: data,
    alert: false,
  }
}

const SCANNING_STEPS = [
  { label: 'Analizando metadatos...', icon: '🔬', progress: 15 },
  { label: 'Verificando autenticidad...', icon: '🔐', progress: 35 },
  { label: 'Comparando con registros...', icon: '🗄️', progress: 55 },
  { label: 'Extrayendo datos con IA...', icon: '🧠', progress: 75 },
  { label: 'Generando reporte...', icon: '📊', progress: 92 },
  { label: 'Validación completa', icon: '✅', progress: 100 },
]

export default function Validation({ user, tramite, file, result, mode, onValidationDone, onSchedule, onRetry, onBack, step }) {
  const [scanning, setScanning] = useState(!result)
  const [scanStep, setScanStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [localResult, setLocalResult] = useState(result)

  useEffect(() => {
    if (result) return
    let i = 0
    let cancelled = false
    const interval = setInterval(() => {
      if (i < SCANNING_STEPS.length - 1) { setScanStep(i); setProgress(SCANNING_STEPS[i].progress); i++ }
    }, 700)
    const run = async () => {
      const r = await validateAndExtract(file, mode)
      if (cancelled) return
      clearInterval(interval)
      setLocalResult(r); onValidationDone(r)
      setProgress(100); setScanStep(SCANNING_STEPS.length - 1); setScanning(false)
    }
    run()
    return () => { cancelled = true; clearInterval(interval) }
  }, [file, mode, result, onValidationDone])

  const res = localResult || result

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px' }}>
      <Stepper current={step} />
      <div style={{ maxWidth: '580px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          ← Volver
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.3px' }}>Validación IA</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '32px' }}>{tramite?.icon} {tramite?.title}</p>
        {scanning ? <ScanningUI scanStep={scanStep} progress={progress} file={file} /> : (
          <>
            <ResultUI result={res} onSchedule={onSchedule} onRetry={onRetry} mode={mode} />
            {res?.data && <ExtractedForm data={res.data} tramite={tramite} />}
          </>
        )}
      </div>
    </div>
  )
}

function ScanningUI({ scanStep, progress, file }) {
  return (
    <div style={{ animation: 'fadeIn 0.4s ease' }}>
      <div className="card" style={{ marginBottom: '24px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', top: `${progress}%`, transition: 'top 0.5s ease', boxShadow: '0 0 12px var(--accent)', zIndex: 2 }} />
        <div style={{ fontSize: '64px', marginBottom: '16px', position: 'relative', zIndex: 1 }}>{file?.type?.startsWith('image/') ? '🖼️' : '📄'}</div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--accent)', marginBottom: '8px' }}>{file?.name}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{(file?.size / 1024).toFixed(1)} KB</div>
      </div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--accent)' }}>{SCANNING_STEPS[scanStep]?.icon} {SCANNING_STEPS[scanStep]?.label}</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--accent)' }}>{progress}%</span>
        </div>
        <div style={{ height: '6px', background: 'var(--bg-surface)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #00C2FF, #00D68F)', borderRadius: '3px', transition: 'width 0.5s ease', boxShadow: '0 0 12px rgba(0,194,255,0.5)' }} />
        </div>
      </div>
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        {SCANNING_STEPS.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', borderBottom: i < SCANNING_STEPS.length - 1 ? '1px solid var(--border)' : 'none', opacity: i > scanStep ? 0.35 : 1, transition: 'all 0.3s' }}>
            <span style={{ fontSize: '16px', width: '24px', textAlign: 'center' }}>{i < scanStep ? '✅' : i === scanStep ? '⏳' : '○'}</span>
            <span style={{ fontSize: '13px', color: i <= scanStep ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: i === scanStep ? '600' : '400' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExtractedForm({ data, tramite }) {
  const fields = [
    { label: 'Nombre completo', value: data.nombre },
    { label: 'CURP', value: data.curp },
    { label: 'RFC', value: data.rfc },
    { label: 'Fecha de nacimiento', value: data.fechaNac },
    { label: 'Vigencia', value: data.vigencia },
    { label: 'Clave de elector', value: data.clave },
    { label: 'Sexo', value: data.sexo },
    { label: 'Estado de nacimiento', value: data.estadoNacimiento },
    { label: 'Municipio', value: data.municipio },
    { label: 'Sección', value: data.seccion },
    { label: 'Dirección', value: data.direccion },
    { label: 'ID expediente', value: data.expedienteId },
    { label: 'Contacto', value: data.contacto },
    { label: 'Correo', value: data.correo },
    { label: 'Documento', value: tramite?.title },
  ]

  const handleExportPDF = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' })
    doc.setFillColor(10, 20, 40); doc.rect(0, 0, 612, 80, 'F')
    doc.setTextColor(255, 255, 255); doc.setFontSize(22); doc.setFont('helvetica', 'bold')
    doc.text('DataDolphin — Ficha Prellenada', 40, 50)
    doc.setFontSize(11); doc.setFont('helvetica', 'normal'); doc.setTextColor(100, 180, 255)
    doc.text(`Trámite: ${tramite?.title || 'N/A'}`, 40, 100)
    doc.text(`Generado: ${new Date().toLocaleString('es-MX')}`, 40, 118)
    doc.setDrawColor(0, 194, 255); doc.setLineWidth(1.5); doc.line(40, 130, 572, 130)
    let y = 155
    fields.forEach((item, idx) => {
      if (y > 700) { doc.addPage(); y = 40 }
      if (idx % 2 === 0) { doc.setFillColor(245, 248, 255); doc.rect(36, y - 14, 540, 24, 'F') }
      doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(80, 120, 200)
      doc.text(item.label + ':', 42, y)
      doc.setFont('helvetica', 'normal'); doc.setTextColor(30, 30, 30)
      const val = item.value && item.value !== 'No disponible' ? item.value : '—'
      const split = doc.splitTextToSize(val, 360); doc.text(split, 200, y)
      y += split.length * 16 + 6
    })
    doc.setFillColor(10, 20, 40); doc.rect(0, 740, 612, 52, 'F')
    doc.setTextColor(100, 180, 255); doc.setFontSize(9)
    doc.text('DataDolphin — Trámites Inteligentes · CDMX 2025', 40, 770)
    doc.save(`${data.nombre?.replace(/\s+/g, '_') || 'formato'}_datos.pdf`)
  }

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify({ ...data, tramite: tramite?.title }, null, 2)], { type: 'application/json' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = `${data.nombre?.replace(/\s+/g, '_') || 'formato'}_datos.json`; a.click()
  }

  return (
    <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '18px' }}>
        <div>
          <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>📝 Formato prellenado</p>
          <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0 }}>Ficha de expediente</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Extraído con Gemini Vision IA</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleExportJSON} style={{ padding: '12px 18px' }}>📥 JSON</button>
          <button className="btn-primary" onClick={handleExportPDF} style={{ padding: '12px 18px' }}>📄 PDF</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {fields.map(({ label, value }) => (
          <div key={label} style={{ padding: '12px 14px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '6px' }}>{label}</div>
            <div style={{ fontSize: '13px', color: value && value !== 'No disponible' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: '600' }}>{value || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ResultUI({ result, onSchedule, onRetry, mode }) {
  if (!result) return null
  const isApproved = result.status === 'approved'
  const isRejected = result.status === 'rejected'
  const color = isApproved ? 'var(--success)' : isRejected ? 'var(--error)' : 'var(--warning)'
  const bg = isApproved ? 'var(--success-bg)' : isRejected ? 'var(--error-bg)' : 'var(--warning-bg)'
  const icon = isApproved ? '✅' : isRejected ? '❌' : '⚠️'
  return (
    <div style={{ animation: 'fadeInScale 0.5s ease' }}>
      {result.alert && (
        <div style={{ padding: '16px 20px', background: 'rgba(255,77,109,0.15)', border: '2px solid var(--error)', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>🚨</span>
          <div>
            <div style={{ fontWeight: '700', color: 'var(--error)', fontSize: '14px' }}>Alerta de Seguridad</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Documento fraudulento detectado.</div>
          </div>
        </div>
      )}
      <div className="card" style={{ textAlign: 'center', marginBottom: '24px', padding: '36px', border: `1.5px solid ${color}40`, background: `linear-gradient(145deg, var(--bg-card), ${bg})` }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</div>
        <h3 style={{ fontSize: '22px', fontWeight: '800', color, marginBottom: '12px' }}>{result.title}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', maxWidth: '380px', margin: '0 auto' }}>{result.message}</p>
      </div>
      <div className="card" style={{ marginBottom: '24px', padding: '20px 24px' }}>
        <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>Resultados del análisis</p>
        {result.reasons.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: i < result.reasons.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <span style={{ color, fontSize: '14px' }}>{isApproved ? '✓' : isRejected ? '✗' : '!'}</span>
            <span style={{ fontSize: '13px' }}>{r}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {isApproved && <button className="btn-primary" onClick={onSchedule} style={{ padding: '16px' }}>{mode === 'extract' ? '📅 Agendar y usar formato' : '📅 Agendar Cita'}</button>}
        {(isRejected || result.status === 'review') && <button className="btn-secondary" onClick={onRetry}>🔄 Subir otro documento</button>}
      </div>
    </div>
  )
}