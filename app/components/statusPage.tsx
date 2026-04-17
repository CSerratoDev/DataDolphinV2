import { taxonomias, type Taxonomia } from "../data/taxonomia";

export default function StatusPage() {
    return (
        <div id="status" className="bg-[#f8fafc] min-h-[700] w-full px-8 py-10 md:px-16 md:py-20">
            <div className="flex flex-col w-full items-center mb-16">
                <h1 className="text-4xl font-extrabold text-[#0f172a] mb-4">
                    Velocidad y Clasificación
                </h1>
                <p className="text-slate-500 text-lg max-w-md text-start mt-4">
                    Ingeniería inversa de documentos que identifica campos faltantes y
                    automatiza el llenado con eventos de manera asincrona.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-center">
                {taxonomias.map((item: Taxonomia) => (
                    <div
                        key={item.id}
                        className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow items-center"
                    >
                        <div key={item.id} className="flex flex-col justify-center items-center gap-3 object-contain mt-3 mb-2">
                            <p className="">{item.img_icon}</p>
                            <h3 className="text-xl font-bold text-slate-900 ">
                                {item.nombre}
                            </h3>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {item.descripcion}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}