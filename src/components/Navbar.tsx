import React from 'react';
import { BookOpen, MapPin, Shield, User, Sparkles, CheckCircle2, BarChart3, ShieldCheck } from 'lucide-react';
import { CharacterizationData } from '../types';

export interface NavbarProps {
  activeTab: 'caracterizacion' | 'historia' | 'regionales' | 'reglamento' | 'admin';
  setActiveTab: (tab: 'caracterizacion' | 'historia' | 'regionales' | 'reglamento' | 'admin') => void;
  characterization: CharacterizationData;
  onOpenCharacterization: () => void;
  onOpenChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  characterization,
  onOpenCharacterization,
  onOpenChat
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo y Título */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('historia')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <span className="font-black text-xl tracking-wider">SENA</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Inducción SENA Pro</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Acuerdo 0009
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Servicio Nacional de Aprendizaje • Colombia</p>
            </div>
          </div>

          {/* Navegación por pestañas */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('caracterizacion')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'caracterizacion'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Caracterización del Aprendiz</span>
            </button>

            <button
              onClick={() => setActiveTab('historia')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'historia'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Historia</span>
            </button>

            <button
              onClick={() => setActiveTab('regionales')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'regionales'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>2. Regionales</span>
            </button>

            <button
              onClick={() => setActiveTab('reglamento')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === 'reglamento'
                  ? 'bg-white text-emerald-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>3. Reglamento</span>
            </button>
          </nav>

          {/* Acciones de Usuario, AI y Panel Admin */}
          <div className="flex items-center space-x-2.5">
            {/* Botón Superior Panel Admin */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-bold border transition-all duration-200 shadow-xs ${
                activeTab === 'admin'
                  ? 'bg-slate-950 border-slate-900 text-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                  : 'bg-emerald-900 hover:bg-emerald-950 text-white border-emerald-800 hover:border-emerald-700'
              }`}
              title="Acceder al Panel de Administrador e Instructores"
            >
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Panel Admin</span>
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                Analíticas
              </span>
            </button>

            <button
              onClick={onOpenChat}
              className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white px-3.5 py-2 rounded-xl text-sm font-bold shadow-sm transition-all transform hover:scale-105 active:scale-95"
              title="Pregúntale al Tutor AI sobre el Reglamento"
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="hidden lg:inline">Tutor AI</span>
            </button>

            <button
              onClick={() => setActiveTab('caracterizacion')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-semibold border transition-all ${
                characterization.isCompleted
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 animate-bounce'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline">
                {characterization.isCompleted ? characterization.nombre.split(' ')[0] : 'Caracterizarme'}
              </span>
              {characterization.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          </div>

        </div>

        {/* Barra móvil para pestañas */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-100 space-x-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 ${
              activeTab === 'admin' ? 'bg-slate-950 text-emerald-400' : 'bg-emerald-900 text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Panel Admin</span>
          </button>
          <button
            onClick={() => setActiveTab('caracterizacion')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'caracterizacion' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Caracterización
          </button>
          <button
            onClick={() => setActiveTab('historia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'historia' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            1. Historia
          </button>
          <button
            onClick={() => setActiveTab('regionales')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'regionales' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            2. Regionales
          </button>
          <button
            onClick={() => setActiveTab('reglamento')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'reglamento' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            3. Reglamento
          </button>
        </div>

      </div>
    </header>
  );
};
