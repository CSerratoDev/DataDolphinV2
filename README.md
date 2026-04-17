![Logo](https://res.cloudinary.com/drxg6xc6a/image/upload/v1755229408/datadolphin_ta0o20.png)


## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Authors

- [@cserratodev](https://github.com/CSerratoDev)


# Document Augmentation Engine.

This project is an advanced document orchestration system designed to transform physical or digital administrative processes into highly efficient paperless workflows. The agent leverages multimodal AI to reverse-engineer $n$-page documents, identifying missing fields and automating the data injection process.

## Data Classification & Taxonomy
The core of the system is a Data Taxonomy that classifies variables into over 100 distinct types, covering the following domains:

- Fiscal & Financial.

- Governmental & Legal.

- Corporate & Labor.

- University & Academic.

- International & Logistics.

## Agent Operation
The agent operates based on configuration files (agent.yaml) and skill definitions (SKILL.md):

- Capability Loading: 
    
    Upon startup, it verifies installed libraries (e.g., PyMuPDF). If a critical dependency for coordinate handling is missing, the system throws a preemptive error.

- Cross-Referencing: 

    In the inspeccion_clausulas node, the agent explicitly references Section 1 of SKILL.md to use the 100 data types as semantic classification labels.

- Asynchronous State: 

    It utilizes require_human_approval_for_injection within LangGraph to create breakpoints. The process pauses until the administrator validates or completes the captured data.

# Motor de Ingesta y Aumento de Documentos 

Este proyecto es un sistema avanzado de orquestación de documentos diseñado para transformar procesos administrativos físicos o digitales en flujos paperless altamente eficientes. El agente utiliza IA multimodal para realizar ingeniería inversa de documentos de n páginas, identificando campos faltantes y automatizando su llenado.

## Clasificación y Taxonomía de Datos

El núcleo del sistema es una Taxonomía de Datos que clasifica variables en más de 100 tipos distintos, abarcando dominios:

- Fiscal y Financiero.

- Gubernamental y Legal.

- Empresarial y Laboral.

- Universitario y Académico.

- Internacional y Logística.

## Operación del Agente
El agente opera basándose en archivos de configuración (agent.yaml) y habilidades (SKILL.md):

- Carga de Capacidades: 
    
    Al iniciar, verifica las librerías instaladas (ej. PyMuPDF). Si falta alguna dependencia crítica para el manejo de coordenadas, el sistema emite un error preventivo.

- Referencia Cruzada: 
    
    En el nodo inspeccion_clausulas, el agente consulta la Sección 1 de SKILL.md para usar los 100 tipos de datos como etiquetas de clasificación semántica.

- Estado Asíncrono: 

    Utiliza require_human_approval_for_injection en LangGraph para crear puntos de interrupción (breakpoints). El proceso se pausa hasta que el administrador valida o completa los datos capturados.
## Libraries

#### PyMuPDF (import fitz)

The "Scalpel and Eyes" of the agent. It is the fastest library for PDF manipulation, reading geometry, and finding exact $(x, y)$ coordinates of underscores (_______) to stamp text.

El "Escalpelos y Ojos" del agente. Es la librería más rápida para manipular PDFs, leer su geometría y encontrar coordenadas exactas $(x, y)$ de líneas de puntos (_______) para estampar texto.

#### Motor / PyMongo

The "Nervous System and Memory." An asynchronous driver for MongoDB that stores document "Templates" and mapping for the 100 data types to avoid re-analyzing documents.

El "Sistema Nervioso y Memoria". Driver asíncrono para MongoDB que guarda los "Templates" y mapas de los 100 tipos de datos para evitar re-analizar documentos.

#### LangChain / LangGraph

The "Brain and Orchestrator." Manages the workflow with state memory and cycles, allowing asynchronous pauses for human intervention.

El "Cerebro y Orquestador". Maneja el flujo con memoria de estado y ciclos, permitiendo pausas asíncronas para la intervención humana.

#### Google Generative AI (Gemini)

Provides native visual reasoning for PDFs, structured JSON extraction, and dynamic generation of data capture forms.

Proporciona razonamiento visual nativo para PDFs, extracción estructurada en JSON y generación dinámica de formularios de captura.
## Tech Stack & Dependencias / Dependencies


| Library / Librería |  Purpose / Propósito     | Role / Rol                |
| :-------- | :------- | :------------------------- |
| PyMuPDF `fitz` | Visión de Documento | Coordenadas e inyección de texto / Coords & text injection. |
| Motor / PyMongo | Persistencia Async| Gestión de MongoDB Atlas / MongoDB Atlas management.|
|LangGraph| Orquestación | Ciclos y estados asíncronos / Async states and cycles.|
| Google GenAI | IA Multimodal | Clasificación con Gemini 1.5 / Classification w/ Gemini 1.5.|
| LangChain Google | Interface LLM |Integración de modelo / Model integration. |
| Python Dotenv| Seguridad | Variables de entorno / Environment variables.|
## Instalación / Installation

Install dependencies

```bash
  pip install pymupdf motor pymongo langchain-google-genai langgraph google-generativeai python-dotenv
```

or

```bash
  pip install -r requirements.txt
```