import React, { useState } from 'react';
import { HITOS_HISTORIA, SIMBOLOS_SENA } from '../data/senaData';
import { Building2, MapPin, Laptop, Cpu, ShieldCheck, Award, Target, Eye, BookOpen, ZoomIn, X, Sparkles, UserCheck, Music, ExternalLink, Play } from 'lucide-react';
import { BanderaSena } from './BanderaSena';
import { EscudoSena } from './EscudoSena';
import { LogotipoSena } from './LogotipoSena';
import martinezTonoImg from '../assets/images/martinez_tono_1790197869721.jpg';

export const TabHistoria: React.FC = () => {
  const [selectedHito, setSelectedHito] = useState(HITOS_HISTORIA[0]);
  const [showFounderModal, setShowFounderModal] = useState<boolean>(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6 text-emerald-600" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-emerald-600" />;
      case 'Laptop': return <Laptop className="w-6 h-6 text-emerald-600" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-emerald-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      default: return <Award className="w-6 h-6 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-10 animate-fadeIn py-6">
      
      {/* Hero Banner institucional */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Pestaña 1 • Inducción Institucional
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Historia, Misión y Símbolos del SENA
          </h2>
          <p className="text-emerald-100 text-base leading-relaxed">
            El Servicio Nacional de Aprendizaje (SENA) es la institución pública colombiana encargada de cumplir la función del Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo formación profesional integral.
          </p>
        </div>
      </div>

      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Misión del SENA</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700 shadow-xs">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Visión del SENA</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              En el 2026, el SENA será una organización de clase mundial en formación profesional integral y en el uso de tecnologías de vanguardia, aportando a la productividad de las empresas, a la empleabilidad de las personas y a la equidad social, en articulación con las políticas de reindustrialización del país.
            </p>
          </div>
        </div>
      </div>

      {/* Hitos Históricos Interactivos */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Línea de Tiempo Interactiva</h3>
            <p className="text-sm text-slate-500">Conoce los momentos clave que forjaron la identidad del SENA desde 1957.</p>
          </div>
          <span className="bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-full text-xs">
            Fundado por Rodolfo Martínez Tono
          </span>
        </div>

        {/* Timeline selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {HITOS_HISTORIA.map((hito) => (
            <button
              key={hito.id}
              onClick={() => setSelectedHito(hito)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                selectedHito.id === hito.id
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-md scale-102'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  selectedHito.id === hito.id ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-800'
                }`}>
                  {hito.ano}
                </span>
                <span className={`text-xs ${selectedHito.id === hito.id ? 'text-emerald-200' : 'text-slate-400'}`}>
                  •
                </span>
              </div>
              <p className="text-sm font-bold line-clamp-1">{hito.titulo}</p>
            </button>
          ))}
        </div>

        {/* Hito Detail Card */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="shrink-0">
            {selectedHito.id === '1' ? (
              <div
                onClick={() => setShowFounderModal(true)}
                className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 shadow-md border-2 border-emerald-600 ring-4 ring-emerald-500/20 cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
                title="Haga clic para ampliar la imagen de Rodolfo Martínez Tono"
              >
                <img
                  src={martinezTonoImg}
                  alt="Dr. Rodolfo Martínez Tono - Fundador del SENA (1957)"
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/60 to-transparent py-0.5 text-center">
                  <span className="text-[9px] font-black text-emerald-200 uppercase tracking-tight block">
                    Fundador
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center">
                {getIcon(selectedHito.icono)}
              </div>
            )}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full">
                {selectedHito.ano}
              </span>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Categoría: {selectedHito.categoria}
              </span>
              {selectedHito.id === '1' && (
                <button
                  type="button"
                  onClick={() => setShowFounderModal(true)}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-white/80 hover:bg-white border border-emerald-300/80 px-2.5 py-0.5 rounded-full transition-all shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ver semblanza del Fundador</span>
                </button>
              )}
            </div>

            <h4 className="text-xl font-bold text-slate-900">{selectedHito.titulo}</h4>
            <p className="text-slate-700 text-sm leading-relaxed">{selectedHito.descripcion}</p>

            {selectedHito.id === '1' && (
              <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center text-xs text-emerald-900 font-medium">
                <span className="italic">
                  "El SENA es fruto de la visión del abogado y economista cartagenero Dr. Rodolfo Martínez Tono, quien lideró la entidad entre 1957 y 1974."
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL BIOGRÁFICO DE RODOLFO MARTÍNEZ TONO */}
      {showFounderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scaleUp">
            
            {/* Botón Cerrar */}
            <button
              onClick={() => setShowFounderModal(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cabecera con Imagen de Retrato */}
            <div className="relative bg-gradient-to-b from-slate-900 to-emerald-950 p-6 text-center text-white flex flex-col items-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-emerald-500 shadow-2xl mb-4 bg-slate-800">
                <img
                  src={martinezTonoImg}
                  alt="Dr. Rodolfo Martínez Tono - Fundador del SENA"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
                Fundador Histórico del SENA
              </span>
              <h3 className="text-2xl font-black tracking-tight">Dr. Rodolfo Martínez Tono</h3>
              <p className="text-xs text-emerald-200">Cartagena de Indias (1927) – Bucaramanga (2015)</p>
            </div>

            {/* Cuerpo del Modal con Reseña */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs space-y-2 text-emerald-950">
                <p className="font-bold text-sm text-emerald-900 flex items-center space-x-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>El Padre del SENA</span>
                </p>
                <p className="leading-relaxed">
                  Abogado y economista de la Pontificia Universidad Javeriana. En su tesis de grado de 1954 propuso la creación de un instituto de capacitación técnica para trabajadores colombianos.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <h5 className="font-bold text-slate-900 text-sm">Hitos de su Gestión (1957 - 1974):</h5>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600">
                  <li>Lideró la expedición del Decreto Ley 118 del 21 de junio de 1957.</li>
                  <li>Ejerció como Director General durante 17 años ininterrumpidos.</li>
                  <li>Construyó y dotó más de 80 centros de formación profesional en todo Colombia.</li>
                  <li>Posicionó al SENA como modelo de educación técnica en toda América Latina ante la OIT.</li>
                </ul>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="text-[11px] text-slate-500 italic text-center">
                  "El SENA dignifica el trabajo productivo y brinda oportunidades reales a la juventud de Colombia."
                </p>
              </div>
            </div>

            {/* Pie del modal */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFounderModal(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors shadow-xs"
              >
                Cerrar Semblanza
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Símbolos Institucionales */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Símbolos Institucionales</h3>
            <p className="text-sm text-slate-500">Los emblemas que representan el orgullo de pertenecer al SENA.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SIMBOLOS_SENA.map((simbolo, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                    0{idx + 1}
                  </div>
                  {simbolo.titulo === 'El Himno' && (
                    <a
                      href="https://www.youtube.com/watch?v=PvwEJWhSjYE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-0.5 rounded-full transition-colors"
                      title="Ver video en YouTube"
                    >
                      <Play className="w-2.5 h-2.5 fill-red-600 text-red-600" />
                      <span>YouTube</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{simbolo.titulo}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{simbolo.descripcion}</p>
              </div>

              {simbolo.titulo === 'El Himno' && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-3">
                  <a
                    href="https://www.youtube.com/watch?v=PvwEJWhSjYE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md group"
                  >
                    <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>Reproducir Himno Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5 text-red-200 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  {/* Coro del Himno */}
                  <div className="bg-red-50/70 border border-red-200/80 rounded-xl p-3 text-[11px] text-red-950">
                    <p className="font-bold text-red-900 mb-1 flex items-center space-x-1">
                      <Music className="w-3 h-3 text-red-600" />
                      <span>Coro Oficial:</span>
                    </p>
                    <p className="italic leading-relaxed text-slate-700">
                      "Estudiantes del SENA adelante, por Colombia luchad con amor, con el ánimo noble y radiante, transformemos el mundo en mejor."
                    </p>
                  </div>
                </div>
              )}

              {simbolo.titulo === 'El Escudo' && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <EscudoSena />
                </div>
              )}

              {simbolo.titulo === 'La Bandera' && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <BanderaSena compact={true} showDetails={false} />
                </div>
              )}

              {simbolo.titulo === 'El Logotipo' && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <LogotipoSena />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
