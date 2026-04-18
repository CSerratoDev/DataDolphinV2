import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <div className="min-h-screen flex">
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white p-10 shadow-2xl border border-slate-100 rounded-[2.5rem]">
                        <div className="flex justify-center mb-6">
                            <Image src="/logo/datadolphin.png" alt="logotipo" width={60} height={60} />
                        </div>

                        <h2 className="text-center text-3xl font-extrabold text-[#0a3161] mb-2">Bienvenido</h2>
                        <p className="text-center text-sm text-slate-500 mb-8">Accede a tus documentos y análisis</p>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Correo electrónico</label>
                                <input type="email" required className="block w-full px-5 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="nombre@empresa.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">Contraseña</label>
                                <input type="password" required className="block w-full px-5 py-3 border border-slate-200 rounded-xl bg-slate-50/50 focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" />
                            </div>
                            <button type="submit" className="w-full py-3.5 rounded-xl shadow-lg font-bold text-white bg-[#0a3161] hover:bg-[#082a50] transition-transform active:scale-95">
                                Iniciar sesión →
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-slate-600">¿No tienes una cuenta?</span>{' '}
                            <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-500">
                                Regístrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://vivaqueretaro.com/img/tourism/turismoMedico/moscati/fondo-torre.jpg')" }}
                />
                <div className="" />
            </div>
        </div>
    );
}