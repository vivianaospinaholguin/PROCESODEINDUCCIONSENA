import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Award,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Eye,
  Trash2,
  Printer,
  ShieldCheck,
  Scale,
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Sparkles,
  Layers,
  GraduationCap,
  Filter,
  Check,
  X,
  FileText,
  HelpCircle,
  UserCheck,
  Building2,
  Compass
} from 'lucide-react';
import { RegistroEvaluacion, RespuestaEvaluacionDetalle } from '../types';
import { ACUERDO_0009_COMPLETO } from '../data/senaData';

interface TabAdminProps {
  onNavigateToQuiz?: () => void;
}

export const TabAdmin: React.FC<TabAdminProps> = ({ onNavigateToQuiz }) => {
  const [evaluaciones, setEvaluaciones] = useState<RegistroEvaluacion[]>(() => {
    const local = localStorage.getItem('sena_repositorio_evaluaciones');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error('Error parseando repositorio local:', e);
      }
    }
    return [];
  });

  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'analiticas' | 'respuestas'>('analiticas');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos');
  const [filtroFicha, setFiltroFicha] = useState<string>('Todas');
  const [filtroModo, setFiltroModo] = useState<string>('Todos');
  
  // Modales
  const [selectedEvaluationDetail, setSelectedEvaluationDetail] = useState<RegistroEvaluacion | null>(null);
  const [selectedCertificateModal, setSelectedCertificateModal] = useState<RegistroEvaluacion | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Función para mostrar notificación temporal
  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  // Cargar evaluaciones desde el servidor al montar
  const fetchServerEvaluaciones = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/evaluaciones');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.evaluaciones)) {
          setEvaluaciones((prev) => {
            const map = new Map<string, RegistroEvaluacion>();
            // Prioridad a los datos del backend
            prev.forEach((item) => map.set(item.id, item));
            data.evaluaciones.forEach((item: RegistroEvaluacion) => map.set(item.id, item));
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.fechaISO).getTime() - new Date(a.fechaISO).getTime()
            );
            localStorage.setItem('sena_repositorio_evaluaciones', JSON.stringify(merged));
            return merged;
          });
          showNotice('Repositorio sincronizado con el servidor.');
        }
      }
    } catch (err) {
      console.error('Error al sincronizar con el servidor:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServerEvaluaciones();
  }, []);

  // Eliminar una evaluación
  const handleDeleteEvaluation = async (id: string, nombre: string) => {
    if (!window.confirm(`¿Estás seguro de eliminar el registro de evaluación de ${nombre}?`)) {
      return;
    }
    const updated = evaluaciones.filter((item) => item.id !== id);
    setEvaluaciones(updated);
    localStorage.setItem('sena_repositorio_evaluaciones', JSON.stringify(updated));
    if (selectedEvaluationDetail?.id === id) setSelectedEvaluationDetail(null);
    if (selectedCertificateModal?.id === id) setSelectedCertificateModal(null);

    try {
      await fetch(`/api/evaluaciones/${id}`, { method: 'DELETE' });
      showNotice(`Registro de ${nombre} eliminado.`);
    } catch (e) {
      console.error(e);
    }
  };

  // Limpiar todo el repositorio
  const handleClearAll = async () => {
    if (!window.confirm('¡Atención! ¿Deseas borrar TODAS las evaluaciones del repositorio? Esta acción es irreversible.')) {
      return;
    }
    setEvaluaciones([]);
    localStorage.removeItem('sena_repositorio_evaluaciones');
    setSelectedEvaluationDetail(null);
    try {
      await fetch('/api/evaluaciones', { method: 'DELETE' });
      showNotice('El repositorio ha sido vaciado.');
    } catch (e) {
      console.error(e);
    }
  };

  // Cargar datos de prueba de muestra para demostración analítica
  const handleLoadSampleData = async () => {
    const samples: RegistroEvaluacion[] = [
      {
        id: `sample-${Date.now()}-1`,
        fechaISO: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        fechaLegible: 'Hoy, hace 2 horas',
        aprendiz: {
          nombre: 'María Camila Restrepo',
          tipoDocumento: 'Cédula de Ciudadanía',
          numeroDocumento: '1037654890',
          correo: 'mcrestregist@sena.edu.co',
          regional: 'Antioquia',
          centroFormacion: 'Centro de Tecnología de la Manufactura Avanzada (CTMA)',
          programaFormacion: 'Análisis y Desarrollo de Software (ADSO)',
          ficha: '2874912'
        },
        modoPrueba: 'Prueba Completa (12 Casos)',
        puntaje: 11,
        totalPreguntas: 12,
        porcentaje: 92,
        estado: 'Aprobado con Excelencia',
        duracionSegundos: 145,
        respuestas: ACUERDO_0009_COMPLETO.bancoPreguntasEvaluacion.map((q, idx) => ({
          preguntaId: q.id,
          pregunta: q.pregunta,
          categoria: q.categoria || 'Normativa General',
          opcionSeleccionada: idx === 1 ? 0 : q.respuestaCorrecta,
          textoOpcionSeleccionada: idx === 1 ? q.opciones[0] : q.opciones[q.respuestaCorrecta],
          opcionCorrecta: q.respuestaCorrecta,
          textoOpcionCorrecta: q.opciones[q.respuestaCorrecta],
          esCorrecta: idx !== 1,
          articuloReferencia: q.refuerzoPedagogico?.articuloReferencia,
          explicacion: q.refuerzoPedagogico?.porQueEsCorrecta || q.explicacion
        }))
      },
      {
        id: `sample-${Date.now()}-2`,
        fechaISO: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        fechaLegible: 'Hoy, hace 5 horas',
        aprendiz: {
          nombre: 'Andrés Felipe Morales',
          tipoDocumento: 'Tarjeta de Identidad',
          numeroDocumento: '1098453210',
          correo: 'afmorales@soy.sena.edu.co',
          regional: 'Distrito Capital',
          centroFormacion: 'Centro de Gestión de Mercados, Logística y TI',
          programaFormacion: 'Análisis y Desarrollo de Software (ADSO)',
          ficha: '2874912'
        },
        modoPrueba: 'Prueba Completa (12 Casos)',
        puntaje: 10,
        totalPreguntas: 12,
        porcentaje: 83,
        estado: 'Aprobado con Excelencia',
        duracionSegundos: 180,
        respuestas: ACUERDO_0009_COMPLETO.bancoPreguntasEvaluacion.map((q, idx) => ({
          preguntaId: q.id,
          pregunta: q.pregunta,
          categoria: q.categoria || 'Normativa General',
          opcionSeleccionada: idx === 3 || idx === 7 ? 0 : q.respuestaCorrecta,
          textoOpcionSeleccionada: idx === 3 || idx === 7 ? q.opciones[0] : q.opciones[q.respuestaCorrecta],
          opcionCorrecta: q.respuestaCorrecta,
          textoOpcionCorrecta: q.opciones[q.respuestaCorrecta],
          esCorrecta: idx !== 3 && idx !== 7,
          articuloReferencia: q.refuerzoPedagogico?.articuloReferencia,
          explicacion: q.refuerzoPedagogico?.porQueEsCorrecta || q.explicacion
        }))
      },
      {
        id: `sample-${Date.now()}-3`,
        fechaISO: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        fechaLegible: 'Ayer, 3:15 p. m.',
        aprendiz: {
          nombre: 'Laura Daniela Gómez',
          tipoDocumento: 'Cédula de Ciudadanía',
          numeroDocumento: '1005728394',
          correo: 'laurad.gomez@gmail.com',
          regional: 'Santander',
          centroFormacion: 'Centro Industrial del Diseño y la Manufactura',
          programaFormacion: 'Gestión Empresarial y Talento Humano',
          ficha: '2910384'
        },
        modoPrueba: 'Prueba Completa (12 Casos)',
        puntaje: 9,
        totalPreguntas: 12,
        porcentaje: 75,
        estado: 'Aprobado',
        duracionSegundos: 210,
        respuestas: ACUERDO_0009_COMPLETO.bancoPreguntasEvaluacion.map((q, idx) => ({
          preguntaId: q.id,
          pregunta: q.pregunta,
          categoria: q.categoria || 'Normativa General',
          opcionSeleccionada: [0, 2, 8].includes(idx) ? 3 : q.respuestaCorrecta,
          textoOpcionSeleccionada: [0, 2, 8].includes(idx) ? q.opciones[3] : q.opciones[q.respuestaCorrecta],
          opcionCorrecta: q.respuestaCorrecta,
          textoOpcionCorrecta: q.opciones[q.respuestaCorrecta],
          esCorrecta: ![0, 2, 8].includes(idx),
          articuloReferencia: q.refuerzoPedagogico?.articuloReferencia,
          explicacion: q.refuerzoPedagogico?.porQueEsCorrecta || q.explicacion
        }))
      },
      {
        id: `sample-${Date.now()}-4`,
        fechaISO: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
        fechaLegible: 'Ayer, 10:40 a. m.',
        aprendiz: {
          nombre: 'Juan Sebastián Rincón',
          tipoDocumento: 'Cédula de Ciudadanía',
          numeroDocumento: '1020485923',
          correo: 'jsrincon@misena.edu.co',
          regional: 'Valle del Cauca',
          centroFormacion: 'Centro de Electricidad y Automatización Industrial (CEAI)',
          programaFormacion: 'Mantenimiento Mecatrónico',
          ficha: '2765109'
        },
        modoPrueba: 'Prueba Completa (12 Casos)',
        puntaje: 6,
        totalPreguntas: 12,
        porcentaje: 50,
        estado: 'Requiere Refuerzo',
        duracionSegundos: 165,
        respuestas: ACUERDO_0009_COMPLETO.bancoPreguntasEvaluacion.map((q, idx) => ({
          preguntaId: q.id,
          pregunta: q.pregunta,
          categoria: q.categoria || 'Normativa General',
          opcionSeleccionada: [1, 2, 4, 7, 9, 11].includes(idx) ? (q.respuestaCorrecta + 1) % 4 : q.respuestaCorrecta,
          textoOpcionSeleccionada: [1, 2, 4, 7, 9, 11].includes(idx) ? q.opciones[(q.respuestaCorrecta + 1) % 4] : q.opciones[q.respuestaCorrecta],
          opcionCorrecta: q.respuestaCorrecta,
          textoOpcionCorrecta: q.opciones[q.respuestaCorrecta],
          esCorrecta: ![1, 2, 4, 7, 9, 11].includes(idx),
          articuloReferencia: q.refuerzoPedagogico?.articuloReferencia,
          explicacion: q.refuerzoPedagogico?.porQueEsCorrecta || q.explicacion
        }))
      }
    ];

    const actualizadas = [...samples, ...evaluaciones];
    setEvaluaciones(actualizadas);
    localStorage.setItem('sena_repositorio_evaluaciones', JSON.stringify(actualizadas));

    // Guardar en servidor
    for (const sample of samples) {
      try {
        await fetch('/api/evaluaciones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sample)
        });
      } catch (e) {}
    }
    showNotice('Se han cargado evaluaciones de muestra representativas para análisis analítico.');
  };

  // Exportar a CSV
  const handleExportCSV = () => {
    if (evaluaciones.length === 0) {
      alert('No hay evaluaciones para exportar.');
      return;
    }

    const headers = [
      'ID',
      'Fecha',
      'Nombre Aprendiz',
      'Tipo Doc',
      'Numero Doc',
      'Correo',
      'Ficha',
      'Programa',
      'Regional',
      'Centro',
      'Modo Prueba',
      'Puntaje',
      'Total Preguntas',
      'Porcentaje Aprobacion',
      'Estado Final'
    ];

    const rows = evaluaciones.map((reg) => [
      `"${reg.id}"`,
      `"${reg.fechaLegible}"`,
      `"${reg.aprendiz.nombre}"`,
      `"${reg.aprendiz.tipoDocumento}"`,
      `"${reg.aprendiz.numeroDocumento}"`,
      `"${reg.aprendiz.correo}"`,
      `"${reg.aprendiz.ficha}"`,
      `"${reg.aprendiz.programaFormacion}"`,
      `"${reg.aprendiz.regional}"`,
      `"${reg.aprendiz.centroFormacion}"`,
      `"${reg.modoPrueba}"`,
      reg.puntaje,
      reg.totalPreguntas,
      `"${reg.porcentaje}%"`,
      `"${reg.estado}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `sena_reporte_analitico_aprendices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showNotice('Reporte CSV descargado con éxito.');
  };

  // Exportar a JSON
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(evaluaciones, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `sena_evaluaciones_admin_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showNotice('Base de datos JSON descargada.');
  };

  // Lista única de Fichas para filtros
  const listaFichas = useMemo(() => {
    const fichas = new Set<string>();
    evaluaciones.forEach((e) => {
      if (e.aprendiz.ficha && e.aprendiz.ficha.trim()) {
        fichas.add(e.aprendiz.ficha.trim());
      }
    });
    return Array.from(fichas);
  }, [evaluaciones]);

  // Evaluaciones filtradas para la tabla y visor
  const filteredEvaluaciones = useMemo(() => {
    return evaluaciones.filter((item) => {
      const matchEstado = filtroEstado === 'Todos' || item.estado === filtroEstado;
      const matchFicha = filtroFicha === 'Todas' || item.aprendiz.ficha === filtroFicha;
      const matchModo = filtroModo === 'Todos' || item.modoPrueba.toLowerCase().includes(filtroModo.toLowerCase());

      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        item.aprendiz.nombre.toLowerCase().includes(query) ||
        item.aprendiz.numeroDocumento.toLowerCase().includes(query) ||
        item.aprendiz.ficha.toLowerCase().includes(query) ||
        item.aprendiz.programaFormacion.toLowerCase().includes(query) ||
        item.aprendiz.regional.toLowerCase().includes(query);

      return matchEstado && matchFicha && matchModo && matchSearch;
    });
  }, [evaluaciones, filtroEstado, filtroFicha, filtroModo, searchQuery]);

  // ==========================================
  // CÁLCULOS ANALÍTICOS Y ESTADÍSTICAS GLOBALES
  // ==========================================
  const analytics = useMemo(() => {
    const total = evaluaciones.length;
    if (total === 0) {
      return {
        total: 0,
        excelencia: 0,
        excelenciaPct: 0,
        aprobado: 0,
        aprobadoPct: 0,
        refuerzo: 0,
        refuerzoPct: 0,
        promedioGeneral: 0,
        tasaAprobacionGlobal: 0,
        duracionPromedioSeg: 0,
        fichasCount: 0,
        regionalesCount: 0,
        categoryPerformance: [],
        topDifficultQuestions: [],
        fichasPerformance: [],
        regionalesDistribution: []
      };
    }

    const excelencia = evaluaciones.filter((e) => e.estado === 'Aprobado con Excelencia').length;
    const aprobado = evaluaciones.filter((e) => e.estado === 'Aprobado').length;
    const refuerzo = evaluaciones.filter((e) => e.estado === 'Requiere Refuerzo').length;

    const excelenciaPct = Math.round((excelencia / total) * 100);
    const aprobadoPct = Math.round((aprobado / total) * 100);
    const refuerzoPct = Math.round((refuerzo / total) * 100);
    const tasaAprobacionGlobal = Math.round(((excelencia + aprobado) / total) * 100);

    const promedioGeneral = Math.round(
      evaluaciones.reduce((acc, curr) => acc + curr.porcentaje, 0) / total
    );

    const duraciones = evaluaciones.filter((e) => e.duracionSegundos && e.duracionSegundos > 0);
    const duracionPromedioSeg =
      duraciones.length > 0
        ? Math.round(duraciones.reduce((acc, curr) => acc + (curr.duracionSegundos || 0), 0) / duraciones.length)
        : 0;

    // Conteo de fichas y regionales
    const uniqueFichas = new Set(evaluaciones.map((e) => e.aprendiz.ficha).filter(Boolean));
    const uniqueRegionales = new Set(evaluaciones.map((e) => e.aprendiz.regional).filter(Boolean));

    // Análisis por Categoría Normativa
    const categoryStats: Record<string, { totalRespuestas: number; correctas: number }> = {};
    const questionStats: Record<
      number,
      { preguntaId: number; pregunta: string; categoria: string; totalRespuestas: number; incorrectas: number; articuloReferencia?: string }
    > = {};

    evaluaciones.forEach((evalItem) => {
      if (evalItem.respuestas && Array.isArray(evalItem.respuestas)) {
        evalItem.respuestas.forEach((resp) => {
          const cat = resp.categoria || 'Normativa General';
          if (!categoryStats[cat]) {
            categoryStats[cat] = { totalRespuestas: 0, correctas: 0 };
          }
          categoryStats[cat].totalRespuestas += 1;
          if (resp.esCorrecta) {
            categoryStats[cat].correctas += 1;
          }

          // Estadísticas por pregunta para encontrar las más difíciles
          if (!questionStats[resp.preguntaId]) {
            questionStats[resp.preguntaId] = {
              preguntaId: resp.preguntaId,
              pregunta: resp.pregunta,
              categoria: resp.categoria,
              totalRespuestas: 0,
              incorrectas: 0,
              articuloReferencia: resp.articuloReferencia
            };
          }
          questionStats[resp.preguntaId].totalRespuestas += 1;
          if (!resp.esCorrecta) {
            questionStats[resp.preguntaId].incorrectas += 1;
          }
        });
      }
    });

    const categoryPerformance = Object.entries(categoryStats).map(([cat, val]) => ({
      categoria: cat,
      tasaAcierto: val.totalRespuestas > 0 ? Math.round((val.correctas / val.totalRespuestas) * 100) : 0,
      totalRespuestas: val.totalRespuestas,
      correctas: val.correctas
    })).sort((a, b) => b.tasaAcierto - a.tasaAcierto);

    // Top 5 preguntas con más errores
    const topDifficultQuestions = Object.values(questionStats)
      .map((q) => ({
        ...q,
        porcentajeError: q.totalRespuestas > 0 ? Math.round((q.incorrectas / q.totalRespuestas) * 100) : 0
      }))
      .filter((q) => q.totalRespuestas > 0)
      .sort((a, b) => b.porcentajeError - a.porcentajeError)
      .slice(0, 5);

    // Rendimiento por Ficha de Formación
    const fichaMap: Record<string, { ficha: string; programa: string; total: number; sumaPuntos: number; aprobados: number }> = {};
    evaluaciones.forEach((e) => {
      const f = e.aprendiz.ficha || 'Sin Ficha';
      if (!fichaMap[f]) {
        fichaMap[f] = {
          ficha: f,
          programa: e.aprendiz.programaFormacion || 'General',
          total: 0,
          sumaPuntos: 0,
          aprobados: 0
        };
      }
      fichaMap[f].total += 1;
      fichaMap[f].sumaPuntos += e.porcentaje;
      if (e.estado !== 'Requiere Refuerzo') {
        fichaMap[f].aprobados += 1;
      }
    });

    const fichasPerformance = Object.values(fichaMap).map((f) => ({
      ...f,
      promedio: Math.round(f.sumaPuntos / f.total),
      tasaAprobacion: Math.round((f.aprobados / f.total) * 100)
    })).sort((a, b) => b.total - a.total);

    // Distribución por Regionales
    const regMap: Record<string, number> = {};
    evaluaciones.forEach((e) => {
      const reg = e.aprendiz.regional || 'No especificada';
      regMap[reg] = (regMap[reg] || 0) + 1;
    });
    const regionalesDistribution = Object.entries(regMap).map(([nombre, cantidad]) => ({
      nombre,
      cantidad,
      porcentaje: Math.round((cantidad / total) * 100)
    })).sort((a, b) => b.cantidad - a.cantidad);

    return {
      total,
      excelencia,
      excelenciaPct,
      aprobado,
      aprobadoPct,
      refuerzo,
      refuerzoPct,
      promedioGeneral,
      tasaAprobacionGlobal,
      duracionPromedioSeg,
      fichasCount: uniqueFichas.size,
      regionalesCount: uniqueRegionales.size,
      categoryPerformance,
      topDifficultQuestions,
      fichasPerformance,
      regionalesDistribution
    };
  }, [evaluaciones]);

  return (
    <div className="space-y-8 animate-fadeIn py-2">
      {/* Banner Superior Principal del Administrador */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-emerald-800/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 -mb-16 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Panel de Administración e Instructores SENA</span>
              </span>
              <span className="bg-white/10 text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                Acuerdo 0009 de 2024
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Control Analítico de Evaluaciones de Aprendices
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              Monitorea en tiempo real el progreso de inducción, analiza las respuestas pregunta por pregunta,
              identifica los conceptos normativos más difíciles y genera reportes consolidados para Sofia Plus.
            </p>
          </div>

          {/* Botones de Navegación y Exportación Rápida */}
          <div className="flex flex-wrap items-center gap-2 bg-black/40 p-2 rounded-2xl backdrop-blur-md border border-white/15 shrink-0">
            <button
              onClick={() => setActiveAdminSubTab('analiticas')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminSubTab === 'analiticas'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-102 font-extrabold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analíticas & Métricas</span>
            </button>

            <button
              onClick={() => setActiveAdminSubTab('respuestas')}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeAdminSubTab === 'respuestas'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-102 font-extrabold'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Respuestas de Aprendices</span>
              <span className="bg-black/50 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {evaluaciones.length}
              </span>
            </button>

            <button
              onClick={fetchServerEvaluaciones}
              disabled={isLoading}
              title="Sincronizar con base de datos del servidor"
              className="p-2.5 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Alerta de Acción / Notificación */}
      {actionNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold p-3.5 rounded-2xl flex items-center justify-between shadow-xs animate-fadeIn">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionNotice}</span>
          </div>
          <button onClick={() => setActionNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 1: DASHBOARD DE ANALÍTICAS Y MÉTRICAS                             */}
      {/* ========================================================================= */}
      {activeAdminSubTab === 'analiticas' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Tarjetas KPI de Resumen Ejecutivo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: Total Evaluaciones */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Aprendices Evaluados
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-slate-900">{analytics.total}</span>
                  <span className="text-xs font-semibold text-slate-500">registros</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-emerald-700 font-medium">
                  <Users className="w-3.5 h-3.5" />
                  <span>En {analytics.fichasCount} fichas activas</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
                <Users className="w-7 h-7" />
              </div>
            </div>

            {/* KPI 2: Tasa de Aprobación Global */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Tasa de Aprobación
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-slate-900">{analytics.tasaAprobacionGlobal}%</span>
                  <span className="text-xs font-semibold text-emerald-700">
                    ({analytics.excelencia + analytics.aprobado}/{analytics.total})
                  </span>
                </div>
                <div className="w-36 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${analytics.tasaAprobacionGlobal}%` }}
                  />
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100 shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
            </div>

            {/* KPI 3: Promedio General de Calificación */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Promedio de Notas
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-slate-900">{analytics.promedioGeneral}%</span>
                  <span className="text-xs font-semibold text-slate-500">sobre 100%</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-amber-700 font-medium">
                  <Award className="w-3.5 h-3.5" />
                  <span>{analytics.excelenciaPct}% con excelencia (≥80%)</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100 shrink-0">
                <TrendingUp className="w-7 h-7" />
              </div>
            </div>

            {/* KPI 4: Tiempo Promedio de Respuesta */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Tiempo Promedio
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-black text-slate-900">
                    {analytics.duracionPromedioSeg > 0 ? `${Math.round(analytics.duracionPromedioSeg / 60)} min` : '2.5 min'}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">por prueba</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[11px] text-slate-600 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Inducción activa</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shrink-0">
                <Clock className="w-7 h-7" />
              </div>
            </div>

          </div>

          {/* Gráfico 1: Distribución del Desempeño y Rendimiento por Categoría */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Desglose de Desempeño */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-emerald-700" />
                    <span>Distribución de Desempeño de la Cohorte</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Clasificación según los estándares de inducción SENA</p>
                </div>
                <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                  Total: {analytics.total}
                </span>
              </div>

              <div className="space-y-4">
                {/* Excelencia */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-emerald-800 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                      <span>Aprobado con Excelencia (≥ 80%)</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {analytics.excelencia} ({analytics.excelenciaPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${analytics.excelenciaPct}%` }}
                    />
                  </div>
                </div>

                {/* Aprobado */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-teal-800 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
                      <span>Aprobado Satisfactorio (70% - 79%)</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {analytics.aprobado} ({analytics.aprobadoPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-teal-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${analytics.aprobadoPct}%` }}
                    />
                  </div>
                </div>

                {/* Requiere Refuerzo */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-800 flex items-center space-x-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      <span>Requiere Refuerzo Pedagógico (&lt; 70%)</span>
                    </span>
                    <span className="font-mono font-bold text-slate-700">
                      {analytics.refuerzo} ({analytics.refuerzoPct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-rose-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${analytics.refuerzoPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Ficha Resumen */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Criterio Institucional:</span>
                  <span className="text-[11px]">70% mínimo para certificación de inducción reglamentaria.</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-emerald-800 font-mono">
                    {analytics.excelencia + analytics.aprobado}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Aprobados totales</span>
                </div>
              </div>
            </div>

            {/* Rendimiento por Competencia / Categoría Normativa */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <Scale className="w-5 h-5 text-emerald-700" />
                    <span>Dominio por Dimensión del Acuerdo 0009</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Tasa de acierto de los aprendices por área temática</p>
                </div>
                <span className="text-[11px] font-bold text-slate-500">
                  {analytics.categoryPerformance.length} dimensiones
                </span>
              </div>

              <div className="space-y-3.5">
                {analytics.categoryPerformance.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">No hay respuestas registradas aún.</p>
                ) : (
                  analytics.categoryPerformance.map((cat) => {
                    let barColor = 'bg-emerald-600';
                    let textColor = 'text-emerald-700';
                    if (cat.tasaAcierto < 70) {
                      barColor = 'bg-rose-500';
                      textColor = 'text-rose-700';
                    } else if (cat.tasaAcierto < 85) {
                      barColor = 'bg-teal-600';
                      textColor = 'text-teal-700';
                    }

                    return (
                      <div key={cat.categoria} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{cat.categoria}</span>
                          <span className={`font-mono font-bold ${textColor}`}>
                            {cat.tasaAcierto}% ({cat.correctas}/{cat.totalRespuestas})
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`${barColor} h-full rounded-full transition-all duration-500`}
                            style={{ width: `${cat.tasaAcierto}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Las dimensiones con acierto menor a 70% requieren refuerzo en sesión presencial.</span>
              </div>
            </div>

          </div>

          {/* Gráfico 2: Top 5 Preguntas Más Difíciles (Puntos Críticos de Falla) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Alerta Pedagógica
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Análisis de Errores Frecuentes</span>
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-1 flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>Top Preguntas con Mayor Tasa de Error</span>
                </h3>
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                Permite a los instructores del SENA identificar los vacíos conceptuales más comunes de los aprendices.
              </p>
            </div>

            <div className="space-y-3">
              {analytics.topDifficultQuestions.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Sin datos de fallas para mostrar.</p>
              ) : (
                analytics.topDifficultQuestions.map((q, idx) => (
                  <div
                    key={q.preguntaId}
                    className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-rose-50"
                  >
                    <div className="space-y-1.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-black text-[11px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-900 font-mono">Pregunta #{q.preguntaId}</span>
                        <span className="bg-white px-2 py-0.5 rounded-md border border-rose-200 text-rose-800 text-[10px] font-bold">
                          {q.categoria}
                        </span>
                        {q.articuloReferencia && (
                          <span className="text-[11px] text-slate-500">
                            Ref: <strong>{q.articuloReferencia}</strong>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed">{q.pregunta}</p>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="text-right">
                        <span className="text-xl font-black text-rose-700 font-mono">{q.porcentajeError}%</span>
                        <span className="text-[10px] text-rose-600/80 block font-bold">Tasa de Error</span>
                      </div>
                      <div className="w-16 bg-white rounded-full h-2 border border-rose-200 overflow-hidden">
                        <div className="bg-rose-600 h-full rounded-full" style={{ width: `${q.porcentajeError}%` }} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Comparativo por Fichas y Distribución Regional */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tabla Comparativa de Fichas */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-emerald-700" />
                    <span>Rendimiento por Ficha de Formación</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Seguimiento comparativo entre grupos de aprendizaje</p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {analytics.fichasPerformance.length} Fichas
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold">
                      <th className="pb-3">Ficha SENA</th>
                      <th className="pb-3">Programa</th>
                      <th className="pb-3 text-center">Evaluados</th>
                      <th className="pb-3 text-center">Promedio</th>
                      <th className="pb-3 text-center">% Aprobación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {analytics.fichasPerformance.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-4 text-center text-slate-400">
                          Sin fichas registradas aún.
                        </td>
                      </tr>
                    ) : (
                      analytics.fichasPerformance.map((f) => (
                        <tr key={f.ficha} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 font-bold font-mono text-emerald-800">{f.ficha}</td>
                          <td className="py-3 text-slate-700 font-medium max-w-xs truncate">{f.programa}</td>
                          <td className="py-3 text-center font-bold text-slate-900">{f.total}</td>
                          <td className="py-3 text-center font-mono font-bold text-slate-800">{f.promedio}%</td>
                          <td className="py-3 text-center">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                f.tasaAprobacion >= 80
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : f.tasaAprobacion >= 70
                                  ? 'bg-teal-100 text-teal-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {f.tasaAprobacion}%
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Distribución Geográfica / Regionales */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-emerald-700" />
                  <span>Distribución por Regionales</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Participación territorial</p>
              </div>

              <div className="space-y-3">
                {analytics.regionalesDistribution.length === 0 ? (
                  <p className="text-xs text-slate-400 py-4 text-center">Sin datos de regionales.</p>
                ) : (
                  analytics.regionalesDistribution.slice(0, 5).map((reg) => (
                    <div key={reg.nombre} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 truncate max-w-[170px]">{reg.nombre}</span>
                        <span className="font-mono font-bold text-slate-900">
                          {reg.cantidad} ({reg.porcentaje}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${reg.porcentaje}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Botón para generar datos de prueba si hay pocos registros */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={handleLoadSampleData}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-emerald-400 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100/60 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Cargar Evaluaciones de Muestra</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  Agrega cohortes simuladas para visualizar la analítica multivariada.
                </p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PESTAÑA 2: VISOR Y CONTROL DE RESPUESTAS DE LOS APRENDICES                */}
      {/* ========================================================================= */}
      {activeAdminSubTab === 'respuestas' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Barra de Filtros, Búsqueda y Exportación */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              {/* Buscador */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por aprendiz, documento, ficha o programa..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Botones de Exportación y Limpieza */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exportar Excel (CSV)</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Exportar JSON</span>
                </button>

                {evaluaciones.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    title="Vaciar Repositorio"
                    className="flex items-center space-x-1 text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-2.5 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

            {/* Fila de Filtros Secundarios */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 font-medium flex items-center space-x-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filtrar por:</span>
              </span>

              {/* Filtro por Estado */}
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="p-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Todos">Todos los Estados</option>
                <option value="Aprobado con Excelencia">Excelencia (≥80%)</option>
                <option value="Aprobado">Aprobados (70-79%)</option>
                <option value="Requiere Refuerzo">Requiere Refuerzo (&lt;70%)</option>
              </select>

              {/* Filtro por Ficha */}
              {listaFichas.length > 0 && (
                <select
                  value={filtroFicha}
                  onChange={(e) => setFiltroFicha(e.target.value)}
                  className="p-1.5 rounded-lg border border-slate-300 text-xs bg-white text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Todas">Todas las Fichas ({listaFichas.length})</option>
                  {listaFichas.map((f) => (
                    <option key={f} value={f}>
                      Ficha {f}
                    </option>
                  ))}
                </select>
              )}

              <span className="text-slate-400 ml-auto">
                Mostrando <strong>{filteredEvaluaciones.length}</strong> de {evaluaciones.length} aprendices
              </span>
            </div>
          </div>

          {/* Tabla de Evaluaciones de Aprendices */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
            {filteredEvaluaciones.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">No se encontraron evaluaciones registradas</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  {evaluaciones.length === 0
                    ? 'Aún no hay aprendices evaluados. Puedes realizar una evaluación desde la pestaña de Reglamento o cargar datos de muestra.'
                    : 'Ningún registro coincide con los filtros de búsqueda aplicados.'}
                </p>
                {evaluaciones.length === 0 && (
                  <div className="pt-2 flex items-center justify-center space-x-3">
                    <button
                      onClick={handleLoadSampleData}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                    >
                      Cargar Datos de Muestra
                    </button>
                    {onNavigateToQuiz && (
                      <button
                        onClick={onNavigateToQuiz}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                      >
                        Ir al Simulador de Evaluación
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3.5 px-4">Aprendiz</th>
                      <th className="py-3.5 px-4">Documento</th>
                      <th className="py-3.5 px-4">Ficha & Programa</th>
                      <th className="py-3.5 px-4">Regional & Centro</th>
                      <th className="py-3.5 px-4 text-center">Calificación</th>
                      <th className="py-3.5 px-4 text-center">Estado</th>
                      <th className="py-3.5 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvaluaciones.map((reg) => {
                      const isExcelencia = reg.estado === 'Aprobado con Excelencia';
                      const isAprobado = reg.estado === 'Aprobado';
                      const isRefuerzo = reg.estado === 'Requiere Refuerzo';

                      let badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
                      if (isExcelencia) badgeClass = 'bg-emerald-50 text-emerald-800 border-emerald-300';
                      else if (isAprobado) badgeClass = 'bg-teal-50 text-teal-800 border-teal-300';

                      return (
                        <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                          {/* Nombre Aprendiz */}
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                                {reg.aprendiz.nombre.charAt(0) || 'A'}
                              </div>
                              <div>
                                <span className="font-bold text-slate-900 block">{reg.aprendiz.nombre}</span>
                                <span className="text-[10px] text-slate-400">{reg.fechaLegible}</span>
                              </div>
                            </div>
                          </td>

                          {/* Documento y Correo */}
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-slate-800 block">
                              {reg.aprendiz.numeroDocumento}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate max-w-[130px]">
                              {reg.aprendiz.tipoDocumento}
                            </span>
                          </td>

                          {/* Ficha & Programa */}
                          <td className="py-3 px-4">
                            <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                              {reg.aprendiz.ficha || 'Sin Ficha'}
                            </span>
                            <span className="text-[11px] text-slate-600 font-medium block truncate max-w-[180px] mt-0.5">
                              {reg.aprendiz.programaFormacion}
                            </span>
                          </td>

                          {/* Regional & Centro */}
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-700 block truncate max-w-[160px]">
                              {reg.aprendiz.regional}
                            </span>
                            <span className="text-[10px] text-slate-400 block truncate max-w-[160px]">
                              {reg.aprendiz.centroFormacion}
                            </span>
                          </td>

                          {/* Calificación */}
                          <td className="py-3 px-4 text-center">
                            <div className="font-black font-mono text-sm text-slate-900">
                              {reg.puntaje} / {reg.totalPreguntas}
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 font-mono">
                              {reg.porcentaje}%
                            </span>
                          </td>

                          {/* Estado */}
                          <td className="py-3 px-4 text-center">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeClass}`}>
                              {reg.estado}
                            </span>
                          </td>

                          {/* Acciones */}
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-1.5">
                              {/* Botón Ver Respuestas */}
                              <button
                                onClick={() => setSelectedEvaluationDetail(reg)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition-all font-bold flex items-center space-x-1 text-xs"
                                title="Inspeccionar respuestas detalladas"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Ver Respuestas</span>
                              </button>

                              {/* Botón Certificado */}
                              <button
                                onClick={() => setSelectedCertificateModal(reg)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 transition-all"
                                title="Ver Certificado de Inducción"
                              >
                                <Award className="w-3.5 h-3.5" />
                              </button>

                              {/* Botón Eliminar */}
                              <button
                                onClick={() => handleDeleteEvaluation(reg.id, reg.aprendiz.nombre)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-700 transition-all"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: INSPECTOR DETALLADO DE RESPUESTAS DEL APRENDIZ                   */}
      {/* ========================================================================= */}
      {selectedEvaluationDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200">
            
            {/* Encabezado del Modal */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Auditoría de Respuestas
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {selectedEvaluationDetail.id}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Evaluación de {selectedEvaluationDetail.aprendiz.nombre}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedEvaluationDetail.aprendiz.tipoDocumento}: {selectedEvaluationDetail.aprendiz.numeroDocumento} •{' '}
                  Ficha: {selectedEvaluationDetail.aprendiz.ficha} • Programa: {selectedEvaluationDetail.aprendiz.programaFormacion}
                </p>
              </div>

              <button
                onClick={() => setSelectedEvaluationDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Resumen de Calificación */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Puntaje</span>
                <span className="font-mono font-black text-slate-900 text-base">
                  {selectedEvaluationDetail.puntaje} / {selectedEvaluationDetail.totalPreguntas}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Porcentaje</span>
                <span className="font-mono font-black text-emerald-800 text-base">
                  {selectedEvaluationDetail.porcentaje}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Estado Final</span>
                <span className="font-bold text-slate-800">{selectedEvaluationDetail.estado}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Fecha Realización</span>
                <span className="font-medium text-slate-700 text-[11px]">{selectedEvaluationDetail.fechaLegible}</span>
              </div>
            </div>

            {/* Desglose de Cada Respuesta */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Desglose Pregunta por Pregunta ({selectedEvaluationDetail.respuestas?.length || 0}):
              </h4>

              {!selectedEvaluationDetail.respuestas || selectedEvaluationDetail.respuestas.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No hay desglose de respuestas disponible.</p>
              ) : (
                selectedEvaluationDetail.respuestas.map((resp, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs space-y-2.5 transition-all ${
                      resp.esCorrecta
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-rose-50/50 border-rose-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`w-5 h-5 rounded-full text-white font-black text-[10px] flex items-center justify-center shrink-0 ${
                            resp.esCorrecta ? 'bg-emerald-600' : 'bg-rose-600'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="font-bold text-slate-900">{resp.pregunta}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                          resp.esCorrecta ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                        }`}
                      >
                        {resp.esCorrecta ? 'Acierto ✓' : 'Fallo ✗'}
                      </span>
                    </div>

                    {/* Qué respondió el aprendiz */}
                    <div className="space-y-1 pl-7">
                      <div className="flex items-start space-x-1.5">
                        <span className="text-[10px] font-bold uppercase text-slate-400 shrink-0">
                          Respuesta del Aprendiz:
                        </span>
                        <span
                          className={`font-medium ${
                            resp.esCorrecta ? 'text-emerald-900 font-semibold' : 'text-rose-900 line-through'
                          }`}
                        >
                          {resp.textoOpcionSeleccionada}
                        </span>
                      </div>

                      {/* Si fue incorrecta, mostrar cuál era la correcta */}
                      {!resp.esCorrecta && (
                        <div className="flex items-start space-x-1.5 text-emerald-900">
                          <span className="text-[10px] font-bold uppercase text-emerald-700 shrink-0">
                            Respuesta Correcta Oficial:
                          </span>
                          <span className="font-bold">{resp.textoOpcionCorrecta}</span>
                        </div>
                      )}

                      {/* Refuerzo pedagógico y artículo */}
                      {(resp.articuloReferencia || resp.explicacion) && (
                        <div className="mt-2 p-2.5 bg-white rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                          {resp.articuloReferencia && (
                            <div className="font-bold text-emerald-800 text-[10px] flex items-center space-x-1">
                              <BookOpen className="w-3 h-3" />
                              <span>{resp.articuloReferencia}</span>
                            </div>
                          )}
                          {resp.explicacion && <p className="leading-relaxed">{resp.explicacion}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Modal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setSelectedCertificateModal(selectedEvaluationDetail);
                  setSelectedEvaluationDetail(null);
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center space-x-1.5 transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Generar Certificado</span>
              </button>

              <button
                onClick={() => setSelectedEvaluationDetail(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
              >
                Cerrar Auditoría
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CERTIFICADO DE INDUCCIÓN SENA                                    */}
      {/* ========================================================================= */}
      {selectedCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl border-4 border-emerald-700 relative print:border-none print:shadow-none print:p-0">
            
            {/* Encabezado Certificado */}
            <div className="text-center space-y-2 border-b-2 border-slate-100 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
                SENA
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block">
                Servicio Nacional de Aprendizaje • SENA
              </span>
              <h3 className="text-xl font-black text-slate-900">
                Constancia de Aprobación de Inducción Normativa
              </h3>
              <p className="text-xs text-emerald-800 font-bold">
                Reglamento del Aprendiz • Acuerdo No. 0009 de 2024
              </p>
            </div>

            {/* Cuerpo del Certificado */}
            <div className="space-y-4 text-center text-xs text-slate-700 leading-relaxed">
              <p>Hace constar que el(la) aprendiz:</p>
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">
                {selectedCertificateModal.aprendiz.nombre}
              </h4>
              <p className="text-slate-600">
                Identificado(a) con{' '}
                <strong>{selectedCertificateModal.aprendiz.tipoDocumento}</strong> No.{' '}
                <strong>{selectedCertificateModal.aprendiz.numeroDocumento}</strong>, matriculado(a) en el programa{' '}
                <strong>{selectedCertificateModal.aprendiz.programaFormacion}</strong>, Ficha{' '}
                <strong>{selectedCertificateModal.aprendiz.ficha}</strong> en la Regional{' '}
                <strong>{selectedCertificateModal.aprendiz.regional}</strong>.
              </p>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl max-w-sm mx-auto space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Resultado de Evaluación
                </span>
                <span className="text-2xl font-black text-emerald-950 font-mono">
                  {selectedCertificateModal.porcentaje}% ({selectedCertificateModal.puntaje}/{selectedCertificateModal.totalPreguntas})
                </span>
                <span className="text-xs font-bold text-emerald-800 block">
                  {selectedCertificateModal.estado}
                </span>
              </div>

              <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                Demostró conocimiento integral sobre los derechos, deberes, prohibiciones, medidas formativas y el debido
                proceso que rigen la vida formativa institucional.
              </p>
            </div>

            {/* Firmas y Fecha */}
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100 text-center text-[11px]">
              <div>
                <div className="border-b border-slate-300 w-36 mx-auto mb-1" />
                <span className="font-bold text-slate-800 block">Subdirección de Centro</span>
                <span className="text-[10px] text-slate-500">Coordinación Académica SENA</span>
              </div>
              <div>
                <div className="border-b border-slate-300 w-36 mx-auto mb-1" />
                <span className="font-bold text-slate-800 block">Fecha de Expedición</span>
                <span className="text-[10px] text-slate-500">{selectedCertificateModal.fechaLegible}</span>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Guardar PDF</span>
              </button>

              <button
                onClick={() => setSelectedCertificateModal(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl transition-all"
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
