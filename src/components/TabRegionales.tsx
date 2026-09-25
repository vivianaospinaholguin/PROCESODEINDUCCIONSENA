import React, { useState, useMemo } from 'react';
import { TODAS_REGIONALES_SENA } from '../data/regionalesCompletas';
import { MapaColombiaInteractivo } from './MapaColombiaInteractivo';
import { MapPin, Search, Building, Users, ExternalLink, ChevronRight, Compass, Map, Grid, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { RegionalSena } from '../types';

export const TabRegionales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroZona, setFiltroZona] = useState<string>('Todas');
  const [selectedRegional, setSelectedRegional] = useState<RegionalSena>(
    TODAS_REGIONALES_SENA.find(r => r.id === 'dc') || TODAS_REGIONALES_SENA[0]
  );
  const [vistaModo, setVistaModo] = useState<'mapa' | 'cuadricula'>('mapa');

  // Filtrado de regionales
  const filteredRegionales = useMemo(() => {
    return TODAS_REGIONALES_SENA.filter((reg) => {
      const matchesSearch =
        reg.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.coberturaDepartamentos.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())) ||
        reg.centros.some(c => c.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesZona = filtroZona === 'Todas' || reg.zona === filtroZona;

      return matchesSearch && matchesZona;
    });
  }, [searchTerm, filtroZona]);

  const zonas = [
    { nombre: 'Todas', conteo: 33 },
    { nombre: 'Andina', conteo: 11 },
    { nombre: 'Caribe', conteo: 8 },
    { nombre: 'Pacífica', conteo: 4 },
    { nombre: 'Orinoquía', conteo: 4 },
    { nombre: 'Amazonía', conteo: 6 },
    { nombre: 'Insular', conteo: 1 }
  ];

  return (
    <div className="space-y-8 animate-fadeIn py-4">
      
      {/* Header Institucional */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-900/40">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pestaña 2 • Mapa Geográfico de Cobertura Nacional</span>
            </span>
            <span className="bg-white/10 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              33 Regionales SENA
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Mapa de Colombia: Todas las Regionales del SENA
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Explora las 33 Direcciones Regionales en los 32 departamentos del país y el Distrito Capital. Haz clic sobre cualquier punto del mapa para consultar sus centros de formación profesional y vocación productiva.
          </p>
        </div>

        {/* Buscador Rápido */}
        <div className="w-full md:w-80 relative shrink-0">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar regional, capital o centro..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 backdrop-blur-md"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-white"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Barra de Filtros por Región Natural y Selector de Vista */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
        
        {/* Chips de Regiones Naturales */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {zonas.map((zona) => (
            <button
              key={zona.nombre}
              onClick={() => setFiltroZona(zona.nombre)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                filtroZona === zona.nombre
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{zona.nombre}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                filtroZona === zona.nombre ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {zona.conteo}
              </span>
            </button>
          ))}
        </div>

        {/* Switch de Modo de Vista */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl self-end sm:self-auto">
          <button
            onClick={() => setVistaModo('mapa')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              vistaModo === 'mapa'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Mapa Interactivo</span>
          </button>
          <button
            onClick={() => setVistaModo('cuadricula')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              vistaModo === 'cuadricula'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Ver Cuadrícula</span>
          </button>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL: MODO MAPA */}
      {vistaModo === 'mapa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMNA 1: MAPA DE COLOMBIA (7 columnas) */}
          <div className="lg:col-span-7 space-y-4">
            <MapaColombiaInteractivo
              regionales={filteredRegionales}
              selectedRegional={selectedRegional}
              onSelectRegional={(reg) => setSelectedRegional(reg)}
              filtroZona={filtroZona}
            />

            {/* Selector rápido en scroll horizontal */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Selección Rápida de Regionales ({filteredRegionales.length} disponibles)
              </span>
              <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                {filteredRegionales.map((reg) => (
                  <button
                    key={reg.id}
                    onClick={() => setSelectedRegional(reg)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 flex items-center space-x-1.5 ${
                      selectedRegional.id === reg.id
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-emerald-500" />
                    <span>{reg.nombre.replace('Regional ', '')}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMNA 2: DETALLE DE LA REGIONAL SELECCIONADA (5 columnas) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              {/* Encabezado del Detalle */}
              <div className="space-y-3 border-b border-slate-100 pb-5">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Región {selectedRegional.zona}</span>
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Capital: {selectedRegional.capital}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {selectedRegional.nombre}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  {selectedRegional.directorRegional} • Cobertura: {selectedRegional.coberturaDepartamentos.join(', ')}
                </p>
              </div>

              {/* Vocación y Descripción */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Vocación Productiva y Formativa</span>
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {selectedRegional.descripcion}
                </p>
              </div>

              {/* Centros de Formación */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Centros de Formación Profesional</span>
                  </h4>
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    {selectedRegional.totalCentros} Centros
                  </span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1 no-scrollbar">
                  {selectedRegional.centros.map((centro, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 transition-colors space-y-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-xs text-slate-800 leading-snug">
                          {centro.nombre}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full shrink-0">
                          {centro.ciudad}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        📍 {centro.direccion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enlace y botón */}
              <div className="pt-2 border-t border-slate-100">
                <a
                  href="https://www.sena.edu.co"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 bg-slate-900 hover:bg-emerald-800 text-white py-3 rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <span>Consultar oferta en esta regional</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* DIRECTORIO Y UBICACIÓN DE TODAS LAS 33 REGIONALES */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 flex items-center space-x-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              <span>Directorio Oficial de las 33 Direcciones Regionales SENA</span>
            </h3>
            <p className="text-xs text-slate-500">
              Presencia institucional en los 32 departamentos de Colombia y el Distrito Capital. Haz clic en "Ubicar en mapa" para visualizarla.
            </p>
          </div>
          <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-200 self-start sm:self-auto shrink-0">
            {filteredRegionales.length} Regionales listadas
          </span>
        </div>

        {/* Tabla responsive interactiva */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3 px-3">#</th>
                <th className="pb-3 px-3">Dirección Regional</th>
                <th className="pb-3 px-3">Capital / Sede</th>
                <th className="pb-3 px-3">Región Natural</th>
                <th className="pb-3 px-3 text-center">Centros</th>
                <th className="pb-3 px-3">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRegionales.map((reg, idx) => {
                const isSelected = selectedRegional.id === reg.id;
                return (
                  <tr
                    key={reg.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-emerald-50/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-slate-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{reg.nombre}</span>
                        {isSelected && (
                          <span className="bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                            ACTIVA
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">
                      📍 {reg.capital}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        reg.zona === 'Caribe' ? 'bg-cyan-50 text-cyan-700 border border-cyan-200' :
                        reg.zona === 'Andina' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        reg.zona === 'Pacífica' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        reg.zona === 'Orinoquía' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        reg.zona === 'Amazonía' ? 'bg-green-50 text-green-700 border border-green-200' :
                        'bg-purple-50 text-purple-700 border border-purple-200'
                      }`}>
                        {reg.zona}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {reg.totalCentros}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => {
                          setSelectedRegional(reg);
                          setVistaModo('mapa');
                          window.scrollTo({ top: 120, behavior: 'smooth' });
                        }}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center space-x-1 ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800'
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        <span>Ubicar en mapa</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CONTENIDO ALTERNATIVO: MODO CUADRÍCULA */}
      {vistaModo === 'cuadricula' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fadeIn">
          {filteredRegionales.map((reg) => (
            <div
              key={reg.id}
              onClick={() => {
                setSelectedRegional(reg);
                setVistaModo('mapa');
              }}
              className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {reg.zona}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {reg.totalCentros} Centros
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {reg.nombre}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Capital: <strong className="text-slate-700">{reg.capital}</strong>. {reg.descripcion}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Ver en el mapa</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas de Cobertura Nacional */}
      <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <span className="text-3xl sm:text-4xl font-black text-emerald-300 block">33</span>
          <span className="text-xs text-emerald-100 font-medium">Direcciones Regionales</span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-black text-emerald-300 block">117+</span>
          <span className="text-xs text-emerald-100 font-medium">Centros de Formación</span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-black text-emerald-300 block">32</span>
          <span className="text-xs text-emerald-100 font-medium">Departamentos + D.C.</span>
        </div>
        <div>
          <span className="text-3xl sm:text-4xl font-black text-emerald-300 block">100%</span>
          <span className="text-xs text-emerald-100 font-medium">Cobertura Nacional</span>
        </div>
      </div>

    </div>
  );
};
