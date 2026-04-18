import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DataDolphinV2",
  description: "Document Augmentation Engine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f8fafc]" suppressHydrationWarning>
        
        {/* Tu header ya existente — solo cambia colores adentro de header.tsx */}
        <Header />

        {/* Layout con sidebar */}
        <div className="flex flex-1">

          {/* SIDEBAR */}
          <aside className="w-56 min-h-screen bg-[#0f172a] text-white flex flex-col p-4 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center text-lg">🐬</div>
                <div>
                  <p className="text-sm font-semibold">DataDolphin</p>
                  <p className="text-xs text-slate-400">Control de trámites</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                  <span>Rechazados</span>
                  <span className="text-[#FF4D6D] font-semibold">6</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                  <span>Pendientes</span>
                  <span className="text-[#FBBF24] font-semibold">14</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-3 py-2">
                  <span>Citas</span>
                  <span className="text-[#22C55E] font-semibold">8</span>
                </div>
              </div>
            </div>
            <nav className="flex flex-col gap-1">
              <a href="/dashboard" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Orchestration
              </a>
              <a href="/taxonomy" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Taxonomy
              </a>
              <a href="/skills" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Agent Skills
              </a>
              <a href="/approvals" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Approvals
              </a>
              <a href="/approvals?status=rejected" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Documentos rechazados
              </a>
              <a href="/approvals?status=pending" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Pendientes de revisión
              </a>
              <a href="/dashboard" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Agenda / Citas
              </a>
              <a href="/dashboard" className="hover:bg-white/10 px-3 py-2 rounded text-sm">
                Historial de tramitación
              </a>
            </nav>
            <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
              <p className="font-semibold text-sm text-white mb-2">Recomendado</p>
              <p className="leading-5">
                Agrega filtros de estado en el dashboard: <span className="text-[#00C2FF]">Rechazados</span>, <span className="text-[#FBBF24]">Pendientes</span> y <span className="text-[#22C55E]">Aprobados</span>.
              </p>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className="flex-1 p-8">
            {children}
          </main>

        </div>

        <Footer />
      </body>
    </html>
  );
}