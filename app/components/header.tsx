'use client';

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
        <header className="navbar">
            <div className="logo">
                <span className="logo-icon"></span>
                <strong>DataDolphin</strong>
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
                    <a href="#" className="login-link-mobile">Log In</a>
                    <button className="btn-primary-header">Get Started</button>
                </div>
            </nav>

            <div className="nav-actions">
                <a href="#" className="login-link">Log In</a>
                <button className="btn-primary-header">Get Started</button>
            </div>
        </header>
    );
}