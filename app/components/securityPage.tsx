import React from 'react';
import { Wallet, Landmark, Briefcase, GraduationCap, Globe } from 'lucide-react';

// Definición de tipos para los datos
interface DomainProps {
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  tags?: string[];
  dark?: boolean;
  className?: string;
}

const DomainCard = ({ title, value, label, icon, tags, dark, className }: DomainProps) => {
  return (
    <div className={`rounded-[2rem] p-8 flex flex-col justify-between transition-all hover:shadow-lg ${
      dark ? 'bg-[#122b54] text-white' : 'bg-[#f8fafc] text-slate-900'
    } ${className}`}>
      <div className="flex justify-between items-start">
        {/* Contenedor del Icono */}
        <div className={`p-3 rounded-xl ${dark ? 'bg-white/10' : 'bg-blue-100/50'}`}>
          {React.cloneElement(icon as React.ReactElement, { 
            size: 24, 
            className: dark ? 'text-white' : 'text-blue-700' 
          })}
        </div>
        
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight">{value}</span>
          <span className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
            {label}
          </span>
        </div>
        
        {tags && (
          <div className="flex gap-2 mt-6">
            {tags.map((tag) => (
              <span key={tag} className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-white p-8 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-[#0f172a] mb-4">Taxonomy Domains</h1>
          <p className="text-slate-500 max-w-2xl leading-relaxed">
            Classification matrix across primary operational vectors. Data points represent unique variables actively categorized.
          </p>
        </header>

        {/* Grid de Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Fiscal (Ocupa 2 filas) */}
          <div className="md:row-span-2">
            <DomainCard
              title="Fiscal"
              value="84.2k"
              label="variables"
              icon={<Wallet />}
              tags={["TAX CODES", "LEDGERS"]}
              className="h-full min-h-[450px]"
            />
          </div>

          {/* Columna Central y Derecha (Grid interno) */}
          <DomainCard
            title="Governmental"
            value="12.5k"
            label="Regulated variables"
            icon={<Landmark />}
          />

          <DomainCard
            title="Corporate"
            value="45.1k"
            label="Contractual variables"
            icon={<Briefcase />}
            dark={true}
          />

          <DomainCard
            title="Academic"
            value="8.9k"
            label="Research variables"
            icon={<GraduationCap />}
          />

          <DomainCard
            title="International"
            value="22.4k"
            label="Cross-border variables"
            icon={<Globe />}
          />
        </div>
      </div>
    </main>
  );
}