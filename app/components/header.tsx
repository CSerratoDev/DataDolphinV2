'use client';

import { useState } from 'react';

export default function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <header className="navbar">
            <div className="logo">
                <span className="logo-icon">💧</span>
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
                <a href="#" className="active">Platform</a>
                <a href="#">Vault</a>
                <a href="#">Security</a>
                <a href="#">Status</a>

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