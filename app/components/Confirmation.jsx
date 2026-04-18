import { useState, useEffect } from 'react'
import Stepper from './Stepper.jsx'

export default function Confirmation({ user, tramite, appointment, onDone, step }) {
  const [confCode] = useState(() => `DD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    setTimeout(() => setShown(true), 100)
  }, [])

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px' }}>
      <Stepper current={step} />
      <div style={{ maxWidth: '540px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>

        {/* Success animation */}
        <div style={{
          textAlign: 'center', marginBottom: '32px',
          animation: 'fadeInScale 0.6s ease',
        }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,214,143,0.2), rgba(0,214,143,0.05))',
            border: '2px solid var(--success)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '48px', margin: '0 auto 24px',
            boxShadow: '0 0 40px rgba(0,214,143,0.3)',
            animation: 'glow 2s ease infinite',
          }}>
            🎉
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--success)', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            ¡Cita Agendada!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
            Tu cita ha sido confirmada exitosamente.<br />
            Recibirás un recordatorio 24 horas antes.
          </p>
        </div>

        {/* Confirmation card */}
        <div className="card" style={{
          marginBottom: '20px',
          border: '1.5px solid rgba(0,214,143,0.3)',
          background: 'linear-gradient(145deg, var(--bg-card), var(--success-bg))',
        }}>
          {/* Folio */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', borderBottom: '1px solid rgba(0,214,143,0.15)',
          }}>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Folio de confirmación
            </span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '14px', fontWeight: '700',
              color: 'var(--success)', background: 'var(--success-bg)',
              padding: '6px 12px', borderRadius: '100px',
              border: '1px solid rgba(0,214,143,0.3)',
            }}>
              {confCode}
            </span>
          </div>

          {/* Details */}
          {[
            { icon: '📋', label: 'Trámite', value: `${tramite?.icon} ${tramite?.title}` },
            { icon: '📅', label: 'Fecha', value: appointment?.date },
            { icon: '🕐', label: 'Hora', value: appointment?.time },
            { icon: '🏢', label: 'Sucursal', value: appointment?.office?.name },
            { icon: '📍', label: 'Dirección', value: appointment?.office?.addr },
            { icon: '👤', label: 'Solicitante', value: user?.name },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              padding: '16px 20px',
              borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              animation: `slideIn 0.4s ease ${i * 0.08}s both`,
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'var(--bg-surface)', border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '16px', flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '3px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {item.value || '—'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="card" style={{ marginBottom: '24px', padding: '20px 24px' }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
            📌 Instrucciones para tu cita
          </p>
          {[
            '🪪 Lleva los documentos originales validados en la plataforma',
            '⏰ Llega 10 minutos antes de tu hora agendada',
            '📱 Muestra este folio en la recepción: ' + confCode,
            '🚫 Si no puedes asistir, cancela con 24 horas de anticipación',
          ].map((tip, i) => (
            <div key={i} style={{
              fontSize: '13px', color: 'var(--text-secondary)', padding: '8px 0',
              borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
              animation: `slideIn 0.4s ease ${i * 0.1}s both`,
            }}>
              {tip}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button className="btn-primary" onClick={() => {
            const text = `DataDolphin — Confirmación de Cita\nFolio: ${confCode}\nTrámite: ${tramite?.title}\nFecha: ${appointment?.date}\nHora: ${appointment?.time}\nSucursal: ${appointment?.office?.name}`
            navigator.clipboard?.writeText(text)
            alert('✅ Detalles copiados al portapapeles')
          }} style={{ padding: '15px' }}>
            📋 Copiar confirmación
          </button>
          <button className="btn-secondary" onClick={onDone}>
            🏠 Volver al Dashboard
          </button>
        </div>

        <div style={{
          textAlign: 'center', marginTop: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          color: 'var(--text-muted)', fontSize: '12px',
        }}>
          <span style={{ fontSize: '14px' }}>🐬</span>
          DataDolphin — Trámites Inteligentes · CDMX 2025
        </div>
      </div>
    </div>
  )
}
