// server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '20mb' }))

// Modelos gratis con visión, en orden de preferencia
const FREE_VISION_MODELS = [
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'qwen/qwen2.5-vl-72b-instruct:free',
  'qwen/qwen2.5-vl-32b-instruct:free',
  'meta-llama/llama-3.2-11b-vision-instruct:free',
  'mistralai/mistral-small-3.1-24b-instruct:free',
  'openrouter/free',
]

async function callModel(apiKey, model, base64, mimeType, prompt) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'DataDolphin'
    },
    body: JSON.stringify({
      model,
      messages: [{
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
          { type: 'text', text: prompt }
        ]
      }]
    })
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data?.error?.message || JSON.stringify(data))
  const text = data.choices?.[0]?.message?.content || '{}'
  return text
}

app.post('/api/extract', async (req, res) => {
  const { base64, mimeType, prompt } = req.body
  const apiKey = process.env.OPENROUTER_API_KEY?.trim()

  console.log('📥 Petición recibida')
  console.log('🔑 OpenRouter Key:', apiKey ? 'SÍ (' + apiKey.slice(0, 14) + '...)' : '❌ NO ENCONTRADA')

  if (!apiKey || apiKey.length < 20) {
    return res.status(500).json({ error: 'OPENROUTER_API_KEY inválida o no configurada en .env' })
  }

  for (const model of FREE_VISION_MODELS) {
    try {
      console.log(`🌐 Intentando con: ${model}`)
      const text = await callModel(apiKey, model, base64, mimeType, prompt)
      console.log('✅ Respuesta OK con', model, ':', text.slice(0, 200))
      return res.json({ text })
    } catch (err) {
      console.warn(`⚠️ Falló ${model}:`, err.message.slice(0, 100))
      // Espera 500ms antes de intentar el siguiente
      await new Promise(r => setTimeout(r, 500))
    }
  }

  res.status(503).json({ error: 'Todos los modelos gratuitos están saturados. Intenta en unos minutos.' })
})

app.listen(3001, () => console.log('✅ Proxy OpenRouter corriendo en http://localhost:3001'))