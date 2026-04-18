import React from 'react';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Columna Izquierda: Imagen de Fondo Profesionall (Ocupa el 50%) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            // Reemplaza esta URL por la ruta real de tu imagen profesional
            backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-blue-900/20" /> {/* Superposición sutil de color */}
      </div>

      {/* Columna Derecha: Formulario de Registro (Ocupa el 50%) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-50 p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Tarjeta de Formulario con Bordes Redondeados */}
          <div className="bg-white p-10 shadow-2xl border border-slate-100 rounded-[2.5rem]">
            {/* Logo de oceanic.intelligence (Ejemplo) */}
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
                <label htmlFor="full-name" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                  Full Name
                </label>
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  required
                  className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50/50"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label htmlFor="work-email" className="block text-xs font-semibold text-slate-600 mb-1.5 ml-1">
                  Work Email
                </label>
                <input
                  id="work-email"
                  name="work-email"
                  type="email"
                  required
                  className="appearance-none block w-full px-5 py-3.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all bg-slate-50/50"
                  placeholder="Work Email"
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
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-[#0a3161] hover:bg-[#082a50] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-[1.01]"
                >
                  Sign Up <span aria-hidden="true">→</span>
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-slate-500">Or Sign up with:</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <button className="w-full inline-flex justify-center items-center gap-2.5 py-3 px-4 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  {/* Aquí va el Icono de Google */}
                  Google
                </button>
                <button className="w-full inline-flex justify-center items-center gap-2.5 py-3 px-4 border border-slate-200 rounded-xl bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                  {/* Aquí va el Icono de Microsoft */}
                  Microsoft
                </button>
              </div>
            </div>

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