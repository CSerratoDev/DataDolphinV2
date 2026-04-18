"use client"
import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import DocumentViewer from "./DocumentViewer";

interface Document {
    id: number;
    file_name: string;
    file_extension: string;
    file_url: string;
    uploaded_at: string;
}

const LayoutGrid = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
        <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
        <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
        <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="1.5" rx="1" />
    </svg>
);

const Database = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const Cpu = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="7" y="7" width="10" height="10" stroke="currentColor" strokeWidth="1.5" rx="2" />
        <path d="M9 3v2M15 3v2M21 9h-2M21 15h-2M15 21v-2M9 21v-2M3 15h2M3 9h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const CheckSquare = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Plus = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface DashboardLayoutProps {
    children: ReactNode;
}

const Sidebar = ({ documents }: { documents: Document[] }) => (
    <aside className="w-72 border-r border-slate-200 bg-slate-50/50 p-6 flex flex-col gap-8 h-screen sticky top-0">
        <div className="flex items-center gap-3 ">
            <Image src="/logo/datadolphin.png" alt="logo" width={30} height={30} />
            <span className="font-bold text-[#001f3f] text-lg tracking-tight">DataDolphin V2</span>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#001f3f] text-white py-2.5 rounded-xl text-xs font-bold shadow-lg hover:bg-[#002b5b] transition-all">
            <Plus size={16} /> NUEVA AUMENTACIÓN
        </button>

        <nav className="flex flex-col gap-1">
            <p className="text-[10px] font-bold text-slate-400 mb-2 ml-4 uppercase tracking-widest">Menú Principal</p>
            {[
                { icon: <LayoutGrid size={18} />, label: "Orquestación", active: true },
                { icon: <Database size={18} />, label: "Taxonomía" },
                { icon: <Cpu size={18} />, label: "Habilidades de Agente" },
            ].map((item) => (
                <div key={item.label} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs cursor-pointer transition-all ${item.active ? "bg-white border border-slate-200 text-[#001f3f] shadow-sm font-bold" : "text-slate-500 hover:bg-slate-100"}`}>
                    {item.icon}
                    {item.label}
                </div>
            ))}
        </nav>

        {/* Sección de Documentos Recientes en Sidebar */}
        <div className="flex-1 flex flex-col gap-3 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 ml-4 uppercase tracking-widest">Documentos Recientes</p>
            <div className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar">
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        onClick={() => {
                            window.dispatchEvent(new CustomEvent('viewDocument', {
                                detail: { name: doc.file_name, url: doc.file_url }
                            }));
                        }}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                        <div className="flex items-center gap-3 truncate">
                            <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                            </div>
                            <div className="truncate">
                                <p className="text-[11px] font-bold text-slate-700 truncate">{doc.file_name}</p>
                                <p className="text-[9px] text-slate-400 font-medium uppercase">{doc.file_extension}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {documents.length === 0 && (
                    <p className="text-[10px] text-slate-400 italic ml-4">No se encontraron documentos.</p>
                )}
            </div>
        </div>
    </aside>
);

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const [documents, setDocuments] = useState<Document[]>([]);

    const fetchDocuments = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/documents/`);
            if (response.ok) {
                const data = await response.json();
                setDocuments(data);
            }
        } catch (error) {
            console.error("Error fetching docs:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
        // Listener opcional para refrescar cuando se suba un archivo
        window.addEventListener('refreshDocuments', fetchDocuments);
        return () => window.removeEventListener('refreshDocuments', fetchDocuments);
    }, []);

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar documents={documents} />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
            <DocumentViewer/>
        </div>
    );
}