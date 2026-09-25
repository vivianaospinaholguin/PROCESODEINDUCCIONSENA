export interface DepartamentoPolitico {
  id: string;
  nombre: string;
  capital: string;
  zona: 'Caribe' | 'Andina' | 'Pacífica' | 'Orinoquía' | 'Amazonía' | 'Insular';
  path: string;
  labelCoords: { x: number; y: number };
  codigoDane: string;
}

export interface PaisVecino {
  nombre: string;
  coords: { x: number; y: number };
  rotacion?: number;
}

// 32 Departamentos de Colombia + Distrito Capital de Bogotá (33 entidades político-administrativas)
export const DEPARTAMENTOS_POLITICOS: DepartamentoPolitico[] = [
  // ==========================================
  // 1. ZONA CARIBE (8 ENTIDADES)
  // ==========================================
  {
    id: 'laguajira',
    nombre: 'La Guajira',
    capital: 'Riohacha',
    zona: 'Caribe',
    codigoDane: '44',
    labelCoords: { x: 310, y: 72 },
    path: `
      M 285,88 
      L 300,75 
      L 320,55 
      L 338,45 
      L 358,62 
      L 362,85 
      L 345,108 
      L 315,112 
      L 292,102 
      L 282,90 
      Z
    `
  },
  {
    id: 'magdalena',
    nombre: 'Magdalena',
    capital: 'Santa Marta',
    zona: 'Caribe',
    codigoDane: '47',
    labelCoords: { x: 246, y: 122 },
    path: `
      M 232,88 
      L 255,88 
      L 282,90 
      L 272,118 
      L 268,148 
      L 258,175 
      L 242,165 
      L 230,135 
      L 225,105 
      Z
    `
  },
  {
    id: 'atlantico',
    nombre: 'Atlántico',
    capital: 'Barranquilla',
    zona: 'Caribe',
    codigoDane: '08',
    labelCoords: { x: 218, y: 98 },
    path: `
      M 218,88 
      L 232,88 
      L 226,112 
      L 212,118 
      L 205,105 
      L 212,92 
      Z
    `
  },
  {
    id: 'cesar',
    nombre: 'Cesar',
    capital: 'Valledupar',
    zona: 'Caribe',
    codigoDane: '20',
    labelCoords: { x: 278, y: 145 },
    path: `
      M 272,118 
      L 292,102 
      L 315,112 
      L 308,138 
      L 295,168 
      L 282,198 
      L 265,208 
      L 258,175 
      L 268,148 
      Z
    `
  },
  {
    id: 'bolivar',
    nombre: 'Bolívar',
    capital: 'Cartagena de Indias',
    zona: 'Caribe',
    codigoDane: '13',
    labelCoords: { x: 232, y: 188 },
    path: `
      M 205,105 
      L 212,118 
      L 226,112 
      L 230,135 
      L 242,165 
      L 258,175 
      L 265,208 
      L 255,238 
      L 238,245 
      L 225,225 
      L 212,185 
      L 198,148 
      L 192,122 
      Z
    `
  },
  {
    id: 'sucre',
    nombre: 'Sucre',
    capital: 'Sincelejo',
    zona: 'Caribe',
    codigoDane: '70',
    labelCoords: { x: 210, y: 154 },
    path: `
      M 198,142 
      L 215,138 
      L 225,155 
      L 218,175 
      L 202,172 
      L 192,155 
      Z
    `
  },
  {
    id: 'cordoba',
    nombre: 'Córdoba',
    capital: 'Montería',
    zona: 'Caribe',
    codigoDane: '23',
    labelCoords: { x: 192, y: 192 },
    path: `
      M 182,162 
      L 198,148 
      L 202,172 
      L 218,175 
      L 215,205 
      L 200,225 
      L 175,222 
      L 172,188 
      Z
    `
  },
  {
    id: 'sanandres',
    nombre: 'San Andrés y Providencia',
    capital: 'San Andrés',
    zona: 'Insular',
    codigoDane: '88',
    labelCoords: { x: 75, y: 75 },
    path: `
      M 32,50 
      L 55,42 
      L 62,65 
      L 52,88 
      L 35,82 
      L 28,62 
      Z
    `
  },

  // ==========================================
  // 2. ZONA ANDINA (11 ENTIDADES)
  // ==========================================
  {
    id: 'antioquia',
    nombre: 'Antioquia',
    capital: 'Medellín',
    zona: 'Andina',
    codigoDane: '05',
    labelCoords: { x: 205, y: 278 },
    path: `
      M 160,215 
      L 175,222 
      L 200,225 
      L 215,205 
      L 225,225 
      L 238,245 
      L 255,238 
      L 252,272 
      L 235,288 
      L 232,315 
      L 215,318 
      L 195,315 
      L 182,298 
      L 172,255 
      L 155,235 
      Z
    `
  },
  {
    id: 'nortedesantander',
    nombre: 'Norte de Santander',
    capital: 'Cúcuta',
    zona: 'Andina',
    codigoDane: '54',
    labelCoords: { x: 298, y: 222 },
    path: `
      M 282,198 
      L 295,168 
      L 315,182 
      L 325,212 
      L 318,245 
      L 298,248 
      L 282,228 
      Z
    `
  },
  {
    id: 'santander',
    nombre: 'Santander',
    capital: 'Bucaramanga',
    zona: 'Andina',
    codigoDane: '68',
    labelCoords: { x: 272, y: 252 },
    path: `
      M 265,208 
      L 282,198 
      L 282,228 
      L 298,248 
      L 295,278 
      L 278,292 
      L 258,285 
      L 252,272 
      L 255,238 
      Z
    `
  },
  {
    id: 'boyaca',
    nombre: 'Boyacá',
    capital: 'Tunja',
    zona: 'Andina',
    codigoDane: '15',
    labelCoords: { x: 298, y: 312 },
    path: `
      M 298,248 
      L 318,245 
      L 345,268 
      L 338,295 
      L 318,318 
      L 288,328 
      L 272,315 
      L 278,292 
      L 295,278 
      Z
    `
  },
  {
    id: 'caldas',
    nombre: 'Caldas',
    capital: 'Manizales',
    zona: 'Andina',
    codigoDane: '17',
    labelCoords: { x: 215, y: 332 },
    path: `
      M 215,318 
      L 232,315 
      L 238,335 
      L 228,348 
      L 212,345 
      L 205,332 
      Z
    `
  },
  {
    id: 'risaralda',
    nombre: 'Risaralda',
    capital: 'Pereira',
    zona: 'Andina',
    codigoDane: '66',
    labelCoords: { x: 196, y: 345 },
    path: `
      M 195,315 
      L 205,332 
      L 212,345 
      L 202,358 
      L 188,352 
      L 185,330 
      Z
    `
  },
  {
    id: 'quindio',
    nombre: 'Quindío',
    capital: 'Armenia',
    zona: 'Andina',
    codigoDane: '63',
    labelCoords: { x: 212, y: 366 },
    path: `
      M 208,358 
      L 220,358 
      L 222,374 
      L 210,378 
      L 204,368 
      Z
    `
  },
  {
    id: 'cundinamarca',
    nombre: 'Cundinamarca',
    capital: 'Bogotá / Sede Regional',
    zona: 'Andina',
    codigoDane: '25',
    labelCoords: { x: 260, y: 355 },
    path: `
      M 252,272 
      L 278,292 
      L 272,315 
      L 288,328 
      L 282,365 
      L 272,392 
      L 248,390 
      L 238,368 
      L 238,335 
      L 232,315 
      Z
    `
  },
  {
    id: 'dc',
    nombre: 'Distrito Capital',
    capital: 'Bogotá D.C.',
    zona: 'Andina',
    codigoDane: '11',
    labelCoords: { x: 276, y: 380 },
    path: `
      M 268,372 
      L 282,372 
      L 286,388 
      L 274,395 
      L 266,385 
      Z
    `
  },
  {
    id: 'tolima',
    nombre: 'Tolima',
    capital: 'Ibagué',
    zona: 'Andina',
    codigoDane: '73',
    labelCoords: { x: 228, y: 395 },
    path: `
      M 238,335 
      L 248,368 
      L 248,390 
      L 242,425 
      L 222,430 
      L 212,410 
      L 215,380 
      L 228,348 
      Z
    `
  },
  {
    id: 'huila',
    nombre: 'Huila',
    capital: 'Neiva',
    zona: 'Andina',
    codigoDane: '41',
    labelCoords: { x: 225, y: 455 },
    path: `
      M 222,430 
      L 242,425 
      L 252,455 
      L 238,485 
      L 218,485 
      L 205,465 
      L 212,442 
      Z
    `
  },

  // ==========================================
  // 3. ZONA PACÍFICA (4 ENTIDADES)
  // ==========================================
  {
    id: 'choco',
    nombre: 'Chocó',
    capital: 'Quibdó',
    zona: 'Pacífica',
    codigoDane: '27',
    labelCoords: { x: 154, y: 312 },
    path: `
      M 142,228 
      L 160,215 
      L 155,235 
      L 172,255 
      L 182,298 
      L 185,330 
      L 188,352 
      L 172,368 
      L 152,375 
      L 142,345 
      L 135,285 
      L 138,245 
      Z
    `
  },
  {
    id: 'valle',
    nombre: 'Valle del Cauca',
    capital: 'Cali',
    zona: 'Pacífica',
    codigoDane: '76',
    labelCoords: { x: 172, y: 395 },
    path: `
      M 152,375 
      L 172,368 
      L 188,352 
      L 202,358 
      L 208,368 
      L 210,378 
      L 215,380 
      L 212,410 
      L 188,418 
      L 165,418 
      L 142,408 
      L 140,388 
      Z
    `
  },
  {
    id: 'cauca',
    nombre: 'Cauca',
    capital: 'Popayán',
    zona: 'Pacífica',
    codigoDane: '19',
    labelCoords: { x: 165, y: 458 },
    path: `
      M 142,408 
      L 165,418 
      L 188,418 
      L 212,410 
      L 205,465 
      L 192,478 
      L 168,485 
      L 145,475 
      L 132,445 
      Z
    `
  },
  {
    id: 'narino',
    nombre: 'Nariño',
    capital: 'Pasto',
    zona: 'Pacífica',
    codigoDane: '52',
    labelCoords: { x: 135, y: 515 },
    path: `
      M 132,445 
      L 145,475 
      L 168,485 
      L 182,510 
      L 172,538 
      L 148,542 
      L 125,532 
      L 115,502 
      L 120,465 
      Z
    `
  },

  // ==========================================
  // 4. ZONA ORINOQUÍA (4 ENTIDADES)
  // ==========================================
  {
    id: 'arauca',
    nombre: 'Arauca',
    capital: 'Arauca',
    zona: 'Orinoquía',
    codigoDane: '81',
    labelCoords: { x: 410, y: 258 },
    path: `
      M 345,268 
      L 375,252 
      L 415,248 
      L 452,258 
      L 468,272 
      L 435,282 
      L 395,282 
      L 358,285 
      Z
    `
  },
  {
    id: 'casanare',
    nombre: 'Casanare',
    capital: 'Yopal',
    zona: 'Orinoquía',
    codigoDane: '85',
    labelCoords: { x: 368, y: 322 },
    path: `
      M 338,295 
      L 358,285 
      L 395,282 
      L 435,282 
      L 428,320 
      L 395,348 
      L 358,352 
      L 328,340 
      L 318,318 
      Z
    `
  },
  {
    id: 'meta',
    nombre: 'Meta',
    capital: 'Villavicencio',
    zona: 'Orinoquía',
    codigoDane: '50',
    labelCoords: { x: 328, y: 410 },
    path: `
      M 282,365 
      L 318,340 
      L 358,352 
      L 395,348 
      L 415,385 
      L 388,435 
      L 348,445 
      L 312,455 
      L 285,440 
      L 272,392 
      Z
    `
  },
  {
    id: 'vichada',
    nombre: 'Vichada',
    capital: 'Puerto Carreño',
    zona: 'Orinoquía',
    codigoDane: '99',
    labelCoords: { x: 475, y: 332 },
    path: `
      M 468,272 
      L 505,282 
      L 535,302 
      L 542,335 
      L 522,365 
      L 478,368 
      L 428,368 
      L 415,385 
      L 395,348 
      L 428,320 
      L 435,282 
      Z
    `
  },

  // ==========================================
  // 5. ZONA AMAZONÍA (6 ENTIDADES)
  // ==========================================
  {
    id: 'guainia',
    nombre: 'Guainía',
    capital: 'Inírida',
    zona: 'Amazonía',
    codigoDane: '94',
    labelCoords: { x: 505, y: 405 },
    path: `
      M 478,368 
      L 522,365 
      L 535,395 
      L 532,438 
      L 498,465 
      L 468,458 
      L 465,422 
      Z
    `
  },
  {
    id: 'guaviare',
    nombre: 'Guaviare',
    capital: 'San José del Guaviare',
    zona: 'Amazonía',
    codigoDane: '95',
    labelCoords: { x: 375, y: 465 },
    path: `
      M 348,445 
      L 388,435 
      L 415,385 
      L 428,368 
      L 465,422 
      L 452,472 
      L 415,488 
      L 368,495 
      L 338,478 
      Z
    `
  },
  {
    id: 'vaupes',
    nombre: 'Vaupés',
    capital: 'Mitú',
    zona: 'Amazonía',
    codigoDane: '97',
    labelCoords: { x: 442, y: 522 },
    path: `
      M 452,472 
      L 468,458 
      L 498,465 
      L 518,498 
      L 485,542 
      L 448,552 
      L 415,532 
      L 415,488 
      Z
    `
  },
  {
    id: 'caqueta',
    nombre: 'Caquetá',
    capital: 'Florencia',
    zona: 'Amazonía',
    codigoDane: '18',
    labelCoords: { x: 275, y: 535 },
    path: `
      M 238,485 
      L 252,455 
      L 285,440 
      L 312,455 
      L 338,478 
      L 368,495 
      L 355,545 
      L 322,572 
      L 278,575 
      L 235,535 
      Z
    `
  },
  {
    id: 'putumayo',
    nombre: 'Putumayo',
    capital: 'Mocoa',
    zona: 'Amazonía',
    codigoDane: '86',
    labelCoords: { x: 198, y: 545 },
    path: `
      M 182,510 
      L 205,465 
      L 218,485 
      L 238,485 
      L 235,535 
      L 252,562 
      L 232,572 
      L 192,568 
      L 172,538 
      Z
    `
  },
  {
    id: 'amazonas',
    nombre: 'Amazonas',
    capital: 'Leticia',
    zona: 'Amazonía',
    codigoDane: '91',
    labelCoords: { x: 382, y: 685 },
    path: `
      M 278,575 
      L 322,572 
      L 355,545 
      L 368,495 
      L 415,488 
      L 415,532 
      L 448,552 
      L 462,582 
      L 435,625 
      L 412,675 
      L 405,725 
      L 385,735 
      L 370,695 
      L 345,655 
      L 305,622 
      Z
    `
  }
];

// Países Vecinos para el Marco Geopolítico y de Fronteras
export const PAISES_VECINOS: PaisVecino[] = [
  { nombre: 'PANAMÁ', coords: { x: 110, y: 215 }, rotacion: -25 },
  { nombre: 'VENEZUELA', coords: { x: 440, y: 195 }, rotacion: 0 },
  { nombre: 'BRASIL', coords: { x: 535, y: 530 }, rotacion: 75 },
  { nombre: 'PERÚ', coords: { x: 260, y: 680 }, rotacion: 20 },
  { nombre: 'ECUADOR', coords: { x: 95, y: 575 }, rotacion: 45 }
];

// Líneas Fronterizas Internacionales
export const FRONTERAS_INTERNACIONALES = [
  // Frontera con Panamá
  'M 142,228 L 135,212 L 118,205',
  // Frontera con Venezuela
  'M 345,108 L 338,125 L 325,155 L 315,182 L 325,212 L 345,235 L 375,252 L 415,248 L 452,258 L 468,272 L 505,282 L 535,302 L 542,335 L 535,365 L 535,395 L 532,438',
  // Frontera con Brasil
  'M 532,438 L 498,465 L 518,498 L 485,542 L 462,582 L 435,625 L 412,675 L 405,725',
  // Frontera con Perú
  'M 405,725 L 385,735 L 370,695 L 345,655 L 305,622 L 278,575 L 252,562 L 232,572 L 192,568',
  // Frontera con Ecuador
  'M 192,568 L 172,538 L 148,542 L 125,532 L 115,502'
];
