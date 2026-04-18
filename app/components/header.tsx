'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
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
                    if (rect.top <= 150) {
                        actual = s;
                    }
                }
            }
            setSeccionActiva(actual);
        };

        window.addEventListener('scroll', manejarScroll);
        return () => window.removeEventListener('scroll', manejarScroll);
    }, []);

    return (
        <header className="navbar fixed w-full flex items-center justify-between">
            <div className="logo flex-1">
                <Link href="/">
                    <Image width={50} height={50} src="/logo/data-dolphin.png" alt="Logo" />
                </Link>
            </div>

            <button
                className="menu-toggle"
                onClick={() => setMenuAbierto(!menuAbierto)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`nav-links flex-none mx-auto ${menuAbierto ? 'menu-abierto' : ''}`}>
                <a
                    href="/#platform"
                    className={seccionActiva === 'platform' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('platform'); setMenuAbierto(false); }}
                >
                    Plataforma
                </a>
                <a
                    href="/#vault"
                    className={seccionActiva === 'vault' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('vault'); setMenuAbierto(false); }}
                >
                    Motor
                </a>
                <a
                    href="/#security"
                    className={seccionActiva === 'security' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('security'); setMenuAbierto(false); }}
                >
                    Dominios
                </a>
                <a
                    href="/#status"
                    className={seccionActiva === 'status' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('status'); setMenuAbierto(false); }}
                >
                    Métricas
                </a>

                <div className="mobile-actions">
                    <Link href="/login" className="login-link-mobile">Iniciar Sesión</Link>
                    <Link href="/signup" className="btn-primary-header">Registrarse</Link>
                </div>
            </nav>

            <div className="nav-actions flex-1 flex justify-end">
                <Link href="/login" className="login-link">Iniciar Sesión</Link>
                <Link href="/signup" className="btn-primary-header">Registrarse</Link>
            </div>
        </header>
    );
}