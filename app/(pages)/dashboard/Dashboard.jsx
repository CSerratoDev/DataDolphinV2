import { useState } from 'react'

const TRAMITES = [
  { id: 'passport', icon: '🛂', title: 'Pasaporte', desc: 'Nuevo o renovación', time: '15 min', color: '#00C2FF', categoria: 'Identidad' },
  { id: 'licencia', icon: '🚗', title: 'Licencia de Conducir', desc: 'Trámite o renovación', time: '10 min', color: '#00D68F', categoria: 'Transporte' },
  { id: 'acta', icon: '📜', title: 'Acta de Nacimiento', desc: 'Copia certificada', time: '5 min', color: '#FFB800', categoria: 'Documentos' },
  { id: 'curp', icon: '🪪', title: 'CURP', desc: 'Consulta o corrección', time: '5 min', color: '#FF7B54', categoria: 'Identidad' },
  { id: 'rfc', icon: '🏦', title: 'RFC', desc: 'Registro o actualización', time: '20 min', color: '#A78BFA', categoria: 'Fiscal' },
  { id: 'ine', icon: '🗳️', title: 'INE / Credencial de Elector', desc: 'Trámite o renovación', time: '10 min', color: '#F472B6', categoria: 'Identidad' },
  { id: 'apoyo', icon: '🤝', title: 'Inscripción a Apoyos Gov.', desc: 'Bienestar, Sembrando Vida, etc.', time: '25 min', color: '#34D399', categoria: 'Apoyos' },
  { id: 'catastro', icon: '🏠', title: 'Trámites Catastrales', desc: 'Predial, escrituras, etc.', time: '30 min', color: '#60A5FA', categoria: 'Bienes Raíces' },
]

const HISTORIAL = [
  { tramite: 'Licencia de Conducir', fecha: '10 Abr 2025', estado: 'approved', icon: '🚗' },
  { tramite: 'CURP', fecha: '02 Mar 2025', estado: 'approved', icon: '🪪' },
  { tramite: 'Pasaporte', fecha: '15 Ene 2025', estado: 'rejected', icon: '🛂' },
]

export default function Dashboard({ user, onSelectTramite, onLogout, inProgress = [] }) {
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('Todos')

  const cats = ['Todos', ...new Set(TRAMITES.map(t => t.categoria))]
  const filtered = TRAMITES.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'Todos' || t.categoria === catFilter
    return matchSearch && matchCat
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 32px',
        background: 'rgba(10, 22, 40, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🐬</span>
          <span style={{ fontWeight: '800', fontSize: '18px', letterSpacing: '-0.5px' }}>
            Data<span style={{ color: 'var(--accent)' }}>Dolphin</span>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '100px', padding: '8px 16px 8px 8px',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #0088CC)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: '700', fontSize: '13px',
            }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600' }}>{user?.name?.split(' ')[0]}</span>
          </div>
          <button onClick={onLogout} style={{
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-muted)', fontSize: '12px', padding: '8px 16px',
            borderRadius: '100px', cursor: 'pointer', transition: 'all 0.2s',
            fontFamily: 'var(--font)', fontWeight: '500',
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--error)'; e.target.style.color = 'var(--error)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-muted)' }}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '40px 32px', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Hero */}
        <div style={{ marginBottom: '40px', animation: 'fadeIn 0.5s ease' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
            Bienvenido de vuelta
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '4px' }}>
            Hola, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>¿Qué trámite quieres iniciar hoy?</p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px',
          animation: 'fadeIn 0.6s ease',
        }}>
          {[
            { label: 'Trámites disponibles', value: String(TRAMITES.length), icon: '📋', color: 'var(--accent)' },
            { label: 'Trámites en proceso', value: String(inProgress.length), icon: '⏳', color: 'var(--warning)' },
            { label: 'Tiempo promedio', value: '15 min', icon: '⚡', color: 'var(--success)' },
            { label: 'Documentos procesados', value: '2', icon: '✅', color: 'var(--accent)' },
          ].map(s => (
            <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `rgba(${s.color === 'var(--accent)' ? '0,194,255' : s.color === 'var(--success)' ? '0,214,143' : '255,184,0'}, 0.12)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', animation: 'fadeIn 0.7s ease' }}>
          <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
            <input
              className="input-field"
              style={{ paddingLeft: '40px' }}
              placeholder="Buscar trámite..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {cats.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{
                padding: '10px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: '600',
                background: catFilter === c ? 'var(--accent)' : 'var(--bg-card)',
                color: catFilter === c ? '#fff' : 'var(--text-secondary)',
                border: catFilter === c ? '1px solid var(--accent)' : '1px solid var(--border)',
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font)',
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Tramites grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '16px', marginBottom: '48px',
          animation: 'fadeIn 0.8s ease',
        }}>
          {filtered.map(t => (
            <TramiteCard key={t.id} tramite={t} onClick={() => onSelectTramite(t)} />
          ))}
        </div>

        {/* En proceso */}
        {inProgress.length > 0 && (
          <div style={{ animation: 'fadeIn 0.85s ease', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⏳</span> Trámites en proceso
            </h3>
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              {inProgress.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 24px',
                  borderBottom: i < inProgress.length - 1 ? '1px solid var(--border)' : 'none',
                  transition: 'background 0.2s',
                }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.tramite?.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{item.date} · {item.time}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.office?.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.office?.addr}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Historial */}
        <div style={{ animation: 'fadeIn 0.9s ease' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📂</span> Historial de Trámites
          </h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {HISTORIAL.map((h, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: i < HISTORIAL.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span style={{ fontSize: '22px' }}>{h.icon}</span>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{h.tramite}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{h.fecha}</div>
                  </div>
                </div>
                <span className={`badge badge-${h.estado === 'approved' ? 'success' : 'error'}`}>
                  {h.estado === 'approved' ? '✓ Aprobado' : '✗ Rechazado'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

function TramiteCard({ tramite, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="card"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${tramite.color}40` : 'var(--shadow)',
        borderColor: hovered ? `${tramite.color}40` : 'var(--border)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: `linear-gradient(90deg, ${tramite.color}, ${tramite.color}80)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.25s',
      }} />
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: `${tramite.color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '26px', marginBottom: '14px',
        border: `1px solid ${tramite.color}30`,
      }}>
        {tramite.icon}
      </div>
      <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '4px' }}>{tramite.title}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginBottom: '14px' }}>{tramite.desc}</div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: '11px', fontWeight: '600', color: tramite.color,
          background: `${tramite.color}15`, padding: '4px 10px', borderRadius: '100px',
          border: `1px solid ${tramite.color}30`,
        }}>
          ⚡ {tramite.time}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '500' }}>{tramite.categoria}</span>
      </div>
    </div>
  )
}
