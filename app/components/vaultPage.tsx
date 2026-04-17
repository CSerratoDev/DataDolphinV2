interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

// Local lightweight icon components to avoid dependency on 'lucide-react'
const Fingerprint = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 11c0-4 2-6 4-7" />
        <path d="M6 9c0-3 3-6 6-6s6 3 6 6c0 5-3 7-6 9-3-2-6-4-6-9z" />
        <path d="M12 13v2" />
        <path d="M8 15c1 1.5 2.5 2 4 2s3-0.5 4-2" />
    </svg>
);

const ShieldCheck = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l7 4v5c0 5-3 9-7 11-4-2-7-6-7-11V6l7-4z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const CreditCard = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
        <path d="M2 10h20" />
        <rect x="6" y="14" width="4" height="2" rx="1" ry="1" />
    </svg>
);

const Globe = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2c2.5 3 2.5 7 0 10-2.5 3-2.5 7 0 10" />
        <path d="M4 4c4 2 8 2 16 0" />
    </svg>
);

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
    <div className="bg-white/60 p-6 rounded-xl flex flex-col gap-3 shadow-sm">
        <div className="text-slate-700">{icon}</div>
        <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
        <p className="text-slate-600 text-xs leading-relaxed">{description}</p>
    </div>
);

export default function VaultPage() {
    return (
        <div id="vault" className="bg-[#f8fafc] min-h-[700] w-full grid grid-cols-1 md:grid-cols-2 gap-12 px-16 py-20 items-center">
            <div className="flex flex-col gap-8">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                        Motor de Ingesta y<br /> Aumento de Documentos.
                    </h1>
                    <p className="text-slate-600 text-lg max-w-md">
                        El agente utiliza IA multimodal para realizar ingeniería inversa de documentos de n páginas,
                        identificando campos faltantes y automatizando llenado en procesos de manera asincrona.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <FeatureCard
                        icon={<Fingerprint size={24} />}
                        title="Orquestación de documentos"
                        description="Transformar procesos administrativos físicos o digitales en flujos paperless altamente eficientes. "
                    />
                    <FeatureCard
                        icon={<ShieldCheck size={24} />}
                        title="Taxonomía de Datos"
                        description="Clasifica variables en más de 100 tipos distintos, abarcando dominios"
                    />
                </div>
            </div>

            <div className="relative flex justify-center items-center h-full">
                <div className="bg-white/40 rounded-3xl p-12 backdrop-blur-sm shadow-xl w-full max-w-md space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm relative">
                        <div className="bg-blue-100 p-2 rounded-lg w-fit mb-4">
                            <CreditCard className="text-blue-600" size={20} />
                        </div>
                        <div className="h-2 w-3/4 bg-slate-100 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-slate-100 rounded" />
                        <span className="absolute top-6 right-6 text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-1 rounded-full">
                            Verificado
                        </span>
                    </div>

                    <div className="bg-[#003366] rounded-2xl p-6 shadow-lg relative">
                        <div className="bg-blue-900/50 p-2 rounded-lg w-fit mb-4">
                            <Globe className="text-white" size={20} />
                        </div>
                        <div className="h-2 w-3/4 bg-blue-800 rounded mb-2" />
                        <div className="h-2 w-1/2 bg-blue-800 rounded" />
                        <span className="absolute top-6 right-6 text-[10px] font-bold text-blue-300 border border-blue-800 px-2 py-1 rounded-full">
                            En proceso
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}