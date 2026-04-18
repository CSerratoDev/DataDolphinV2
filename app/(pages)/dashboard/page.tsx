'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface UserProfile {
    sub: string;
    id: number;
    role: string;
}

const StatCard = ({ title, value, detail }: { title: string; value: string; detail: string }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm transition-hover hover:shadow-md">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-bold text-[#001f3f] my-2 tracking-tight">{value}</h3>
        <p className="text-xs text-slate-500">{detail}</p>
    </div>
);

export default function Dashboard() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUser(payload);
        } catch (error) {
            localStorage.removeItem("token");
            router.push("/login");
        }
    }, [router]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("company_id", "1"); // ID temporal para pruebas

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/`, {
                method: "POST",
                body: formData, // No necesita headers de Content-Type, el navegador lo pone como multipart
            });

            if (!response.ok) throw new Error("Fallo en la carga");

            const data = await response.json();
            alert(`Archivo ${data.file_name} subido correctamente.`);

        } catch (err: any) {
            alert(`Error: ${err.message}`);
        } finally {
            setUploading(false);
            e.target.value = ""; // Limpiar input
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900">
            <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image src="/logo/datadolphin.png" alt="logo" width={30} height={30} />
                    <span className="font-bold text-[#001f3f] text-lg tracking-tight">DataDolphin</span>
                </div>

                <div className="flex items-center gap-6">
                    {/* Botón de subida oculto tras un label con estilo */}
                    <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${uploading ? "bg-slate-100 text-slate-400" : "bg-[#001f3f] text-white hover:bg-[#002b56] shadow-lg active:scale-95"}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        {uploading ? "SUBIENDO..." : "SUBIR PDF"}
                        <input type="file" className="hidden" accept=".pdf" onChange={handleUpload} disabled={uploading} />
                    </label>

                    <div className="relative">
                        <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-[#001f3f] text-white flex items-center justify-center text-[10px] font-bold">
                                {user.sub.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-slate-700">{user.sub}</span>
                        </button>

                        {isProfileOpen && (
                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 animate-in fade-in zoom-in duration-200">
                                <div className="px-4 py-3 border-b border-slate-50">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sesión activa</p>
                                    <p className="text-sm font-bold text-[#001f3f] truncate mt-0.5">{user.sub}</p>
                                    <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase">{user.role}</span>
                                </div>
                                <button onClick={handleLogout} className="w-full text-left px-4 py-3 mt-1 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2 font-bold">
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto p-10 space-y-10">
                <header>
                    <h1 className="text-4xl font-black text-[#001f3f] tracking-tight italic">Orchestration Overview</h1>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatCard title="Total Documents Processed" value="1.4M" detail="↗ +12% this week" />
                    <StatCard title="Active AI Agents" value="342" detail="Distributed Load: 68%" />
                    <StatCard title="Capability Loading" value="System Ready" detail="PyMuPDF Core Modules" />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <h2 className="text-xl font-bold text-[#001f3f]">Asynchronous Queue</h2>
                                <p className="text-xs text-slate-400 font-medium">Live document processing streams</p>
                            </div>
                            <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">View All Streams</span>
                        </div>

                        <div className="space-y-3">
                            {[
                                { name: "Passport Scan Batch #8842", sub: "Intl. Identity Verification Stream", status: "Processing" },
                                { name: "Fiscal Report Q3 - TechCorp", sub: "Corporate Audit Stream", status: "Needs Approval", urgent: true },
                            ].map((task, i) => (
                                <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            <div className="w-5 h-5 bg-blue-100 rounded-sm" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#001f3f]">{task.name}</p>
                                            <p className="text-[10px] text-slate-400 font-semibold">{task.sub}</p>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter ${task.urgent ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                                        {task.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#001f3f] rounded-[2.5rem] p-8 text-white overflow-hidden relative shadow-2xl border border-white/10">
                        <h2 className="text-[10px] font-black opacity-40 mb-6 uppercase tracking-[0.2em]">Skill Console</h2>
                        <div className="font-mono text-[11px] space-y-3 relative z-10 leading-relaxed">
                            <p className="text-blue-400">{"> [INFO] Initializing clause extraction..."}</p>
                            <p className="text-blue-300">{"> [DATA] Regex pattern matching complete."}</p>
                            <p className="text-amber-400">{"> [WARN] Ambiguity detected in section 4.2."}</p>
                            <p className="text-emerald-400">{"> [SUCCESS] Model sync with UAQ-Server."}</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#001f3f] via-[#001f3f]/80 to-transparent" />
                    </div>
                </section>
            </main>
        </div>
    );
}