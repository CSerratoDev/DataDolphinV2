'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "client"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Usamos la variable de entorno para la base URL
        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        try {
            const response = await fetch(`${API_URL}/api/user/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Error al crear la cuenta");
            }

            router.push("/login");

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 bg-blue-900/20" />
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-8 sm:p-12 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 shadow-2xl border border-slate-100 rounded-[2.5rem]">
                        <div className="flex justify-center mb-6">
                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#0a3161]/5 border border-[#0a3161]/10">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a3161" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-center text-3xl font-extrabold text-[#0a3161] mb-2">Crear cuenta</h2>
                        
                        {error && (
                            <p className="text-red-500 text-xs bg-red-50 p-3 rounded-lg border border-red-100 mb-4 text-center">
                                {error}
                            </p>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Nombre</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50/50"
                                    placeholder="Nombre completo"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Correo</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50/50"
                                    placeholder="Correo electrónico"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Contraseña</label>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50/50"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Rol</label>
                                <select
                                    name="role"
                                    required
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-slate-50/50 text-slate-600"
                                >
                                    <option value="client">Cliente</option>
                                    <option value="seller">Vendedor (Admin)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg font-bold text-white bg-[#0a3161] hover:bg-[#082a50] transition-all transform active:scale-95 disabled:opacity-70"
                            >
                                {loading ? "Registrando..." : "Registrarse →"}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-600">¿Ya tienes una cuenta?</span>{' '}
                            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                                Iniciar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}