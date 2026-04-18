import Link from 'next/link';

export default function SignupPage() {
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
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#0a3161"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-zap"
                                >
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-center text-3xl font-extrabold text-[#0a3161] mb-2">
                            Create Account
                        </h2>
                        <p className="text-center text-sm text-slate-500 mb-8 max-w-xs mx-auto">
                            Verify your identity and access the digital space
                        </p>

                        <form className="space-y-5" action="#" method="POST">
                            <div>
                                <label htmlFor="nombre" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                                    Nombre
                                </label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50/50"
                                    placeholder="Nombre completo"
                                />
                            </div>

                            <div>
                                <label htmlFor="correo" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                                    Correo
                                </label>
                                <input
                                    id="correo"
                                    name="correo"
                                    type="email"
                                    required
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50/50"
                                    placeholder="Correo electrónico"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50/50"
                                    placeholder="Password"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                                    Rol
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    required
                                    defaultValue=""
                                    className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50/50 text-slate-600"
                                >
                                    <option value="" disabled>Selecciona un rol</option>
                                    <option value="usuario">Usuario</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-[#0a3161] hover:bg-[#082a50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01]"
                                >
                                    Sign Up <span aria-hidden="true">→</span>
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-600">Already have an account?</span>{' '}
                            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-all">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}