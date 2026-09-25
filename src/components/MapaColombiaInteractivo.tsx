import React, { useState } from 'react';
import { RegionalSena } from '../types';
import { Compass, ZoomIn, ZoomOut, RotateCcw, Layers, Eye, EyeOff, Globe, Navigation, Building, MapPin, Flag, Image as ImageIcon } from 'lucide-react';
import {
  DEPARTAMENTOS_POLITICOS,
  PAISES_VECINOS,
  FRONTERAS_INTERNACIONALES,
  DepartamentoPolitico
} from '../data/departamentosGeometria';
import colombiaMapaFondoImg from '../assets/images/colombia_mapa_fondo_1790277866261.jpg';

interface MapaColombiaInteractivoProps {
  regionales: RegionalSena[];
  selectedRegional: RegionalSena;
  onSelectRegional: (reg: RegionalSena) => void;
  filtroZona: string;
}

export const MapaColombiaInteractivo: React.FC<MapaColombiaInteractivoProps> = ({
  regionales,
  selectedRegional,
  onSelectRegional,
  filtroZona
}) => {
  const [hoveredRegional, setHoveredRegional] = useState<RegionalSena | null>(null);
  const [hoveredDeptoId, setHoveredDeptoId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showRegions, setShowRegions] = useState<boolean>(false);
  const [showDepartamentos, setShowDepartamentos] = useState<boolean>(true);
  const [showFondoImagen, setShowFondoImagen] = useState<boolean>(true);
  const [opacidadFondo, setOpacidadFondo] = useState<number>(0.85);

  // Paleta de colores distintiva por región natural
  const getZoneTheme = (zona?: string) => {
    switch (zona) {
      case 'Caribe':
        return {
          fill: '#0891b2',
          lightFill: 'rgba(6, 182, 212, 0.25)',
          stroke: '#22d3ee',
          text: 'text-cyan-400',
          badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          pinColor: '#06b6d4',
          glow: 'rgba(6, 182, 212, 0.6)'
        };
      case 'Andina':
        return {
          fill: '#059669',
          lightFill: 'rgba(16, 185, 129, 0.25)',
          stroke: '#34d399',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          pinColor: '#10b981',
          glow: 'rgba(16, 185, 129, 0.6)'
        };
      case 'Pacífica':
        return {
          fill: '#2563eb',
          lightFill: 'rgba(59, 130, 246, 0.25)',
          stroke: '#60a5fa',
          text: 'text-blue-400',
          badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
          pinColor: '#3b82f6',
          glow: 'rgba(59, 130, 246, 0.6)'
        };
      case 'Orinoquía':
        return {
          fill: '#d97706',
          lightFill: 'rgba(245, 158, 11, 0.25)',
          stroke: '#fbbf24',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          pinColor: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.6)'
        };
      case 'Amazonía':
        return {
          fill: '#15803d',
          lightFill: 'rgba(34, 197, 94, 0.25)',
          stroke: '#4ade80',
          text: 'text-green-400',
          badgeBg: 'bg-green-500/20 text-green-300 border-green-500/40',
          pinColor: '#22c55e',
          glow: 'rgba(34, 197, 94, 0.6)'
        };
      case 'Insular':
        return {
          fill: '#7c3aed',
          lightFill: 'rgba(139, 92, 246, 0.25)',
          stroke: '#a78bfa',
          text: 'text-purple-400',
          badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
          pinColor: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.6)'
        };
      default:
        return {
          fill: '#059669',
          lightFill: 'rgba(16, 185, 129, 0.25)',
          stroke: '#34d399',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          pinColor: '#10b981',
          glow: 'rgba(16, 185, 129, 0.6)'
        };
    }
  };

  // Posicionamiento inteligente sin superposición para cada una de las 33 Regionales
  const getLabelConfig = (regId: string, coords: { x: number; y: number }) => {
    switch (regId) {
      case 'cundinamarca':
        return { xOffset: 0, yOffset: -18, anchor: 'middle' as const };
      case 'dc':
        return { xOffset: 16, yOffset: 16, anchor: 'start' as const };
      case 'caldas':
        return { xOffset: 15, yOffset: -8, anchor: 'start' as const };
      case 'risaralda':
        return { xOffset: -14, yOffset: 0, anchor: 'end' as const };
      case 'quindio':
        return { xOffset: -14, yOffset: 14, anchor: 'end' as const };
      case 'tolima':
        return { xOffset: 16, yOffset: 14, anchor: 'start' as const };
      case 'atlantico':
        return { xOffset: -14, yOffset: -6, anchor: 'end' as const };
      case 'magdalena':
        return { xOffset: 16, yOffset: -8, anchor: 'start' as const };
      case 'bolivar':
        return { xOffset: -14, yOffset: 2, anchor: 'end' as const };
      case 'sucre':
        return { xOffset: -14, yOffset: 0, anchor: 'end' as const };
      case 'cordoba':
        return { xOffset: -14, yOffset: 10, anchor: 'end' as const };
      case 'antioquia':
        return { xOffset: -15, yOffset: 2, anchor: 'end' as const };
      case 'choco':
        return { xOffset: -14, yOffset: 2, anchor: 'end' as const };
      case 'santander':
        return { xOffset: -15, yOffset: 2, anchor: 'end' as const };
      case 'nortedesantander':
        return { xOffset: 16, yOffset: 0, anchor: 'start' as const };
      case 'boyaca':
        return { xOffset: 16, yOffset: 0, anchor: 'start' as const };
      case 'valle':
        return { xOffset: -15, yOffset: 2, anchor: 'end' as const };
      case 'cauca':
        return { xOffset: -15, yOffset: 2, anchor: 'end' as const };
      case 'narino':
        return { xOffset: -14, yOffset: 2, anchor: 'end' as const };
      case 'putumayo':
        return { xOffset: -14, yOffset: 10, anchor: 'end' as const };
      case 'guainia':
        return { xOffset: -15, yOffset: 2, anchor: 'end' as const };
      case 'vichada':
        return { xOffset: -15, yOffset: 2, anchor: 'end' as const };
      default:
        return coords.x > 380
          ? { xOffset: -14, yOffset: 2, anchor: 'end' as const }
          : { xOffset: 14, yOffset: 2, anchor: 'start' as const };
    }
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.4));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  const handleReset = () => setZoomLevel(1);

  return (
    <div className="relative bg-slate-950 rounded-3xl p-4 sm:p-6 border border-slate-800 shadow-2xl overflow-hidden flex flex-col items-center">
      
      {/* Controles y Selector Rápido */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 z-20">
        
        {/* Título de control y estado */}
        <div className="flex items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-700/80 text-xs text-slate-200">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span className="font-bold">Ubicación de las 33 Regionales SENA</span>
          <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30">
            {regionales.length} en mapa
          </span>
        </div>

        {/* Botones de acción del mapa */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/80">
          
          {/* Alternar Mapa Político */}
          <button
            onClick={() => setShowDepartamentos(!showDepartamentos)}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
              showDepartamentos
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Mostrar u ocultar la división política departamental"
          >
            <Building className="w-3.5 h-3.5" />
            <span>Mapa Político</span>
            <span className="bg-slate-950/40 text-emerald-200 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
              33
            </span>
          </button>

          {/* Alternar nombres */}
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
              showLabels
                ? 'bg-slate-700 text-emerald-300'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Mostrar u ocultar nombres en el mapa"
          >
            {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Nombres</span>
          </button>

          {/* Alternar sombreado de regiones */}
          <button
            onClick={() => setShowRegions(!showRegions)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
              showRegions
                ? 'bg-slate-700 text-emerald-300'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Alternar zonas geográficas"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zonas</span>
          </button>

          {/* Alternar Imagen Cartográfica de Fondo */}
          <button
            onClick={() => setShowFondoImagen(!showFondoImagen)}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
              showFondoImagen
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Activar/desactivar imagen de fondo y relieve de Colombia"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Fondo Mapa</span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Acercar mapa (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Alejar mapa (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restablecer posición inicial"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>

      {/* Selector directo de Regional en menú rápido */}
      <div className="w-full flex items-center justify-between gap-3 mb-3 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center space-x-2 text-slate-300">
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-[11px] hidden sm:inline">Selección rápida:</span>
        </div>
        <select
          value={selectedRegional.id}
          onChange={(e) => {
            const found = regionales.find((r) => r.id === e.target.value);
            if (found) onSelectRegional(found);
          }}
          className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[280px] truncate"
        >
          {regionales.map((reg) => (
            <option key={reg.id} value={reg.id}>
              {reg.nombre} ({reg.capital}) - {reg.totalCentros} centros
            </option>
          ))}
        </select>
        <span className="text-[11px] text-emerald-400 font-bold hidden md:inline">
          {selectedRegional.capital} • {selectedRegional.zona}
        </span>
      </div>

      {/* CANVAS SVG DEL MAPA DE COLOMBIA */}
      <div className="relative w-full max-w-[580px] aspect-[600/760] overflow-hidden flex items-center justify-center rounded-2xl bg-radial from-slate-900 to-slate-950">
        
        <svg
          viewBox="0 0 600 760"
          className="w-full h-full transition-transform duration-300 select-none cursor-grab active:cursor-grabbing"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Gradientes para el océano y regiones */}
            <linearGradient id="oceanBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#071b2e" />
              <stop offset="50%" stopColor="#0b243b" />
              <stop offset="100%" stopColor="#04121f" />
            </linearGradient>

            <linearGradient id="caribeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0e7490" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="andinaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#047857" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#065f46" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="pacificaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="orinoquiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b45309" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#92400e" stopOpacity="0.25" />
            </linearGradient>

            <linearGradient id="amazoniaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#166534" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#14532d" stopOpacity="0.35" />
            </linearGradient>

            {/* Sombra proyectada de pines */}
            <filter id="pinShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
            </filter>

            {/* Brillo para regional activa */}
            <filter id="activeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* FONDO OCEÁNICO BASE */}
          <rect width="600" height="760" fill="url(#oceanBg)" rx="20" />

          {/* IMAGEN DE FONDO CARTOGRÁFICA DE COLOMBIA (RELIEVE Y TOPOGRAFÍA) */}
          {showFondoImagen && (
            <g id="imagenFondoColombia" className="pointer-events-none select-none">
              <image
                href={colombiaMapaFondoImg}
                x="0"
                y="0"
                width="600"
                height="760"
                preserveAspectRatio="xMidYMid slice"
                opacity={opacidadFondo}
              />
              {/* Capa de contraste y atenuación para resaltar la demarcación de las Regionales */}
              <rect
                width="600"
                height="760"
                fill="#020617"
                opacity="0.3"
                rx="20"
              />
            </g>
          )}

          {/* Grilla Geográfica Sutil */}
          <g opacity="0.08" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="4 4">
            <line x1="50" y1="100" x2="550" y2="100" />
            <line x1="50" y1="200" x2="550" y2="200" />
            <line x1="50" y1="300" x2="550" y2="300" />
            <line x1="50" y1="400" x2="550" y2="400" />
            <line x1="50" y1="500" x2="550" y2="500" />
            <line x1="50" y1="600" x2="550" y2="600" />
            <line x1="50" y1="700" x2="550" y2="700" />
            <line x1="100" y1="50" x2="100" y2="720" />
            <line x1="200" y1="50" x2="200" y2="720" />
            <line x1="300" y1="50" x2="300" y2="720" />
            <line x1="400" y1="50" x2="400" y2="720" />
            <line x1="500" y1="50" x2="500" y2="720" />
          </g>

          {/* Rótulos Cartográficos de Océanos */}
          <text x="50" y="270" fill="#38bdf8" opacity="0.25" fontSize="12" fontWeight="bold" letterSpacing="3" transform="rotate(-90 50 270)">
            OCÉANO PACÍFICO
          </text>
          <text x="180" y="45" fill="#38bdf8" opacity="0.25" fontSize="12" fontWeight="bold" letterSpacing="4">
            MAR CARIBE
          </text>

          {/* Rosa de los Vientos Decorativa */}
          <g transform="translate(530, 70)" opacity="0.45">
            <circle r="18" fill="none" stroke="#64748b" strokeWidth="0.8" />
            <path d="M 0,-16 L 3,-5 L 14,-5 L 5,2 L 8,14 L 0,6 L -8,14 L -5,2 L -14,-5 L -3,-5 Z" fill="#38bdf8" />
            <text x="0" y="-20" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">N</text>
          </g>

          {/* INSET: ARCHIPIÉLAGO DE SAN ANDRÉS, PROVIDENCIA Y SANTA CATALINA */}
          <g transform="translate(25, 25)">
            <rect width="115" height="105" rx="14" fill="#0b1726" stroke="#334155" strokeWidth="1.2" opacity="0.95" />
            <rect width="115" height="24" rx="14" fill="#1e293b" opacity="0.8" />
            <text x="10" y="16" fill="#c084fc" fontSize="8.5" fontWeight="bold" letterSpacing="0.5">
              🏝️ ARCHIPIÉLAGO INSULAR
            </text>
            <text x="10" y="34" fill="#64748b" fontSize="7">12°35′ N, 81°42′ W</text>
            
            {/* Siluetas de San Andrés y Providencia */}
            <path
              d="M 40,55 C 38,62 36,75 42,85 C 46,78 44,65 42,55 Z"
              fill="#7c3aed"
              stroke="#a78bfa"
              strokeWidth="1"
              opacity="0.8"
            />
            <path
              d="M 68,45 C 65,48 66,55 72,55 C 75,50 72,45 68,45 Z"
              fill="#7c3aed"
              stroke="#a78bfa"
              strokeWidth="0.8"
              opacity="0.8"
            />
            <text x="48" y="93" fill="#cbd5e1" fontSize="7.5" fontWeight="600">San Andrés</text>
            <text x="75" y="47" fill="#cbd5e1" fontSize="6.5">Providencia</text>
          </g>

          {/* FRONTERAS INTERNACIONALES Y PAÍSES VECINOS */}
          <g id="fronterasInternacionales" stroke="#64748b" strokeWidth="1.6" strokeDasharray="5 3" fill="none" opacity="0.6">
            {FRONTERAS_INTERNACIONALES.map((dPath, idx) => (
              <path key={`frontera-${idx}`} d={dPath} />
            ))}
          </g>

          <g id="paisesVecinos" fill="#94a3b8" opacity="0.38" fontSize="11" fontWeight="900" letterSpacing="3" className="select-none pointer-events-none">
            {PAISES_VECINOS.map((pais) => (
              <text
                key={pais.nombre}
                x={pais.coords.x}
                y={pais.coords.y}
                textAnchor="middle"
                transform={pais.rotacion ? `rotate(${pais.rotacion} ${pais.coords.x} ${pais.coords.y})` : undefined}
              >
                {pais.nombre}
              </text>
            ))}
          </g>

          {/* DIVISIÓN POLÍTICO-ADMINISTRATIVA DE COLOMBIA (32 DEPARTAMENTOS + BOGOTÁ D.C. BIEN DEMARCADOS) */}
          {showDepartamentos && (
            <g id="mapaPoliticoDepartamental">
              {DEPARTAMENTOS_POLITICOS.map((depto) => {
                const isSelected = selectedRegional.id === depto.id;
                const isHovered = (hoveredRegional?.id === depto.id) || (hoveredDeptoId === depto.id);
                const theme = getZoneTheme(depto.zona);

                return (
                  <g key={depto.id} className="cursor-pointer">
                    <path
                      id={`depto-${depto.id}`}
                      d={depto.path}
                      className="transition-all duration-200"
                      fill={
                        isSelected
                          ? theme.fill
                          : isHovered
                          ? theme.stroke
                          : theme.lightFill
                      }
                      fillOpacity={isSelected ? 0.8 : isHovered ? 0.55 : 0.28}
                      stroke={isSelected ? '#ffffff' : isHovered ? '#6ee7b7' : '#334155'}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1.2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      filter={isSelected ? 'url(#activeGlow)' : undefined}
                      onClick={() => {
                        const regFound = regionales.find((r) => r.id === depto.id);
                        if (regFound) onSelectRegional(regFound);
                      }}
                      onMouseEnter={() => {
                        setHoveredDeptoId(depto.id);
                        const regFound = regionales.find((r) => r.id === depto.id);
                        if (regFound) setHoveredRegional(regFound);
                      }}
                      onMouseLeave={() => {
                        setHoveredDeptoId(null);
                        setHoveredRegional(null);
                      }}
                    >
                      <title>{depto.nombre} ({depto.capital}) - Regional SENA</title>
                    </path>

                    {/* Código DANE o Nombre sutil sobre el departamento */}
                    {showLabels && !isSelected && (
                      <text
                        x={depto.labelCoords.x}
                        y={depto.labelCoords.y}
                        textAnchor="middle"
                        fill="#cbd5e1"
                        fontSize="7.5"
                        fontWeight="700"
                        opacity={isHovered ? 1 : 0.65}
                        className="select-none pointer-events-none"
                      >
                        {depto.nombre.split(' ')[0]}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* ZONAS NATURALES DE COLOMBIA (Base Geográfica Macro-Regiones) */}
          {showRegions && (
            <g id="regionesGeograficas" opacity="0.65">
              
              {/* 1. REGIÓN CARIBE */}
              <path
                id="zonaCaribe"
                d="
                  M 335,45
                  C 350,60 365,90 340,110
                  C 325,120 310,140 310,180
                  C 290,210 240,210 195,225
                  C 170,225 155,200 170,175
                  C 185,150 200,140 215,125
                  C 230,110 250,95 270,80
                  C 290,65 315,45 335,45
                  Z
                "
                fill="url(#caribeGrad)"
                stroke="#0891b2"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />

              {/* 2. REGIÓN PACÍFICA */}
              <path
                id="zonaPacifica"
                d="
                  M 155,225
                  C 140,240 135,280 135,320
                  C 130,360 140,400 140,440
                  C 130,470 115,500 120,535
                  C 140,535 160,520 170,490
                  C 180,450 185,390 175,340
                  C 170,290 165,250 155,225
                  Z
                "
                fill="url(#pacificaGrad)"
                stroke="#2563eb"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />

              {/* 3. REGIÓN ANDINA (Cordilleras Central, Oriental y Occidental) */}
              <path
                id="zonaAndina"
                d="
                  M 195,225
                  C 240,210 290,210 310,180
                  C 325,190 350,220 350,250
                  C 340,290 330,340 330,380
                  C 300,420 260,450 245,490
                  C 225,510 190,525 170,490
                  C 180,450 185,390 175,340
                  C 170,290 180,250 195,225
                  Z
                "
                fill="url(#andinaGrad)"
                stroke="#059669"
                strokeWidth="1.4"
                strokeDasharray="2 2"
              />

              {/* 4. REGIÓN ORINOQUÍA (Llanos Orientales) */}
              <path
                id="zonaOrinoquia"
                d="
                  M 350,250
                  C 390,250 430,250 460,260
                  C 500,270 540,290 535,330
                  C 530,360 480,390 440,420
                  C 400,430 350,440 330,430
                  C 320,400 330,340 350,250
                  Z
                "
                fill="url(#orinoquiaGrad)"
                stroke="#d97706"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />

              {/* 5. REGIÓN AMAZONÍA (Cuenca y Trapecio Amazónico) */}
              <path
                id="zonaAmazonia"
                d="
                  M 330,430
                  C 360,430 420,425 450,420
                  C 490,410 525,410 520,460
                  C 515,500 480,530 460,560
                  C 440,590 415,640 405,715
                  C 390,725 375,715 370,680
                  C 350,640 310,600 270,570
                  C 230,550 200,535 210,515
                  C 230,505 260,460 330,430
                  Z
                "
                fill="url(#amazoniaGrad)"
                stroke="#15803d"
                strokeWidth="1.4"
                strokeDasharray="2 2"
              />
            </g>
          )}

          {/* RÍOS Y EJES GEOGRÁFICOS EMBLEMÁTICOS */}
          <g stroke="#38bdf8" strokeWidth="0.9" fill="none" opacity="0.35">
            {/* Río Magdalena */}
            <path d="M 235,115 Q 240,200 260,280 T 235,410 T 215,480" strokeDasharray="3 2" />
            {/* Río Cauca */}
            <path d="M 235,230 Q 210,300 200,380 T 175,440" strokeDasharray="3 2" />
            {/* Río Meta / Orinoco */}
            <path d="M 320,405 Q 400,350 510,305" strokeDasharray="3 2" />
            {/* Río Putumayo / Amazonas */}
            <path d="M 185,535 Q 280,590 385,700" strokeDasharray="3 2" />
          </g>

          {/* ETIQUETAS DE REGIONES GEOGRÁFICAS EN EL MAPA */}
          <g opacity="0.4" fontSize="10" fontWeight="800" letterSpacing="1.5" className="select-none pointer-events-none">
            <text x="235" y="165" fill="#22d3ee">CARIBE</text>
            <text x="240" y="315" fill="#34d399">ANDINA</text>
            <text x="135" y="415" fill="#60a5fa">PACÍFICA</text>
            <text x="410" y="340" fill="#fbbf24">ORINOQUÍA</text>
            <text x="330" y="550" fill="#4ade80">AMAZONÍA</text>
          </g>

          {/* PINES Y MARCADORES: LAS 33 REGIONALES DEL SENA */}
          {regionales.map((reg) => {
            const coords = reg.coordenadas || { x: 300, y: 380 };
            const isSelected = selectedRegional.id === reg.id;
            const isHovered = hoveredRegional?.id === reg.id;
            const theme = getZoneTheme(reg.zona);
            const isFilteredOut = filtroZona !== 'Todas' && reg.zona !== filtroZona;

            // Extraemos nombre corto de la regional
            const nombreCorto = reg.nombre.replace('Regional ', '');
            const labelConfig = getLabelConfig(reg.id, coords);
            const textWidth = nombreCorto.length * 6.2;

            return (
              <g
                key={reg.id}
                transform={`translate(${coords.x}, ${coords.y})`}
                className={`cursor-pointer transition-all duration-300 ${
                  isFilteredOut ? 'opacity-15 pointer-events-none' : 'opacity-100'
                }`}
                onClick={() => onSelectRegional(reg)}
                onMouseEnter={() => setHoveredRegional(reg)}
                onMouseLeave={() => setHoveredRegional(null)}
              >
                {/* 1. HALO PULSANTE CUANDO ESTÁ SELECCIONADA */}
                {isSelected && (
                  <>
                    <circle
                      r="22"
                      fill="none"
                      stroke={theme.stroke}
                      strokeWidth="2.5"
                      className="animate-ping"
                      opacity="0.75"
                    />
                    <circle
                      r="28"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                      opacity="0.35"
                    />
                  </>
                )}

                {/* 2. GLOW EN HOVER */}
                {isHovered && !isSelected && (
                  <circle
                    r="18"
                    fill="none"
                    stroke={theme.stroke}
                    strokeWidth="2"
                    opacity="0.7"
                    className="animate-pulse"
                  />
                )}

                {/* 3. MARCADOR DE PIN TIPO GOTA / CHIP */}
                <g filter="url(#pinShadow)">
                  {/* Cuerpo exterior del pin */}
                  <circle
                    r={isSelected ? 11 : isHovered ? 9.5 : 7.5}
                    fill={isSelected ? '#10b981' : isHovered ? theme.stroke : '#0f172a'}
                    stroke={isSelected ? '#ffffff' : theme.stroke}
                    strokeWidth={isSelected ? 2.5 : 1.8}
                    className="transition-all duration-200"
                  />

                  {/* Núcleo interno del pin con color de zona */}
                  <circle
                    r={isSelected ? 5.5 : isHovered ? 4.5 : 3}
                    fill={isSelected ? '#ffffff' : theme.pinColor}
                  />
                </g>

                {/* 4. INSIGNIA / ETIQUETA TEXTUAL DE LA REGIONAL */}
                {showLabels && (
                  <g className="pointer-events-none select-none">
                    {/* Fondo tipo píldora oscura con borde calculado */}
                    <rect
                      x={
                        labelConfig.anchor === 'end'
                          ? labelConfig.xOffset - textWidth - 14
                          : labelConfig.anchor === 'middle'
                          ? labelConfig.xOffset - (textWidth + 14) / 2
                          : labelConfig.xOffset
                      }
                      y={labelConfig.yOffset - 9}
                      width={textWidth + 14}
                      height="18"
                      rx="5"
                      fill={isSelected ? '#022c22' : '#091322'}
                      stroke={isSelected ? '#10b981' : isHovered ? theme.stroke : '#334155'}
                      strokeWidth={isSelected ? '1.5' : '0.8'}
                      opacity={isSelected ? 0.98 : isHovered ? 0.95 : 0.85}
                    />

                    {/* Texto con el nombre de la Regional */}
                    <text
                      x={
                        labelConfig.anchor === 'end'
                          ? labelConfig.xOffset - 7
                          : labelConfig.anchor === 'middle'
                          ? labelConfig.xOffset
                          : labelConfig.xOffset + 7
                      }
                      y={labelConfig.yOffset + 4}
                      textAnchor={labelConfig.anchor}
                      fill={isSelected ? '#34d399' : isHovered ? '#ffffff' : '#e2e8f0'}
                      fontSize="9"
                      fontWeight={isSelected ? '900' : '700'}
                      letterSpacing="0.2"
                    >
                      {nombreCorto}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* 5. VENTANA EMERGENTE (TOOLTIP FLOTANTE) AL PASAR EL CURSOR */}
          {hoveredRegional && hoveredRegional.coordenadas && (
            <g
              transform={`translate(${hoveredRegional.coordenadas.x}, ${
                hoveredRegional.coordenadas.y - 45
              })`}
              className="pointer-events-none z-50 filter drop-shadow-2xl"
            >
              <rect
                x="-95"
                y="-38"
                width="190"
                height="54"
                rx="12"
                fill="#022c22"
                stroke="#34d399"
                strokeWidth="1.8"
                opacity="0.98"
              />
              {/* Triángulo indicador hacia el pin */}
              <polygon
                points="-7,16 7,16 0,23"
                fill="#022c22"
                stroke="#34d399"
                strokeWidth="1.8"
              />
              <text x="0" y="-18" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                {hoveredRegional.nombre}
              </text>
              <text x="0" y="-3" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="600">
                Capital: {hoveredRegional.capital} • {hoveredRegional.zona}
              </text>
              <text x="0" y="10" textAnchor="middle" fill="#a7f3d0" fontSize="8">
                🏛️ {hoveredRegional.totalCentros} Centros de Formación
              </text>
            </g>
          )}

        </svg>

      </div>

      {/* LEYENDA CLARA DE LAS 6 REGIONES NATURALES Y DIVISIÓN POLÍTICA */}
      <div className="w-full mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 font-bold text-slate-400">
            <Building className="w-3.5 h-3.5 text-emerald-400" />
            <span>División Política:</span>
          </div>
          <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[10px] border border-emerald-500/30">
            32 Departamentos + Bogotá D.C.
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-cyan-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-cyan-500 shadow-sm" />
            <span>Caribe (8)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-emerald-600 shadow-sm" />
            <span>Andina (11)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-blue-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-sm" />
            <span>Pacífica (4)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-amber-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm" />
            <span>Orinoquía (4)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-green-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-green-600 shadow-sm" />
            <span>Amazonía (6)</span>
          </div>
          <div className="flex items-center space-x-1.5 text-purple-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-purple-600 shadow-sm" />
            <span>Insular (1)</span>
          </div>
        </div>
      </div>

    </div>
  );
};
