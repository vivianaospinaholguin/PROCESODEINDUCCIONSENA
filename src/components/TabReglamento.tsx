import React, { useState, useMemo, useEffect } from 'react';
import { ACUERDO_ITEMS, ACUERDO_0009_COMPLETO, REGIONALES_SENA } from '../data/senaData';
import {
  Shield,
  Search,
  BookOpen,
  AlertCircle,
  CheckCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  HelpCircle,
  FileText,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Flame,
  Scale,
  GraduationCap,
  Lightbulb,
  Check,
  Layers,
  Clock,
  UserCheck,
  ChevronRight,
  Info,
  SlidersHorizontal,
  BookmarkCheck,
  BookMarked,
  RefreshCw,
  Download,
  Trash2,
  Eye,
  Printer,
  FileSpreadsheet,
  Play,
  History,
  User,
  CheckSquare
} from 'lucide-react';
import {
  AcuerdoItem,
  QuizQuestion,
  CharacterizationData,
  EvaluacionAprendizData,
  RegistroEvaluacion,
  RespuestaEvaluacionDetalle
} from '../types';

interface TabReglamentoProps {
  characterization?: CharacterizationData;
  onUpdateCharacterization?: (data: CharacterizationData) => void;
}

export const TabReglamento: React.FC<TabReglamentoProps> = ({
  characterization,
  onUpdateCharacterization
}) => {
  // Pestaña principal de navegación
  const [activeSubTab, setActiveSubTab] = useState<'normas' | 'quiz' | 'proceso' | 'repositorio'>('normas');

  // Filtros del explorador de normas
  const [selectedTipo, setSelectedTipo] = useState<string>('Todos');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [selectedItemModal, setSelectedItemModal] = useState<AcuerdoItem | null>(null);

  // Estados del flujo del Simulador / Quiz
  // 'registro' (pantalla previa con datos básicos), 'evaluando' (prueba activa), 'finalizado' (resultados)
  const [quizState, setQuizState] = useState<'registro' | 'evaluando' | 'finalizado'>('registro');
  const [quizMode, setQuizMode] = useState<'completo' | 'derechos_deberes' | 'faltas_proceso'>('completo');
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<{ questionId: number; selectedOption: number; isCorrect: boolean }>>([]);
  const [reviewOnlyErrors, setReviewOnlyErrors] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());
  const [lastSavedEvaluationId, setLastSavedEvaluationId] = useState<string | null>(null);

  // Datos Básicos del Aprendiz para la Evaluación Previa
  const [datosAprendiz, setDatosAprendiz] = useState<EvaluacionAprendizData>({
    nombre: characterization?.nombre || '',
    tipoDocumento: characterization?.tipoDocumento || 'Cédula de Ciudadanía',
    numeroDocumento: characterization?.numeroDocumento || '',
    correo: characterization?.correo || '',
    regional: characterization?.regional || 'Distrito Capital',
    centroFormacion: characterization?.centroFormacion || 'Centro de Formación',
    programaFormacion: characterization?.programaFormacion || 'Tecnólogo / Técnico SENA',
    ficha: characterization?.ficha || ''
  });
  const [formError, setFormError] = useState('');

  // Sincronizar con characterization si cambia
  useEffect(() => {
    if (characterization && characterization.nombre) {
      setDatosAprendiz((prev) => ({
        ...prev,
        nombre: characterization.nombre || prev.nombre,
        tipoDocumento: characterization.tipoDocumento || prev.tipoDocumento,
        numeroDocumento: characterization.numeroDocumento || prev.numeroDocumento,
        correo: characterization.correo || prev.correo,
        regional: characterization.regional || prev.regional,
        centroFormacion: characterization.centroFormacion || prev.centroFormacion,
        programaFormacion: characterization.programaFormacion || prev.programaFormacion,
        ficha: characterization.ficha || prev.ficha
      }));
    }
  }, [characterization]);

  // Estados del Repositorio de Evaluaciones
  const [limpiadoNoticia, setLimpiadoNoticia] = useState(false);
  const [ultimoAprendizEvaluado, setUltimoAprendizEvaluado] = useState<EvaluacionAprendizData | null>(null);

  const handleResetDatosAprendiz = () => {
    setDatosAprendiz({
      nombre: '',
      tipoDocumento: 'Cédula de Ciudadanía',
      numeroDocumento: '',
      correo: '',
      regional: 'Distrito Capital',
      centroFormacion: '',
      programaFormacion: '',
      ficha: ''
    });
    setFormError('');
    setLimpiadoNoticia(true);
    setTimeout(() => setLimpiadoNoticia(false), 4000);
  };

  const [repositorio, setRepositorio] = useState<RegistroEvaluacion[]>(() => {
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
  const [searchRepo, setSearchRepo] = useState('');
  const [filtroEstadoRepo, setFiltroEstadoRepo] = useState<string>('Todos');
  const [selectedEvaluationDetail, setSelectedEvaluationDetail] = useState<RegistroEvaluacion | null>(null);
  const [selectedCertificateModal, setSelectedCertificateModal] = useState<RegistroEvaluacion | null>(null);

  // Sincronizar repositorio con localStorage
  useEffect(() => {
    localStorage.setItem('sena_repositorio_evaluaciones', JSON.stringify(repositorio));
  }, [repositorio]);

  // Cargar repositorio desde el servidor backend al montar
  useEffect(() => {
    const fetchServerRepo = async () => {
      try {
        const res = await fetch('/api/evaluaciones');
        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.evaluaciones) && data.evaluaciones.length > 0) {
            setRepositorio((prevLocal) => {
              // Combinar evitando duplicados por ID
              const map = new Map<string, RegistroEvaluacion>();
              prevLocal.forEach((item) => map.set(item.id, item));
              data.evaluaciones.forEach((item: RegistroEvaluacion) => map.set(item.id, item));
              return Array.from(map.values()).sort(
                (a, b) => new Date(b.fechaISO).getTime() - new Date(a.fechaISO).getTime()
              );
            });
          }
        }
      } catch (err) {
        // En entorno local o sin red, opera fluidamente con localStorage
      }
    };
    fetchServerRepo();
  }, []);

  const tipos = ['Todos', 'Derecho', 'Deber', 'Estímulo', 'Falta Académica', 'Falta Disciplinaria', 'Prohibición'];
  const categorias = [
    'Todas',
    'Académico y Formativo',
    'Convivencia y Respeto',
    'Seguridad y EPP',
    'Asistencia y Justificaciones',
    'Tecnología y Ambientes',
    'Bienestar y Apoyo',
    'Democrático y Vocería',
    'Debido Proceso'
  ];

  // Filtro reactivo de items de normas
  const filteredItems = useMemo(() => {
    return ACUERDO_ITEMS.filter((item) => {
      const matchesTipo = selectedTipo === 'Todos' || item.tipo === selectedTipo;
      const matchesCategoria =
        selectedCategoria === 'Todas' ||
        (item.categoria && item.categoria.toLowerCase().includes(selectedCategoria.toLowerCase()));
      const matchesSearch =
        item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.articulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.ejemploPractico && item.ejemploPractico.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesTipo && matchesCategoria && matchesSearch;
    });
  }, [selectedTipo, selectedCategoria, searchTerm]);

  // Selección de preguntas según modo de quiz
  const activeQuizQuestions = useMemo<QuizQuestion[]>(() => {
    const allQuestions = ACUERDO_0009_COMPLETO.bancoPreguntasEvaluacion;
    if (reviewOnlyErrors) {
      const failedIds = userAnswers.filter((a) => !a.isCorrect).map((a) => a.questionId);
      return allQuestions.filter((q) => failedIds.includes(q.id));
    }
    if (quizMode === 'derechos_deberes') {
      return allQuestions.filter((q) => q.categoria === 'Derechos' || q.categoria === 'Deberes');
    }
    if (quizMode === 'faltas_proceso') {
      return allQuestions.filter(
        (q) => q.categoria === 'Prohibiciones' || q.categoria === 'Debido Proceso' || q.categoria === 'Faltas y Sanciones'
      );
    }
    return allQuestions;
  }, [quizMode, reviewOnlyErrors, userAnswers]);

  const currentQuestion = activeQuizQuestions[currentQuizIdx] || activeQuizQuestions[0];

  // Manejo de Inicio de Evaluación tras validar la pantalla previa
  const handleStartEvaluation = () => {
    if (!datosAprendiz.nombre.trim()) {
      setFormError('Por favor ingresa tu Nombre Completo para registrar la evaluación.');
      return;
    }
    if (!datosAprendiz.numeroDocumento.trim()) {
      setFormError('Por favor ingresa tu Número de Documento.');
      return;
    }
    setFormError('');

    // Actualizar caracterización global si existe el handler
    if (onUpdateCharacterization && characterization) {
      onUpdateCharacterization({
        ...characterization,
        nombre: datosAprendiz.nombre,
        tipoDocumento: datosAprendiz.tipoDocumento,
        numeroDocumento: datosAprendiz.numeroDocumento,
        correo: datosAprendiz.correo,
        regional: datosAprendiz.regional,
        centroFormacion: datosAprendiz.centroFormacion,
        programaFormacion: datosAprendiz.programaFormacion,
        ficha: datosAprendiz.ficha,
        isCompleted: true
      });
    }

    // Inicializar la prueba
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setStreak(0);
    setUserAnswers([]);
    setReviewOnlyErrors(false);
    setQuizStartTime(Date.now());
    setQuizState('evaluando');
  };

  const handleAnswerSelect = (optIdx: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    const isCorrect = optIdx === currentQuestion.respuestaCorrecta;
    setSelectedOption(optIdx);
    setShowExplanation(true);

    if (isCorrect) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }

    setUserAnswers((prev) => [
      ...prev.filter((item) => item.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, selectedOption: optIdx, isCorrect }
    ]);
  };

  // Finalizar prueba y guardar en el repositorio
  const finalizeAndSaveQuiz = async (finalScore: number, finalAnswers: typeof userAnswers) => {
    const total = activeQuizQuestions.length;
    const porcentaje = Math.round((finalScore / total) * 100);
    const estado: 'Aprobado con Excelencia' | 'Aprobado' | 'Requiere Refuerzo' =
      porcentaje >= 80 ? 'Aprobado con Excelencia' : porcentaje >= 70 ? 'Aprobado' : 'Requiere Refuerzo';

    const duracionSegundos = Math.round((Date.now() - quizStartTime) / 1000);
    const ahora = new Date();
    const fechaLegible = ahora.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const respuestasDetalladas: RespuestaEvaluacionDetalle[] = activeQuizQuestions.map((q) => {
      const userAns = finalAnswers.find((a) => a.questionId === q.id);
      const selIdx = userAns ? userAns.selectedOption : -1;
      const isOk = userAns ? userAns.isCorrect : false;

      return {
        preguntaId: q.id,
        pregunta: q.pregunta,
        categoria: q.categoria || 'Reglamento',
        opcionSeleccionada: selIdx,
        textoOpcionSeleccionada: selIdx >= 0 ? q.opciones[selIdx] : 'Sin responder',
        opcionCorrecta: q.respuestaCorrecta,
        textoOpcionCorrecta: q.opciones[q.respuestaCorrecta],
        esCorrecta: isOk,
        articuloReferencia: q.refuerzoPedagogico?.articuloReferencia,
        explicacion: q.refuerzoPedagogico?.porQueEsCorrecta || q.explicacion
      };
    });

    const modoTexto =
      quizMode === 'completo'
        ? 'Prueba Completa (12 Casos)'
        : quizMode === 'derechos_deberes'
        ? 'Módulo Derechos y Deberes'
        : 'Módulo Faltas y Debido Proceso';

    const aprendizGuardado: EvaluacionAprendizData = { ...datosAprendiz };
    setUltimoAprendizEvaluado(aprendizGuardado);

    const nuevoRegistro: RegistroEvaluacion = {
      id: `eval-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      fechaISO: ahora.toISOString(),
      fechaLegible,
      aprendiz: aprendizGuardado,
      modoPrueba: modoTexto,
      puntaje: finalScore,
      totalPreguntas: total,
      porcentaje,
      estado,
      duracionSegundos,
      respuestas: respuestasDetalladas
    };

    setLastSavedEvaluationId(nuevoRegistro.id);

    // 1. Guardar en estado local y LocalStorage
    setRepositorio((prev) => [nuevoRegistro, ...prev]);

    // 2. Guardar en Servidor Backend Express (/api/evaluaciones)
    try {
      await fetch('/api/evaluaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoRegistro)
      });
    } catch (err) {
      console.error('Error enviando evaluación al servidor:', err);
    }

    // 3. Limpiar los campos del formulario tras guardar y enviar la información
    setDatosAprendiz({
      nombre: '',
      tipoDocumento: 'Cédula de Ciudadanía',
      numeroDocumento: '',
      correo: '',
      regional: 'Distrito Capital',
      centroFormacion: '',
      programaFormacion: '',
      ficha: ''
    });

    setQuizState('finalizado');
    
    // Simular cierre de perfil
    setActiveSubTab('normas');
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuizIdx + 1 < activeQuizQuestions.length) {
      setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
      finalizeAndSaveQuiz(score, userAnswers);
    }
  };

  const resetQuiz = (onlyErrors = false) => {
    if (onlyErrors) {
      setReviewOnlyErrors(true);
      setCurrentQuizIdx(0);
      setSelectedOption(null);
      setShowExplanation(false);
      setQuizState('evaluando');
    } else {
      setReviewOnlyErrors(false);
      setUserAnswers([]);
      setScore(0);
      setStreak(0);
      setQuizState('registro');
    }
  };

  // Eliminar un registro del repositorio
  const handleDeleteEvaluation = async (id: string) => {
    if (!window.confirm('¿Deseas eliminar este registro de evaluación del repositorio?')) return;
    setRepositorio((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/evaluaciones/${id}`, { method: 'DELETE' });
    } catch (e) {}
  };

  // Exportar Repositorio a Excel / CSV
  const handleExportCSV = () => {
    if (repositorio.length === 0) {
      alert('No hay evaluaciones registradas para exportar.');
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

    const rows = repositorio.map((reg) => [
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
    link.setAttribute(
      'download',
      `sena_evaluaciones_reglamento_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Exportar Repositorio a JSON
  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(repositorio, null, 2))}`;
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `sena_repositorio_evaluaciones_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Métricas del Repositorio
  const repoStats = useMemo(() => {
    const total = repositorio.length;
    if (total === 0) return { total: 0, excelencia: 0, aprobado: 0, refuerzo: 0, promedio: 0 };
    const excelencia = repositorio.filter((r) => r.estado === 'Aprobado con Excelencia').length;
    const aprobado = repositorio.filter((r) => r.estado === 'Aprobado').length;
    const refuerzo = repositorio.filter((r) => r.estado === 'Requiere Refuerzo').length;
    const promedio = Math.round(repositorio.reduce((acc, r) => acc + r.porcentaje, 0) / total);
    return { total, excelencia, aprobado, refuerzo, promedio };
  }, [repositorio]);

  // Filtro del Repositorio
  const filteredRepo = useMemo(() => {
    return repositorio.filter((item) => {
      const matchStatus = filtroEstadoRepo === 'Todos' || item.estado === filtroEstadoRepo;
      const term = searchRepo.toLowerCase();
      const matchSearch =
        item.aprendiz.nombre.toLowerCase().includes(term) ||
        item.aprendiz.numeroDocumento.toLowerCase().includes(term) ||
        item.aprendiz.ficha.toLowerCase().includes(term) ||
        item.aprendiz.programaFormacion.toLowerCase().includes(term);
      return matchStatus && matchSearch;
    });
  }, [repositorio, filtroEstadoRepo, searchRepo]);

  return (
    <div className="space-y-8 animate-fadeIn py-4">
      {/* Banner Encabezado Principal */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-emerald-800/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-60 h-60 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5 shadow-sm">
                <Shield className="w-3.5 h-3.5" />
                <span>Acuerdo 0009 de 2024 (5 de Noviembre)</span>
              </span>
              <span className="bg-white/10 text-slate-200 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                Nuevo Reglamento del Aprendiz SENA
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Módulo de Evaluación y Repositorio Institucional
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Registra los datos básicos de los aprendices, realiza la prueba interactiva con aspectos visuales y
              refuerzo pedagógico inmediato, y consolida las respuestas en el repositorio central de calificaciones.
            </p>
          </div>

          {/* Selector de Sub-Pestañas */}
          <div className="flex flex-wrap gap-1.5 bg-black/30 p-1.5 rounded-2xl backdrop-blur-md border border-white/15 shrink-0">
            <button
              onClick={() => setActiveSubTab('normas')}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'normas'
                  ? 'bg-white text-emerald-950 shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Derechos y Deberes</span>
            </button>

            <button
              onClick={() => setActiveSubTab('quiz')}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'quiz'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Simulador / Evaluación</span>
            </button>

            <button
              onClick={() => setActiveSubTab('proceso')}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'proceso'
                  ? 'bg-white text-emerald-950 shadow-md scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Scale className="w-4 h-4 text-emerald-700" />
              <span>Debido Proceso</span>
            </button>

            <button
              onClick={() => setActiveSubTab('repositorio')}
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeSubTab === 'repositorio'
                  ? 'bg-emerald-400 text-emerald-950 shadow-md font-black scale-102'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Repositorio</span>
              <span className="bg-black/40 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {repositorio.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VISTA 1: EXPLORADOR DE DERECHOS Y DEBERES                                 */}
      {/* ========================================================================= */}
      {activeSubTab === 'normas' && (
        <div className="space-y-6">
          {/* Barra de Filtros, Dimensiones y Búsqueda */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 no-scrollbar">
                {tipos.map((tipo) => (
                  <button
                    key={tipo}
                    onClick={() => setSelectedTipo(tipo)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                      selectedTipo === tipo
                        ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/30'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{tipo}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      viewMode === 'cards' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tarjetas</span>
                  </button>
                  <button
                    onClick={() => setViewMode('matrix')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      viewMode === 'matrix' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Matriz Derecho ↔ Deber</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Fila secundaria: Buscador y Filtro por Dimensión */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar text-xs">
                <span className="text-slate-400 font-medium flex items-center space-x-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Dimensión:</span>
                </span>
                {categorias.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoria(cat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategoria === cat
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-80 relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por derecho, deber, artículo o caso..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-inner"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* VISTA 1.A: CUADRÍCULA DE TARJETAS */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => {
                const isDerecho = item.tipo === 'Derecho';
                const isDeber = item.tipo === 'Deber';
                const isProhibicion = item.tipo === 'Prohibición';
                const isEstimulo = item.tipo === 'Estímulo';

                let badgeColor = 'bg-slate-100 text-slate-800 border-slate-200';
                let cardAccent = 'hover:border-emerald-400';
                if (isDerecho) {
                  badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                  cardAccent = 'hover:border-emerald-400 hover:shadow-emerald-100/50';
                } else if (isDeber) {
                  badgeColor = 'bg-blue-50 text-blue-800 border-blue-200';
                  cardAccent = 'hover:border-blue-400 hover:shadow-blue-100/50';
                } else if (isProhibicion) {
                  badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
                  cardAccent = 'hover:border-rose-400 hover:shadow-rose-100/50';
                } else if (isEstimulo) {
                  badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
                  cardAccent = 'hover:border-amber-400 hover:shadow-amber-100/50';
                }

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm transition-all duration-200 flex flex-col justify-between hover:shadow-md ${cardAccent}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                          {item.tipo} {item.gravedad ? `• ${item.gravedad}` : ''}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                          {item.articulo}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">{item.titulo}</h3>

                      <p className="text-slate-600 text-xs leading-relaxed">{item.descripcion}</p>

                      {item.ejemploPractico && (
                        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-xs space-y-1">
                          <div className="flex items-center space-x-1 text-emerald-700 font-bold text-[11px]">
                            <Lightbulb className="w-3.5 h-3.5 shrink-0" />
                            <span>En la vida real del SENA:</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed pl-4">{item.ejemploPractico}</p>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => setSelectedItemModal(item)}
                        className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center space-x-1 text-[11px] hover:underline"
                      >
                        <span>Ver detalle y normas</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[10px] text-slate-400 font-medium">Acuerdo 0009/2024</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VISTA 1.B: MATRIZ CORRELATIVA */}
          {viewMode === 'matrix' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="max-w-2xl space-y-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
                  Pedagogía Correlativa del SENA
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  Por cada Derecho Formativo existe una Responsabilidad Ciudadana
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  El nuevo Acuerdo 0009 de 2024 enfatiza que la formación integral se construye en doble vía: el SENA
                  garantiza tus derechos de calidad y debido proceso, mientras el aprendiz asume con ética y disciplina sus
                  deberes formativos.
                </p>
              </div>

              <div className="space-y-4">
                {ACUERDO_0009_COMPLETO.derechos.map((der, idx) => {
                  const correlativo = ACUERDO_0009_COMPLETO.deberes[idx] || ACUERDO_0009_COMPLETO.deberes[0];
                  return (
                    <div
                      key={der.id}
                      className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 transition-all grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                    >
                      <div className="space-y-2 bg-emerald-50/70 p-4 rounded-xl border border-emerald-200/80">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-700 text-white px-2 py-0.5 rounded">
                            Tu Derecho Garantizado
                          </span>
                          <span className="text-xs font-bold text-emerald-900 font-mono">{der.articulo}</span>
                        </div>
                        <h4 className="text-sm font-bold text-emerald-950">{der.titulo}</h4>
                        <p className="text-xs text-emerald-900/80 leading-relaxed">{der.descripcion}</p>
                      </div>

                      <div className="space-y-2 bg-blue-50/70 p-4 rounded-xl border border-blue-200/80">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-700 text-white px-2 py-0.5 rounded">
                            Tu Deber Correlativo
                          </span>
                          <span className="text-xs font-bold text-blue-900 font-mono">{correlativo.articulo}</span>
                        </div>
                        <h4 className="text-sm font-bold text-blue-950">{correlativo.titulo}</h4>
                        <p className="text-xs text-blue-900/80 leading-relaxed">
                          {correlativo.deberCorrelativo || correlativo.descripcion}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 2: SIMULADOR DE CONOCIMIENTOS CON PANTALLA PREVIA Y REPOSITORIO     */}
      {/* ========================================================================= */}
      {activeSubTab === 'quiz' && (
        <div className="max-w-4xl mx-auto space-y-6">

          {/* --------------------------------------------------------------------- */}
          {/* ESTADO 1: PANTALLA PREVIA DE REGISTRO E IDENTIFICACIÓN DEL APRENDIZ   */}
          {/* --------------------------------------------------------------------- */}
          {quizState === 'registro' && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-8 animate-fadeIn">
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Paso Previo • Registro de Evaluación Oficial</span>
                  </span>
                  <button
                    onClick={() => setActiveSubTab('repositorio')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center space-x-1 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-all"
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>Ver Repositorio ({repositorio.length})</span>
                  </button>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  Identificación del Aprendiz para la Evaluación
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Para guardar y certificar tu evaluación en el <strong>Repositorio Institucional de Aprendices</strong>,
                  verifica tus datos básicos antes de iniciar. Esta información quedará vinculada a tus respuestas y a tu
                  comprobante de inducción.
                </p>
              </div>

              {formError && (
                <div className="bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold p-4 rounded-2xl flex items-center space-x-2 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {limpiadoNoticia && (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-3 rounded-2xl flex items-center justify-between shadow-xs animate-fadeIn text-xs">
                  <div className="flex items-center space-x-2 font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Los campos del formulario han sido limpiados exitosamente para un nuevo registro.</span>
                  </div>
                  <button onClick={() => setLimpiadoNoticia(false)} className="text-emerald-700 hover:text-emerald-900 font-bold">
                    ✕
                  </button>
                </div>
              )}

              {/* Formulario de Datos Básicos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Nombre y Apellidos del Aprendiz *</span>
                  </label>
                  <input
                    type="text"
                    value={datosAprendiz.nombre}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, nombre: e.target.value })}
                    placeholder="Ej. Viviana Ospina Holguín"
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Tipo de Documento *</label>
                  <select
                    value={datosAprendiz.tipoDocumento}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, tipoDocumento: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Cédula de Ciudadanía">Cédula de Ciudadanía (C.C.)</option>
                    <option value="Tarjeta de Identidad">Tarjeta de Identidad (T.I.)</option>
                    <option value="Cédula de Extranjería">Cédula de Extranjería (C.E.)</option>
                    <option value="Permiso por Protección Temporal">Permiso por Protección Temporal (PPT)</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Número de Documento *</label>
                  <input
                    type="text"
                    value={datosAprendiz.numeroDocumento}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, numeroDocumento: e.target.value })}
                    placeholder="Ej. 1020304050"
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Correo Electrónico Institucional / Personal</label>
                  <input
                    type="email"
                    value={datosAprendiz.correo}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, correo: e.target.value })}
                    placeholder="Ej. aprendiz@soy.sena.edu.co"
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Regional SENA</label>
                  <select
                    value={datosAprendiz.regional}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, regional: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    {REGIONALES_SENA.map((r) => (
                      <option key={r.id} value={r.nombre}>
                        Regional {r.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Centro de Formación</label>
                  <input
                    type="text"
                    value={datosAprendiz.centroFormacion}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, centroFormacion: e.target.value })}
                    placeholder="Ej. Centro de Gestión de Mercados / CTMA"
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Programa de Formación</label>
                  <input
                    type="text"
                    value={datosAprendiz.programaFormacion}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, programaFormacion: e.target.value })}
                    placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Número de Ficha de Formación</label>
                  <input
                    type="text"
                    value={datosAprendiz.ficha}
                    onChange={(e) => setDatosAprendiz({ ...datosAprendiz, ficha: e.target.value })}
                    placeholder="Ej. 2874912"
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Selector del Modo de la Prueba */}
              <div className="space-y-3 pt-2">
                <label className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                  Selecciona el Modo de Evaluación a Realizar:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setQuizMode('completo')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      quizMode === 'completo'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Evaluación Completa</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${quizMode === 'completo' ? 'text-emerald-700' : 'text-slate-300'}`}
                      />
                    </div>
                    <span className="text-[11px] text-slate-600 block">12 Casos reales de inducción</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuizMode('derechos_deberes')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      quizMode === 'derechos_deberes'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Derechos y Deberes</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${quizMode === 'derechos_deberes' ? 'text-emerald-700' : 'text-slate-300'}`}
                      />
                    </div>
                    <span className="text-[11px] text-slate-600 block">6 Casos de compromisos formativos</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setQuizMode('faltas_proceso')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      quizMode === 'faltas_proceso'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">Faltas y Debido Proceso</span>
                      <CheckCircle2
                        className={`w-4 h-4 ${quizMode === 'faltas_proceso' ? 'text-emerald-700' : 'text-slate-300'}`}
                      />
                    </div>
                    <span className="text-[11px] text-slate-600 block">6 Casos disciplinarios y comités</span>
                  </button>
                </div>
              </div>

              {/* Reglas de la prueba */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                <span className="font-bold text-slate-800 flex items-center space-x-1.5">
                  <Info className="w-4 h-4 text-emerald-700" />
                  <span>Condiciones de la Evaluación Oficial:</span>
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-5 list-disc text-[11px]">
                  <li>Calificación mínima aprobatoria: <strong>70%</strong>.</li>
                  <li>Reconocimiento de Excelencia: <strong>80% o superior</strong>.</li>
                  <li>Retroalimentación pedagógica y normativa inmediata en cada pregunta.</li>
                  <li>Registro automático en el <strong>Repositorio Oficial de Evaluaciones</strong>.</li>
                </ul>
              </div>

              {/* Botón de Inicio y Limpieza */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('normas')}
                  className="text-xs text-slate-500 hover:text-slate-800 font-bold"
                >
                  ← Regresar al Explorador de Normas
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleResetDatosAprendiz}
                    className="w-full sm:w-auto text-xs text-slate-600 hover:text-slate-900 font-bold px-4 py-3 rounded-2xl hover:bg-slate-100 transition-colors flex items-center justify-center space-x-1.5 border border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                    <span>Limpiar Campos</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleStartEvaluation}
                    className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-8 py-3.5 rounded-2xl text-xs sm:text-sm shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center space-x-2 hover:scale-102"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Comenzar Evaluación Oficial</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* ESTADO 2: PRUEBA ACTIVA / EVALUANDO                                   */}
          {/* --------------------------------------------------------------------- */}
          {quizState === 'evaluando' && currentQuestion && (
            <div className="space-y-4">
              {/* Barra superior con datos del aprendiz activo */}
              <div className="bg-emerald-950 text-emerald-100 rounded-2xl px-5 py-3 border border-emerald-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center">
                    {datosAprendiz.nombre.charAt(0) || 'A'}
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block">
                      Aprendiz: {datosAprendiz.nombre}
                    </span>
                    <span className="text-[11px] text-emerald-300">
                      Doc: {datosAprendiz.tipoDocumento} {datosAprendiz.numeroDocumento} • Ficha: {datosAprendiz.ficha || 'Inducción'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {streak > 1 && (
                    <span className="flex items-center space-x-1 font-extrabold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30">
                      <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Racha: {streak}</span>
                    </span>
                  )}
                  <span className="bg-emerald-800/80 font-bold px-3 py-1 rounded-lg text-emerald-100 border border-emerald-600/40">
                    Puntos: {score} / {activeQuizQuestions.length}
                  </span>
                  <button
                    onClick={() => resetQuiz(false)}
                    className="text-[11px] text-emerald-300 hover:text-white underline ml-2"
                  >
                    Salir
                  </button>
                </div>
              </div>

              {/* Tarjeta de Pregunta */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
                {/* Progreso */}
                <div className="space-y-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2.5 py-0.5 rounded-md">
                        Caso {currentQuizIdx + 1} de {activeQuizQuestions.length}
                      </span>
                      {currentQuestion.categoria && (
                        <span className="font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {currentQuestion.categoria}
                        </span>
                      )}
                      {currentQuestion.dificultad && (
                        <span className="font-medium text-slate-400">
                          • Nivel {currentQuestion.dificultad}
                        </span>
                      )}
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {Math.round(((currentQuizIdx + 1) / activeQuizQuestions.length) * 100)}%
                    </span>
                  </div>

                  {/* Barra interactiva */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                    {activeQuizQuestions.map((q, qIdx) => {
                      const answered = userAnswers.find((a) => a.questionId === q.id);
                      let color = 'bg-transparent';
                      if (answered) {
                        color = answered.isCorrect ? 'bg-emerald-500' : 'bg-rose-500';
                      } else if (qIdx === currentQuizIdx) {
                        color = 'bg-amber-400 animate-pulse';
                      }
                      return (
                        <div
                          key={q.id}
                          className={`h-full border-r border-white/50 transition-all ${color}`}
                          style={{ width: `${100 / activeQuizQuestions.length}%` }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Caso Real */}
                {currentQuestion.situacionCaso && (
                  <div className="bg-slate-50 border-l-4 border-emerald-600 rounded-2xl p-5 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                      <BookMarked className="w-4 h-4 text-emerald-700" />
                      <span>Situación / Caso Cotidiano en el SENA:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {currentQuestion.situacionCaso}
                    </p>
                  </div>
                )}

                {/* Pregunta */}
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {currentQuestion.pregunta}
                  </h3>

                  {/* Opciones */}
                  <div className="space-y-3 pt-2">
                    {currentQuestion.opciones.map((opcion, idx) => {
                      let containerStyle =
                        'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100/80';
                      let iconNode = (
                        <div className="w-7 h-7 rounded-xl bg-slate-200/80 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </div>
                      );

                      if (selectedOption !== null) {
                        if (idx === currentQuestion.respuestaCorrecta) {
                          containerStyle =
                            'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold animate-pop-success animate-pulse-success shadow-sm';
                          iconNode = (
                            <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                              <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                          );
                        } else if (idx === selectedOption) {
                          containerStyle =
                            'bg-rose-50 border-rose-400 text-rose-950 font-bold animate-shake animate-pulse-error shadow-sm';
                          iconNode = (
                            <div className="w-7 h-7 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                              <XCircle className="w-4 h-4 stroke-[3]" />
                            </div>
                          );
                        } else {
                          containerStyle = 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleAnswerSelect(idx)}
                          disabled={selectedOption !== null}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all text-xs sm:text-sm flex items-center justify-between gap-3 ${containerStyle}`}
                        >
                          <div className="flex items-center space-x-3.5">
                            {iconNode}
                            <span className="leading-relaxed">{opcion}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Retroalimentación Formativa */}
                {showExplanation && (
                  <div className="space-y-4 pt-2 animate-fadeIn">
                    {selectedOption === currentQuestion.respuestaCorrecta ? (
                      /* Aspecto Positivo */
                      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100 border-2 border-emerald-400 rounded-3xl p-6 shadow-md space-y-4 animate-pop-success">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 shrink-0">
                              <Sparkles className="w-6 h-6 text-emerald-100" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-black uppercase tracking-wider bg-emerald-700 text-white px-2.5 py-0.5 rounded-full">
                                  ¡Respuesta Correcta!
                                </span>
                                <span className="text-xs font-bold text-emerald-800">+100 Puntos</span>
                              </div>
                              <h4 className="text-base font-black text-emerald-950 mt-1">
                                Excelente análisis del marco normativo
                              </h4>
                            </div>
                          </div>

                          <button
                            onClick={handleNextQuestion}
                            className="hidden sm:flex items-center space-x-2 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3 rounded-2xl text-xs font-extrabold shadow-md transition-all shrink-0 hover:scale-102"
                          >
                            <span>
                              {currentQuizIdx + 1 < activeQuizQuestions.length ? 'Siguiente Caso' : 'Guardar y Ver Resultados'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2 bg-white/80 backdrop-blur-xs rounded-2xl p-4 border border-emerald-200">
                          <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
                            {currentQuestion.refuerzoPedagogico?.porQueEsCorrecta || currentQuestion.explicacion}
                          </p>

                          {currentQuestion.refuerzoPedagogico?.articuloReferencia && (
                            <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-emerald-800 font-semibold">
                              <span className="bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 font-mono">
                                📜 {currentQuestion.refuerzoPedagogico.articuloReferencia}
                              </span>
                              {currentQuestion.refuerzoPedagogico.conceptoClave && (
                                <span className="text-emerald-900">
                                  💡 <strong>Clave:</strong> {currentQuestion.refuerzoPedagogico.conceptoClave}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={handleNextQuestion}
                          className="sm:hidden w-full flex items-center justify-center space-x-2 bg-emerald-800 text-white py-3 rounded-xl text-xs font-bold shadow-md"
                        >
                          <span>
                            {currentQuizIdx + 1 < activeQuizQuestions.length ? 'Siguiente Caso' : 'Guardar y Ver Resultados'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      /* Aspecto Negativo + Refuerzo Pedagógico */
                      <div className="bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 border-2 border-rose-300 rounded-3xl p-6 shadow-md space-y-4 animate-pop-success">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 shrink-0">
                              <AlertTriangle className="w-6 h-6 text-rose-100" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-black uppercase tracking-wider bg-rose-700 text-white px-2.5 py-0.5 rounded-full">
                                  Oportunidad de Aprendizaje
                                </span>
                                <span className="text-xs font-bold text-rose-800">Revisa la norma oficial</span>
                              </div>
                              <h4 className="text-base font-black text-rose-950 mt-1">
                                Refuerzo Pedagógico: ¿Dónde estuvo tu error?
                              </h4>
                            </div>
                          </div>

                          <button
                            onClick={handleNextQuestion}
                            className="hidden sm:flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl text-xs font-extrabold shadow-md transition-all shrink-0 hover:scale-102"
                          >
                            <span>
                              {currentQuizIdx + 1 < activeQuizQuestions.length ? 'Continuar Formación' : 'Guardar y Ver Resultados'}
                            </span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-5 border border-rose-200/80 space-y-4">
                          {/* 1. Diagnóstico */}
                          <div className="space-y-1">
                            <span className="text-[11px] font-extrabold text-rose-700 uppercase tracking-wider flex items-center space-x-1">
                              <HelpCircle className="w-3.5 h-3.5" />
                              <span>1. Análisis de tu respuesta:</span>
                            </span>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-4">
                              {currentQuestion.refuerzoPedagogico?.porQueOcurrioElError ||
                                'Marcaste una opción que difiere de la normatividad vigente del Acuerdo 0009 de 2024.'}
                            </p>
                          </div>

                          {/* 2. Regla oficial */}
                          <div className="space-y-1 pt-2 border-t border-slate-100">
                            <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider flex items-center space-x-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>2. La regla oficial del Acuerdo 0009 de 2024:</span>
                            </span>
                            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-semibold pl-4">
                              {currentQuestion.refuerzoPedagogico?.porQueEsCorrecta || currentQuestion.explicacion}
                            </p>
                          </div>

                          {/* 3. Artículo y Tip */}
                          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            {currentQuestion.refuerzoPedagogico?.articuloReferencia && (
                              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900">
                                <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-700">
                                  Fundamento Normativo:
                                </span>
                                <span className="font-mono text-xs font-bold">
                                  {currentQuestion.refuerzoPedagogico.articuloReferencia}
                                </span>
                              </div>
                            )}

                            {currentQuestion.refuerzoPedagogico?.tipFormativo && (
                              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-amber-900">
                                <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-700">
                                  💡 Tip para tu vida en el SENA:
                                </span>
                                <span className="text-xs leading-snug">
                                  {currentQuestion.refuerzoPedagogico.tipFormativo}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={handleNextQuestion}
                          className="sm:hidden w-full flex items-center justify-center space-x-2 bg-slate-900 text-white py-3 rounded-xl text-xs font-bold shadow-md"
                        >
                          <span>
                            {currentQuizIdx + 1 < activeQuizQuestions.length ? 'Continuar Formación' : 'Guardar y Ver Resultados'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --------------------------------------------------------------------- */}
          {/* ESTADO 3: PANTALLA DE RESULTADOS Y CONFIRMACIÓN DE GUARDADO           */}
          {/* --------------------------------------------------------------------- */}
          {quizState === 'finalizado' && (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md text-center space-y-8 animate-fadeIn">
              {/* Notificación de guardado en el repositorio */}
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="font-black text-emerald-950 block">
                      ¡Evaluación guardada exitosamente en el Repositorio!
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      Aprendiz: {ultimoAprendizEvaluado?.nombre || datosAprendiz.nombre || 'Aprendiz'} • Documento: {ultimoAprendizEvaluado?.numeroDocumento || datosAprendiz.numeroDocumento} • ID: {lastSavedEvaluationId}
                    </span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">
                      ✓ Los campos del formulario han sido limpiados para el próximo registro.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSubTab('repositorio')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-xs transition-colors shrink-0"
                >
                  Ver en Repositorio
                </button>
              </div>

              {score >= Math.ceil(activeQuizQuestions.length * 0.75) ? (
                <div className="space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/30 animate-bounce">
                    <Award className="w-12 h-12" />
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    ¡Competencia Normativa Aprobada con Honores!
                  </span>
                  <h3 className="text-3xl font-black text-slate-900">
                    ¡Felicitaciones, {ultimoAprendizEvaluado?.nombre || datosAprendiz.nombre || 'Aprendiz'}!
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                    Has demostrado una comprensión sólida de tus derechos fundamentales, tus deberes como aprendiz y las
                    garantías del debido proceso según el Acuerdo 0009 de 2024.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
                    <Lightbulb className="w-12 h-12" />
                  </div>
                  <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Refuerzo Pedagógico Recomendado
                  </span>
                  <h3 className="text-3xl font-black text-slate-900">
                    Buen esfuerzo en tu proceso de Inducción, {ultimoAprendizEvaluado?.nombre || datosAprendiz.nombre || 'Aprendiz'}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                    El reglamento es tu guía para una formación exitosa y sin contratiempos. Te sugerimos revisar las
                    preguntas donde tuviste dudas para consolidar tu conocimiento institucional.
                  </p>
                </div>
              )}

              {/* Métricas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Puntaje Final</span>
                  <p className="text-3xl font-black text-emerald-700 mt-1">
                    {score} / {activeQuizQuestions.length}
                  </p>
                  <span className="text-[11px] font-bold text-slate-500">
                    {Math.round((score / activeQuizQuestions.length) * 100)}% de aciertos
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Mejor Racha</span>
                  <p className="text-3xl font-black text-amber-600 mt-1">
                    🔥 {maxStreak}
                  </p>
                  <span className="text-[11px] font-bold text-slate-500">aciertos consecutivos</span>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Para Reforzar</span>
                  <p className="text-3xl font-black text-rose-600 mt-1">
                    {userAnswers.filter((a) => !a.isCorrect).length}
                  </p>
                  <span className="text-[11px] font-bold text-slate-500">temas a repasar</span>
                </div>
              </div>

              {/* Resumen de Preguntas Falladas */}
              {userAnswers.filter((a) => !a.isCorrect).length > 0 && (
                <div className="text-left max-w-2xl mx-auto bg-rose-50/60 border border-rose-200 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Resumen de Refuerzo de Casos donde Hubo Error:</span>
                  </div>
                  <div className="space-y-3">
                    {userAnswers
                      .filter((a) => !a.isCorrect)
                      .map((ans) => {
                        const question = activeQuizQuestions.find((q) => q.id === ans.questionId);
                        if (!question) return null;
                        return (
                          <div key={question.id} className="bg-white p-4 rounded-2xl border border-rose-200 space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">
                                Caso #{question.id}: {question.categoria}
                              </span>
                              <span className="font-mono text-[11px] text-emerald-700 font-bold">
                                {question.refuerzoPedagogico?.articuloReferencia || 'Acuerdo 0009/2024'}
                              </span>
                            </div>
                            <p className="text-slate-600 font-medium">{question.pregunta}</p>
                            <p className="text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-semibold leading-relaxed">
                              ✅ <strong>Respuesta correcta:</strong> {question.opciones[question.respuestaCorrecta]}
                            </p>
                            {question.refuerzoPedagogico?.tipFormativo && (
                              <p className="text-amber-800 bg-amber-50 p-2 rounded-lg text-[11px]">
                                💡 <strong>Tip pedagógico:</strong> {question.refuerzoPedagogico.tipFormativo}
                              </p>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Botones de Acción */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                {userAnswers.filter((a) => !a.isCorrect).length > 0 && (
                  <button
                    onClick={() => resetQuiz(true)}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Repetir solo casos donde me equivoqué</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    const saved = repositorio.find((r) => r.id === lastSavedEvaluationId);
                    if (saved) setSelectedCertificateModal(saved);
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center space-x-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Ver Certificado de Inducción</span>
                </button>

                <button
                  onClick={() => {
                    handleResetDatosAprendiz();
                    resetQuiz(false);
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-2xl text-xs transition-all flex items-center space-x-2"
                >
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Evaluar a Otro Aprendiz (Campos Limpios)</span>
                </button>

                <button
                  onClick={() => setActiveSubTab('repositorio')}
                  className="bg-emerald-900 hover:bg-emerald-950 text-white font-bold px-6 py-3 rounded-2xl text-xs shadow-md transition-all flex items-center space-x-2"
                >
                  <History className="w-4 h-4" />
                  <span>Ir al Repositorio de Calificaciones</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 3: RUTA DEL DEBIDO PROCESO                                          */}
      {/* ========================================================================= */}
      {activeSubTab === 'proceso' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 text-emerald-800">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Capítulo VIII</span>
                <h3 className="text-2xl font-black text-slate-900">
                  Ruta del Debido Proceso y Comité de Evaluación
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El Acuerdo 0009 de 2024 garantiza que ningún aprendiz puede ser sancionado de manera arbitraria o inmediata.
              Toda actuación académica o disciplinaria debe surtir estrictamente el conducto regular, asegurando tu derecho
              constitucional a la defensa, la contradicción probatoria y la doble instancia.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              {ACUERDO_0009_COMPLETO.debidoProceso.principiosGarantizados.map((principio, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-50 text-emerald-900 border border-emerald-200 text-[11px] font-bold px-3 py-1 rounded-full flex items-center space-x-1"
                >
                  <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{principio}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {ACUERDO_0009_COMPLETO.debidoProceso.etapas.map((etapa) => (
              <div
                key={etapa.paso}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:border-emerald-300 transition-all flex flex-col sm:flex-row items-start gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                  0{etapa.paso}
                </div>

                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-900">{etapa.nombre}</h4>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl font-mono">
                      ⏱️ Plazo: {etapa.plazo}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{etapa.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VISTA 4: REPOSITORIO DE EVALUACIONES (ALMACENAMIENTO DE RESPUESTAS)        */}
      {/* ========================================================================= */}
      {activeSubTab === 'repositorio' && (
        <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn">
          {/* Tarjeta de Encabezado y Estadísticas del Repositorio */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                    Repositorio Oficial de Calificaciones
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Acuerdo 0009 de 2024</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900">
                  Registro de Evaluaciones y Respuestas de Aprendices
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  Repositorio central donde se almacenan con persistencia local y sincronización de servidor todos los
                  intentos de evaluación, respuestas detalladas y diagnósticos normativos para control de instructores y
                  aprendices.
                </p>
              </div>

              {/* Botones de Exportación */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleExportCSV}
                  className="flex items-center space-x-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                  title="Exportar archivo compatible con Microsoft Excel"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Exportar Excel (CSV)</span>
                </button>

                </div>
            </div>

            {/* Tarjetas de Métricas Rápidas */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Total Pruebas</span>
                <span className="text-2xl font-black text-slate-900">{repoStats.total}</span>
              </div>
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">Excelencia (≥80%)</span>
                <span className="text-2xl font-black text-emerald-800">{repoStats.excelencia}</span>
              </div>
              <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 text-center">
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">Aprobados (≥70%)</span>
                <span className="text-2xl font-black text-blue-800">{repoStats.aprobado}</span>
              </div>
              <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 text-center">
                <span className="text-[10px] uppercase font-bold text-rose-700 tracking-wider block">Refuerzo (&lt;70%)</span>
                <span className="text-2xl font-black text-rose-800">{repoStats.refuerzo}</span>
              </div>
              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider block">Promedio General</span>
                <span className="text-2xl font-black text-amber-800">{repoStats.promedio}%</span>
              </div>
            </div>

            {/* Barra de Filtros y Búsqueda */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar text-xs">
                <span className="text-slate-400 font-semibold mr-1">Filtrar:</span>
                {['Todos', 'Aprobado con Excelencia', 'Aprobado', 'Requiere Refuerzo'].map((estado) => (
                  <button
                    key={estado}
                    onClick={() => setFiltroEstadoRepo(estado)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                      filtroEstadoRepo === estado
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {estado}
                  </button>
                ))}
              </div>

              <div className="w-full sm:w-72 relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchRepo}
                  onChange={(e) => setSearchRepo(e.target.value)}
                  placeholder="Buscar por aprendiz, cédula o ficha..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Tabla de Registros de Evaluación */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {filteredRepo.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold text-[10px]">
                    <tr>
                      <th className="py-4 px-6">Aprendiz / Correo</th>
                      <th className="py-4 px-4">Documento</th>
                      <th className="py-4 px-4">Ficha & Programa</th>
                      <th className="py-4 px-4">Fecha & Hora</th>
                      <th className="py-4 px-4">Modo</th>
                      <th className="py-4 px-4 text-center">Puntaje</th>
                      <th className="py-4 px-4 text-center">Estado</th>
                      <th className="py-4 px-6 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRepo.map((reg) => {
                      const isExcelencia = reg.estado === 'Aprobado con Excelencia';
                      const isAprobado = reg.estado === 'Aprobado';
                      let statusBadge = 'bg-rose-100 text-rose-800 border-rose-300';
                      if (isExcelencia) statusBadge = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                      else if (isAprobado) statusBadge = 'bg-blue-100 text-blue-800 border-blue-300';

                      return (
                        <tr key={reg.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-bold text-slate-900 block text-xs">{reg.aprendiz.nombre}</span>
                            <span className="text-[11px] text-slate-500">{reg.aprendiz.correo || 'Sin correo registrado'}</span>
                          </td>
                          <td className="py-4 px-4 font-mono font-medium text-slate-700">
                            <span className="text-[10px] text-slate-400 block">{reg.aprendiz.tipoDocumento}</span>
                            <span>{reg.aprendiz.numeroDocumento}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-slate-800 block text-[11px]">
                              Ficha: {reg.aprendiz.ficha || 'Inducción'}
                            </span>
                            <span className="text-[10px] text-slate-500 block truncate max-w-xs">
                              {reg.aprendiz.programaFormacion || 'Formación SENA'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                            {reg.fechaLegible}
                          </td>
                          <td className="py-4 px-4 text-slate-600 text-[11px]">
                            {reg.modoPrueba}
                          </td>
                          <td className="py-4 px-4 text-center font-bold">
                            <span className="text-sm font-black text-slate-900 block">
                              {reg.puntaje} / {reg.totalPreguntas}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">
                              {reg.porcentaje}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${statusBadge}`}>
                              {reg.estado}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => setSelectedEvaluationDetail(reg)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                                title="Ver respuestas detalladas"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setSelectedCertificateModal(reg)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-700 transition-colors"
                                title="Ver / Imprimir Certificado de Inducción"
                              >
                                <Award className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEvaluation(reg.id)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                                title="Eliminar registro"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 space-y-4">
                <History className="w-12 h-12 text-slate-300 mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-slate-800">No hay evaluaciones que coincidan con la búsqueda</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Realiza tu primera prueba en el Simulador de Casos para archivar tus respuestas en el repositorio.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveSubTab('quiz');
                    setQuizState('registro');
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors shadow-sm"
                >
                  Iniciar Evaluación Ahora
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DETALLE DE RESPUESTAS ALMACENADAS DE UN APRENDIZ                   */}
      {/* ========================================================================= */}
      {selectedEvaluationDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 animate-pop-success overflow-hidden">
            {/* Cabecera del modal */}
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                    Detalle de Evaluación #{selectedEvaluationDetail.id.slice(0, 14)}
                  </span>
                  <span className="text-xs text-slate-400">{selectedEvaluationDetail.fechaLegible}</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {selectedEvaluationDetail.aprendiz.nombre}
                </h3>
                <p className="text-xs text-slate-600">
                  Doc: {selectedEvaluationDetail.aprendiz.tipoDocumento} {selectedEvaluationDetail.aprendiz.numeroDocumento} • Ficha: {selectedEvaluationDetail.aprendiz.ficha || 'Sin ficha'} • Regional: {selectedEvaluationDetail.aprendiz.regional}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Puntaje</span>
                  <span className="text-lg font-black text-emerald-700">
                    {selectedEvaluationDetail.puntaje} / {selectedEvaluationDetail.totalPreguntas} ({selectedEvaluationDetail.porcentaje}%)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedEvaluationDetail(null)}
                  className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Listado de preguntas respondidas */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Trazabilidad de Respuestas ({selectedEvaluationDetail.respuestas.length} preguntas):
              </div>

              {selectedEvaluationDetail.respuestas.map((resp, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border ${
                    resp.esCorrecta ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      Pregunta #{i + 1}: {resp.categoria}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        resp.esCorrecta
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {resp.esCorrecta ? 'Acierto (+100 pts)' : 'Error'}
                    </span>
                  </div>

                  <p className="text-slate-800 font-medium">{resp.pregunta}</p>

                  <div className="bg-white/80 p-3 rounded-xl border border-slate-100 space-y-1.5 text-[11px]">
                    <p className={resp.esCorrecta ? 'text-emerald-900 font-semibold' : 'text-rose-900 font-semibold'}>
                      <strong>Opción seleccionada por el aprendiz:</strong> {resp.textoOpcionSeleccionada}
                    </p>
                    {!resp.esCorrecta && (
                      <p className="text-emerald-800 font-semibold">
                        ✅ <strong>Respuesta correcta:</strong> {resp.textoOpcionCorrecta}
                      </p>
                    )}
                    {resp.articuloReferencia && (
                      <p className="text-slate-500 font-mono text-[10px] pt-1">
                        📜 <strong>Fundamento:</strong> {resp.articuloReferencia}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pie del modal */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCertificateModal(selectedEvaluationDetail);
                  setSelectedEvaluationDetail(null);
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center space-x-2"
              >
                <Award className="w-4 h-4" />
                <span>Ver Certificado de Inducción</span>
              </button>

              <button
                onClick={() => setSelectedEvaluationDetail(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL CERTIFICADO DIGITAL DE INDUCCIÓN NORMATIVA                          */}
      {/* ========================================================================= */}
      {selectedCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-emerald-700 space-y-6 animate-pop-success text-center relative overflow-hidden">
            {/* Marca de agua decorativa */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full pointer-events-none blur-2xl" />

            <div className="flex items-center justify-between border-b border-emerald-100 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
                  SENA
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Servicio Nacional de Aprendizaje
                  </span>
                  <span className="text-xs font-bold text-slate-500">Dirección de Formación Profesional</span>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                ID: {selectedCertificateModal.id}
              </span>
            </div>

            <div className="space-y-3 py-2">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                Constancia Institucional de Aprobación Normativa
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Certificado de Inducción al Reglamento del Aprendiz
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Conforme al Acuerdo No. 0009 de 2024 (5 de noviembre de 2024)
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-3">
              <p className="text-sm">
                Se hace constar que el aprendiz:
              </p>
              <h3 className="text-xl font-black text-emerald-950 uppercase tracking-wide">
                {selectedCertificateModal.aprendiz.nombre}
              </h3>
              <p className="text-xs text-slate-600">
                Identificado con {selectedCertificateModal.aprendiz.tipoDocumento} No.{' '}
                <strong>{selectedCertificateModal.aprendiz.numeroDocumento}</strong>, matriculado en el programa{' '}
                <strong>{selectedCertificateModal.aprendiz.programaFormacion || 'Formación Titulada'}</strong> (Ficha:{' '}
                <strong>{selectedCertificateModal.aprendiz.ficha || 'Inducción'}</strong>) de la Regional{' '}
                <strong>{selectedCertificateModal.aprendiz.regional}</strong>.
              </p>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-center space-x-6 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Calificación</span>
                  <span className="font-black text-emerald-700 text-sm">
                    {selectedCertificateModal.porcentaje}% ({selectedCertificateModal.puntaje}/{selectedCertificateModal.totalPreguntas})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Estado</span>
                  <span className="font-black text-emerald-800 text-sm">{selectedCertificateModal.estado}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Fecha de Registro</span>
                  <span className="font-bold text-slate-700 text-xs">{selectedCertificateModal.fechaLegible}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-md transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir / Guardar PDF</span>
              </button>

              <button
                onClick={() => setSelectedCertificateModal(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Detalle de Norma */}
      {selectedItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 animate-pop-success">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {selectedItemModal.tipo} {selectedItemModal.gravedad ? `• ${selectedItemModal.gravedad}` : ''}
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">{selectedItemModal.titulo}</h3>
              </div>
              <button
                onClick={() => setSelectedItemModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                <span className="font-bold text-slate-500 block uppercase tracking-wider text-[10px]">
                  Artículo de Referencia:
                </span>
                <p className="font-mono font-bold text-emerald-800 text-sm">{selectedItemModal.articulo}</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Descripción:</span>
                <p className="text-slate-700 leading-relaxed">{selectedItemModal.descripcion}</p>
              </div>

              {selectedItemModal.ejemploPractico && (
                <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-1">
                  <span className="font-bold text-emerald-900 flex items-center space-x-1 text-[11px]">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Ejemplo cotidiano en la formación:</span>
                  </span>
                  <p className="text-emerald-950 leading-relaxed">{selectedItemModal.ejemploPractico}</p>
                </div>
              )}

              {selectedItemModal.deberCorrelativo && (
                <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200 space-y-1">
                  <span className="font-bold text-blue-900 flex items-center space-x-1 text-[11px]">
                    <Scale className="w-3.5 h-3.5 text-blue-700" />
                    <span>Deber correlativo del aprendiz:</span>
                  </span>
                  <p className="text-blue-950 leading-relaxed">{selectedItemModal.deberCorrelativo}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItemModal(null)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
