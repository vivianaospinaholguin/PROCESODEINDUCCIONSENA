import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2, Cpu, Check, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({ isOpen, onClose }) => {
  const [selectedModel, setSelectedModel] = useState<'gemini-3.8-flash' | 'gemini-flash-latest' | 'gemini-3.1-flash-lite'>('gemini-3.8-flash');
  const [modelNotice, setModelNotice] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu Tutor AI especializado en el Acuerdo 0009 de 2024 (Reglamento del Aprendiz SENA). Estoy funcionando con el modelo actualizado Gemini 3.8 Flash. ¿En qué puedo orientarte hoy sobre tus deberes, derechos, faltas o proceso formativo?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleModelChange = (model: 'gemini-3.8-flash' | 'gemini-flash-latest' | 'gemini-3.1-flash-lite') => {
    setSelectedModel(model);
    setModelNotice(`Modelo actualizado a: ${model}`);
    setTimeout(() => setModelNotice(null), 3500);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    let answerText = '';

    // 1. Intentar llamar al endpoint del servidor Express (/api/chat)
    try {
      const serverRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, model: selectedModel })
      });

      if (serverRes.ok) {
        const data = await serverRes.json();
        if (data.text) {
          answerText = data.text;
        }
      }
    } catch (serverErr) {
      console.warn('Fallback al SDK cliente:', serverErr);
    }

    // 2. Si el servidor no respondió, usar SDK cliente con gemini-flash-latest
    if (!answerText) {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
            model: selectedModel,
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `Eres un tutor pedagógico del SENA (Servicio Nacional de Aprendizaje de Colombia), especializado en el Acuerdo 0009 de 2024 (Reglamento del Aprendiz SENA). Responde a la siguiente consulta del aprendiz con tono institucional, claro y cordial: ${userMsg}`
                  }
                ]
              }
            ]
          });
          answerText = response.text || '';
        }
      } catch (clientErr: any) {
        console.error('Error en SDK cliente:', clientErr);
      }
    }

    if (!answerText) {
      answerText = `Como tutor del SENA bajo el Acuerdo 0009 de 2024, recuerda que todos los aprendices tienen derecho al debido proceso (Art. 9), a la representación y a los ambientes de aprendizaje. Respecto a "${userMsg}", puedes verificar los detalles en la Pestaña 3 del Reglamento o consultar con tu coordinador de formación.`;
    }

    setMessages((prev) => [...prev, { role: 'assistant', content: answerText }]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden h-[620px] flex flex-col">
        
        {/* Header con selector de modelo actualizado */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 px-6 py-4 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <Sparkles className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold">Tutor AI • Acuerdo 0009 SENA</h2>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30">
                  {selectedModel}
                </span>
              </div>
              <p className="text-xs text-amber-100">Inteligencia Artificial para Aprendices SENA</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Barra de actualización y selección de modelo */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-700">
            <Cpu className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold">Modelo de IA:</span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => handleModelChange('gemini-3.8-flash')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] flex items-center space-x-1 ${
                selectedModel === 'gemini-3.8-flash'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>Gemini 3.8 Flash</span>
              <span className="text-[9px] bg-emerald-500 text-white px-1 py-0.2 rounded font-mono">Actual</span>
            </button>
            <button
              onClick={() => handleModelChange('gemini-flash-latest')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                selectedModel === 'gemini-flash-latest'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              Flash Latest
            </button>
            <button
              onClick={() => handleModelChange('gemini-3.1-flash-lite')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                selectedModel === 'gemini-3.1-flash-lite'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              Flash Lite
            </button>
          </div>
        </div>

        {/* Notificación de cambio de modelo */}
        {modelNotice && (
          <div className="bg-emerald-600 text-white px-4 py-1.5 text-xs text-center font-bold animate-fadeIn flex items-center justify-center space-x-1">
            <Check className="w-3.5 h-3.5" />
            <span>{modelNotice}</span>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-orange-600 text-white'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                <span>Generando respuesta con {selectedModel}...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre derechos, faltas, comités de evaluación..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white p-3 rounded-xl transition-colors shadow-sm"
            title="Enviar pregunta"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
