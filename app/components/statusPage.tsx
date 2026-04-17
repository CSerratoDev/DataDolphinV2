import { taxonomias, type Taxonomia } from "../data/taxonomia";

export default function StatusPage() {
    return (
        <div id="status" className="bg-[#f8fafc] min-h-[700] w-full px-16 py-20">
            <div className="flex flex-col w-full items-center mb-16">
                <h1 className="text-5xl font-bold text-slate-900 leading-tight">
                    Velocidad y Clasificación
                </h1>
                <p className="text-slate-600 text-lg max-w-md text-center mt-4">
                    Ingeniería inversa de documentos que identifica campos faltantes y
                    automatiza el llenado con eventos de manera asincrona.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
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