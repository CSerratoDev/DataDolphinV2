'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const hiddenPaths = ['/dashboard', '/augmentation', '/login', '/signup', '/taxonomy', '/skills', '/approvals'];
    if (hiddenPaths.some(path => pathname === path || pathname.startsWith(`${path}/`))) return null;

    const [menuAbierto, setMenuAbierto] = useState(false);
    const [seccionActiva, setSeccionActiva] = useState('platform');

    useEffect(() => {
        const manejarScroll = () => {
            const secciones = ['platform', 'vault', 'security', 'status'];
            let actual = 'platform';
            for (const s of secciones) {
                const el = document.getElementById(s);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) actual = s;
                }
            }
            setSeccionActiva(actual);
        };
        window.addEventListener('scroll', manejarScroll);
        return () => window.removeEventListener('scroll', manejarScroll);
    }, []);

    const navLinks = [
        { id: 'platform', label: 'Plataforma' },
        { id: 'vault',    label: 'Motor' },
        { id: 'security', label: 'Seguridad' },
        { id: 'status',   label: 'Estado' },
    ];

    return (
        <header className="fixed w-full z-50 bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3">

            <div className="flex items-center gap-2">
                <Image width={40} height={40} src="/logo/data-dolphin.png" alt="Logo" />
            </div>

            <nav className="hidden md:flex items-center gap-6">
                {navLinks.map(({ id, label }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={() => { setSeccionActiva(id); setMenuAbierto(false); }}
                        className={`text-sm font-medium pb-1 transition-colors ${
                            seccionActiva === id
                                ? 'text-[#1e3a5f] border-b-2 border-[#1e3a5f]'
                                : 'text-gray-500 hover:text-[#1e3a5f]'
                        }`}
                    >
                        {label}
                    </a>
                ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
                <Link href="/login" className="text-sm text-[#1e3a5f] font-medium hover:underline">
                    Iniciar Sesión
                </Link>
                <Link href="/signup" className="bg-[#1e3a5f] text-white text-sm px-4 py-2 rounded hover:bg-[#162d4a] transition-colors">
                    Registrarse
                </Link>
            </div>

            <button
                className="md:hidden flex flex-col gap-1"
                onClick={() => setMenuAbierto(!menuAbierto)}
            >
                <span className="w-5 h-0.5 bg-gray-700"></span>
                <span className="w-5 h-0.5 bg-gray-700"></span>
                <span className="w-5 h-0.5 bg-gray-700"></span>
            </button>

            {menuAbierto && (
                <div className="absolute top-full left-0 w-full bg-white border-t border-gray-200 flex flex-col p-4 gap-3 md:hidden">
                    {navLinks.map(({ id, label }) => (
                        <a
                            key={id}
                            href={`#${id}`}
                            onClick={() => { setSeccionActiva(id); setMenuAbierto(false); }}
                            className="text-sm text-gray-700 hover:text-[#1e3a5f]"
                        >
                            {label}
                        </a>
                    ))}
                    <Link href="/login" className="text-sm text-[#1e3a5f]">Iniciar Sesión</Link>
                    <Link href="/signup" className="bg-[#1e3a5f] text-white text-sm px-4 py-2 rounded text-center">Registrarse</Link>
                </div>
            )}

        </header>
    );
}