'use client';

import { useState } from 'react';
import { 
    HiOutlineCalendarDays, 
    HiOutlineClock, 
    HiOutlineBuildingOffice2, 
    HiOutlineChevronLeft, 
    HiOutlineChevronRight,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineArrowLeft
} from 'react-icons/hi2';
import Stepper from './Stepper';

const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DAYS_W = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const HOURS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '16:00', '16:30', '17:00', '17:30'];
const BLOCKED = [2, 5, 9, 11];

const OFFICES = [
    { id: 'norte', name: 'Oficina Norte — Delegación GAM', addr: 'Av. Instituto Politécnico Nacional 9401, CDMX' },
    { id: 'centro', name: 'Centro Histórico — Palacio de Gobierno', addr: 'Plaza de la Constitución 1, Centro, CDMX' },
    { id: 'sur', name: 'Módulo Sur — Coyoacán', addr: 'Av. División del Norte 1611, Coyoacán, CDMX' },
];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDay(year: number, month: number) { return new Date(year, month, 1).getDay(); }

export default function Schedule({ user, tramite, onSchedule, onBack, step }: any) {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [selectedHour, setSelectedHour] = useState<string | null>(null);
    const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
    const [error, setError] = useState('');

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDay(year, month);

    const isWeekend = (day: number) => {
        const d = new Date(year, month, day).getDay();
        return d === 0 || d === 6;
    };

    const isPast = (day: number) => {
        const d = new Date(year, month, day);
        d.setHours(0, 0, 0, 0);
        const t = new Date(); t.setHours(0, 0, 0, 0);
        return d < t;
    };

    const handleConfirm = () => {
        if (!selectedDay || !selectedHour || !selectedOffice) {
            setError('Selecciona fecha, hora y sucursal para continuar.');
            return;
        }
        onSchedule({
            date: `${selectedDay} de ${MONTHS[month]} de ${year}`,
            time: selectedHour,
            office: OFFICES.find(o => o.id === selectedOffice),
            tramite,
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Stepper current={step} />

            <div className="mt-10">
                <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#0f2d5e] font-bold text-xs uppercase tracking-widest transition-colors mb-8">
                    <HiOutlineArrowLeft /> Volver
                </button>

                <div className="mb-10">
                    <h2 className="text-3xl font-black text-[#0f2d5e] tracking-tight italic flex items-center gap-3">
                        <HiOutlineCalendarDays className="text-blue-500" /> Agendar Cita
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                        {tramite?.title} — Configuración de disponibilidad presencial
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* CALENDARIO */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-blue-900/5">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-sm font-black text-[#0f2d5e] uppercase tracking-widest">
                                    {MONTHS[month]} {year}
                                </h3>
                                <div className="flex gap-2">
                                    <button onClick={() => setMonth(m => m - 1)} className="p-2 hover:bg-slate-50 rounded-full border border-slate-100 transition-colors">
                                        <HiOutlineChevronLeft />
                                    </button>
                                    <button onClick={() => setMonth(m => m + 1)} className="p-2 hover:bg-slate-50 rounded-full border border-slate-100 transition-colors">
                                        <HiOutlineChevronRight />
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {DAYS_W.map(d => (
                                    <div key={d} className="text-[10px] font-black text-slate-400 text-center uppercase py-2">
                                        {d}
                                    </div>
                                ))}
                                {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} />)}
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                    const blocked = isPast(day) || isWeekend(day);
                                    const selected = selectedDay === day;

                                    return (
                                        <button
                                            key={day}
                                            disabled={blocked}
                                            onClick={() => setSelectedDay(day)}
                                            className={`
                                                aspect-square rounded-xl text-sm font-bold transition-all flex items-center justify-center
                                                ${selected ? 'bg-[#0f2d5e] text-white shadow-lg shadow-blue-900/20 scale-110' : ''}
                                                ${!selected && !blocked ? 'hover:bg-slate-50 text-slate-600 border border-transparent hover:border-slate-100' : ''}
                                                ${blocked ? 'text-slate-200 cursor-not-allowed' : ''}
                                            `}
                                        >
                                            {day}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold text-center mt-6 uppercase tracking-tighter">
                                ● Disponibilidad sujeta a carga de oficina
                            </p>
                        </div>
                    </div>

                    {/* SELECCIÓN DE HORA Y SUCURSAL */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Horas */}
                        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <HiOutlineClock className="text-blue-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Horarios Disponibles</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {HOURS.map((h, i) => {
                                    const blocked = BLOCKED.includes(i) || !selectedDay;
                                    const selected = selectedHour === h;
                                    return (
                                        <button
                                            key={h}
                                            disabled={blocked}
                                            onClick={() => setSelectedHour(h)}
                                            className={`
                                                py-3 rounded-xl text-[11px] font-mono font-bold transition-all
                                                ${selected ? 'bg-[#0f2d5e] text-white' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}
                                                ${blocked ? 'opacity-30 cursor-not-allowed grayscale' : ''}
                                            `}
                                        >
                                            {h}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sucursales */}
                        <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <HiOutlineBuildingOffice2 className="text-blue-500" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seleccionar Ubicación</span>
                            </div>
                            <div className="space-y-3">
                                {OFFICES.map(o => (
                                    <button
                                        key={o.id}
                                        onClick={() => setSelectedOffice(o.id)}
                                        className={`
                                            w-full text-left p-4 rounded-2xl border transition-all
                                            ${selectedOffice === o.id ? 'border-[#0f2d5e] bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'}
                                        `}
                                    >
                                        <p className={`text-xs font-black ${selectedOffice === o.id ? 'text-[#0f2d5e]' : 'text-slate-600'}`}>{o.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium mt-1 truncate">{o.addr}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resumen Final y Error */}
                <div className="mt-10 flex flex-col items-center">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in shake-1">
                            <HiOutlineExclamationCircle className="text-lg shrink-0" />
                            {error}
                        </div>
                    )}

                    {selectedDay && selectedHour && selectedOffice && (
                        <div className="w-full bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-in zoom-in-95">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                                    <HiOutlineCheckCircle className="text-2xl" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Resumen de Cita</p>
                                    <p className="text-sm font-bold text-[#0f2d5e]">
                                        {selectedDay} de {MONTHS[month]} • {selectedHour} • {OFFICES.find(o => o.id === selectedOffice)?.name.split('—')[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={!selectedDay || !selectedHour || !selectedOffice}
                        className={`
                            w-full max-w-md py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all
                            ${selectedDay && selectedHour && selectedOffice 
                                ? 'bg-[#0f2d5e] text-white shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]' 
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                        `}
                    >
                        Confirmar Cita Presencial
                    </button>
                </div>
            </div>
        </div>
    );
}