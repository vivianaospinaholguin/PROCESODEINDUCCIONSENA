export interface CharacterizationData {
  nombre: string;
  tipoDocumento: string;
  numeroDocumento: string;
  correo: string;
  regional: string;
  centroFormacion: string;
  nivelFormacion: 'Operario' | 'Técnico' | 'Tecnólogo' | 'Especialización Tecnológica' | '';
  modalidadFormacion?: 'Presencial' | 'Virtual' | 'A Distancia' | 'Dual' | '';
  jornada?: 'Diurna' | 'Nocturna' | 'Mixta' | 'Madrugada' | 'Fines de semana' | '';
  etapaFormacion?: 'Inducción' | 'Etapa Lectiva' | 'Etapa Productiva' | '';
  programaFormacion: string;
  ficha: string;
  historialSena: 'Sí' | 'No' | '';
  nivelSenaAnterior: string;
  estadoCulminacionPrevia: 'Culminó con éxito' | 'Desertó' | 'Canceló' | 'Primera vez que ingresa' | '';
  isCompleted: boolean;
}

export interface HitoHistoria {
  id: string;
  ano: string;
  titulo: string;
  descripcion: string;
  categoria: 'Fundación' | 'Expansión' | 'Modernización' | 'Actualidad';
  icono: string;
}

export interface CentroFormacion {
  nombre: string;
  ciudad: string;
  direccion: string;
}

export interface RegionalSena {
  id: string;
  nombre: string;
  capital: string;
  coberturaDepartamentos: string[];
  totalCentros: number;
  centros: CentroFormacion[];
  directorRegional: string;
  descripcion: string;
  zona?: 'Caribe' | 'Andina' | 'Pacífica' | 'Orinoquía' | 'Amazonía' | 'Insular';
  coordenadas?: { x: number; y: number };
}

export interface AcuerdoItem {
  id: string;
  titulo: string;
  tipo: 'Derecho' | 'Deber' | 'Estímulo' | 'Falta Académica' | 'Falta Disciplinaria' | 'Prohibición';
  descripcion: string;
  articulo: string;
  numeral?: string;
  categoria?: string;
  gravedad?: 'Leve' | 'Grave' | 'Gravisima';
  ejemploPractico?: string;
  deberCorrelativo?: string;
  consecuencia?: string;
  impacto?: string;
}

export interface RefuerzoPedagogico {
  porQueEsCorrecta: string;
  porQueOcurrioElError: string;
  articuloReferencia: string;
  conceptoClave: string;
  tipFormativo: string;
}

export interface QuizQuestion {
  id: number;
  pregunta: string;
  opciones: string[];
  respuestaCorrecta: number;
  explicacion?: string;
  categoria?: string;
  dificultad?: 'Básica' | 'Intermedia' | 'Avanzada';
  situacionCaso?: string;
  refuerzoPedagogico?: RefuerzoPedagogico;
}

export interface DocumentoAcuerdo0009 {
  metadatos: {
    numero: string;
    ano: number;
    fechaExpedicion: string;
    entidad: string;
    organoEmisor: string;
    titulo: string;
    descripcion: string;
    estado: string;
    derogatorias: string;
    alcance: string;
  };
  principios: Array<{
    nombre: string;
    definicion: string;
  }>;
  capitulos: Array<{
    numero: string;
    titulo: string;
    articulos: Array<{
      numero: string;
      nombre: string;
      resumen: string;
      puntosClave: string[];
    }>;
  }>;
  derechos: AcuerdoItem[];
  deberes: AcuerdoItem[];
  prohibiciones: AcuerdoItem[];
  faltasYSanciones: {
    criteriosGraduacion: string[];
    medidasPedagogicas: Array<{
      medida: string;
      aplicador: string;
      descripcion: string;
    }>;
    sancionesDisciplinarias: Array<{
      sancion: string;
      descripcion: string;
    }>;
  };
  debidoProceso: {
    principiosGarantizados: string[];
    etapas: Array<{
      paso: number;
      nombre: string;
      plazo: string;
      descripcion: string;
    }>;
  };
  estimulos: Array<{
    tipo: string;
    requisitos: string;
    beneficio: string;
  }>;
  bancoPreguntasEvaluacion: QuizQuestion[];
}

export interface EvaluacionAprendizData {
  nombre: string;
  tipoDocumento: string;
  numeroDocumento: string;
  correo: string;
  regional: string;
  centroFormacion: string;
  programaFormacion: string;
  ficha: string;
}

export interface RespuestaEvaluacionDetalle {
  preguntaId: number;
  pregunta: string;
  categoria: string;
  opcionSeleccionada: number;
  textoOpcionSeleccionada: string;
  opcionCorrecta: number;
  textoOpcionCorrecta: string;
  esCorrecta: boolean;
  articuloReferencia?: string;
  explicacion?: string;
}

export interface RegistroEvaluacion {
  id: string;
  fechaISO: string;
  fechaLegible: string;
  aprendiz: EvaluacionAprendizData;
  modoPrueba: string;
  puntaje: number;
  totalPreguntas: number;
  porcentaje: number;
  estado: 'Aprobado con Excelencia' | 'Aprobado' | 'Requiere Refuerzo';
  duracionSegundos?: number;
  respuestas: RespuestaEvaluacionDetalle[];
}
