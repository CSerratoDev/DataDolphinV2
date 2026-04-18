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

export default function Validation({ file, tramite, processMode = 'validate', onSchedule, onBack, step }: any) {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [rawText, setRawText] = useState<string | null>(null);

    useEffect(() => {
        const analyzeDocument = async () => {
            if (!file) return;
            try {
                setLoading(true);
                const { base64, mimeType } = await fileToImageBase64(file);

                // Construir prompt según el modo (validate | extract)
                const validatePrompt = `Actúa como un experto en validación de documentos para el trámite: ${tramite.title}. 
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

                const extractPromptsById: any = {
                    curp: `Eres un extractor de datos especializado en CURP (México). Del documento extrae exactamente estos campos: {
    "curp": string,            // CURP completo (18 caracteres)
    "nombre": string,          // Nombre completo como aparece en el documento
    "fechaNacimiento": string, // Formato YYYY-MM-DD cuando sea posible
    "genero": string,         // M/F u otra etiqueta si aplica
    "approved": boolean       // true si todos los campos básicos están presentes y el CURP pasa la validación de patrón
}

Verifica el CURP usando la siguiente expresión regular (no la transformes, úsala tal cual): /^[A-Z]{4}\d{6}[A-Z0-9]{8}$/i

RESPONDE ÚNICAMENTE CON UN JSON VÁLIDO EXACTAMENTE EN LA ESTRUCTURA ARRIBA (sin texto adicional, sin comillas sueltas, sin explicaciones). Si algún campo no puede extraerse, devuélvelo como cadena vacía y pon "approved": false. Ejemplo de respuesta válida:
{ "curp": "GARC850101HDFRRS09", "nombre": "Juan García Pérez", "fechaNacimiento": "1985-01-01", "genero": "M", "approved": true }
`,

                    licencia: `Eres un extractor de datos especializado en licencias de conducir. Del documento extrae exactamente estos campos:
{
  "license_number": string, // número o folio de la licencia
  "nombre": string,         // Nombre completo (máximo 4 palabras/nombres propios). IMPORTANTE: Si después del nombre ves palabras como DOMICILIO, CALLE, CIUDAD, ESTADO u otros textos que no sean nombres propios, EXCLUYE ESE TEXTO. El nombre debe contener solo nombres de persona (ej: "María García López" o "Juan Pérez Martínez", no "María García López DOMICILIO").
  "fechaNacimiento": string,// Formato YYYY-MM-DD cuando sea posible
  "vigencia": string,       // Fecha de expiración (YYYY-MM-DD) o texto que indique vigencia
  "approved": boolean       // true si los campos básicos están presentes
}

RESPONDE SOLO CON UN JSON VÁLIDO EN LA ESTRUCTURA ARRIBA. Si no puedes encontrar un campo, devuélvelo como cadena vacía y marca "approved": false. Ejemplo:
{ "license_number": "A1234567", "nombre": "María López García", "fechaNacimiento": "1990-05-12", "vigencia": "2026-05-12", "approved": true }
`
                };

                const prompt = processMode === 'extract' ? (extractPromptsById[tramite.id] || `Eres un extractor de datos. Extrae los campos relevantes del documento y devuelve JSON con los campos extraídos y un booleano "approved" si los campos básicos están presentes.`) : validatePrompt;

                const response = await fetch(PROXY_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ base64, mimeType, prompt })
                });

                if (!response.ok) throw new Error('Error en la respuesta del servidor');

                const data = await response.json();
                const raw = typeof data.text === 'string' ? data.text : JSON.stringify(data);
                setRawText(raw);

                // Regex robusto para extraer JSON incluso si hay texto basura
                const jsonMatch = (data.text || '').match(/\{[\s\S]*\}/);
                if (!jsonMatch) {
                    console.warn('Respuesta IA (sin JSON limpio):', data.text);
                    throw new Error("La IA no devolvió un formato válido");
                }

                const parsed = JSON.parse(jsonMatch[0]);
                setResult(parsed);
                // Comprobación básica de campos requeridos según tramite
                try {
                    const basicCheck = validateBasicData(tramite?.id, parsed, raw);
                    if (!basicCheck.ok) {
                        // Aseguramos que reasons exista y añadimos la(s) razón(es)
                        parsed.reasons = parsed.reasons || [];
                        parsed.reasons.push(...basicCheck.reasons);
                        parsed.approved = false;
                        setResult({ ...parsed });
                    }
                } catch (e) {
                    console.warn('Error en validación básica:', e);
                }
                console.debug('Validation result parsed:', parsed);
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

    // Descarga JSON del resultado
    const downloadJson = () => {
        if (!result) return;
        const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${tramite?.id || 'extraction'}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };

    // Descarga el archivo original (mantiene formato). Si es PDF se descarga como PDF; si es imagen se descarga en su formato original.
    const generateDataPDF = async () => {
        if (!result) return;

        try {
            const { jsPDF } = await import('jspdf');

            const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
            let yPosition = 20;

            // Título
            pdf.setFontSize(18);
            pdf.setTextColor(15, 45, 94); // Color #0f2d5e
            pdf.text(`${tramite?.title || 'Extracción de Datos'}`, 105, yPosition, { align: 'center' });

            yPosition += 15;

            // Fecha
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Fecha: ${new Date().toLocaleDateString('es-MX')}`, 20, yPosition);

            yPosition += 10;
            pdf.line(20, yPosition, 190, yPosition);
            yPosition += 10;

            // Tabla de datos (excluir campos técnicos)
            pdf.setFontSize(11);
            pdf.setTextColor(15, 45, 94);

            const displayFields: { [key: string]: string } = {
                license_number: 'Número de Licencia',
                curp: 'CURP',
                nombre: 'Nombre',
                fechaNacimiento: 'Fecha de Nacimiento',
                genero: 'Género',
                vigencia: 'Vigencia',
            };

            Object.entries(displayFields).forEach(([key, label]) => {
                if (key in result && result[key]) {
                    pdf.setTextColor(15, 45, 94);
                    pdf.text(`${label}:`, 20, yPosition);

                    pdf.setTextColor(60, 60, 60);
                    const value = String(result[key] || '—');
                    pdf.text(value, 100, yPosition);

                    yPosition += 8;
                }
            });

            yPosition += 5;
            pdf.line(20, yPosition, 190, yPosition);
            yPosition += 10;

            // JSON raw para referencia
            pdf.setFontSize(10);
            pdf.setTextColor(15, 45, 94);
            pdf.text('Datos completos (JSON):', 20, yPosition);

            yPosition += 5;
            pdf.setFontSize(8);
            pdf.setTextColor(80, 80, 80);

            const jsonStr = JSON.stringify(result, null, 2);
            const jsonLines = pdf.splitTextToSize(jsonStr, 170);

            jsonLines.forEach((line: string) => {
                if (yPosition > 270) {
                    pdf.addPage();
                    yPosition = 20;
                }
                pdf.text(line, 20, yPosition);
                yPosition += 4;
            });

            // Footer
            yPosition += 10;
            pdf.setFontSize(8);
            pdf.setTextColor(150, 150, 150);
            pdf.text('DataDolphin V2 - Extracción de Datos Certificada', 105, pdf.internal.pageSize.height - 10, { align: 'center' });

            // Descargar
            const pdfBlob = pdf.output('blob');
            const pdfUrl = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = `${tramite?.id || 'datos'}_${new Date().toISOString().split('T')[0]}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(pdfUrl);
        } catch (err) {
            console.error('Error generando PDF de datos:', err);
        }
    };

    // Función que verifica campos básicos según tipo de trámite
    function validateBasicData(id: string, parsed: any, raw: string) {
        const reasons: string[] = [];
        let ok = true;
        const hasKey = (keys: string[]) => keys.some(k => Object.prototype.hasOwnProperty.call(parsed, k) && parsed[k]);

        if (id === 'curp') {
            // CURP regex (18 chars): 4 letras, 6 dígitos, 8 alfanum
            const curpRegex = /[A-Z]{4}\d{6}[A-Z0-9]{8}/i;
            const foundInParsed = parsed.curp || parsed.CURP || parsed.curp_number || parsed.curpValue;
            const foundInRaw = raw && raw.match(curpRegex);
            if (!foundInParsed && !foundInRaw) {
                ok = false;
                reasons.push('No se detectó un CURP válido en el documento.');
            }
        } else if (id === 'licencia') {
            // Buscar campos típicos de licencia
            const found = hasKey(['license_number', 'licencia', 'numero_licencia', 'license']) || /licenci/i.test(raw);
            if (!found) {
                ok = false;
                reasons.push('No se detectó número o datos básicos de la licencia en el documento.');
            }
        } else {
            // Para otros tramites, requerimos al menos un campo distinto de los metadatos
            const keys = Object.keys(parsed).filter(k => !['approved', 'score', 'title', 'message', 'reasons'].includes(k));
            if (keys.length === 0) {
                ok = false;
                reasons.push('No se extrajeron campos útiles del documento.');
            }
        }

        return { ok, reasons };
    }

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

            {/* DEBUG: Mostrar respuesta cruda para depuración de CURP/licencia */}
            <div className="max-w-2xl mx-auto bg-white/80 p-4 rounded-xl border border-slate-100 text-xs text-slate-600">
                <p className="font-black text-[10px] text-slate-400 uppercase mb-2">Respuesta bruta (IA)</p>
                <pre className="whitespace-pre-wrap wrap-break-word text-[12px] max-h-40 overflow-auto bg-slate-50 p-2 rounded-md">{rawText || '—'}</pre>
            </div>

            {result && (
                <div className="max-w-2xl mx-auto flex items-center gap-3 justify-end">
                    <button onClick={downloadJson} className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-bold hover:bg-slate-200">Descargar JSON</button>
                    <button onClick={generateDataPDF} className="px-4 py-2 bg-slate-50 rounded-lg text-sm font-bold hover:bg-slate-100">Descargar PDF (datos)</button>
                </div>
            )}

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