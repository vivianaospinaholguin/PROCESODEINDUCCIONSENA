import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { TabCaracterizacion } from './components/TabCaracterizacion';
import { TabHistoria } from './components/TabHistoria';
import { TabRegionales } from './components/TabRegionales';
import { TabReglamento } from './components/TabReglamento';
import { TabAdmin } from './components/TabAdmin';
import { GeminiChatModal } from './components/GeminiChatModal';
import { CharacterizationData } from './types';
import { UserCheck, BookOpen, MapPin, Shield, CheckCircle2, Sparkles, User, BarChart3 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'caracterizacion' | 'historia' | 'regionales' | 'reglamento' | 'admin'>('caracterizacion');
  
  const [characterization, setCharacterization] = useState<CharacterizationData>(() => {
    const saved = localStorage.getItem('sena_characterization');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      nombre: '',
      tipoDocumento: '',
      numeroDocumento: '',
      correo: '',
      regional: '',
      centroFormacion: '',
      nivelFormacion: '',
      modalidadFormacion: 'Presencial',
      jornada: 'Diurna',
      etapaFormacion: 'Inducción',
      programaFormacion: '',
      ficha: '',
      historialSena: '',
      nivelSenaAnterior: '',
      estadoCulminacionPrevia: '',
      isCompleted: false
    };
  });

  const [isCharacterizationOpen, setIsCharacterizationOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('sena_characterization', JSON.stringify(characterization));
  }, [characterization]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Navbar principal fija */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        characterization={characterization}
        onOpenCharacterization={() => setActiveTab('caracterizacion')}
        onOpenChat={() => setIsChatOpen(true)}
      />

      {/* Contenido Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Barra de Pestañas de la Página Principal */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs mb-6 overflow-x-auto">
          <div className="flex items-center space-x-2 min-w-max">
            <button
              onClick={() => setActiveTab('caracterizacion')}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'caracterizacion'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Módulo de Caracterización</span>
              {characterization.isCompleted && (
                <span className={`w-2 h-2 rounded-full ${activeTab === 'caracterizacion' ? 'bg-white' : 'bg-emerald-500'}`} />
              )}
            </button>

            <button
              onClick={() => setActiveTab('historia')}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'historia'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Historia del SENA</span>
            </button>

            <button
              onClick={() => setActiveTab('regionales')}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'regionales'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>2. Regionales y Centros</span>
            </button>

            <button
              onClick={() => setActiveTab('reglamento')}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'reglamento'
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>3. Reglamento (Acuerdo 0009)</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-slate-950 text-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>4. Panel Administrador & Analítica</span>
            </button>
          </div>
        </div>

        {/* Banner de bienvenida si ya está caracterizado */}
        {characterization.isCompleted && activeTab !== 'caracterizacion' && (
          <div className="mb-8 bg-gradient-to-r from-emerald-800 to-slate-900 rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                {characterization.nombre ? characterization.nombre.charAt(0) : 'A'}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base sm:text-lg">¡Bienvenido(a), {characterization.nombre}!</h3>
                  <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Aprendiz {characterization.nivelFormacion || 'SENA'}
                  </span>
                </div>
                <p className="text-xs text-emerald-200">
                  Programa: {characterization.programaFormacion} • Ficha: {characterization.ficha} • Regional: {characterization.regional}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('caracterizacion')}
              className="text-xs bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white px-4 py-2.5 rounded-xl transition-colors font-semibold flex items-center space-x-2"
            >
              <User className="w-3.5 h-3.5" />
              <span>Ver Pestaña de Caracterización</span>
            </button>
          </div>
        )}

        {/* Vista activa según la pestaña seleccionada */}
        {activeTab === 'caracterizacion' && (
          <TabCaracterizacion
            data={characterization}
            onSave={(newData) => {
              setCharacterization(newData);
            }}
          />
        )}
        {activeTab === 'historia' && <TabHistoria />}
        {activeTab === 'regionales' && <TabRegionales />}
        {activeTab === 'reglamento' && (
          <TabReglamento
            characterization={characterization}
            onUpdateCharacterization={(newData) => setCharacterization(newData)}
          />
        )}
        {activeTab === 'admin' && (
          <TabAdmin onNavigateToQuiz={() => setActiveTab('reglamento')} />
        )}
      </main>

      {/* Footer Institucional */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center">
                SENA
              </div>
              <span className="text-white font-bold text-lg">Inducción SENA Pro</span>
            </div>
            <p className="text-xs text-slate-400">
              Servicio Nacional de Aprendizaje • Plataforma interactiva basada en el Acuerdo 0009 de 2024 (Reglamento del Aprendiz).
            </p>
          </div>

          <div className="text-center md:text-left space-y-1 text-xs">
            <p className="text-white font-semibold">Enlaces Institucionales Oficiales:</p>
            <p><a href="https://www.sena.edu.co" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Portal Oficial SENA</a></p>
            <p><a href="https://oferta.senasofiaplus.edu.co" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Sofia Plus</a></p>
          </div>

          <div className="text-right text-xs space-y-2">
            <p className="text-slate-500">© 2026 SENA - Todos los derechos reservados</p>
            <p className="flex items-center justify-end space-x-1 text-slate-400">
              <span>Construido con altos estándares pedagógicos</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Tutor AI */}
      <GeminiChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

    </div>
  );
}
