'use client';

import { useState, useRef } from 'react';
import { 
    HiOutlineArrowLeft, 
    HiOutlineCloudArrowUp, 
    HiOutlineDocumentCheck, 
    HiOutlineDocumentText,
    HiOutlineCheckCircle,
    HiOutlineExclamationCircle,
    HiOutlineXMark,
    HiOutlineIdentification
} from 'react-icons/hi2';
import Stepper from './Stepper';

export default function Upload({ 
    user, 
    tramite, 
    onFileUploaded, 
    onBack, 
    step, 
    processMode = 'validate', 
    onModeChange 
}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [error, setError] = useState('');
    const inputRef = useRef();

    const handleFile = (f) => {
        if (!f) return;
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
        if (!allowed.includes(f.type)) {
            setError('Solo se aceptan imágenes (JPG, PNG) o PDF.');
            return;
        }
        setError('');
        setFile(f);
        if (f.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = e => setPreview(e.target.result);
            reader.readAsDataURL(f);
        } else {
            setPreview('pdf');
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleValidate = () => {
        if (!file) { 
            setError('Por favor selecciona un documento.'); 
            return; 
        }
        onFileUploaded(file, processMode);
    };

    const requiredDocs = getRequiredDocs(tramite?.id);

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Stepper current={step} />

            <div className="mt-10">
                <button 
                    onClick={onBack} 
                    className="flex items-center gap-2 text-slate-400 hover:text-[#0f2d5e] font-bold text-xs uppercase tracking-widest transition-colors mb-8"
                >
                    <HiOutlineArrowLeft /> Volver al dashboard
                </button>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm text-[#0f2d5e]">
                                <HiOutlineIdentification className="text-2xl" />
                            </div>
                            <h2 className="text-3xl font-black text-[#0f2d5e] tracking-tight italic">
                                {tramite?.title || 'Nuevo Trámite'}
                            </h2>
                        </div>
                        <p className="text-slate-500 text-sm font-medium">Sube tu documento para validación mediante agentes de IA.</p>
                    </div>

                    {/* Selector de Modo */}
                    <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                        <button
                            className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                                processMode === 'validate' 
                                ? 'bg-white text-[#0f2d5e] shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                            onClick={() => onModeChange?.('validate')}
                        >
                            Validar solo
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${
                                processMode === 'extract' 
                                ? 'bg-white text-[#0f2d5e] shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                            onClick={() => onModeChange?.('extract')}
                        >
                            Extraer formato
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Panel Izquierdo: Requerimientos */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white border border-slate-100 rounded-[1.5rem] p-6 shadow-sm">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                                Documentos requeridos
                            </h3>
                            <ul className="space-y-3">
                                {requiredDocs.map((d, i) => (
                                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-[#0f2d5e] opacity-80 leading-relaxed">
                                        <HiOutlineCheckCircle className="text-blue-500 mt-0.5 shrink-0 text-base" />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <p className="text-[11px] text-slate-400 leading-relaxed px-2">
                            Elige <span className="text-[#0f2d5e] font-bold">Validar solo</span> para verificar autenticidad o <span className="text-[#0f2d5e] font-bold">Extraer</span> para prellenar formularios automáticamente.
                        </p>
                    </div>

                    {/* Panel Derecho: Upload Area */}
                    <div className="lg:col-span-3">
                        <div
                            onClick={() => inputRef.current.click()}
                            onDrop={handleDrop}
                            onDragOver={e => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            className={`
                                relative min-h-[320px] rounded-[2rem] border-2 border-dashed transition-all cursor-pointer
                                flex flex-col items-center justify-center p-8 text-center
                                ${dragging ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : 'border-slate-200 bg-white hover:border-[#0f2d5e]/30 hover:bg-slate-50/50'}
                                ${file ? 'border-emerald-400 bg-emerald-50/20' : ''}
                            `}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*,.pdf"
                                className="hidden"
                                onChange={e => handleFile(e.target.files[0])}
                            />

                            {!file ? (
                                <>
                                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-6 border border-slate-100 shadow-sm transition-transform group-hover:scale-110">
                                        <HiOutlineCloudArrowUp className={`text-4xl ${dragging ? 'text-blue-500' : 'text-slate-300'}`} />
                                    </div>
                                    <h4 className="text-lg font-bold text-[#0f2d5e] mb-2">
                                        {dragging ? 'Suelta para subir' : 'Cargar documento'}
                                    </h4>
                                    <p className="text-xs text-slate-400 font-medium mb-6">
                                        Arrastra tu archivo aquí o <span className="text-blue-600 underline">explora localmente</span>
                                    </p>
                                    <div className="flex gap-2">
                                        {['JPG', 'PNG', 'PDF'].map(ext => (
                                            <span key={ext} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-black text-slate-400">
                                                {ext}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="w-full animate-in zoom-in-95 duration-300">
                                    <div className="relative inline-block mb-6 group">
                                        {preview === 'pdf' ? (
                                            <div className="w-32 h-40 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 shadow-inner">
                                                <HiOutlineDocumentText className="text-5xl text-slate-400" />
                                            </div>
                                        ) : (
                                            <img 
                                                src={preview} 
                                                alt="preview" 
                                                className="max-h-48 rounded-2xl shadow-2xl border-4 border-white object-contain mx-auto" 
                                            />
                                        )}
                                        <button 
                                            onClick={e => { e.stopPropagation(); setFile(null); setPreview(null); }}
                                            className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                                        >
                                            <HiOutlineXMark className="text-lg" />
                                        </button>
                                    </div>
                                    
                                    <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 p-4 rounded-2xl max-w-xs mx-auto">
                                        <p className="text-xs font-black text-emerald-600 truncate mb-1">✓ {file.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                            {(file.size / 1024).toFixed(1)} KB — {file.type.split('/')[1]}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold animate-in shake-1">
                                <HiOutlineExclamationCircle className="text-lg shrink-0" />
                                {error}
                            </div>
                        )}

                        <button 
                            onClick={handleValidate}
                            disabled={!file}
                            className={`
                                w-full mt-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3
                                ${file 
                                    ? 'bg-[#0f2d5e] text-white shadow-xl shadow-blue-900/20 hover:scale-[1.01] active:scale-[0.98]' 
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
                            `}
                        >
                            <HiOutlineDocumentCheck className="text-lg" />
                            Validar Documento con IA
                        </button>

                        <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 opacity-60">
                            🔒 Encriptación AES-256 de grado bancario
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getRequiredDocs(id) {
    const map = {
        passport: ['Acta de nacimiento (original)', 'INE vigente', 'Comprobante de domicilio', 'Fotografía fondo blanco'],
        licencia: ['INE vigente', 'Examen médico vigente', 'Comprobante de domicilio'],
        acta: ['CURP', 'INE del solicitante'],
        curp: ['INE vigente', 'Acta de nacimiento'],
        rfc: ['CURP', 'INE vigente', 'Comprobante de domicilio'],
        ine: ['Acta de nacimiento', 'Comprobante de domicilio', 'CURP'],
        apoyo: ['CURP', 'INE vigente', 'Comprobante de domicilio', 'Estado de cuenta'],
        catastro: ['Escritura o título de propiedad', 'INE vigente', 'RFC'],
    };
    return map[id] || ['INE vigente', 'Comprobante de domicilio'];
}