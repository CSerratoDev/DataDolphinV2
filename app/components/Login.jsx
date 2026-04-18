import { useState } from 'react'

const MOCK_USERS = [
  { email: 'demo@datadolphin.mx', password: '123456', name: 'Carlos Mendoza', curp: 'MECC850312HDFNRL05' },
]

export default function Login({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))

    if (mode === 'login') {
      const found = MOCK_USERS.find(u => u.email === email && u.password === password)
      if (found) {
        onLogin(found)
      } else if (email && password) {
        onLogin({ email, name: email.split('@')[0], curp: 'DEMO000000HDFNRL00' })
      } else {
        setError('Correo o contraseña incorrectos.')
      }
    } else {
      if (!name || !email || !password) {
        setError('Completa todos los campos.')
        setLoading(false)
        return
      }
      onLogin({ email, name, curp: 'NUEVO00000HDFNRL00' })
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-10%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(0,136,204,0.06) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px',
        animation: 'fadeInScale 0.6s ease forwards',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '72px', height: '72px',
            background: 'linear-gradient(135deg, var(--accent-dim), var(--bg-card))',
            border: '1.5px solid var(--border-strong)',
            borderRadius: '20px', fontSize: '36px',
            marginBottom: '16px',
            boxShadow: 'var(--shadow-accent)',
          }}>🐬</div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
            Data<span style={{ color: 'var(--accent)' }}>Dolphin</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px' }}>
            Trámites gubernamentales inteligentes
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '36px' }}>
          {/* Tab switch */}
          <div style={{
            display: 'flex', background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-sm)', padding: '4px', marginBottom: '28px',
          }}>
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => { setMode(m); setError('') }} style={{
                flex: 1, padding: '10px',
                borderRadius: '8px',
                fontSize: '13px', fontWeight: '600',
                background: mode === m ? 'var(--bg-card)' : 'transparent',
                color: mode === m ? 'var(--accent)' : 'var(--text-muted)',
                border: mode === m ? '1px solid var(--border-strong)' : '1px solid transparent',
                transition: 'all 0.2s',
              }}>
                {m === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {mode === 'register' && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Nombre completo
                </label>
                <input
                  className="input-field"
                  type="text"
                  placeholder="Juan Pérez García"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Correo electrónico
              </label>
              <input
                className="input-field"
                type="email"
                placeholder="correo@ejemplo.mx"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Contraseña
              </label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px', background: 'var(--error-bg)',
                border: '1px solid rgba(255,77,109,0.3)', borderRadius: 'var(--radius-sm)',
                color: 'var(--error)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <span>⚠️</span> {error}
              </div>
            )}

            <button className="btn-primary" type="submit" disabled={loading} style={{ marginTop: '8px' }}>
              {loading ? (
                <>
                  <span style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                  Procesando...
                </>
              ) : mode === 'login' ? '→ Iniciar Sesión' : '→ Crear Cuenta'}
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              color: 'var(--text-muted)', fontSize: '12px',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              o
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <button type="button" className="btn-secondary" onClick={() => onLogin({ email: 'demo@datadolphin.mx', name: 'Carlos Mendoza', curp: 'MECC850312HDFNRL05' })}>
              <GoogleIcon /> Continuar con Google
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', marginTop: '20px' }}>
          Demo: <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>demo@datadolphin.mx / 123456</span>
        </p>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}
