'use client';

import { HiCheck } from 'react-icons/hi2';

const STEPS = [
    { id: 1, label: 'Subir', description: 'Documentación' },
    { id: 2, label: 'Validar', description: 'Análisis IA' },
    { id: 3, label: 'Agendar', description: 'Cita Previa' },
    { id: 4, label: 'Listo', description: 'Confirmación' }
];

export default function Stepper({ current }: { current: number }) {
    return (
        <div className="w-full max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between gap-4">
                {STEPS.map((step, i) => {
                    const isDone = current > step.id;
                    const isActive = current === step.id;
                    const isLast = i === STEPS.length - 1;

                    return (
                        <div key={step.id} className="flex-1 flex flex-col gap-3">
                            {/* Línea de Progreso */}
                            <div className="flex items-center gap-2">
                                <div 
                                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                                        isDone ? 'bg-emerald-500' : isActive ? 'bg-[#0f2d5e]' : 'bg-slate-200'
                                    }`} 
                                />
                                {!isLast && (
                                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                                )}
                            </div>

                            {/* Etiquetas */}
                            <div className="px-1">
                                <div className="flex items-center gap-1.5">
                                    {isDone ? (
                                        <HiCheck className="text-emerald-500 text-sm font-black" />
                                    ) : (
                                        <span className={`text-[10px] font-black ${isActive ? 'text-[#0f2d5e]' : 'text-slate-400'}`}>
                                            0{step.id}
                                        </span>
                                    )}
                                    <span className={`text-[11px] font-black uppercase tracking-widest ${
                                        isActive ? 'text-[#0f2d5e]' : isDone ? 'text-slate-600' : 'text-slate-400'
                                    }`}>
                                        {step.label}
                                    </span>
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 mt-0.5 ml-[18] hidden md:block">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}