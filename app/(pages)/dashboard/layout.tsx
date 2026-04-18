"use client"
import { ReactNode, useEffect, useState } from "react";
import { 
    HiOutlineDocumentDuplicate, 
    HiOutlineClock, 
    HiOutlineCheckBadge,
    HiOutlineArrowRightOnRectangle,
    HiOutlineQueueList,
    HiOutlineBolt,
    HiOutlineInboxStack,
    HiOutlineIdentification,
    HiOutlineTruck,
    HiOutlineDocumentText,
    HiOutlineFingerPrint,
    HiOutlineBanknotes,
    HiOutlineHomeModern,
    HiOutlineClipboardDocumentCheck,
    
} from 'react-icons/hi2';
import { GiDolphin } from "react-icons/gi";
import DocumentViewer from "./DocumentViewer";
import Upload from "./Upload";
import Validation from "./Validation";
import Schedule from "./Schedule";
import Confirmation from "./Confirmation";
import Image from "next/image";

// --- INTERFACES ---
interface Document {
    id: number;
    file_name: string;
    file_extension: string;
    file_url: string;
    uploaded_at: string;
}

// --- CONSTANTES ---
const TRAMITES = [
    { id: 'passport', icon: HiOutlineFingerPrint, title: 'Pasaporte', desc: 'Nuevo o renovación', time: '15 min', color: '#00C2FF', categoria: 'Identidad' },
    { id: 'licencia', icon: HiOutlineTruck, title: 'Licencia de Conducir', desc: 'Trámite o renovación', time: '10 min', color: '#00D68F', categoria: 'Transporte' },
    { id: 'acta', icon: HiOutlineDocumentDuplicate, title: 'Acta de Nacimiento', desc: 'Copia certificada', time: '5 min', color: '#FFB800', categoria: 'Documentos' },
    { id: 'curp', icon: HiOutlineIdentification, title: 'CURP', desc: 'Consulta o corrección', time: '5 min', color: '#FF7B54', categoria: 'Identidad' },
    { id: 'rfc', icon: HiOutlineDocumentText, title: 'RFC', desc: 'Registro o actualización', time: '20 min', color: '#A78BFA', categoria: 'Fiscal' },
    { id: 'ine', icon: HiOutlineCheckBadge, title: 'INE / Elector', desc: 'Trámite o renovación', time: '10 min', color: '#F472B6', categoria: 'Identidad' },
    { id: 'apoyo', icon: HiOutlineBanknotes, title: 'Inscripción a Apoyos', desc: 'Bienestar y programas', time: '25 min', color: '#34D399', categoria: 'Apoyos' },
    { id: 'catastro', icon: HiOutlineHomeModern, title: 'Trámites Catastrales', desc: 'Predial y escrituras', time: '30 min', color: '#60A5FA', categoria: 'Bienes Raíces' },
];

const HISTORIAL = [
    { tramite: 'Licencia de Conducir', fecha: '10 Abr 2025', estado: 'approved' },
    { tramite: 'CURP', fecha: '02 Mar 2025', estado: 'approved' },
    { tramite: 'Pasaporte', fecha: '15 Ene 2025', estado: 'rejected' },
];

// --- SUB-COMPONENTES DE UI ---
const Sidebar = ({ documents, onNew }: { documents: Document[], onNew: () => void }) => (
    <aside className="w-72 border-r border-slate-200 bg-white p-6 flex flex-col gap-8 h-screen sticky top-0 shrink-0">
        <div className="flex items-center gap-3 ">
            <Image src="/logo/datadolphin.png" alt="logo" width={30} height={30} />
            <span className="font-bold text-[#001f3f] text-lg tracking-tight">DataDolphin V2</span>
        </div>

        <button 
            onClick={onNew}
            className="flex items-center justify-center gap-2 bg-[#0f2d5e] text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-900/20 hover:bg-[#1a3a6e] transition-all active:scale-95">
            <HiOutlineQueueList size={16} /> NUEVA ORQUESTACIÓN
        </button>

        <nav className="flex flex-col gap-1">
            <p className="text-[10px] font-black text-slate-400 mb-3 ml-4 uppercase tracking-[0.2em]">Sistemas</p>
            {[
                { icon: <HiOutlineInboxStack size={18} />, label: "Orquestación", active: true },
                { icon: <HiOutlineDocumentText size={18} />, label: "Taxonomía" },
                { icon: <HiOutlineBolt size={18} />, label: "Agentes IA" },
            ].map((item) => (
                <div key={item.label} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[11px] font-bold cursor-pointer transition-all ${item.active ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
                    {item.icon}
                    {item.label}
                </div>
            ))}
        </nav>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden mt-4 border-t border-slate-50 pt-6">
            <p className="text-[10px] font-black text-slate-400 ml-4 uppercase tracking-[0.2em]">Documentos Recientes</p>
            <div className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar">
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        onClick={() => window.dispatchEvent(new CustomEvent('viewDocument', { detail: { name: doc.file_name, url: doc.file_url } }))}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                        <div className="flex items-center gap-3 truncate">
                            <div className="bg-slate-100 text-slate-400 p-2 rounded-lg group-hover:bg-[#0f2d5e] group-hover:text-white transition-colors">
                                <HiOutlineDocumentDuplicate size={14} />
                            </div>
                            <div className="truncate">
                                <p className="text-[11px] font-bold text-slate-700 truncate">{doc.file_name}</p>
                                <p className="text-[9px] text-slate-400 font-black uppercase">{doc.file_extension}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </aside>
);

// --- COMPONENTE PRINCIPAL ---
export default function DashboardLayout({ user, onSelectTramite, onLogout, inProgress = [] }: any) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('Todos');
    const [screen, setScreen] = useState<'dashboard'|'upload'|'validation'|'schedule'|'confirmation'>('dashboard');
    const [selectedTramite, setSelectedTramite] = useState<any>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [appointment, setAppointment] = useState<any>(null);
    const [processMode, setProcessMode] = useState<'validate'|'extract'>('validate');

    const startFlow = (tramite: any) => {
        setSelectedTramite(tramite);
        setProcessMode('validate');
        setScreen('upload');
    }

    const fetchDocuments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/`);
            if (response.ok) {
                const data = await response.json();
                setDocuments(data);
            }
        } catch (error) { console.error("Error fetching docs:", error); }
    };

    useEffect(() => {
        fetchDocuments();
        window.addEventListener('refreshDocuments', fetchDocuments);
        return () => window.removeEventListener('refreshDocuments', fetchDocuments);
    }, []);

    const cats = ['Todos', ...Array.from(new Set(TRAMITES.map(t => t.categoria)))];
    const filtered = TRAMITES.filter(t => {
        const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
        const matchCat = catFilter === 'Todos' || t.categoria === catFilter;
        return matchSearch && matchCat;
    });

    return (
        <div className="flex min-h-screen bg-[#fafbfc] font-sans">
            <Sidebar documents={documents} onNew={() => { setCatFilter('Todos'); setSearch(''); }} />
            
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* Header Integrado */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex items-center justify-between">
                    <div className="relative w-96">
                        <input 
                            type="text" 
                            placeholder="Buscar trámite o documento..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-[#0f2d5e] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                        />
                    </div>

                        <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2">
                            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xs font-black">
                                {user?.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <span className="text-xs font-bold text-[#0f2d5e] hidden md:block">{user?.name?.split(' ')[0]}</span>
                        </div>
                        <button onClick={() => onLogout?.()} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                            <HiOutlineArrowRightOnRectangle className="text-xl" />
                        </button>
                        {/* Indicador de modo de proceso (cuando se está en un flujo) */}
                        {screen !== 'dashboard' && (
                            <div className="ml-3 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-wider">
                                {processMode === 'validate' ? 'Validar solo' : 'Extraer formato'}
                            </div>
                        )}
                    </div>
                </header>

                <div className="p-8 md:p-12 max-w-7xl mx-auto w-full space-y-12">
                    {screen !== 'dashboard' ? (
                        <div className="max-w-4xl mx-auto">
                            <button 
                                onClick={() => setScreen('dashboard')}
                                className="mb-8 text-xs font-bold text-slate-400 hover:text-[#0f2d5e] transition-colors flex items-center gap-2"
                            >
                                <span className="translate-x-0 transition-transform">←</span> VOLVER AL PANEL
                            </button>

                            <div className="bg-white rounded-4xl border border-slate-100 shadow-xl p-8 md:p-12">
                                {screen === 'upload' && (
                                    <Upload
                                        user={user}
                                        tramite={selectedTramite}
                                        processMode={processMode}
                                        onModeChange={(m: 'validate' | 'extract') => setProcessMode(m)}
                                        onFileUploaded={(file: File) => { setUploadedFile(file); setScreen('validation'); }}
                                        onBack={() => setScreen('dashboard')}
                                        step={1}
                                    />
                                )}

                                {screen === 'validation' && (
                                    <Validation
                                        tramite={selectedTramite}
                                        file={uploadedFile}
                                        processMode={processMode}
                                        onSchedule={() => setScreen('schedule')}
                                        onBack={() => setScreen('upload')}
                                        step={2}
                                    />
                                )}

                                {screen === 'schedule' && (
                                    <Schedule
                                        user={user}
                                        tramite={selectedTramite}
                                        onSchedule={(apt: any) => { setAppointment(apt); setScreen('confirmation'); }}
                                        onBack={() => setScreen('validation')}
                                        step={3}
                                    />
                                )}

                                {screen === 'confirmation' && (
                                    <Confirmation
                                        user={user}
                                        tramite={selectedTramite}
                                        appointment={appointment}
                                        onDone={() => setScreen('dashboard')}
                                        step={4}
                                    />
                                )}
                            </div>
                        </div>
                    ) : null}
                    {/* Dashboard content */}
                    {screen === 'dashboard' ? (
                    <>
                    {/* Hero */}
                    <section className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Terminal de Identidad Digital</p>
                        <h1 className="text-4xl font-black text-[#0f2d5e] tracking-tight italic">
                            Hola, {user?.name?.split(' ')[0]} <span className="not-italic opacity-40">/</span>
                        </h1>
                    </section>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in zoom-in-95 duration-1000">
                        {[
                            { label: 'Disponibles', value: TRAMITES.length, icon: HiOutlineQueueList, color: 'text-blue-500', bg: 'bg-blue-50' },
                            { label: 'En proceso', value: inProgress.length, icon: HiOutlineClock, color: 'text-amber-500', bg: 'bg-amber-50' },
                            { label: 'SLA Promedio', value: '12m', icon: HiOutlineBolt, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { label: 'Documentos', value: documents.length, icon: HiOutlineClipboardDocumentCheck, color: 'text-cyan-500', bg: 'bg-cyan-50' },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-5 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center text-xl`}><stat.icon /></div>
                                <div>
                                    <div className="text-xl font-black text-[#0f2d5e] leading-none">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filtros Categorías */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {cats.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCatFilter(cat)}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    catFilter === cat ? 'bg-[#0f2d5e] text-white shadow-lg shadow-blue-900/20' : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Trámites Grid */}
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filtered.map(t => (
                            <div 
                                key={t.id}
                                onClick={() => { onSelectTramite?.(t); startFlow(t); }}
                                className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all cursor-pointer overflow-hidden active:scale-95"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: t.color }} />
                                <div className="w-14 h-14 rounded-3xl flex items-center justify-center mb-6 shadow-inner border border-slate-50" style={{ backgroundColor: `${t.color}10`, color: t.color }}>
                                    <t.icon className="text-3xl transition-transform group-hover:scale-110" />
                                </div>
                                <h3 className="text-lg font-black text-[#0f2d5e] tracking-tight mb-2 italic uppercase">{t.title}</h3>
                                <p className="text-xs font-medium text-slate-400 leading-relaxed mb-6 line-clamp-2">{t.desc}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <span className="flex items-center gap-1.5 text-[10px] font-black tracking-widest" style={{ color: t.color }}><HiOutlineClock /> {t.time}</span>
                                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{t.categoria}</span>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Secciones Inferiores: En Proceso e Historial */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 px-2">
                                <HiOutlineInboxStack className="text-amber-500 text-2xl" />
                                <h3 className="text-sm font-black text-[#0f2d5e] uppercase tracking-[0.2em]">En Orquestación</h3>
                            </div>
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-50">
                                {inProgress.length > 0 ? inProgress.map((item: any, i: number) => (
                                    <div key={i} className="p-6 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500"><HiOutlineClock className="text-xl" /></div>
                                            <div>
                                                <p className="text-sm font-bold text-[#0f2d5e]">{item.tramite?.title}</p>
                                                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase">{item.date} • {item.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : <div className="p-10 text-center text-slate-300 font-bold text-xs italic">No hay trámites activos</div>}
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 px-2">
                                <HiOutlineClipboardDocumentCheck className="text-emerald-500 text-2xl" />
                                <h3 className="text-sm font-black text-[#0f2d5e] uppercase tracking-[0.2em]">Historial Reciente</h3>
                            </div>
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                                {HISTORIAL.map((h, i) => (
                                    <div key={i} className="p-6 flex items-center justify-between border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${h.estado === 'approved' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                            <div>
                                                <p className="text-sm font-bold text-[#0f2d5e]">{h.tramite}</p>
                                                <p className="text-[10px] font-mono font-bold text-slate-400">{h.fecha}</p>
                                            </div>
                                        </div>
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg ${h.estado === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{h.estado}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                    </>
                    ) : null}
                </div>
            </main>
            <DocumentViewer />
        </div>
    );
}