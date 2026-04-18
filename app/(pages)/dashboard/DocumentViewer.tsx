'use client';

import { useEffect, useState } from "react";

export default function DocumentViewer() {
    const [viewingDoc, setViewingDoc] = useState<{ name: string; url: string } | null>(null);

    useEffect(() => {
        const handleOpenDoc = (e: any) => {
            setViewingDoc(e.detail);
        };
        window.addEventListener('viewDocument', handleOpenDoc);
        return () => window.removeEventListener('viewDocument', handleOpenDoc);
    }, []);

    if (!viewingDoc) return null;

    // Ajustamos la URL para que sea accesible (considerando tu carpeta uploads)
    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}/${viewingDoc.url}`;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-200">
            {/* Backdrop con Blur estilo macOS */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setViewingDoc(null)}
            />
            
            {/* Contenedor del Modal */}
            <div className="relative bg-white w-full h-full max-w-6xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/20">
                {/* Header del Modal */}
                <div className="px-8 py-4 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vista del Documento</p>
                        <h3 className="text-sm font-bold text-[#001f3f] truncate">{viewingDoc.name}</h3>
                    </div>
                    <button 
                        onClick={() => setViewingDoc(null)}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-red-500"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </button>
                </div>

                {/* Visor de PDF */}
                <div className="flex-1 bg-slate-50">
                    <iframe 
                        src={`${fullUrl}#toolbar=0`} 
                        className="w-full h-full border-none"
                        title={viewingDoc.name}
                    />
                </div>
            </div>
        </div>
    );
}