'use client';

import { useState, useEffect } from 'react';
import Stepper from './Stepper';


const PROXY_URL = 'http://localhost:3001/api/extract';

async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function fileToImageBase64(file: File) {
    if (file.type.startsWith('image/')) {
        return { base64: await fileToBase64(file), mimeType: file.type };
    }

    // --- NUEVA CONFIGURACIÓN ROBUSTA ---
    const pdfjs = await import('pdfjs-dist');
    
    // Importamos el worker desde la librería local en lugar de unpkg
    // @ts-ignore
    await import('pdfjs-dist/build/pdf.worker.mjs'); 
    
    // Si usas Next.js 13/14+, esta es la forma más estable de asignar el worker
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }
    // -----------------------------------

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);
    
    // El resto del código del canvas sigue igual...
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) throw new Error("No se pudo crear el contexto del canvas");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvas, canvasContext: context, viewport }).promise;
    return {
        base64: canvas.toDataURL('image/jpeg').split(',')[1],
        mimeType: 'image/jpeg'
    };
}

export default function Validation({ file, tramite, onSchedule, onBack, step }: any) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState < any > (null);
    const [error, setError] = useState < string | null > (null);

    useEffect(() => {
        const analyzeDocument = async () => {
            if (!file) return;
            try {
                setLoading(true);
                const { base64, mimeType } = await fileToImageBase64(file);

                const prompt = `Actúa como un experto en validación de documentos para el trámite: ${tramite.title}. 
                Analiza la imagen adjunta y extrae la información relevante. 
                Determina si el documento es válido, vigente y legible.
                RESPONDE ÚNICAMENTE EN FORMATO JSON con esta estructura:
                {
                    "approved": boolean,
                    "score": number,
                    "title": "Resultado breve",
                    "message": "Explicación al usuario",
                    "reasons": ["razón 1", "razón 2"]
                }`;

                const response = await fetch(PROXY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ base64, mimeType, prompt })
                });

                if (!response.ok) throw new Error('Error en la respuesta del servidor');

                const data = await response.json();

                // Regex robusto para extraer JSON incluso si hay texto basura
                const jsonMatch = data.text.match(/\{[\s\S]*\}/);
                if (!jsonMatch) throw new Error("La IA no devolvió un formato válido");

                setResult(JSON.parse(jsonMatch[0]));
            } catch (err) {
                console.error("Error validando:", err);
                setError("No se pudo completar el análisis de IA. Reintenta o verifica tu conexión.");
            } finally {
                setLoading(false);
            }
        };

        analyzeDocument();
    }, [file, tramite]);

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <h2 className="text-xl font-bold text-[#001f3f]">Analizando con IA...</h2>
        </div>
    );

    if (error) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 max-w-md">
                <p className="font-bold mb-4">{error}</p>
                <button onClick={onBack} className="text-xs font-black underline uppercase">Regresar</button>
            </div>
        </div>
    );

    const isApproved = result?.approved;
    const color = isApproved ? '#00D68F' : '#FF4D6D';

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Stepper current={step} />

            <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 text-center">
                <div className="text-6xl mb-6">{isApproved ? '✅' : '❌'}</div>
                <h2 className="text-3xl font-black text-[#001f3f] mb-2">{result?.title}</h2>
                <p className="text-slate-500 mb-8">{result?.message}</p>

                <div className="bg-slate-50 rounded-3xl p-6 text-left space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detalles del Análisis</p>
                    {result?.reasons?.map((reason: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                            <span style={{ color }}>●</span>
                            {reason}
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={isApproved ? () => onSchedule(result) : onBack}
                className={`w-full py-5 rounded-2xl font-black tracking-widest transition-all shadow-lg active:scale-95 ${isApproved ? 'bg-[#001f3f] text-white hover:bg-[#002b56]' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
            >
                {isApproved ? 'CONTINUAR A CITAS' : 'REINTENTAR CARGA'}
            </button>
        </div>
    );
}