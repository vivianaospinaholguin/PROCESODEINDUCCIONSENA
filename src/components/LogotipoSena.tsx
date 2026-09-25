import React, { useState } from 'react';
import logoSenaImg from '../assets/images/logo_sena_1790255949836.jpg';
import { ZoomIn, X, Sparkles, User, ArrowRight } from 'lucide-react';

interface LogotipoSenaProps {
  compact?: boolean;
  className?: string;
}

export const LogotipoSena: React.FC<LogotipoSenaProps> = ({
  compact = false,
  className = ''
}) => {
  const [showZoom, setShowZoom] = useState(false);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      
      {/* Contenedor del Logotipo con efecto hover */}
      <div
        onClick={() => setShowZoom(true)}
        className="group relative w-full bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
        title="Haga clic para ampliar el Logosímbolo Oficial del SENA"
      >
        <div className="relative w-full max-w-[190px] aspect-square flex items-center justify-center">
          <img
            src={logoSenaImg}
            alt="Logotipo Oficial del SENA"
            className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Overlay hover para ampliar */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
          <span className="bg-white/95 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
            <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ver Logotipo</span>
          </span>
        </div>

        <div className="mt-2 text-center">
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block">
            El Aprendiz en Marcha hacia el Futuro
          </span>
        </div>
      </div>

      {/* Modal Zoom del Logotipo */}
      {showZoom && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scaleUp">
            
            {/* Botón cerrar */}
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Encabezado */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 text-center">
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Símbolo Institucional
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Logosímbolo del SENA</h3>
              <p className="text-xs text-slate-500">Representación gráfica del aprendiz y los caminos de formación</p>
            </div>

            {/* Imagen ampliada */}
            <div className="p-6 flex flex-col items-center bg-white">
              <div className="w-60 h-60 max-w-full flex items-center justify-center">
                <img
                  src={logoSenaImg}
                  alt="Logotipo Oficial del SENA ampliado"
                  className="w-full h-full object-contain filter drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Guía semiótica e institucional */}
              <div className="w-full mt-6 space-y-2 text-xs">
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950">
                  <span className="text-lg">👤</span>
                  <div>
                    <span className="font-bold">Cabeza Circular:</span> El ser humano, su dignidad, pensamiento crítico y creatividad integral.
                  </div>
                </div>

                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950">
                  <span className="text-lg">👐</span>
                  <div>
                    <span className="font-bold">Brazos Extendidos:</span> La apertura al conocimiento, la solidaridad social y el compromiso ético con el país.
                  </div>
                </div>

                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950">
                  <span className="text-lg">🚶</span>
                  <div>
                    <span className="font-bold">Cuerpo y Sendero (A):</span> El aprendiz que camina con paso firme hacia el futuro, superando los caminos de la formación.
                  </div>
                </div>

                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-950">
                  <span className="text-lg">🟩</span>
                  <div>
                    <span className="font-bold">Verde Institucional:</span> Esperanza, desarrollo sostenible, tecnología y progreso de Colombia.
                  </div>
                </div>
              </div>
            </div>

            {/* Pie del modal */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowZoom(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
