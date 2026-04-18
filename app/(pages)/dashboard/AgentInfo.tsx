export default function AgentInfo() {
    return (
        <div className="p-8">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
                    PROTOCOLO DE INSPECCIÓN DE DOCUMENTO
                </h1>

                <section className="mb-10">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        1. Identificación y Clasificación de Entidades
                    </h2>
                    <p className="text-sm text-slate-600 mb-6">
                        El agente debe clasificar cada variable detectada en el PDF dentro de las siguientes categorías para asegurar la validación automática:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">A. Identificación Personal y Nacional (20)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                1. Nombre_Completo | 2. Primer_Apellido | 3. Segundo_Apellido | 4. CURP | 5. RFC_Persona_Fisica | 6. Fecha_Nacimiento | 7. Lugar_Nacimiento | 8. Nacionalidad | 9. Estado_Civil | 10. Género | 11. Firma_Autógrafa_Digital | 12. Huella_Dactilar_ID | 13. Numero_Pasaporte | 14. Clave_Elector_INE | 15. Numero_Seguridad_Social_NSS | 16. Tipo_Sangre | 17. Discapacidad_Tipo | 18. Etnia_Pueblo_Originario | 19. Estatus_Migratorio | 20. Domicilio_Completo
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">B. Fiscal y Financiero (20)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                21. RFC_Persona_Moral | 22. Firma_Electronica_FIEL | 23. Regimen_Fiscal | 24. Codigo_Postal_Fiscal | 25. CLABE_Interbancaria | 26. Numero_Cuenta | 27. Banco_Emisor | 28. Swift_BIC_Code | 29. Monto_Subtotal | 30. Impuesto_IVA | 31. Impuesto_ISR | 32. Monto_Total_Letra | 33. Monto_Total_Numero | 34. Divisa_ISO | 35. Metodo_Pago | 36. Forma_Pago | 37. CFDI_Uso | 38. Folio_Fiscal_UUID | 39. Numero_Serie_Certificado | 40. Tasa_Interes_Anual
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">C. Empresarial y Laboral (20)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                41. Razon_Social | 42. Nombre_Comercial | 43. Objeto_Social | 44. Puesto_Cargo | 45. Departamento_Area | 46. Numero_Empleado | 47. Fecha_Ingreso | 48. Tipo_Contrato | 49. Salario_Base | 50. Prestaciones_Ley | 51. Vigencia_Contrato | 52. Clausula_Rescision | 53. Representante_Legal_Nombre | 54. Escritura_Publica_Numero | 55. Datos_Registro_Comercio | 56. Patente_Numero | 57. Logo_Empresarial_Blob | 58. Correo_Corporativo | 59. Extension_Telefonica | 60. Horario_Laboral
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">D. Gubernamental y Legal (15)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                61. Numero_Oficio | 62. Dependencia_Emisora | 63. Sello_Digital_Autoridad | 64. Fundamento_Legal_Articulo | 65. Fecha_Emision | 66. Fecha_Vencimiento | 67. Numero_Expediente | 68. Juzgado_Tribunal | 69. Tipo_Tramite | 70. Estatus_Procedimiento | 71. Firma_Funcionario_Publico | 72. QR_Verificacion_Oficial | 73. Apostilla_Numero | 74. Acta_Nacimiento_Libro | 75. Acta_Nacimiento_Foja
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">E. Universitario y Académico (15)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                76. Matricula_Alumno | 77. Institucion_Educativa | 78. Facultad_Escuela | 79. Carrera_Programa | 80. Semestre_Cuatrimestre | 81. Promedio_General | 82. Creditos_Acumulados | 83. Estatus_Academico | 84. Titulo_Tesis | 85. Cedula_Profesional_Numero | 86. Grado_Academico_Obtenido | 87. Fecha_Examen_Profesional | 88. Folio_Diploma | 89. Beca_Tipo | 90. Idioma_Certificacion_Nivel
                            </p>
                        </div>

                        <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl">
                            <h3 className="font-semibold text-slate-800 mb-3 text-sm">F. Internacional y Logística (10)</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                91. Codigo_Arancelario | 92. Incoterm_Vigente | 93. Numero_Guia_Tracking | 94. Puerto_Entrada | 95. Pais_Origen | 96. Peso_Neto_Kg | 97. Volumen_M3 | 98. Numero_Lote | 99. Certificado_Origen_Folio | 100. Aduana_Despacho
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        2. Protocolo de Localización (Mapping)
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">
                        Para cada entidad detectada, el agente DEBE extraer los siguientes metadatos técnicos para permitir la inyección posterior de datos:
                    </p>
                    <div className="bg-white border border-slate-200 rounded-xl p-0 overflow-hidden">
                        <table className="w-full text-sm text-left">
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-800 bg-slate-50 w-1/3">ID_Entidad</td>
                                    <td className="px-6 py-4 text-slate-600">(Del 1 al 100)</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-800 bg-slate-50">Página_Index</td>
                                    <td className="px-6 py-4 text-slate-600">Número de página donde se localiza el campo (1-indexed).</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-800 bg-slate-50">Bounding_Box</td>
                                    <td className="px-6 py-4 text-slate-600">Coordenadas [x0, y0, x1, y1] del espacio vacío.</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold text-slate-800 bg-slate-50">Contexto_Inmediato</td>
                                    <td className="px-6 py-4 text-slate-600">Frase que precede y sucede al campo vacío para validación semántica.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="mb-10">
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        3. Protocolo de Salida de Inspección (JSON Schema)
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">
                        El resultado del análisis debe ser un objeto JSON estructurado que sirva de base para el formulario asíncrono y la base de datos MongoDB:
                    </p>
                    <pre className="bg-[#0f172a] text-slate-300 p-6 rounded-xl overflow-x-auto text-sm font-mono shadow-inner">
                        <code>
{`{
    "document_hash": "sha256_del_pdf",
    "total_pages": "n",
    "entities_detected": [
        {
            "id": 5,
            "type": "RFC_Persona_Fisica",
            "page": 1,
            "coords": [100, 250, 300, 265],
            "required": true,
            "suggested_label": "RFC del Trabajador"
        }
    ]
}`}
                        </code>
                    </pre>
                </section>

                <section>
                    <h2 className="text-lg font-bold text-slate-800 mb-4">
                        4. Instrucciones de Procesamiento para el Agente
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-600">
                                <strong className="text-slate-800">Escaneo Visual:</strong> Localiza geometrías que sugieran campos de entrada.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-600">
                                <strong className="text-slate-800">Contextualización:</strong> Analiza las 5 palabras anteriores y posteriores a la geometría para asignar una categoría del catálogo 1-100.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-600">
                                <strong className="text-slate-800">Deducción de Documento:</strong> Si se detectan más de 5 campos de la categoría "E", clasifica el documento como UNIVERSITARIO.
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></div>
                            <p className="text-sm text-slate-600">
                                <strong className="text-slate-800">Generación de Propuesta:</strong> Crea el formulario de captura optimizado agrupando campos por categoría para reducir la carga cognitiva del usuario.
                            </p>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}