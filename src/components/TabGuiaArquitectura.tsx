import React from 'react';
import { FileText, Download, CheckCircle, Layers, Code, BookOpen } from 'lucide-react';

export const TabGuiaArquitectura: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn py-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3">
        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Documentación Oficial • Prototipo SENA
        </span>
        <h2 className="text-3xl font-black tracking-tight">Arquitectura, Especificación y Contenido</h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Documentación técnica y pedagógica basada en el Acuerdo 0009 de 2024 y los requerimientos institucionales para nuevos aprendices del SENA.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-10 text-slate-800 leading-relaxed">
        
        {/* SECCIÓN 1 */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="text-xl font-bold text-slate-900">Arquitectura de Información y Flujo de Usuario</h3>
          </div>
          <p className="text-sm text-slate-600">
            El flujo de interacción del aprendiz en la plataforma se divide en cuatro etapas principales orientadas a garantizar una inducción institucional exitosa:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
            <li><strong>Paso 1 - Acceso y Caracterización Inicial:</strong> Al ingresar, el sistema invita al aprendiz a completar un formulario interactivo con listas desplegables para registrar su historial previo en el SENA y nivel de formación.</li>
            <li><strong>Paso 2 - Navegación por la Ruta de Inducción:</strong> El usuario explora libremente 3 pestañas principales: Historia del SENA, Regionales y Centros, y Reglamento del Aprendiz.</li>
            <li><strong>Paso 3 - Consulta Interactiva y Tutor AI:</strong> El aprendiz puede consultar artículos específicos del Acuerdo 0009 de 2024 y hacer preguntas en tiempo real a un tutor conversacional inteligente.</li>
            <li><strong>Paso 4 - Evaluación de Conocimientos:</strong> Un simulador de casos práctico (Quiz) pone a prueba la comprensión del reglamento con retroalimentación inmediata.</li>
          </ul>
        </section>

        {/* SECCIÓN 2 */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="text-xl font-bold text-slate-900">Especificación del Módulo de Caracterización</h3>
          </div>
          <p className="text-sm text-slate-600">
            Estructura de campos desplegables requeridos para recolectar el perfil del aprendiz:
          </p>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 font-mono text-xs space-y-3 overflow-x-auto text-slate-800">
            <p className="text-emerald-700 font-bold">// Esquema del Formulario de Caracterización (TypeScript / JSON)</p>
            <pre className="text-slate-700">{`{
  "campos": [
    {
      "nombre": "historialSena",
      "tipo": "select",
      "etiqueta": "¿Tiene historial de formación previa en el SENA?",
      "opciones": ["Sí", "No"]
    },
    {
      "nombre": "nivelSenaAnterior",
      "tipo": "select",
      "etiqueta": "Nivel de formación anterior alcanzado",
      "opciones": ["N/A", "Operario", "Auxiliar", "Técnico", "Tecnólogo"]
    },
    {
      "nombre": "estadoCulminacionPrevia",
      "tipo": "select",
      "etiqueta": "Estado de culminación previa",
      "opciones": [
        "Primera vez que ingresa",
        "Culminó con éxito",
        "Desertó",
        "Canceló"
      ]
    }
  ]
}`}</pre>
          </div>
        </section>

        {/* SECCIÓN 3 */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="text-xl font-bold text-slate-900">Contenido de las Pestañas de la Ruta</h3>
          </div>
          
          <div className="space-y-4 text-sm text-slate-700">
            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-900">Pestaña 1: Historia del SENA</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Resumen interactivo de los hitos históricos desde la creación por Rodolfo Martínez Tono en 1957 (Decreto 118), la evolución hacia la formación por competencias, SENNOVA, la misión orientada al desarrollo social y técnico, y los símbolos institucionales (Escudo, Bandera, Logotipo e Himno).
              </p>
            </div>

            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-900">Pestaña 2: Regionales</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Listado y buscador interactivo de las 33 regionales del SENA (Distrito Capital, Antioquia, Valle del Cauca, Cundinamarca, Atlántico, Santander, etc.), con detalle de su cobertura departamental, número de centros de formación y principales complejos tecnológicos.
              </p>
            </div>

            <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-900">Pestaña 3: Reglamento del Aprendiz (Acuerdo 0009 de 2024)</h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Extracto enfocado en los derechos (debido proceso, uso de ambientes, estímulos), deberes académicos y de convivencia, estímulos (monitorías, menciones de honor) y faltas académicas/disciplinarias según la normativa vigente.
              </p>
            </div>
          </div>
        </section>

      </div>

    </div>
  );
};
