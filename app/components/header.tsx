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
        <header className="navbar fixed w-full">
            <div className="logo">
                <Image width={50} height={50} src="/logo/data-dolphin.png" alt="Logo" />
            </div>

            <button
                className="menu-toggle"
                onClick={() => setMenuAbierto(!menuAbierto)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`nav-links ${menuAbierto ? 'menu-abierto' : ''}`}>
                <a
                    href="#platform"
                    className={seccionActiva === 'platform' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('platform'); setMenuAbierto(false); }}
                >
                    Plataforma
                </a>
                <a
                    href="#vault"
                    className={seccionActiva === 'vault' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('vault'); setMenuAbierto(false); }}
                >
                    Motor
                </a>
                <a
                    href="#security"
                    className={seccionActiva === 'security' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('security'); setMenuAbierto(false); }}
                >
                    Seguridad
                </a>
                <a
                    href="#status"
                    className={seccionActiva === 'status' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('status'); setMenuAbierto(false); }}
                >
                    Estado
                </a>

                <div className="mobile-actions">
                    <Link href="/login" className="login-link-mobile">Iniciar Sesión</Link>
                    <Link href="/signup" className="btn-primary-header">Registrarse</Link>
                </div>
            </nav>

            <div className="nav-actions">
                <Link href="/login" className="login-link">Iniciar Sesión</Link>
                <Link href="/signup" className="btn-primary-header">Registrarse</Link>
            </div>
        </header>
    );
}