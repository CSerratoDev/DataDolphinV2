import { useState, useRef } from 'react'
import Stepper from './Stepper.jsx'

export default function Upload({ user, tramite, onFileUploaded, onBack, step, processMode, onModeChange }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowed.includes(f.type)) {
      setError('Solo se aceptan imágenes (JPG, PNG) o PDF.')
      return
    }
    setError('')
    setFile(f)
    if (f.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = e => setPreview(e.target.result)
      reader.readAsDataURL(f)
    } else {
      setPreview('pdf')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  const handleValidate = () => {
    if (!file) { setError('Por favor selecciona un documento.'); return }
    onFileUploaded(file, processMode || 'validate')
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px' }}>
      <Stepper current={step} />
      <div style={{ maxWidth: '580px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <button onClick={onBack} style={{
            background: 'none', border: 'none', color: 'var(--text-secondary)',
            fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font)',
            display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px',
            padding: '6px 0',
          }}>
            ← Volver al dashboard
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px' }}>{tramite?.icon}</span>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.3px' }}>{tramite?.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Sube tu documento para validación</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
            <button
              className="btn-secondary"
              style={{ background: processMode === 'validate' ? 'var(--accent-dim)' : 'transparent', color: processMode === 'validate' ? '#fff' : 'var(--accent)' }}
              onClick={() => onModeChange?.('validate')}
            >
              ✅ Validar sólo
            </button>
            <button
              className="btn-secondary"
              style={{ background: processMode === 'extract' ? 'var(--accent-dim)' : 'transparent', color: processMode === 'extract' ? '#fff' : 'var(--accent)' }}
              onClick={() => onModeChange?.('extract')}
            >
              📝 Extraer formato
            </button>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '12px' }}>
            Elige si sólo quieres validar el documento o si además deseas extraer la información a un formato prellenado.
          </p>
        </div>

        {/* Docs requeridos */}
        <div className="card" style={{ marginBottom: '24px', padding: '20px 24px' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
            📋 Documentos requeridos
          </p>
          {getRequiredDocs(tramite?.id).map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < getRequiredDocs(tramite?.id).length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ color: 'var(--accent)', fontSize: '14px' }}>◆</span>
              <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{d}</span>
            </div>
          ))}
        </div>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          style={{
            border: `2px dashed ${dragging ? 'var(--accent)' : file ? 'var(--success)' : 'var(--border-strong)'}`,
            borderRadius: 'var(--radius)',
            padding: '40px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragging ? 'var(--accent-dim)' : file ? 'var(--success-bg)' : 'var(--bg-card)',
            transition: 'all 0.25s ease',
            marginBottom: '24px',
            position: 'relative', overflow: 'hidden',
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files[0])}
          />

          {!file ? (
            <>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                {dragging ? '📂' : '📤'}
              </div>
              <p style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px' }}>
                {dragging ? 'Suelta el archivo aquí' : 'Arrastra tu documento aquí'}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
                o haz clic para explorar archivos
              </p>
              <span style={{
                display: 'inline-block', padding: '6px 14px',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                borderRadius: '100px', fontSize: '11px', color: 'var(--text-muted)',
              }}>
                JPG, PNG, PDF — máx. 10MB
              </span>
            </>
          ) : (
            <div style={{ animation: 'fadeInScale 0.4s ease' }}>
              {preview === 'pdf' ? (
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>📄</div>
              ) : (
                <img src={preview} alt="preview" style={{
                  maxHeight: '200px', maxWidth: '100%', borderRadius: '12px',
                  objectFit: 'contain', marginBottom: '16px',
                  border: '1px solid var(--border)',
                }} />
              )}
              <p style={{ fontWeight: '700', color: 'var(--success)', fontSize: '15px', marginBottom: '4px' }}>
                ✓ {file.name}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                {(file.size / 1024).toFixed(1)} KB — {file.type}
              </p>
              <button onClick={e => { e.stopPropagation(); setFile(null); setPreview(null) }} style={{
                marginTop: '12px', background: 'var(--error-bg)', border: '1px solid rgba(255,77,109,0.3)',
                color: 'var(--error)', borderRadius: '100px', padding: '6px 16px', fontSize: '12px',
                cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: '600',
              }}>
                Cambiar archivo
              </button>
            </div>
          )}
        </div>

        {error && (
          <div style={{
            padding: '12px 16px', background: 'var(--error-bg)',
            border: '1px solid rgba(255,77,109,0.3)', borderRadius: 'var(--radius-sm)',
            color: 'var(--error)', fontSize: '13px', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            ⚠️ {error}
          </div>
        )}

        <button className="btn-primary" onClick={handleValidate} style={{ padding: '16px' }}>
          🔍 Validar Documento con IA
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', marginTop: '16px' }}>
          🔒 Tus documentos están cifrados y son procesados de forma segura
        </p>
      </div>
    </div>
  )
}

function getRequiredDocs(id) {
  const map = {
    passport: ['Acta de nacimiento (original o copia certificada)', 'INE vigente', 'Comprobante de domicilio', 'Fotografía tamaño infantil fondo blanco'],
    licencia: ['INE vigente', 'Examen médico vigente', 'Comprobante de domicilio'],
    acta: ['CURP', 'INE del solicitante'],
    curp: ['INE vigente', 'Acta de nacimiento'],
    rfc: ['CURP', 'INE vigente', 'Comprobante de domicilio'],
    ine: ['Acta de nacimiento', 'Comprobante de domicilio', 'CURP'],
    apoyo: ['CURP', 'INE vigente', 'Comprobante de domicilio', 'Estado de cuenta bancario'],
    catastro: ['Escritura o título de propiedad', 'INE vigente', 'RFC'],
  }
  return map[id] || ['INE vigente', 'Comprobante de domicilio']
}
