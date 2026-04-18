# PROTOCOLO DE INSPECCIÓN DE DOCUMENTO

Identificación y Clasificación de Entidades El agente debe clasificar cada variable detectada (campos vacíos, líneas de puntos _______ o espacios de formulario) en el PDF dentro de las siguientes categorías para asegurar la validación automática:
A. Identificación Personal y Nacional (20) Nombre_Completo | 2. Primer_Apellido | 3. Segundo_Apellido | 4. CURP | 5. RFC_Persona_Fisica | 6. Fecha_Nacimiento | 7. Lugar_Nacimiento | 8. Nacionalidad | 9. Estado_Civil | 10. Género | 11. Firma_Autógrafa_Digital | 12. Huella_Dactilar_ID | 13. Numero_Pasaporte | 14. Clave_Elector_INE | 15. Numero_Seguridad_Social_NSS | 16. Tipo_Sangre | 17. Discapacidad_Tipo | 18. Etnia_Pueblo_Originario | 19. Estatus_Migratorio | 20. Domicilio_Completo.

B. Fiscal y Financiero (20) RFC_Persona_Moral | 22. Firma_Electronica_FIEL | 23. Regimen_Fiscal | 24. Codigo_Postal_Fiscal | 25. CLABE_Interbancaria | 26. Numero_Cuenta | 27. Banco_Emisor | 28. Swift_BIC_Code | 29. Monto_Subtotal | 30. Impuesto_IVA | 31. Impuesto_ISR | 32. Monto_Total_Letra | 33. Monto_Total_Numero | 34. Divisa_ISO (USD, MXN) | 35. Metodo_Pago | 36. Forma_Pago | 37. CFDI_Uso | 38. Folio_Fiscal_UUID | 39. Numero_Serie_Certificado | 40. Tasa_Interes_Anual.

C. Empresarial y Laboral (20) Razon_Social | 42. Nombre_Comercial | 43. Objeto_Social | 44. Puesto_Cargo | 45. Departamento_Area | 46. Numero_Empleado | 47. Fecha_Ingreso | 48. Tipo_Contrato | 49. Salario_Base | 50. Prestaciones_Ley | 51. Vigencia_Contrato | 52. Clausula_Rescision | 53. Representante_Legal_Nombre | 54. Escritura_Publica_Numero | 55. Datos_Registro_Comercio | 56. Patente_Numero | 57. Logo_Empresarial_Blob | 58. Correo_Corporativo | 59. Extension_Telefonica | 60. Horario_Laboral.

D. Gubernamental y Legal (15) Numero_Oficio | 62. Dependencia_Emisora | 63. Sello_Digital_Autoridad | 64. Fundamento_Legal_Articulo | 65. Fecha_Emision | 66. Fecha_Vencimiento | 67. Numero_Expediente | 68. Juzgado_Tribunal | 69. Tipo_Tramite | 70. Estatus_Procedimiento | 71. Firma_Funcionario_Publico | 72. QR_Verificacion_Oficial | 73. Apostilla_Numero | 74. Acta_Nacimiento_Libro | 75. Acta_Nacimiento_Foja.

E. Universitario y Académico (15) Matricula_Alumno | 77. Institucion_Educativa | 78. Facultad_Escuela | 79. Carrera_Programa | 80. Semestre_Cuatrimestre | 81. Promedio_General | 82. Creditos_Acumulados | 83. Estatus_Academico (Regular/Baja) | 84. Titulo_Tesis | 85. Cedula_Profesional_Numero | 86. Grado_Academico_Obtenido | 87. Fecha_Examen_Profesional | 88. Folio_Diploma | 89. Beca_Tipo | 90. Idioma_Certificacion_Nivel.

F. Internacional y Logística (10) Codigo_Arancelario | 92. Incoterm_Vigente | 93. Numero_Guia_Tracking | 94. Puerto_Entrada | 95. Pais_Origen | 96. Peso_Neto_Kg | 97. Volumen_M3 | 98. Numero_Lote | 99. Certificado_Origen_Folio | 100. Aduana_Despacho.

Protocolo de Localización (Mapping) Para cada entidad detectada, el agente DEBE extraer los siguientes metadatos técnicos para permitir la inyección posterior de datos:
ID_Entidad: (Del 1 al 100)

Página_Index: Número de página donde se localiza el campo (1-indexed).

Bounding_Box: Coordenadas [x0, y0, x1, y1] del espacio vacío.

Contexto_Inmediato: Frase que precede y sucede al campo vacío para validación semántica.

Protocolo de Salida de Inspección (JSON Schema) El resultado del análisis debe ser un objeto JSON estructurado que sirva de base para el formulario asíncrono y la base de datos MongoDB:
JSON { "document_hash": "sha256_del_pdf", "total_pages": "n", "entities_detected": [ { "id": 5, "type": "RFC_Persona_Fisica", "page": 1, "coords": [100, 250, 300, 265], "required": true, "suggested_label": "RFC del Trabajador" } ] } 4. Instrucciones de Procesamiento para el Agente Escaneo Visual: Localiza geometrías que sugieran campos de entrada.

Contextualización: Analiza las 5 palabras anteriores y posteriores a la geometría para asignar una categoría del catálogo 1-100.

Deducción de Documento: Si se detectan más de 5 campos de la categoría "E", clasifica el documento como UNIVERSITARIO.

Generación de Propuesta: Crea el formulario de captura optimizado agrupando campos por categoría para reducir la carga cognitiva del usuario.