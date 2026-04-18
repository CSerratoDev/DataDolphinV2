import { useState } from 'react'
import Stepper from './Stepper.jsx'

const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DAYS_W = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
const HOURS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','16:00','16:30','17:00','17:30']
const BLOCKED = [2, 5, 9, 11] // índices bloqueados

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay()
}

const OFFICES = [
  { id: 'norte', name: 'Oficina Norte — Delegación Gustavo A. Madero', addr: 'Av. Instituto Politécnico Nacional 9401, CDMX' },
  { id: 'centro', name: 'Centro Histórico — Palacio de Gobierno', addr: 'Plaza de la Constitución 1, Centro, CDMX' },
  { id: 'sur', name: 'Módulo Sur — Coyoacán', addr: 'Av. División del Norte 1611, Coyoacán, CDMX' },
]

export default function Schedule({ user, tramite, onSchedule, onBack, step }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedOffice, setSelectedOffice] = useState(null)
  const [error, setError] = useState('')

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDay(year, month)

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  const isWeekend = (day) => {
    const d = new Date(year, month, day).getDay()
    return d === 0 || d === 6
  }

  const isPast = (day) => {
    const d = new Date(year, month, day)
    d.setHours(0,0,0,0)
    const t = new Date(); t.setHours(0,0,0,0)
    return d < t
  }

  const handleConfirm = () => {
    if (!selectedDay || !selectedHour || !selectedOffice) {
      setError('Selecciona fecha, hora y sucursal para continuar.')
      return
    }
    setError('')
    onSchedule({
      date: `${selectedDay} de ${MONTHS[month]} de ${year}`,
      time: selectedHour,
      office: OFFICES.find(o => o.id === selectedOffice),
      tramite,
    })
  }

  return (
    <div style={{ minHeight: '100vh', padding: '32px 24px' }}>
      <Stepper current={step} />
      <div style={{ maxWidth: '640px', margin: '0 auto', animation: 'fadeIn 0.5s ease' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: 'var(--text-secondary)',
          fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font)',
          display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '24px',
        }}>← Volver</button>

        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px', letterSpacing: '-0.3px' }}>
          📅 Agendar Cita
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '32px' }}>
          {tramite?.icon} {tramite?.title} — Selecciona fecha, hora y sucursal
        </p>

        {/* Calendar */}
        <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <button onClick={prevMonth} style={{
              width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface)',
              border: '1px solid var(--border)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '16px',
            }}>‹</button>
            <span style={{ fontWeight: '700', fontSize: '16px' }}>{MONTHS[month]} {year}</span>
            <button onClick={nextMonth} style={{
              width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-surface)',
              border: '1px solid var(--border)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '16px',
            }}>›</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
            {DAYS_W.map(d => (
              <div key={d} style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', padding: '8px 0' }}>{d}</div>
            ))}
            {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const weekend = isWeekend(day)
              const past = isPast(day)
              const blocked = past || weekend
              const selected = selectedDay === day

              return (
                <button key={day} onClick={() => !blocked && setSelectedDay(day)} style={{
                  padding: '10px 6px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                  background: selected ? 'var(--accent)' : 'transparent',
                  color: blocked ? 'var(--text-muted)' : selected ? '#fff' : 'var(--text-primary)',
                  border: selected ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: blocked ? 'not-allowed' : 'pointer',
                  opacity: blocked ? 0.4 : 1,
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font)',
                  boxShadow: selected ? '0 0 12px rgba(0,194,255,0.4)' : 'none',
                }}>
                  {day}
                </button>
              )
            })}
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
            Fines de semana y fechas pasadas no disponibles
          </p>
        </div>

        {/* Time */}
        {selectedDay && (
          <div className="card" style={{ marginBottom: '24px', padding: '24px', animation: 'fadeIn 0.3s ease' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              🕐 Hora disponible
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {HOURS.map((h, i) => {
                const blocked = BLOCKED.includes(i)
                const selected = selectedHour === h
                return (
                  <button key={h} onClick={() => !blocked && setSelectedHour(h)} style={{
                    padding: '10px 8px', borderRadius: 'var(--radius-sm)', fontSize: '13px', fontWeight: '600',
                    background: selected ? 'var(--accent)' : blocked ? 'var(--bg-surface)' : 'var(--bg-hover)',
                    color: blocked ? 'var(--text-muted)' : selected ? '#fff' : 'var(--text-primary)',
                    border: selected ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
                    cursor: blocked ? 'not-allowed' : 'pointer',
                    opacity: blocked ? 0.4 : 1,
                    transition: 'all 0.15s', fontFamily: 'var(--mono)',
                  }}>
                    {blocked ? '—' : h}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Office */}
        {selectedDay && selectedHour && (
          <div className="card" style={{ marginBottom: '24px', padding: '24px', animation: 'fadeIn 0.3s ease' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
              🏢 Sucursal
            </p>
            {OFFICES.map(o => (
              <div key={o.id} onClick={() => setSelectedOffice(o.id)} style={{
                padding: '16px', borderRadius: 'var(--radius-sm)', marginBottom: '10px',
                border: `1.5px solid ${selectedOffice === o.id ? 'var(--accent)' : 'var(--border)'}`,
                background: selectedOffice === o.id ? 'var(--accent-dim)' : 'var(--bg-surface)',
                cursor: 'pointer', transition: 'all 0.2s',
              }}>
                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px', color: selectedOffice === o.id ? 'var(--accent)' : 'var(--text-primary)' }}>
                  {o.name}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{o.addr}</div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {selectedDay && selectedHour && selectedOffice && (
          <div className="card" style={{
            marginBottom: '24px', padding: '20px 24px',
            border: '1.5px solid var(--success)', background: 'var(--success-bg)',
            animation: 'fadeIn 0.3s ease',
          }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--success)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
              ✓ Resumen de tu cita
            </p>
            {[
              ['Trámite', `${tramite?.icon} ${tramite?.title}`],
              ['Fecha', `${selectedDay} de ${MONTHS[month]} de ${year}`],
              ['Hora', selectedHour],
              ['Sucursal', OFFICES.find(o => o.id === selectedOffice)?.name],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(0,214,143,0.15)' }}>
                <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '600' }}>{k}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: '500' }}>{v}</span>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ padding: '12px 16px', background: 'var(--error-bg)', border: '1px solid rgba(255,77,109,0.3)', borderRadius: 'var(--radius-sm)', color: 'var(--error)', fontSize: '13px', marginBottom: '16px' }}>
            ⚠️ {error}
          </div>
        )}

        <button className="btn-primary" onClick={handleConfirm} style={{ padding: '16px' }}
          disabled={!selectedDay || !selectedHour || !selectedOffice}>
          ✓ Confirmar Cita
        </button>
      </div>
    </div>
  )
}
