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
                <Image width={50} height={50} src="/logo/data-dolphin.png" alt="Logo"/>
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
                    Platform
                </a>
                <a
                    href="#vault"
                    className={seccionActiva === 'vault' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('vault'); setMenuAbierto(false); }}
                >
                    Vault
                </a>
                <a
                    href="#security"
                    className={seccionActiva === 'security' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('security'); setMenuAbierto(false); }}
                >
                    Security
                </a>
                <a
                    href="#status"
                    className={seccionActiva === 'status' ? 'active' : ''}
                    onClick={() => { setSeccionActiva('status'); setMenuAbierto(false); }}
                >
                    Status
                </a>

                <div className="mobile-actions">
                    <Link href="/login" className="login-link-mobile">Log In</Link>
                    <Link href="/signin" className="btn-primary-header">Get Started</Link>
                </div>
            </nav>

            <div className="nav-actions">
                <Link href="/login" className="login-link">Log In</Link>
                <Link href="/signin" className="btn-primary-header">Get Started</Link>
            </div>
        </header>
    );
}