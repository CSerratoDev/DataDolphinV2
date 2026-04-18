'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Maneja el error 401 o 500 que configuramos en FastAPI
                throw new Error(data.detail || "Credenciales incorrectas");
            }

            // Persistencia del token
            localStorage.setItem("token", data.access_token);
            
            // Redirección al Dashboard
            router.push("/dashboard");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 shadow-2xl border border-slate-100 rounded-[2.5rem]">
                        <div className="flex justify-center mb-6">
                            <div className="relative w-16 h-16">
                                <Image 
                                    src="/logo/datadolphin.png" 
                                    alt="logotipo" 
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <h2 className="text-center text-3xl font-extrabold text-[#0a3161] mb-2">
                            Bienvenido
                        </h2>
                        <p className="text-center text-sm text-slate-500 mb-8">
                            Accede a tus documentos y análisis
                        </p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {error && (
                                <div className="text-red-500 text-xs bg-red-50 p-3 rounded-lg border border-red-100 text-center animate-in fade-in duration-300">
                                    {error}
                                </div>
                            )}
                            
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                                    Correo electrónico
                                </label>
                                <input 
                                    type="email" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-5 py-3.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-400" 
                                    placeholder="nombre@empresa.com" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                                    Contraseña
                                </label>
                                <input 
                                    type="password" 
                                    required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-5 py-3.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-400" 
                                    placeholder="••••••••" 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl shadow-lg font-bold text-white bg-[#0a3161] hover:bg-[#082a50] transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verificando..." : "Iniciar sesión →"}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-600">¿No tienes una cuenta?</span>{' '}
                            <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                Regístrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel lateral con imagen de Moscati */}
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://vivaqueretaro.com/img/tourism/turismoMedico/moscati/fondo-torre.jpg')" }}
                />
                <div className="absolute inset-0 bg-[#0a3161]/10 backdrop-brightness-75" />
            </div>
        </div>
    );
}