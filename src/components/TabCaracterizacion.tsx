import React, { useState } from 'react';
import { UserCheck, GraduationCap, Building, CheckCircle, Save, Award, RefreshCw, Sparkles, MapPin, Mail, CreditCard, Hash } from 'lucide-react';
import { CharacterizationData } from '../types';
import { BanderaSena } from './BanderaSena';

interface TabCaracterizacionProps {
  data: CharacterizationData;
  onSave: (data: CharacterizationData) => void;
}

const BLANK_FORM: CharacterizationData = {
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

export const TabCaracterizacion: React.FC<TabCaracterizacionProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<CharacterizationData>({
    ...data,
    modalidadFormacion: data.modalidadFormacion || 'Presencial',
    jornada: data.jornada || 'Diurna',
    etapaFormacion: data.etapaFormacion || 'Inducción',
  });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [ultimoGuardado, setUltimoGuardado] = useState<CharacterizationData | null>(
    data.isCompleted ? data : null
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataGuardada: CharacterizationData = { ...formData, isCompleted: true };
    // Guardar y enviar la información
    onSave(dataGuardada);
    setUltimoGuardado(dataGuardada);
    setSavedSuccess(true);
    // Limpiar todos los campos del formulario tras guardar y enviar
    setFormData({ ...BLANK_FORM });
    setTimeout(() => setSavedSuccess(false), 5000);
  };

  const handleResetForm = () => {
    setFormData({ ...BLANK_FORM });
  };

  // Datos a mostrar en el carnet: si se está escribiendo, muestra los datos actuales;
  // si el formulario se limpió, muestra el último aprendiz guardado exitosamente.
  const displayAprendiz = formData.nombre
    ? formData
    : ultimoGuardado || (data.isCompleted ? data : formData);

  return (
    <div className="space-y-8 animate-fadeIn py-4 max-w-5xl mx-auto">
      
      {/* Encabezado Principal */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pestaña de la Página Principal • Inducción SENA</span>
          </span>
          <span className="bg-white/10 text-emerald-200 border border-white/20 text-[11px] font-semibold px-3 py-1 rounded-full flex items-center space-x-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Acuerdo 0009 de 2024</span>
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
          Cuadro del Módulo de Caracterización del Aprendiz
        </h2>
        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-3xl">
          Diligencia este formulario en la página principal para registrar tus antecedentes académicos en el SENA, nivel de formación y datos de matrícula conforme a los lineamientos institucionales.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-6 py-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-sm">¡Caracterización guardada y enviada con éxito!</p>
              <p className="text-xs text-emerald-700">
                La información del aprendiz {ultimoGuardado?.nombre ? `(${ultimoGuardado.nombre})` : ''} ha sido registrada en la plataforma y los campos se han limpiado correctamente.
              </p>
            </div>
          </div>
          <span className="text-[11px] bg-emerald-200/70 text-emerald-900 font-bold px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
            ✓ Campos Limpiados
          </span>
        </div>
      )}

      {/* Cuadro Formulario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario Principal (2 Columnas en desktop) */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
          
          {/* SECCIÓN 1: REQUERIMIENTOS DEL HISTORIAL PREVIO (PUNTO CLAVE DEL PROMPT) */}
          <div className="bg-emerald-50/60 p-6 rounded-2xl border border-emerald-200/80 space-y-6">
            <div className="flex items-center space-x-3 border-b border-emerald-200 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Historial de Formación Previa en el SENA</h3>
                <p className="text-xs text-emerald-800">Listas desplegables obligatorias para caracterización</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  1. ¿Historial SENA previo? *
                </label>
                <select
                  required
                  value={formData.historialSena}
                  onChange={(e) => setFormData({ ...formData, historialSena: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">Seleccione...</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  2. Nivel anterior alcanzado
                </label>
                <select
                  disabled={formData.historialSena !== 'Sí'}
                  value={formData.nivelSenaAnterior}
                  onChange={(e) => setFormData({ ...formData, nivelSenaAnterior: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white disabled:bg-slate-100 disabled:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">N/A o Seleccione...</option>
                  <option value="Operario">Operario</option>
                  <option value="Auxiliar">Auxiliar</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Tecnólogo">Tecnólogo</option>
                  <option value="Especialización Tecnológica">Especialización Tecnológica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
                  3. Estado culminación previa *
                </label>
                <select
                  required
                  value={formData.estadoCulminacionPrevia}
                  onChange={(e) => setFormData({ ...formData, estadoCulminacionPrevia: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">Seleccione estado...</option>
                  <option value="Primera vez que ingresa">Primera vez que ingresa</option>
                  <option value="Culminó con éxito">Culminó con éxito</option>
                  <option value="Desertó">Desertó</option>
                  <option value="Canceló">Canceló</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: DATOS PERSONALES */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-emerald-700" />
              <span>Datos Personales y de Identificación</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej. Juan Carlos Rodríguez"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  placeholder="ejemplo@soy.sena.edu.co"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tipo de Documento *</label>
                <select
                  required
                  value={formData.tipoDocumento}
                  onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">Seleccione tipo...</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="PPT">Permiso por Protección Temporal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Número de Documento *</label>
                <input
                  type="text"
                  required
                  value={formData.numeroDocumento}
                  onChange={(e) => setFormData({ ...formData, numeroDocumento: e.target.value })}
                  placeholder="Ej. 1023456789"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: PROGRAMA Y REGIONAL */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
              <Building className="w-4 h-4 text-emerald-700" />
              <span>Programa de Formación y Sede</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Regional SENA *</label>
                <select
                  required
                  value={formData.regional}
                  onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">Seleccione regional...</option>
                  <option value="Distrito Capital">Regional Distrito Capital</option>
                  <option value="Antioquia">Regional Antioquia</option>
                  <option value="Valle del Cauca">Regional Valle del Cauca</option>
                  <option value="Cundinamarca">Regional Cundinamarca</option>
                  <option value="Atlántico">Regional Atlántico</option>
                  <option value="Santander">Regional Santander</option>
                  <option value="Otra Regional">Otra Regional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nivel de Formación Actual *</label>
                <select
                  required
                  value={formData.nivelFormacion}
                  onChange={(e) => setFormData({ ...formData, nivelFormacion: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">Seleccione nivel...</option>
                  <option value="Operario">Operario</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Tecnólogo">Tecnólogo</option>
                  <option value="Especialización Tecnológica">Especialización Tecnológica</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Programa de Formación *</label>
                <input
                  type="text"
                  required
                  value={formData.programaFormacion}
                  onChange={(e) => setFormData({ ...formData, programaFormacion: e.target.value })}
                  placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Número de Ficha *</label>
                <input
                  type="text"
                  required
                  value={formData.ficha}
                  onChange={(e) => setFormData({ ...formData, ficha: e.target.value })}
                  placeholder="Ej. 2891234"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleResetForm}
              className="w-full sm:w-auto text-xs text-slate-600 hover:text-slate-900 font-bold px-4 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center space-x-1.5 border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Limpiar Campos</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Save className="w-5 h-5" />
              <span>Guardar y Enviar Caracterización</span>
            </button>
          </div>

        </form>

        {/* Carnet Digital y Resumen del Aprendiz */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 border border-emerald-800/40 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
                  SENA
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">Ficha del Aprendiz</h4>
                  <p className="text-[10px] text-emerald-300 uppercase tracking-wider">Acuerdo 0009 de 2024</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                displayAprendiz.isCompleted ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {displayAprendiz.isCompleted ? 'Caracterizado' : 'Pendiente'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Nombre del Aprendiz:</span>
                <span className="font-bold text-white text-sm">
                  {displayAprendiz.nombre || 'No registrado aún'}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 block">Programa:</span>
                <span className="font-medium text-emerald-200">
                  {displayAprendiz.programaFormacion || 'Sin asignar'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 block">Ficha:</span>
                  <span className="font-mono font-bold text-white">{displayAprendiz.ficha || '------'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Regional:</span>
                  <span className="font-bold text-white">{displayAprendiz.regional || '------'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 block">Nivel Actual:</span>
                  <span className="font-bold text-emerald-300">{displayAprendiz.nivelFormacion || '------'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Historial Previo:</span>
                  <span className="font-bold text-white">{displayAprendiz.historialSena || 'No'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] text-slate-400 block">Estado Culminación Previa:</span>
                <span className="font-semibold text-amber-300">
                  {displayAprendiz.estadoCulminacionPrevia || 'Sin registrar'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] text-slate-400 block italic">
                * Documento digital informativo para la inducción y el cumplimiento normativo.
              </span>
            </div>
          </div>

          {/* Recuadro Institucional con la Bandera Oficial del SENA */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            
            {/* Encabezado del Recuadro */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                <span className="text-base leading-none">🇨🇴</span>
                <span>Bandera Oficial del SENA</span>
              </h4>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                Símbolo Patrio
              </span>
            </div>

            {/* Componente Gráfico Interactivo de la Bandera */}
            <BanderaSena />

            {/* Identidad y Pertenencia Institucional */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Identidad y Pertenencia Institucional</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Conforme al Acuerdo 0009 de 2024, reconocer y respetar los símbolos del SENA afianza el sentido de pertenencia y los valores éticos del aprendiz durante su etapa lectiva y productiva.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
