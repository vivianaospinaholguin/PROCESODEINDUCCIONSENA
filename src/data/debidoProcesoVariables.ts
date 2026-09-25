export interface VariableDebidoProceso {
  id: string;
  numero: number;
  nombre: string;
  icono: string;
  colorTema: {
    bgLight: string;
    border: string;
    text: string;
    badgeBg: string;
    badgeText: string;
    glow: string;
  };
  articulosCitados: {
    acuerdo009_2024: string;
    acuerdo002_2026?: string;
    normaSuperior: string;
  };
  etapaProcesal: string;
  plazoTermino: string;
  organoCompetente: string;
  descripcionJuridica: string;
  desarrolloProceso: string[];
  garantiasAprendiz: string[];
  casoPractico: string;
}

export interface ReformaAcuerdo002 {
  titulo: string;
  fechaExpedicion: string;
  diarioOficial: string;
  objeto: string;
  articuloModificado: string;
  cambioPrincipal: string;
  conformacionComite: {
    conVozYVoto: { cargo: string; descripcion: string }[];
    conVozSinVoto: { cargo: string; descripcion: string }[];
    invitadosEspeciales: { cargo: string; descripcion: string }[];
  };
  diferenciaEquipos: {
    equipoEjecutor: string;
    comiteEvaluacion: string;
  };
}

export const REFORMA_ACUERDO_002_2026: ReformaAcuerdo002 = {
  titulo: 'Acuerdo 002 de 2026 (10 de Marzo de 2026)',
  fechaExpedicion: '10 de marzo de 2026',
  diarioOficial: 'Diario Oficial No. 53.490 de 14 de mayo de 2026',
  objeto: 'Modifica el artículo 48 del Acuerdo número 009 de 2024 (Reglamento del Aprendiz SENA).',
  articuloModificado: 'Artículo 48 - Equipos encargados de la valoración de las medidas y sanciones',
  cambioPrincipal:
    'Otorga expresamente VOZ Y VOTO al Representante de los Aprendices del Centro de Formación (o a su suplente) en el Comité de Evaluación y Seguimiento, garantizando la representación democrática efectiva, corresponsabilidad y debido proceso en las decisiones disciplinarias.',
  conformacionComite: {
    conVozYVoto: [
      {
        cargo: '1. Instructor del Programa de Formación',
        descripcion: 'En representación del equipo ejecutor del programa, designado por el Subdirector del Centro.'
      },
      {
        cargo: '2. Coordinador de Formación del Centro',
        descripcion: 'O quien este designe como delegado directivo formativo.'
      },
      {
        cargo: '3. Coordinador Académico del Centro',
        descripcion: 'O quien este designe; es el responsable de realizar la citación formal al comité y levantar el acta respectiva.'
      },
      {
        cargo: '4. Representante de los Aprendices del Centro',
        descripcion:
          'De la respectiva modalidad del programa. En su ausencia participará su suplente. ¡Novedad 2026: Ejerce voz y voto en pie de igualdad!'
      }
    ],
    conVozSinVoto: [
      {
        cargo: 'Aprendiz Vocero del Grupo de Formación',
        descripcion: 'Participa con voz pero sin voto para brindar contexto directo sobre el grupo y la convivencia.'
      }
    ],
    invitadosEspeciales: [
      {
        cargo: 'Responsable de Contrato de Aprendizaje',
        descripcion: 'Concurre cuando el caso verse sobre la etapa productiva (voz sin voto).'
      },
      {
        cargo: 'Abogado del Centro de Formación',
        descripcion: 'Asiste para asesorar al comité en todas las connotaciones legales y garantías procesales (voz sin voto).'
      },
      {
        cargo: 'Coordinador de Institución Educativa',
        descripcion: 'Aplica en programas de articulación con la educación media (Parágrafo 1, voz sin voto).'
      }
    ]
  },
  diferenciaEquipos: {
    equipoEjecutor:
      'Numeral 1: Conformado por instructores de competencias del programa y el aprendiz vocero. Aplica únicamente medidas formativas académicas o disciplinarias (planes de mejoramiento) y remite al comité solo por incumplimiento.',
    comiteEvaluacion:
      'Numeral 2: Órgano colegiado del Centro con presencia estudiantil con voz y voto. Recomienda las medidas sancionatorias por escrito al Subdirector del Centro para su decisión final.'
  }
};

export const VARIABLES_DEBIDO_PROCESO: VariableDebidoProceso[] = [
  // 1. PRESUNCIÓN DE INOCENCIA
  {
    id: 'presuncion-inocencia',
    numero: 1,
    nombre: 'Presunción de Inocencia',
    icono: 'ShieldCheck',
    colorTema: {
      bgLight: 'bg-emerald-50/80',
      border: 'border-emerald-300',
      text: 'text-emerald-900',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      glow: 'rgba(16, 185, 129, 0.2)'
    },
    articulosCitados: {
      acuerdo009_2024: 'Artículo 47 (Principios Rectores del Debido Proceso) y Artículo 48',
      normaSuperior: 'Artículo 29 de la Constitución Política de Colombia & Art. 67 y 68 Superiores'
    },
    etapaProcesal: 'Transversal a todas las etapas (Desde la Queja hasta la Resolución en Firme)',
    plazoTermino: 'Aplica durante el 100% de la actuación administrativa',
    organoCompetente: 'Equipo Ejecutor, Comité de Evaluación y Seguimiento, y Subdirector del Centro',
    descripcionJuridica:
      'Todo aprendiz se presume legal y constitucionalmente inocente y exento de responsabilidad disciplinaria o académica mientras no se demuestre con certeza lo contrario mediante pruebas legalmente allegadas, controvertidas y valoradas con objetividad. Quedan terminantemente prohibidos los juicios sumarios, presunciones de culpabilidad o sanciones de plano.',
    desarrolloProceso: [
      'La carga probatoria corresponde íntegramente a quien formula el reporte o queja; el aprendiz jamás está obligado a demostrar su inocencia.',
      'La simple acusación, reporte verbal o rumor no constituye prueba idónea para atribuir responsabilidad.',
      'En caso de duda razonable o falta de pruebas concluyentes sobre la autoría o tipicidad de la falta, debe decidirse siempre a favor del aprendiz (In Dubio Pro Reo formativo).',
      'Durante el trámite, el aprendiz mantiene plenos todos sus derechos de formación, asistencia, acceso a talleres, plataformas virtuales y servicios de bienestar al aprendiz.'
    ],
    garantiasAprendiz: [
      'No ser tratado como infractor antes de la expedición y firmeza del acto administrativo sancionatorio.',
      'Continuar participando en sus actividades de aprendizaje sin represalias ni marginación pedagógica.',
      'Exigir que las pruebas en su contra sean verificables, pertinentes y obtenidas con respeto de sus derechos fundamentales.'
    ],
    casoPractico:
      'Si un instructor encuentra un equipo dañado en el taller de soldadura y sospecha de un aprendiz por haber estado cerca, no puede suspenderlo ni anotarlo como culpable de inmediato. Debe solicitarse informe técnico y testimonios, respetando su presunción de inocencia hasta que el Comité analice las pruebas.'
  },

  // 2. DERECHO A LA DEFENSA Y CONTRADICCIÓN
  {
    id: 'defensa-contradiccion',
    numero: 2,
    nombre: 'Derecho a la Defensa y Contradicción',
    icono: 'Scale',
    colorTema: {
      bgLight: 'bg-blue-50/80',
      border: 'border-blue-300',
      text: 'text-blue-950',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
      glow: 'rgba(59, 130, 246, 0.2)'
    },
    articulosCitados: {
      acuerdo009_2024: 'Artículos 47, 48, 49, 50 y 51 (Procedimiento Disciplinario y Audiencia)',
      acuerdo002_2026: 'Artículo 1º (Voz del vocero y garantías en el Comité)',
      normaSuperior: 'Artículo 29 de la Constitución Política (Derecho de Contradicción)'
    },
    etapaProcesal: 'Etapa 2 (Citación), Etapa 3 (Sesión de Audiencia del Comité) y descargos',
    plazoTermino: 'Mínimo tres (3) días hábiles para preparar descargos y aportar pruebas',
    organoCompetente: 'Comité de Evaluación y Seguimiento del Centro de Formación',
    descripcionJuridica:
      'Garantía que otorga al aprendiz la facultad material y técnica de ser oído en versión libre, rendir descargos orales o escritos, controvertir directamente las evidencias aportadas en su contra, interrogar o tachar testimonios, y solicitar o allegar todas las pruebas pertinentes que demuestren su exculpación o atenuación.',
    desarrolloProceso: [
      'Acceso irrestricto y oportuno al expediente disciplinario completo antes de la sesión del Comité.',
      'Oportunidad procesal expresa en la sesión del Comité para exponer sus argumentos de descargo sin coacción.',
      'Derecho a solicitar la práctica de pruebas técnicas, periciales, documentales o testimonios de compañeros e instructores.',
      'Facultad de comparecer acompañado por su acudiente (si es menor de edad) o solicitar el acompañamiento del vocero del grupo o asesor.'
    ],
    garantiasAprendiz: [
      'No ser obligado a declarar contra sí mismo ni aceptar cargos bajo intimidación o promesa formativa.',
      'Que cada argumento y prueba de descargo sea valorado expresamente en el acta motivada del Comité.',
      'Tener copia fiel e íntegra del acta del Comité de Evaluación y Seguimiento para preparar su defensa futura.'
    ],
    casoPractico:
      'Un aprendiz acusado de presunto plagio en una entrega de software presenta su historial de commits en Git, borradores locales y notas de diseño para demostrar la autoría propia. El Comité está en la obligación jurídica de evaluar dichas evidencias técnicas antes de recomendar cualquier medida.'
  },

  // 3. NOTIFICACIÓN OPORTUNA
  {
    id: 'notificacion-oportuna',
    numero: 3,
    nombre: 'Notificación Oportuna',
    icono: 'MailCheck',
    colorTema: {
      bgLight: 'bg-amber-50/80',
      border: 'border-amber-300',
      text: 'text-amber-950',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      glow: 'rgba(245, 158, 11, 0.2)'
    },
    articulosCitados: {
      acuerdo009_2024: 'Artículo 48 numeral 2 literal c, Artículo 49 y Artículo 52',
      acuerdo002_2026: 'Artículo 1º numeral 2 literal c (Función del Coordinador Académico)',
      normaSuperior: 'Ley 1437 de 2011 (CPACA - Artículos 53 a 69 sobre Notificaciones)'
    },
    etapaProcesal: 'Etapa 2 (Citación formal al Comité) y Etapa 5 (Notificación del Acto Sancionatorio)',
    plazoTermino: 'Citación con mínimo 3 a 5 días hábiles previos / Notificación de resolución dentro de 5 días',
    organoCompetente: 'Coordinador Académico (citación) y Subdirección del Centro (notificación resolución)',
    descripcionJuridica:
      'Deber estricto de la administración del SENA de poner en conocimiento del aprendiz todo acto procesal que afecte su situación jurídica, garantizando que conozca de manera clara, previa e inequívoca los hechos que se le imputan, las normas vulneradas, las pruebas y los recursos legales disponibles. Toda notificación deficiente o extemporánea vicia de nulidad la actuación.',
    desarrolloProceso: [
      'La citación al Comité la realiza formalmente el Coordinador Académico (o quien este designe) mediante comunicación oficial radicada.',
      'El oficio de citación debe precisar: i) hechos circunstanciados, ii) normas del Acuerdo 009 de 2024 presuntamente infringidas, iii) pruebas allegadas, iv) fecha, hora, lugar físico o enlace virtual.',
      'Envío al correo electrónico institucional del aprendiz registrado en el sistema de gestión académica (Sofia Plus / Zajuna) o entrega personal con recibido formal.',
      'La resolución motivada expedida por el Subdirector debe ser notificada personalmente o por aviso electrónico, indicando expresamente el plazo y forma del Recurso de Reposición.'
    ],
    garantiasAprendiz: [
      'No ser citado de un día para otro o por canales informales (como mensajes de chat informal sin radicado).',
      'Tiempo suficiente y verificable para preparar sus argumentos y recaudar evidencias antes de comparecer al Comité.',
      'Conocer con exactitud la fecha de ejecutoria para el ejercicio de los recursos legales.'
    ],
    casoPractico:
      'Si un coordinador envía un correo citando al aprendiz a las 8:00 a.m. para una sesión del Comité a las 10:00 a.m. de ese mismo día, se vulnera la notificación oportuna. La sesión no puede realizarse y debe reprogramarse garantizando los términos hábiles reglamentarios.'
  },

  // 4. IMPARCIALIDAD DEL COMITÉ
  {
    id: 'imparcialidad-comite',
    numero: 4,
    nombre: 'Imparcialidad del Comité y Representación Estudiantil',
    icono: 'UsersCheck',
    colorTema: {
      bgLight: 'bg-purple-50/80',
      border: 'border-purple-300',
      text: 'text-purple-950',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
      glow: 'rgba(147, 51, 234, 0.2)'
    },
    articulosCitados: {
      acuerdo009_2024: 'Artículo 48 (Equipos encargados) y Artículo 50 (Deliberación)',
      acuerdo002_2026: 'Artículo 1º (Modificación integral del Art. 48 Numeral 2 - Diario Oficial 53.490 de 2026)',
      normaSuperior: 'Art. 68 de la Constitución Política (Democracia y Participación de la Comunidad Educativa)'
    },
    etapaProcesal: 'Etapa 3 (Audiencia) y Etapa 4 (Deliberación y recomendación colegiada)',
    plazoTermino: 'Reunión ordinaria al menos una vez al mes y extraordinarias cuando se requiera',
    organoCompetente: 'Comité de Evaluación y Seguimiento con nueva composición 2026 (4 integrantes con VOZ Y VOTO)',
    descripcionJuridica:
      'Garantía de que las conductas del aprendiz sean evaluadas por un cuerpo colegiado, neutral, multidisciplinario y con representación democrática de los aprendices, libre de enemistad, prejuicios o intereses personales. El Acuerdo 002 de 2026 fortalece sustancialmente la imparcialidad al otorgar VOZ Y VOTO al Representante de los Aprendices del Centro, equilibrando la deliberación institucional.',
    desarrolloProceso: [
      'Diferenciación entre el Equipo Ejecutor (instructores del programa que aplican medidas formativas) y el Comité de Evaluación del Centro (que recomienda sanciones).',
      'Nueva conformación con VOZ Y VOTO según Acuerdo 002 de 2026: 1) Instructor del programa, 2) Coordinador de Formación, 3) Coordinador Académico, 4) Representante de los Aprendices del Centro (o su suplente).',
      'Voz pero sin voto: Aprendiz vocero del grupo e invitados especiales (responsable de contrato de aprendizaje, abogado del centro o coordinador de educación media).',
      'Aplicación del régimen legal de impedimentos y recusaciones: si un instructor o coordinador tiene enemistad grave, parentesco o conflicto de interés directo con el aprendiz, debe declararse impedido y ser reemplazado.'
    ],
    garantiasAprendiz: [
      'Contar con un representante de sus pares aprendices con capacidad de voto decisivo en la recomendación final.',
      'Saber que la decisión no depende del criterio de una sola persona, sino de una votación colegiada y motivada.',
      'Recusar a cualquier miembro del comité si demuestra parcialidad o animadversión previa comprobada.'
    ],
    casoPractico:
      'En la sesión del Comité, el Representante de los Aprendices (con voz y voto según Acuerdo 002 de 2026) expone que el aprendiz enfrentó una calamidad de salud no atendida a tiempo, proponiendo en su votación un plan de mejoramiento pedagógico en vez de la cancelación de matrícula, balanceando el criterio de coordinación.'
  },

  // 5. PROPORCIONALIDAD DE LA MEDIDA
  {
    id: 'proporcionalidad-medida',
    numero: 5,
    nombre: 'Proporcionalidad y Razonabilidad de la Medida',
    icono: 'SlidersHorizontal',
    colorTema: {
      bgLight: 'bg-emerald-50/80',
      border: 'border-emerald-300',
      text: 'text-emerald-950',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      glow: 'rgba(16, 185, 129, 0.2)'
    },
    articulosCitados: {
      acuerdo009_2024: 'Artículos 43, 44, 45, 46 y 48 (Numeral 1 y 2)',
      acuerdo002_2026: 'Artículo 1º numeral 1 (Primacía de las medidas formativas del Equipo Ejecutor)',
      normaSuperior: 'Principios de Razonabilidad, Interés Superior del Educando y Función Formativa del SENA'
    },
    etapaProcesal: 'Etapa 4 (Formulación de la Recomendación) y Etapa 5 (Resolución de la Subdirección)',
    plazoTermino: 'Valoración en el momento de la deliberación y graduación de la medida',
    organoCompetente: 'Equipo Ejecutor (Medidas Formativas) y Subdirector de Centro (Sanciones Disciplinarias)',
    descripcionJuridica:
      'Mandato de justicia formativa que prohíbe las sanciones desmedidas o automáticas. La respuesta institucional debe ser gradual, pedagógica y proporcional a la falta, distinguiendo entre medidas formativas previas (a cargo del equipo ejecutor) y sanciones disciplinarias de última ratio (Subdirector), teniendo en cuenta la culpabilidad, impacto y antecedentes.',
    desarrolloProceso: [
      'Primacía del enfoque pedagógico: antes de acudir a sanciones, el Equipo Ejecutor del programa debe agotar planes de mejoramiento académico o disciplinario (Art. 48.1).',
      'Criterios estrictos de graduación de la falta (Art. 45): i) intencionalidad (dolo o culpa), ii) grado de perturbación en el centro, iii) antecedentes de rendimiento y convivencia, iv) confesión o reparación del daño.',
      'Escala progresiva: Falta leve (plan de mejoramiento o llamado de atención escrito) -> Falta grave (condicionamiento de matrícula con compromisos) -> Falta gravísima (cancelación de matrícula e inhabilidad de 6 meses a 2 años).',
      'Motivación reforzada en la resolución: el Subdirector debe fundamentar por qué la medida elegida es idónea, necesaria y proporcionada al fin educativo.'
    ],
    garantiasAprendiz: [
      'Que no se imponga una cancelación de matrícula ante una primera falta no calificada como gravísima.',
      'Que se reconozcan sus atenuantes (excelente rendimiento previo, confesión espontánea, reparación económica del daño).',
      'Que la medida tenga como fin real el rescate pedagógico del aprendiz y no el castigo punitivo ciego.'
    ],
    casoPractico:
      'Un aprendiz llega tarde en tres ocasiones debido a bloqueos de transporte en su ruta rural. En virtud de la proporcionalidad, no procede sanción disciplinaria de plano ni llamado de atención formal; el equipo ejecutor debe verificar la situación y acordar un plan de mejoramiento con flexibilización horaria.'
  },

  // 6. DERECHO A LA IMPUGNACIÓN (RECURSO DE REPOSICIÓN)
  {
    id: 'derecho-impugnacion',
    numero: 6,
    nombre: 'Derecho a la Impugnación (Recurso de Reposición)',
    icono: 'FileText',
    colorTema: {
      bgLight: 'bg-rose-50/80',
      border: 'border-rose-300',
      text: 'text-rose-950',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      glow: 'rgba(244, 63, 94, 0.2)'
    },
    articulosCitados: {
      acuerdo009_2024: 'Artículos 52, 53 y 54 (Recursos de Ley y Firmeza de los Actos)',
      normaSuperior: 'Ley 1437 de 2011 (CPACA - Artículos 74, 76, 77 sobre Recursos y Doble Instancia)'
    },
    etapaProcesal: 'Etapa 6: Fase Recursiva y Agotamiento de la Vía Administrativa',
    plazoTermino: 'Cinco (5) días hábiles siguientes a la notificación para interponer el recurso',
    organoCompetente: 'Subdirector del Centro de Formación (Resuelve el recurso)',
    descripcionJuridica:
      'Mecanismo de contradicción formal mediante el cual el aprendiz sancionado tiene el derecho inalienable de inconformarse con la Resolución expedida por la Subdirección del Centro, solicitando de forma motivada y por escrito que dicha decisión sea aclarada, modificada en favor de una medida menor o revocada en su totalidad por vicios probatorios o procedimentales.',
    desarrolloProceso: [
      'Interposición del Recurso de Reposición por escrito radicado ante la Subdirección del Centro dentro de los cinco (5) días hábiles posteriores a la notificación formal.',
      'Sustentación jurídica del recurso: el aprendiz expone las razones de inconformidad, errores en la valoración de pruebas, violación al debido proceso o desproporción.',
      'Efectos suspensivos: la interposición oportuna del recurso suspende la ejecución de la sanción. El aprendiz sigue siendo aprendiz activo hasta que el recurso sea resuelto en firme.',
      'Resolución del recurso: el Subdirector del Centro tiene un término perentorio para resolver mediante nuevo acto administrativo debidamente motivado (confirmando, modificando o revocando la sanción).'
    ],
    garantiasAprendiz: [
      'Garantía de no ejecución inmediata de la sanción mientras transcurren los términos y se resuelve el recurso.',
      'Tener una segunda oportunidad para que la autoridad del Centro revise con calma nuevas pruebas o argumentos jurídicos.',
      'Agotar la sede administrativa para habilitar, si fuere necesario, acciones constitucionales de tutela o contenciosas.'
    ],
    casoPractico:
      'Un aprendiz notificado de condicionamiento de matrícula interpone Recurso de Reposición dentro de los 5 días hábiles, anexando historia clínica que no pudo aportar en la audiencia por encontrarse hospitalizado. El Subdirector, al revisar la causal de fuerza mayor, revoca el condicionamiento y ordena un plan de nivelación académica.'
  }
];
