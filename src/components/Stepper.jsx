const STEPS = ['Subir', 'Validar', 'Agendar', 'Listo']

export default function Stepper({ current }) {
  return (
    <div style={{ maxWidth: '580px', margin: '0 auto 32px' }}>
      <div className="stepper">
        {STEPS.map((label, i) => {
          const stepNum = i + 1
          const isDone = current > stepNum
          const isActive = current === stepNum
          return (
            <div key={label} className={`step-item ${isDone ? 'done' : isActive ? 'active' : ''}`}>
              <div className="step-circle">
                {isDone ? '✓' : stepNum}
              </div>
              <span className="step-label">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
