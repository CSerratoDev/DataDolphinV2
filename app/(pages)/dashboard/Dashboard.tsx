'use client';

import { useState } from 'react';
import { Plus, LayoutGrid, Database, Cpu, Search } from 'lucide-react';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import { GiDolphin } from "react-icons/gi";

// --- COMPONENTES INTERNOS ---
import StatsGrid from './components/StatsGrid';
import TramitesGrid from './components/TramitesGrid';
import InProgressSection from './components/InProgressSection';
import HistorySection from './components/HistorySection';

export default function Dashboard({ user, onSelectTramite, onLogout, inProgress = [], documents = [] }) {
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('Todos');

    return (
        <div className="flex min-h-screen bg-[#fafbfc]">
            {/* SIDEBAR INTEGRADA */}
            <Sidebar 
                documents={documents} 
                onNew={() => setCatFilter('Todos')} 
            />

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* Navbar Superior (Header de Acción) */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <h2 className="text-sm font-black text-[#0f2d5e] uppercase tracking-tighter italic">
                            Terminal / <span className="text-blue-500">Orquestación</span>
                         </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Buscar trámite..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/10 transition-all w-64"
                            />
                        </div>
                        <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                            <HiOutlineArrowRightOnRectangle size={20} />
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-6xl mx-auto w-full space-y-10">
                    {/* Saludo */}
                    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                        <h1 className="text-3xl font-black text-[#0f2d5e] tracking-tight italic">
                            Hola, {user?.name?.split(' ')[0]} <span className="not-italic opacity-30">|</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">Panel de control de servicios e identidad digital.</p>
                    </div>

                    <StatsGrid inProgressCount={inProgress.length} />

                    <TramitesGrid 
                        search={search} 
                        catFilter={catFilter} 
                        setCatFilter={setCatFilter} 
                        onSelect={onSelectTramite} 
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <InProgressSection items={inProgress} />
                        <HistorySection />
                    </div>
                </div>
            </main>
        </div>
    );
}