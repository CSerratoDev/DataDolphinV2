import { ReactNode } from "react";

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

// 1. Sidebar Component
const Sidebar = () => (
    <aside className="w-64 border-r border-slate-200 bg-slate-50/50 p-6 flex flex-col gap-8">
        <div>
            <h2 className="text-xl font-bold text-[#001f3f]">DeepSight AI</h2>
            <p className="text-xs text-slate-400">Oceanic Engine</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#002b5b] text-white py-2 rounded-lg text-sm font-medium">
            <Plus size={16} /> New Augmentation
        </button>

        <nav className="flex flex-col gap-2">
            {[
                { icon: <LayoutGrid size={18} />, label: "Orchestration", active: true },
                { icon: <Database size={18} />, label: "Taxonomy" },
                { icon: <Cpu size={18} />, label: "Agent Skills" },
                { icon: <CheckSquare size={18} />, label: "Approvals" },
            ].map((item) => (
                <div
                    key={item.label}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm cursor-pointer ${item.active ? "bg-white border border-slate-200 text-[#001f3f] shadow-sm font-semibold" : "text-slate-500"
                        }`}
                >
                    {item.icon}
                    {item.label}
                </div>
            ))}
        </nav>
    </aside>
);

// 2. Main Layout con Children
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 p-10 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}