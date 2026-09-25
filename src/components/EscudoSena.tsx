import React, { useState } from 'react';
import escudoSenaImg from '../assets/images/escudo_sena_1790198057118.jpg';
import { ZoomIn, X, Info } from 'lucide-react';

interface EscudoSenaProps {
  compact?: boolean;
  className?: string;
}

export const EscudoSena: React.FC<EscudoSenaProps> = ({
  compact = false,
  className = ''
}) => {
  const [showZoom, setShowZoom] = useState(false);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      
      {/* Contenedor del Escudo con efecto visual */}
      <div
        onClick={() => setShowZoom(true)}
        className="group relative w-full bg-white rounded-2xl p-3 border border-slate-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
        title="Haga clic para ampliar el Escudo Oficial del SENA"
      >
        <div className="relative w-full max-w-[190px] aspect-[3/4] flex items-center justify-center">
          <img
            src={escudoSenaImg}
            alt="Escudo Oficial del SENA"
            className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Overlay hover para ampliar */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
          <span className="bg-white/95 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1">
            <ZoomIn className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ver Escudo</span>
          </span>
        </div>

        <div className="mt-2 text-center">
          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block">
            Emblema Oficial de los 3 Sectores
          </span>
        </div>
      </div>

      {/* Modal Zoom del Escudo */}
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
              <h3 className="text-xl font-black text-slate-900 mt-1">Escudo Oficial del SENA</h3>
              <p className="text-xs text-slate-500">Significado heráldico y compositivo de la entidad</p>
            </div>

            {/* Imagen ampliada */}
            <div className="p-6 flex flex-col items-center bg-white">
              <div className="w-56 h-72 max-w-full">
                <img
                  src={escudoSenaImg}
                  alt="Escudo Oficial del SENA ampliado"
                  className="w-full h-full object-contain filter drop-shadow-xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Guía heráldica */}
              <div className="w-full mt-6 space-y-2 text-xs">
                <div className="bg-red-50 p-2.5 rounded-xl border border-red-200 flex items-center space-x-2 text-red-900">
                  <span className="text-lg">⚙️</span>
                  <div>
                    <span className="font-bold">Piñón Rojo:</span> Industria y construcción (Sector Secundario).
                  </div>
                </div>

                <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center space-x-2 text-amber-900">
                  <span className="text-lg">⚕️</span>
                  <div>
                    <span className="font-bold">Caduceo Alado:</span> Comercio y servicios (Sector Terciario).
                  </div>
                </div>

                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center space-x-2 text-emerald-900">
                  <span className="text-lg">☕</span>
                  <div>
                    <span className="font-bold">Ramas de Cafeto:</span> Agricultura y campo (Sector Primario).
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
