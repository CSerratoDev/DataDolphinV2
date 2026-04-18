# DataDolphin V2 - Dependencies Documentation

## Overview
DataDolphin V2 es una aplicación **Next.js 16** con backend **Express.js** para procesamiento de documentos e integración con APIs de IA.

---

## 📦 Node.js Dependencies

### Runtime Dependencies (`package.json`)

#### Framework & Core
- **next** `16.2.4` - React framework con App Router (Turbopack)
- **react** `19.2.4` - UI library
- **react-dom** `19.2.4` - React DOM rendering

#### API & Backend
- **express** `^5.2.1` - HTTP server para proxy APIs
- **cors** `^2.8.6` - CORS middleware para Express
- **node-fetch** `^3.3.2` - Fetch API para Node.js
- **dotenv** `^17.4.2` - Environment variables loader

#### UI & Icons
- **react-icons** `^5.6.0` - Icon library (HiOutline* icons)
- **lucide-react** `^1.8.0` - Additional icons
- **tailwindcss-animate** `^1.0.7` - Tailwind animations

#### Document Processing
- **pdfjs-dist** `^5.6.205` - PDF to image conversion
- **jspdf** `^4.2.1` - Client-side PDF generation

### Development Dependencies
- **typescript** `^5.9.3` - TypeScript compiler
- **@types/react** `^19.2.14` - React type definitions
- **@types/react-dom** `^19.2.3` - React DOM type definitions
- **@types/node** `^20.19.39` - Node.js type definitions
- **tailwindcss** `^4.2.2` - CSS framework
- **@tailwindcss/postcss** `^4.2.2` - Tailwind PostCSS plugin
- **eslint** `^9.39.4` - Code linter
- **eslint-config-next** `16.2.4` - ESLint config for Next.js

### Installation

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install

# Or using yarn
yarn install
```

---

## 🐍 Python Dependencies

### Backend Processing (`requirements.txt`)

#### Core Utilities
- **python-dotenv** `1.0.0` - Environment variables
- **python-decouple** `3.8` - Environment configuration

#### Document Processing
- **pdf2image** `1.17.0` - Convert PDF pages to images
- **pillow** `10.1.0` - Image processing library
- **PyPDF2** `3.15.1` - PDF manipulation
- **pillow-heif** `0.13.0` - HEIF/HEIC image support

#### OCR (Optical Character Recognition)
- **pytesseract** `0.3.10` - Python wrapper for Tesseract (optional)

#### Data Processing
- **numpy** `2.3.1` - Numerical computing
- **pandas** `2.3.2` - Data analysis and manipulation

#### HTTP & Async
- **requests** `2.31.0` - HTTP client library
- **aiofiles** `23.2.0` - Async file operations
- **python-multipart** `0.0.6` - Multipart form data parser

#### Development & Testing
- **ipython** `8.32.0` - Interactive Python shell
- **jupyter** `1.0.0` - Jupyter notebook infrastructure
- **ipykernel** `6.29.5` - IPython kernel for Jupyter

### Installation

```bash
# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

## 🔧 Environment Setup

### Required Environment Variables

Create `.env.local` file in project root:

```bash
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# API Base URL (if using external API)
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Document Processing API
PYTHON_API_URL=http://localhost:5000
```

---

## 🚀 Running the Application

### Development

```bash
# Start Next.js dev server (port 3000)
pnpm dev

# Alternatively with npm
npm run dev

# Start Python backend (if needed, port 5000)
python server.py
```

### Production Build

```bash
# Build Next.js app
pnpm build

# Start production server
pnpm start
```

---

## 📋 Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js + React | 16.2.4 + 19.2.4 |
| Styling | Tailwind CSS | 4.2.2 |
| Backend API | Express.js | 5.2.1 |
| PDF Processing | pdfjs-dist + jsPDF | 5.6.205 + 4.2.1 |
| Type Safety | TypeScript | 5.9.3 |
| Python Processing | Python 3.x | - |
| AI Integration | OpenRouter API | Latest |
| Icons | react-icons + lucide-react | 5.6.0 + 1.8.0 |

---

## 🛠️ Troubleshooting

### Node.js Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Check Next.js version
next --version
```

### Python Issues

```bash
# Verify Python version
python --version  # Should be 3.8+

# Update pip
pip install --upgrade pip

# Install missing system dependencies (macOS)
brew install tesseract  # For OCR
```

### Environment Variables Not Loading

Check `.env.local` is in project root and restart dev server:

```bash
# Verify file exists
ls -la .env.local

# Restart dev server
pnpm dev
```

---

## 📚 References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [pnpm Package Manager](https://pnpm.io)

---

**Last Updated:** April 18, 2026  
**Project:** DataDolphin V2  
**Version:** 2.0.0
