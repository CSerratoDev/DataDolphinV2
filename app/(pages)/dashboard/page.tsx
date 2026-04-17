const StatCard = ({ title, value, detail }: { title: string; value: string; detail: string }) => (
    <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-4xl font-bold text-[#001f3f] my-2">{value}</h3>
        <p className="text-xs text-slate-500">{detail}</p>
    </div>
);

export default function Dashboard() {
    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-4xl font-bold text-[#001f3f]">Orchestration Overview</h1>
            </header>

            <section className="grid grid-cols-3 gap-6">
                <StatCard title="Total Documents Processed" value="1.4M" detail="↗ +12% this week" />
                <StatCard title="Active AI Agents" value="342" detail="Distributed Load: 68%" />
                <StatCard title="Capability Loading" value="System Ready" detail="PyMuPDF Core Modules" />
            </section>

            <section className="grid grid-cols-3 gap-10">
                <div className="col-span-2 space-y-6">
                    <div className="flex justify-between items-end">
                        <div>
                            <h2 className="text-xl font-bold text-[#001f3f]">Asynchronous Queue</h2>
                            <p className="text-xs text-slate-400">Live document processing streams</p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 cursor-pointer">View All Streams</span>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: "Passport Scan Batch #8842", sub: "Intl. Identity Verification Stream", status: "Processing" },
                            { name: "Fiscal Report Q3 - TechCorp", sub: "Corporate Audit Stream", status: "Needs Approval", urgent: true },
                        ].map((task, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="bg-slate-100 p-2 rounded-lg h-10 w-10" />
                                    <div>
                                        <p className="text-sm font-bold text-[#001f3f]">{task.name}</p>
                                        <p className="text-[10px] text-slate-400">{task.sub}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${task.urgent ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                                    {task.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#001f3f] rounded-2xl p-6 text-white overflow-hidden relative">
                    <h2 className="text-xs font-bold opacity-50 mb-4 uppercase">Skill Console</h2>
                    <div className="font-mono text-[10px] space-y-2">
                        <p className="text-blue-400">{"> [INFO] Initializing clause extraction..."}</p>
                        <p className="text-blue-300">{"> [DATA] Regex pattern matching complete."}</p>
                        <p className="text-amber-400">{"> [WARN] Ambiguity detected in section 4.2."}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#001f3f] to-transparent" />
                </div>
            </section>
        </div>
    );
}