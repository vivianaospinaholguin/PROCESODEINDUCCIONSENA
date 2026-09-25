import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_FILE = path.resolve(__dirname, 'src', 'data', 'repositorio_evaluaciones.json');

async function getEvaluaciones() {
  try {
    const data = await fs.readFile(REPO_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function saveEvaluaciones(evaluaciones: any[]) {
  try {
    await fs.writeFile(REPO_FILE, JSON.stringify(evaluaciones, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error guardando en el repositorio de evaluaciones:', err);
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Endpoint para consultar el estado del modelo
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    defaultModel: 'gemini-3.8-flash',
    timestamp: new Date().toISOString()
  });
});

// Endpoint para procesar consultas con Gemini (Acuerdo 0009 de 2024)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, model = 'gemini-3.8-flash' } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'El mensaje es requerido.' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY no configurada en el servidor.' });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: "Eres un experto tutor institucional del SENA (Servicio Nacional de Aprendizaje de Colombia), especializado estrictamente en el Acuerdo 0009 de 2024 (Nuevo Reglamento del Aprendiz) y la historia y regionales del SENA. Responde de forma amable, clara, didáctica y fundamentada en la normativa oficial."
      }
    });

    res.json({ text: response.text, modelUsed: model });
  } catch (error: any) {
    console.error('Error generating content with Gemini:', error);
    res.status(500).json({ error: error.message || 'Error en el servidor de IA.' });
  }
});

// Repositorio de Evaluaciones del Reglamento SENA (Acuerdo 0009 de 2024)
app.get('/api/evaluaciones', async (_req, res) => {
  try {
    const evaluaciones = await getEvaluaciones();
    res.json({ success: true, evaluaciones });
  } catch (error: any) {
    console.error('Error al leer el repositorio de evaluaciones:', error);
    res.status(500).json({ error: 'Error al consultar el repositorio.' });
  }
});

app.post('/api/evaluaciones', async (req, res) => {
  try {
    const nuevaEvaluacion = req.body;
    if (!nuevaEvaluacion || !nuevaEvaluacion.aprendiz) {
      return res.status(400).json({ error: 'Datos de la evaluación o del aprendiz incompletos.' });
    }
    const evaluaciones = await getEvaluaciones();
    // Insert at beginning of list
    const actualizadas = [nuevaEvaluacion, ...evaluaciones];
    await saveEvaluaciones(actualizadas);
    res.status(201).json({ success: true, evaluacion: nuevaEvaluacion, total: actualizadas.length });
  } catch (error: any) {
    console.error('Error al guardar evaluación:', error);
    res.status(500).json({ error: 'Error al guardar la evaluación en el servidor.' });
  }
});

app.delete('/api/evaluaciones/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const evaluaciones = await getEvaluaciones();
    const filtradas = evaluaciones.filter((item: any) => item.id !== id);
    await saveEvaluaciones(filtradas);
    res.json({ success: true, total: filtradas.length });
  } catch (error: any) {
    console.error('Error al eliminar evaluación:', error);
    res.status(500).json({ error: 'Error al eliminar el registro.' });
  }
});

app.delete('/api/evaluaciones', async (_req, res) => {
  try {
    await saveEvaluaciones([]);
    res.json({ success: true, total: 0 });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al limpiar el repositorio.' });
  }
});

// Iniciar servidor con Vite en desarrollo o estáticos en producción
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Servidor SENA activo en http://0.0.0.0:${PORT} con modelo gemini-3.8-flash`);
  });
}

startServer().catch((err) => {
  console.error('Fallo al iniciar el servidor:', err);
});
