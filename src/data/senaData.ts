import { HitoHistoria, RegionalSena, AcuerdoItem, QuizQuestion, DocumentoAcuerdo0009 } from '../types';
import { TODAS_REGIONALES_SENA } from './regionalesCompletas';
import acuerdo0009Json from './acuerdo_sena_0009_2024.json';

export { TODAS_REGIONALES_SENA };
export const REGIONALES_SENA: RegionalSena[] = TODAS_REGIONALES_SENA;

export const ACUERDO_0009_COMPLETO: DocumentoAcuerdo0009 = acuerdo0009Json as unknown as DocumentoAcuerdo0009;

export const HITOS_HISTORIA: HitoHistoria[] = [
  {
    id: '1',
    ano: '1957',
    titulo: 'Fundación del SENA',
    descripcion: 'Creado mediante el Decreto Ley 118 de 1957, bajo la iniciativa de Rodolfo Martínez Tono. Su objetivo principal era brindar formación profesional a trabajadores, jóvenes y adultos en la industria, comercio y agricultura.',
    categoria: 'Fundación',
    icono: 'Building2'
  },
  {
    id: '2',
    ano: '1960 - 1970',
    titulo: 'Expansión Nacional y Centros',
    descripcion: 'Se consolidaron los primeros centros de formación en las principales capitales del país y se crearon unidades móviles para llegar a zonas rurales y apartadas.',
    categoria: 'Expansión',
    icono: 'MapPin'
  },
  {
    id: '3',
    ano: '1990 - 2000',
    titulo: 'Reconversión Industrial y Tecnología',
    descripcion: 'El SENA moderniza sus programas incorporando tecnologías de la información, automatización industrial y el enfoque de formación por competencias laborales.',
    categoria: 'Modernización',
    icono: 'Laptop'
  },
  {
    id: '4',
    ano: '2010 - 2020',
    titulo: 'Innovación, SENNOVA y TecnoParques',
    descripcion: 'Creación del sistema de investigación SENNOVA, TecnoParques y Centros de Diseño Tecnológico, posicionando al SENA como líder en I+D+i aplicado a la industria 4.0.',
    categoria: 'Modernización',
    icono: 'Cpu'
  },
  {
    id: '5',
    ano: '2024 - Presente',
    titulo: 'Nuevo Reglamento y Actualización Tecnológica',
    descripcion: 'Expedición del Acuerdo 0009 de 2024 (Nuevo Reglamento del Aprendiz) y fortalecimiento de la empleabilidad digital, bilingüismo y transición energética.',
    categoria: 'Actualidad',
    icono: 'ShieldCheck'
  }
];

export const SIMBOLOS_SENA = [
  {
    titulo: 'El Escudo',
    descripcion: 'Refleja los tres sectores económicos en los que opera el SENA: el piñón (industria), el caduceo (comercio y servicios) y el cafeto (agricultura y ganadería).'
  },
  {
    titulo: 'La Bandera',
    descripcion: 'De fondo blanco, lleva en el centro el escudo de la institución. Representa la paz, la tranquilidad y la pulcritud de nuestra labor.'
  },
  {
    titulo: 'El Logotipo',
    descripcion: 'Muestra de forma gráfica la síntesis de los enfoques de la formación: el individuo como protagonista del cambio y la tecnología.'
  },
  {
    titulo: 'El Himno',
    descripcion: 'Letra que enaltece el trabajo, la juventud y el progreso de Colombia a través de la educación técnica y tecnológica.'
  }
];

// ITEMS COMPLETOS DEL REGLAMENTO DEL APRENDIZ (ACUERDO 0009 DE 2024)
export const ACUERDO_ITEMS: AcuerdoItem[] = [
  ...ACUERDO_0009_COMPLETO.derechos.map((d) => ({
    ...d,
    tipo: 'Derecho' as const
  })),
  ...ACUERDO_0009_COMPLETO.deberes.map((deb) => ({
    ...deb,
    tipo: 'Deber' as const
  })),
  ...ACUERDO_0009_COMPLETO.prohibiciones.map((p) => ({
    ...p,
    titulo: p.descripcion.slice(0, 45) + '...',
    tipo: 'Prohibición' as const
  })),
  ...ACUERDO_0009_COMPLETO.estimulos.map((est, idx) => ({
    id: `est-${idx + 1}`,
    titulo: est.tipo,
    tipo: 'Estímulo' as const,
    descripcion: `${est.beneficio} Requisitos: ${est.requisitos}`,
    articulo: 'Artículo 23 - Estímulos e Incentivos',
    ejemploPractico: est.beneficio
  })),
  {
    id: 'f-aca-1',
    titulo: 'Fraude y Plagio en Evaluaciones',
    tipo: 'Falta Académica',
    gravedad: 'Grave',
    descripcion: 'Presentar evidencias de aprendizaje ajenas sin citación, suplantar identidad o alterar resultados evaluativos.',
    articulo: 'Artículo 16 - Numeral 1',
    ejemploPractico: 'Copiar código de internet o informes de compañeros sin autorización ni referencia bibliográfica.'
  },
  {
    id: 'f-aca-2',
    titulo: 'Inasistencia Reiterada Injustificada',
    tipo: 'Falta Académica',
    gravedad: 'Leve',
    descripcion: 'No asistir a sesiones sin justificar dentro de los 3 días hábiles o acumular faltas no concertadas.',
    articulo: 'Artículo 16 - Numeral 3',
    ejemploPractico: 'Ausentarse de talleres de formación técnica sin radicar soporte médico en el plazo legal.'
  },
  {
    id: 'f-disc-1',
    titulo: 'Consumo o Ingreso de Alcohol y Sustancias',
    tipo: 'Falta Disciplinaria',
    gravedad: 'Gravisima',
    descripcion: 'Portar, distribuir o consumir bebidas embriagantes o sustancias psicoactivas en el SENA.',
    articulo: 'Artículo 14 - Numeral 3',
    ejemploPractico: 'Ingresar botellas de licor en termos o mochilas al centro de formación o talleres.'
  },
  {
    id: 'f-disc-2',
    titulo: 'Ciberacoso, Hostigamiento y Violencia',
    tipo: 'Falta Disciplinaria',
    gravedad: 'Gravisima',
    descripcion: 'Agredir física, verbal o virtualmente por canales digitales a cualquier miembro de la comunidad educativa.',
    articulo: 'Artículo 14 - Numeral 7',
    ejemploPractico: 'Compartir fotos denigrantes o mensajes intimidatorios en chats de la ficha.'
  }
];

export const QUIZ_ACUERDO: QuizQuestion[] = ACUERDO_0009_COMPLETO.bancoPreguntasEvaluacion.map((q) => ({
  ...q,
  explicacion: q.refuerzoPedagogico ? q.refuerzoPedagogico.porQueEsCorrecta : 'Revisa el Acuerdo 0009 de 2024 para mayor detalle.'
}));
