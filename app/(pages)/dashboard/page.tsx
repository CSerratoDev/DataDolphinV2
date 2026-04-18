'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
    HiOutlineDocumentText, 
    HiOutlineSquares2X2, 
    HiOutlineTableCells, 
    HiOutlineCpuChip,
    HiOutlineArrowUpRight,
    HiOutlineChevronRight,
} from "react-icons/hi2";
import { GiDolphin } from "react-icons/gi";

// Asumiendo que estos componentes están en la misma carpeta
import Upload from "./Upload";
import Validation from "./Validation";
import Schedule from "./Schedule";
import Confirmation from "./Confirmation";

interface UserProfile {
    sub: string;
    id: number;
    role: string;
}

/** * COMPONENTES DE APOYO 
 */

const StatCard = ({ title, value, detail, trend }: { title: string; value: string; detail: string; trend?: boolean }) => (
    <div className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-md flex flex-col justify-between min-h-[160px]">
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] mb-4">{title}</p>
            <h3 className="text-5xl font-bold text-[#0f2d5e] tracking-tight">{value}</h3>
        </div>
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
            {trend && <HiOutlineArrowUpRight className="text-slate-400" />}
            {detail}
        </p>
    </div>
);

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all ${
        active 
        ? "bg-[#f8fafc] text-[#0f2d5e] border border-slate-100 shadow-sm" 
        : "text-slate-400 hover:bg-slate-50 border border-transparent"
    }`}>
        <Icon className="text-lg" />
        {label}
    </button>
);

const DocumentItem = ({ name }: { name: string }) => (
    <div className="flex items-center gap-3 px-2 group cursor-pointer">
        <HiOutlineDocumentText className="text-blue-500 text-lg group-hover:scale-110 transition-transform" />
        <div className="overflow-hidden">
            <p className="text-[11px] font-bold text-[#0f2d5e] truncate">{name}</p>
            <p className="text-[9px] text-slate-400 uppercase font-bold">{name.split('.').pop()}</p>
        </div>
    </div>
);

/**
 * COMPONENTE PRINCIPAL: DASHBOARD
 */
export default function Dashboard() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [screen, setScreen] = useState("dashboard");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [selectedTramite, setSelectedTramite] = useState<any>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [appointment, setAppointment] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setUser(payload);
        } catch (error) {
            localStorage.removeItem("token");
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    const startFlow = (tramite: any) => {
        setSelectedTramite(tramite);
        setScreen("upload");
    };

    if (!user) return null;

    return (
        <div className="flex min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
            

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col min-w-0">
                
                {/* TOP NAVBAR */}
                <nav className="h-20 px-10 flex items-center justify-end sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md z-40 border-b border-slate-100/50">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => startFlow({ id: "passport", title: "Pasaporte" })}
                            className="bg-[#0f2d5e] text-white px-6 py-2.5 rounded-xl text-[11px] font-black shadow-lg shadow-blue-900/10 hover:bg-[#1a3d7a] transition-all uppercase tracking-widest active:scale-95"
                        >
                            Iniciar Trámite
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-white hover:shadow-sm transition-all border border-slate-200 bg-slate-50/50"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#0f2d5e] text-white flex items-center justify-center text-[10px] font-bold">
                                    {user.sub.substring(0, 2).toUpperCase()}
                                </div>
                                <span className="text-xs font-bold text-slate-600 max-w-[120px] truncate">{user.sub}</span>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 animate-in fade-in zoom-in duration-200 z-50">
                                    <div className="px-4 py-3 border-b border-slate-50">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sesión activa</p>
                                        <p className="text-sm font-bold text-[#0f2d5e] truncate mt-0.5">{user.sub}</p>
                                        <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-tighter">{user.role}</span>
                                    </div>
                                    <button 
                                        onClick={handleLogout} 
                                        className="w-full text-left px-4 py-3 mt-1 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2 font-bold"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                <div className="p-10 pt-4 flex-1">
                    {screen === "dashboard" ? (
                        <div className="max-w-6xl mx-auto space-y-12">
                            <header>
                                <h1 className="text-5xl font-black text-[#0f2d5e] tracking-tight italic">Resumen de Orquestación</h1>
                            </header>

                            {/* STATS SECTION */}
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard title="Documentos procesados" value="1.4M" detail="+12% esta semana" trend />
                                <StatCard title="Agentes de IA activos" value="342" detail="Carga distribuida: 68%" />
                                <StatCard title="Estado de capacidades" value="Sistema listo" detail="Integración con Terminal 3 (Node.js)" />
                            </section>

                            {/* MAIN GRID */}
                            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                
                                {/* COLA ASINCRÓNICA */}
                                <div className="lg:col-span-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-bold text-[#0f2d5e]">Cola asincrónica</h2>
                                        <button className="text-xs font-bold text-blue-600 hover:underline">Ver todo</button>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                                            { name: "Validación de Identidad", sub: "Proceso mediante GPT-4 Vision / Gemma", status: "Activo" },
                                        ].map((task, i) => (
                                            <div key={i} className="bg-white border border-slate-100 p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 text-cyan-500">
                                                        <GiDolphin className="text-2xl" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-[#0f2d5e]">{task.name}</p>
                                                        <p className="text-[11px] text-slate-400 font-semibold">{task.sub}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black px-5 py-2 rounded-full uppercase bg-blue-50 text-blue-600 border border-blue-100 tracking-widest">
                                                    {task.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CONSOLA DE TERMINAL */}
                                <div className="lg:col-span-4 self-start">
                                    <div className="bg-[#0f2d5e] rounded-[2.5rem] p-8 text-white shadow-2xl border border-white/5 relative overflow-hidden group">
                                        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl group-hover:bg-blue-400/20 transition-all"></div>
                                        
                                        <div className="flex items-center gap-2 mb-8 opacity-40">
                                            
                                            <h2 className="text-[10px] font-black uppercase tracking-[0.2em]">Consola</h2>
                                        </div>

                                        <div className="font-mono text-[11px] space-y-4 leading-relaxed">
                                            <div className="flex gap-2">
                                                <span className="text-blue-400 shrink-0">{">"}</span>
                                                <p className="text-blue-300/90 break-all">[AUTH] JWT decodificado para {user.sub}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className="text-emerald-400 shrink-0">{">"}</span>
                                                <p className="text-emerald-400">[OK] Conexión establecida con FastAPI.</p>
                                            </div>
                                            <div className="flex gap-2 animate-pulse">
                                                <span className="text-slate-500 shrink-0">{">"}</span>
                                                <p className="text-slate-500">_</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    ) : (
                        /* VISTAS DE FLUJO */
                        <div className="max-w-4xl mx-auto">
                            <button 
                                onClick={() => setScreen("dashboard")}
                                className="mb-8 text-xs font-bold text-slate-400 hover:text-[#0f2d5e] transition-colors flex items-center gap-2 group"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> VOLVER AL PANEL
                            </button>

                            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl p-8 md:p-12">
                                {screen === "upload" && (
                                    <Upload
                                        user={user}
                                        tramite={selectedTramite}
                                        processMode="auto"
                                        onModeChange={() => {}}
                                        onFileUploaded={(file: File) => {
                                            setUploadedFile(file);
                                            setScreen("validation");
                                        }}
                                        onBack={() => setScreen("dashboard")}
                                        step={1}
                                    />
                                )}

                                {screen === "validation" && (
                                    <Validation
                                        tramite={selectedTramite}
                                        file={uploadedFile}
                                        onSchedule={() => setScreen("schedule")}
                                        onBack={() => setScreen("upload")}
                                        step={2}
                                    />
                                )}

                                {screen === "schedule" && (
                                    <Schedule
                                        user={user}
                                        tramite={selectedTramite}
                                        onSchedule={(apt: any) => {
                                            setAppointment(apt);
                                            setScreen("confirmation");
                                        }}
                                        onBack={() => setScreen("validation")}
                                        step={3}
                                    />
                                )}

                                {screen === "confirmation" && (
                                    <Confirmation
                                        user={user}
                                        tramite={selectedTramite}
                                        appointment={appointment}
                                        onDone={() => setScreen("dashboard")}
                                        step={4}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}