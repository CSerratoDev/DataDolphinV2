'use client';

import { useState, useEffect } from 'react';
import { 
    HiOutlineCheckCircle, 
    HiOutlineClipboardDocumentList, 
    HiOutlineCalendarDays, 
    HiOutlineClock, 
    HiOutlineBuildingOffice2, 
    HiOutlineMapPin, 
    HiOutlineUserCircle,
    HiOutlineDocumentDuplicate,
    HiOutlineHome,
    HiOutlineInformationCircle
} from 'react-icons/hi2';
import { GiDolphin } from "react-icons/gi";
import Stepper from './Stepper';

export default function Confirmation({ user, tramite, appointment, onDone, step }: any) {
    const [confCode] = useState(() => `DD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const text = `DataDolphin — Confirmación de Cita\nFolio: ${confCode}\nTrámite: ${tramite?.title}\nFecha: ${appointment?.date}\nHora: ${appointment?.time}\nSucursal: ${appointment?.office?.name}`;
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-2xl mx-auto py-8 space-y-8 animate-in fade-in duration-700">
            <Stepper current={step} />

            <div className="text-center space-y-4 mb-10">
                <div className="relative inline-block">
                    <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center border border-emerald-100 shadow-sm mx-auto animate-bounce">
                        <HiOutlineCheckCircle className="text-5xl text-emerald-500" />
                    </div>
                    <div className="absolute -inset-4 bg-emerald-400/20 blur-3xl -z-10 rounded-full animate-pulse" />
                </div>
                
                <h2 className="text-4xl font-black text-[#0f2d5e] tracking-tight italic">¡Cita Agendada!</h2>
                <p className="text-slate-500 font-medium">
                    Tu proceso de orquestación ha finalizado con éxito.<br/>
                    Recibirás un recordatorio vía SMS y correo.
                </p>
            </div>

            {/* TICKET DE CONFIRMACIÓN */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
                {/* Header del Ticket */}
                <div className="bg-[#0f2d5e] p-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                        <GiDolphin className="text-xl text-cyan-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Confirmación de Servicio</span>
                    </div>
                    <div className="bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                        <span className="font-mono text-xs font-bold tracking-widest">{confCode}</span>
                    </div>
                </div>

                {/* Grid de Detalles */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { icon: HiOutlineClipboardDocumentList, label: 'Trámite', value: tramite?.title },
                        { icon: HiOutlineCalendarDays, label: 'Fecha', value: appointment?.date },
                        { icon: HiOutlineClock, label: 'Hora', value: appointment?.time },
                        { icon: HiOutlineUserCircle, label: 'Solicitante', value: user?.sub },
                        { icon: HiOutlineBuildingOffice2, label: 'Sucursal', value: appointment?.office?.name },
                        { icon: HiOutlineMapPin, label: 'Ubicación', value: appointment?.office?.addr },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                                <item.icon className="text-xl text-[#0f2d5e]/70" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                <p className="text-sm font-bold text-[#0f2d5e] truncate">{item.value || 'N/A'}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer del Ticket con Instrucciones */}
                <div className="px-8 pb-8 pt-4 border-t border-dashed border-slate-200 mt-2">
                    <div className="flex items-center gap-2 mb-4 text-amber-600">
                        <HiOutlineInformationCircle className="text-lg" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Protocolo de Asistencia</span>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            'Presentar folio en recepción',
                            'Documentos originales listos',
                            'Arribo 10 min antes',
                            'Identificación oficial vigente'
                        ].map((text, i) => (
                            <li key={i} className="text-[11px] font-bold text-slate-500 flex items-center gap-2">
                                <div className="w-1 h-1 bg-slate-300 rounded-full" /> {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                    onClick={handleCopy}
                    className="flex-1 py-4 rounded-[1.5rem] bg-white border border-slate-200 text-[#0f2d5e] font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
                >
                    <HiOutlineDocumentDuplicate className="text-lg" />
                    {copied ? '¡Copiado!' : 'Copiar Detalles'}
                </button>
                <button 
                    onClick={onDone}
                    className="flex-1 py-4 rounded-[1.5rem] bg-[#0f2d5e] text-white font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20 hover:bg-[#163a70] transition-all active:scale-95"
                >
                    <HiOutlineHome className="text-lg" />
                    Finalizar y Salir
                </button>
            </div>

            <footer className="text-center pt-8">
                <div className="flex items-center justify-center gap-2 text-slate-300">
                    <GiDolphin className="text-xl" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        DataDolphin V2 · Secure Orchestration System
                    </span>
                </div>
            </footer>
        </div>
    );
}