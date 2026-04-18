import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'

try {
    const localPath = '.env.local'
    const defaultPath = '.env'
    let chosenPath
    if (fs.existsSync(localPath)) {
        chosenPath = localPath
    } else if (fs.existsSync(defaultPath)) {
        chosenPath = defaultPath
    }

    if (chosenPath) {
        const result = dotenv.config({ path: chosenPath })
        if (result.error) {
            console.warn('dotenv: fallo al cargar', result.error)
        } else {
            console.log(`dotenv: cargado desde ${chosenPath}`)
        }
    }
} catch (err) {
    console.warn('Error comprobando archivos de entorno:', err?.message || err)
}

const app = express()

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://localhost:8000', // ← Agregado para tu frontend
    ],
    methods: ['GET', 'POST']
}))

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

const FREE_VISION_MODELS = [
    'nvidia/nemotron-nano-12b-v2-vl:free',
    'google/gemma-4-31b-it:free',
    'google/gemma-4-26b-a4b-it:free',
    'google/gemma-3-27b-it:free',
    'google/gemma-3-12b-it:free',
    'google/gemma-3-4b-it:free',
]

// ✅ FIX: Usa el parámetro `model` en lugar de uno hardcodeado
async function callModel(apiKey, model, base64, mimeType, prompt) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "DataDolphin V2",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model, // ← Ahora usa el modelo del loop
            messages: [
                {
                    role: "user",
                    content: [
                        { type: "text", text: prompt },
                        { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } }
                    ]
                }
            ]
        })
    });

    const data = await response.json()
    if (!response.ok) throw new Error(data?.error?.message || JSON.stringify(data))
    const text = data.choices?.[0]?.message?.content || '{}'
    return text
}

app.post('/api/extract', async (req, res) => {
    const { base64, mimeType, prompt } = req.body
    const apiKey = process.env.OPENROUTER_API_KEY?.trim()

    console.log('Petición recibida')
    console.log('OpenRouter Key:', apiKey ? 'SÍ (' + apiKey.slice(0, 14) + '...)' : '❌ NO ENCONTRADA')

    if (!apiKey || apiKey.length < 20) {
        return res.status(500).json({ error: 'OPENROUTER_API_KEY inválida o no configurada en .env' })
    }

    for (const model of FREE_VISION_MODELS) {
        try {
            console.log(`Intentando con: ${model}`)
            const text = await callModel(apiKey, model, base64, mimeType, prompt)
            console.log('Respuesta OK con', model, ':', text.slice(0, 200))
            return res.json({ text })
        } catch (err) {
            console.warn(`Falló ${model}:`, err.message.slice(0, 100))
            await new Promise(r => setTimeout(r, 500))
        }
    }

    res.status(503).json({ error: 'Todos los modelos gratuitos están saturados. Intenta en unos minutos.' })
})

// ✅ FIX: Solo UN app.listen
app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001')
})