'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <header className="navbar fixed w-full">
            <div className="logo">
                <Image width={50} height={50} src="/logo/datadolphin.png" alt="Logo"/>
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
                <a href="#platform" className="active">Platform</a>
                <a href="#vault">Vault</a>
                <a href="#security">Security</a>
                <a href="#status">Status</a>

                <div className="mobile-actions">
                    <Link href="/login" className="login-link-mobile">Log In</Link>
                    <Link href="/signup" className="btn-primary-header">Get Started</Link>
                </div>
            </nav>

            <div className="nav-actions">
                <Link href="/login" className="login-link">Log In</Link>
                <Link href="/signup" className="btn-primary-header">Get Started</Link>
            </div>
        </header>
    );
}