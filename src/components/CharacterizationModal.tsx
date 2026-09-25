import React, { useState } from 'react';
import { X, UserCheck, GraduationCap, Building, FileText, CheckCircle } from 'lucide-react';
import { CharacterizationData } from '../types';

interface CharacterizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CharacterizationData;
  onSave: (data: CharacterizationData) => void;
}

export const CharacterizationModal: React.FC<CharacterizationModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave
}) => {
  const [formData, setFormData] = useState<CharacterizationData>(data);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, isCompleted: true });
    setFormData({
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
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Módulo de Caracterización del Aprendiz</h2>
              <p className="text-xs text-emerald-200">Inducción Institucional SENA • Acuerdo 0009 de 2024</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800 leading-relaxed">
            Completa tu información personal y académica para personalizar tu experiencia de inducción y conocer tu perfil formativo según los lineamientos del SENA.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Completo *</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. María Fernanda Gómez"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tipo de Documento *</label>
              <select
                required
                value={formData.tipoDocumento}
                onChange={(e) => setFormData({ ...formData, tipoDocumento: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="">Seleccione...</option>
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Regional SENA *</label>
              <select
                required
                value={formData.regional}
                onChange={(e) => setFormData({ ...formData, regional: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="">Seleccione nivel...</option>
                <option value="Operario">Operario</option>
                <option value="Técnico">Técnico</option>
                <option value="Tecnólogo">Tecnólogo</option>
                <option value="Especialización Tecnológica">Especialización Tecnológica</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Modalidad de Formación</label>
              <select
                value={formData.modalidadFormacion || 'Presencial'}
                onChange={(e) => setFormData({ ...formData, modalidadFormacion: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="A Distancia">A Distancia</option>
                <option value="Dual">Dual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Jornada</label>
              <select
                value={formData.jornada || 'Diurna'}
                onChange={(e) => setFormData({ ...formData, jornada: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                <option value="Diurna">Diurna</option>
                <option value="Nocturna">Nocturna</option>
                <option value="Mixta">Mixta</option>
                <option value="Madrugada">Madrugada</option>
                <option value="Fines de semana">Fines de semana</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Programa de Formación *</label>
              <input
                type="text"
                required
                value={formData.programaFormacion}
                onChange={(e) => setFormData({ ...formData, programaFormacion: e.target.value })}
                placeholder="Ej. ADSO (Análisis y Desarrollo de Software)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
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
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <hr className="border-slate-200 my-2" />

          {/* SECCIÓN DE HISTORIAL REQUERIDA EN EL PROMPT */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Historial de Formación Previa en el SENA</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">¿Formación previa SENA? *</label>
                <select
                  required
                  value={formData.historialSena}
                  onChange={(e) => setFormData({ ...formData, historialSena: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">Seleccione...</option>
                  <option value="Sí">Sí</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nivel anterior alcanzado</label>
                <select
                  disabled={formData.historialSena !== 'Sí'}
                  value={formData.nivelSenaAnterior}
                  onChange={(e) => setFormData({ ...formData, nivelSenaAnterior: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white disabled:bg-slate-100 disabled:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="">N/A o Seleccione...</option>
                  <option value="Operario">Operario</option>
                  <option value="Auxiliar">Auxiliar</option>
                  <option value="Técnico">Técnico</option>
                  <option value="Tecnólogo">Tecnólogo</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Estado culminación previa *</label>
                <select
                  required
                  value={formData.estadoCulminacionPrevia}
                  onChange={(e) => setFormData({ ...formData, estadoCulminacionPrevia: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
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

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Guardar Caracterización</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
