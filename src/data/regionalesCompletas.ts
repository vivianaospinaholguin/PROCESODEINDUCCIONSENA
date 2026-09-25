import { RegionalSena } from '../types';

export const TODAS_REGIONALES_SENA: RegionalSena[] = [
  // 1. AMAZONAS
  {
    id: 'amazonas',
    nombre: 'Regional Amazonas',
    capital: 'Leticia',
    coberturaDepartamentos: ['Amazonas'],
    totalCentros: 1,
    zona: 'Amazonía',
    coordenadas: { x: 385, y: 700 },
    directorRegional: 'Dirección Regional Amazonas',
    descripcion: 'Pilar de la formación ambiental, etnodesarrollo, ecoturismo y aprovechamiento sostenible de la biodiversidad en la triple frontera amazónica (Colombia, Perú y Brasil).',
    centros: [
      { nombre: 'Centro para la Biodiversidad y el Turismo del Amazonas', ciudad: 'Leticia', direccion: 'Cra. 10 # 6-36' }
    ]
  },
  // 2. ANTIOQUIA
  {
    id: 'antioquia',
    nombre: 'Regional Antioquia',
    capital: 'Medellín',
    coberturaDepartamentos: ['Antioquia'],
    totalCentros: 16,
    zona: 'Andina',
    coordenadas: { x: 205, y: 285 },
    directorRegional: 'Dirección Regional Antioquia',
    descripcion: 'Una de las regionales más grandes e industrializadas del país. Lidera programas en innovación tecnológica, industria 4.0, confección, minería sostenible, agroindustria y salud.',
    centros: [
      { nombre: 'Centro de Tecnología de la Manufactura Avanzada', ciudad: 'Medellín', direccion: 'Calle 104 # 68-120' },
      { nombre: 'Centro de Servicios y Gestión Empresarial', ciudad: 'Medellín', direccion: 'Torre Bomboná, Calle 48' },
      { nombre: 'Centro de Comercio', ciudad: 'Medellín', direccion: 'Calle 57 # 45-67' },
      { nombre: 'Centro del Diseño y la Metrología', ciudad: 'Medellín', direccion: 'Pedregal, Calle 104' },
      { nombre: 'Centro Minero y Ambiental', ciudad: 'El Bagre', direccion: 'Calle 50' },
      { nombre: 'Centro de los Recursos Naturales Renovables La Salada', ciudad: 'Caldas', direccion: 'Km 6 Vía Caldas' }
    ]
  },
  // 3. ARAUCA
  {
    id: 'arauca',
    nombre: 'Regional Arauca',
    capital: 'Arauca',
    coberturaDepartamentos: ['Arauca'],
    totalCentros: 1,
    zona: 'Orinoquía',
    coordenadas: { x: 410, y: 260 },
    directorRegional: 'Dirección Regional Arauca',
    descripcion: 'Enfocada en el desarrollo agropecuario llanero, producción cárnica, cacaotera y fortalecimiento de hidrocarburos y agroindustria en la frontera oriental.',
    centros: [
      { nombre: 'Centro de Gestión y Desarrollo Agroindustrial de Arauca', ciudad: 'Arauca', direccion: 'Cra. 20 # 28-15' }
    ]
  },
  // 4. ATLÁNTICO
  {
    id: 'atlantico',
    nombre: 'Regional Atlántico',
    capital: 'Barranquilla',
    coberturaDepartamentos: ['Atlántico'],
    totalCentros: 4,
    zona: 'Caribe',
    coordenadas: { x: 235, y: 115 },
    directorRegional: 'Dirección Regional Atlántico',
    descripcion: 'Polo logístico y portuario del Caribe. Destaca por sus programas marítimos, metalmecánicos, aeronáuticos y de servicios globales de software y bilingüismo.',
    centros: [
      { nombre: 'Centro Nacional Colombo Alemán', ciudad: 'Barranquilla', direccion: 'Calle 30 # 3E-164' },
      { nombre: 'Centro de Comercio y Servicios', ciudad: 'Barranquilla', direccion: 'Cra. 43 # 42-40' },
      { nombre: 'Centro para el Desarrollo Agroecológico y Agroindustrial (CEDAGRO)', ciudad: 'Sabanalarga', direccion: 'Km 1 Vía Cascajal' },
      { nombre: 'Centro Colombo Italiano', ciudad: 'Barranquilla', direccion: 'Cra. 54 # 68-125' }
    ]
  },
  // 5. BOLÍVAR
  {
    id: 'bolivar',
    nombre: 'Regional Bolívar',
    capital: 'Cartagena de Indias',
    coberturaDepartamentos: ['Bolívar'],
    totalCentros: 4,
    zona: 'Caribe',
    coordenadas: { x: 215, y: 145 },
    directorRegional: 'Dirección Regional Bolívar',
    descripcion: 'Epicentro petroquímico, náutico, turístico y portuario. Ofrece formación de talla mundial en mantenimiento naval, hotelería y logística portuaria.',
    centros: [
      { nombre: 'Centro para el Desarrollo Petroquímico', ciudad: 'Cartagena', direccion: 'Mamonal Km 5' },
      { nombre: 'Centro Náutico Pesquero', ciudad: 'Cartagena', direccion: 'Avenida Pedro de Heredia # 18-20' },
      { nombre: 'Centro de Comercio y Servicios', ciudad: 'Cartagena', direccion: 'Sector Cuatro Vientos' },
      { nombre: 'Centro Agroempresarial y Minero', ciudad: 'Cartagena', direccion: 'Ternera Km 1' }
    ]
  },
  // 6. BOYACÁ
  {
    id: 'boyaca',
    nombre: 'Regional Boyacá',
    capital: 'Tunja',
    coberturaDepartamentos: ['Boyacá'],
    totalCentros: 4,
    zona: 'Andina',
    coordenadas: { x: 300, y: 325 },
    directorRegional: 'Dirección Regional Boyacá',
    descripcion: 'Cuna del desarrollo metalúrgico, minero, agropecuario y artesanal de la cordillera oriental con alta proyección turística y ambiental.',
    centros: [
      { nombre: 'Centro Minero', ciudad: 'Sogamoso', direccion: 'Vía Morcá Km 2' },
      { nombre: 'Centro de Desarrollo Agropecuario y Agroindustrial (CEDEAGRO)', ciudad: 'Duitama', direccion: 'Cra. 19 # 18-35' },
      { nombre: 'Centro de Gestión Administrativa y Agrícola', ciudad: 'Tunja', direccion: 'Calle 19 # 12-29' },
      { nombre: 'Centro de Desarrollo Industrial', ciudad: 'Sogamoso', direccion: 'Vía Nobsa' }
    ]
  },
  // 7. CALDAS
  {
    id: 'caldas',
    nombre: 'Regional Caldas',
    capital: 'Manizales',
    coberturaDepartamentos: ['Caldas'],
    totalCentros: 5,
    zona: 'Andina',
    coordenadas: { x: 210, y: 345 },
    directorRegional: 'Dirección Regional Caldas',
    descripcion: 'Pilar del Eje Cafetero con vocación en automatización industrial, tecnologías de información, agroindustria cafetera y biotecnología.',
    centros: [
      { nombre: 'Centro de Automatización Industrial', ciudad: 'Manizales', direccion: 'Km 10 Vía al Magdalena' },
      { nombre: 'Centro de Comercio y Servicios', ciudad: 'Manizales', direccion: 'Cra. 23 # 25-32' },
      { nombre: 'Centro Pecuario y Agroempresarial', ciudad: 'La Dorada', direccion: 'Calle 10 # 5-20' }
    ]
  },
  // 8. CAQUETÁ
  {
    id: 'caqueta',
    nombre: 'Regional Caquetá',
    capital: 'Florencia',
    coberturaDepartamentos: ['Caquetá'],
    totalCentros: 1,
    zona: 'Amazonía',
    coordenadas: { x: 235, y: 510 },
    directorRegional: 'Dirección Regional Caquetá',
    descripcion: 'Puerta de oro de la Amazonía. Formación orientada a ganadería sostenible, agroforestería, cacao fino de aroma y conservación ecológica.',
    centros: [
      { nombre: 'Centro Tecnológico de la Amazonía', ciudad: 'Florencia', direccion: 'Km 3 Vía al Aeropuerto' }
    ]
  },
  // 9. CASANARE
  {
    id: 'casanare',
    nombre: 'Regional Casanare',
    capital: 'Yopal',
    coberturaDepartamentos: ['Casanare'],
    totalCentros: 1,
    zona: 'Orinoquía',
    coordenadas: { x: 350, y: 335 },
    directorRegional: 'Dirección Regional Casanare',
    descripcion: 'Referente en hidrocarburos, producción arrocera, ganadería de precisión y turismo de naturaleza en las llanuras casanareñas.',
    centros: [
      { nombre: 'Centro Agroindustrial y Fortalecimiento Empresarial de Casanare', ciudad: 'Yopal', direccion: 'Cra. 19 # 36-60' }
    ]
  },
  // 10. CAUCA
  {
    id: 'cauca',
    nombre: 'Regional Cauca',
    capital: 'Popayán',
    coberturaDepartamentos: ['Cauca'],
    totalCentros: 3,
    zona: 'Pacífica',
    coordenadas: { x: 170, y: 470 },
    directorRegional: 'Dirección Regional Cauca',
    descripcion: 'Destaca por su trabajo intercultural, agropecuario, agroecología y desarrollo de software y servicios gastronómicos reconocidos internacionalmente.',
    centros: [
      { nombre: 'Centro de Teleinformática y Producción Industrial', ciudad: 'Popayán', direccion: 'Calle 4 # 2-80' },
      { nombre: 'Centro Agropecuario', ciudad: 'Popayán', direccion: 'Calle 5 # 3-40' },
      { nombre: 'Centro de Comercio y Servicios', ciudad: 'Popayán', direccion: 'Calle 3 # 7-50' }
    ]
  },
  // 11. CESAR
  {
    id: 'cesar',
    nombre: 'Regional Cesar',
    capital: 'Valledupar',
    coberturaDepartamentos: ['Cesar'],
    totalCentros: 2,
    zona: 'Caribe',
    coordenadas: { x: 310, y: 135 },
    directorRegional: 'Dirección Regional Cesar',
    descripcion: 'Líder en formación para la minería de carbón, energías no convencionales (solar), ganadería lechera y gestión cultural y folclórica.',
    centros: [
      { nombre: 'Centro Biotecnológico del Caribe', ciudad: 'Valledupar', direccion: 'Km 7 Vía La Paz' },
      { nombre: 'Centro de Operación y Mantenimiento Minero', ciudad: 'Valledupar', direccion: 'Cra. 19 # 14-50' }
    ]
  },
  // 12. CHOCÓ
  {
    id: 'choco',
    nombre: 'Regional Chocó',
    capital: 'Quibdó',
    coberturaDepartamentos: ['Chocó'],
    totalCentros: 1,
    zona: 'Pacífica',
    coordenadas: { x: 145, y: 315 },
    directorRegional: 'Dirección Regional Chocó',
    descripcion: 'Enfocada en bioeconomía, aprovechamiento forestal responsable, pesca artesanal, minería ancestral y preservación de saberes afro e indígenas.',
    centros: [
      { nombre: 'Centro de Recursos Naturales, Industria y Biodiversidad', ciudad: 'Quibdó', direccion: 'Sector Huapango Calle 24 # 7-29' }
    ]
  },
  // 13. CÓRDOBA
  {
    id: 'cordoba',
    nombre: 'Regional Córdoba',
    capital: 'Montería',
    coberturaDepartamentos: ['Córdoba'],
    totalCentros: 2,
    zona: 'Caribe',
    coordenadas: { x: 195, y: 205 },
    directorRegional: 'Dirección Regional Córdoba',
    descripcion: 'Corazón ganadero y fértil del valle del Sinú con fuerte presencia en agroindustria, piscicultura, comercio y gastronomía caribeña.',
    centros: [
      { nombre: 'Centro de Comercio, Industria y Turismo de Córdoba', ciudad: 'Montería', direccion: 'Avenida Circunvalar # 24-40' },
      { nombre: 'Centro Agropecuario y de Biotecnología El Porvenir', ciudad: 'Montería', direccion: 'Km 42 Vía Planeta Rica' }
    ]
  },
  // 14. CUNDINAMARCA
  {
    id: 'cundinamarca',
    nombre: 'Regional Cundinamarca',
    capital: 'Mosquera / Facatativá',
    coberturaDepartamentos: ['Cundinamarca'],
    totalCentros: 6,
    zona: 'Andina',
    coordenadas: { x: 265, y: 365 },
    directorRegional: 'Dirección Regional Cundinamarca',
    descripcion: 'Motor agroindustrial de la Sabana de Bogotá, floricultura, turismo ecológico, logística metropolitana e industria manufacturera.',
    centros: [
      { nombre: 'Centro de Biotecnología Agropecuaria (CBA)', ciudad: 'Mosquera', direccion: 'Km 7 Vía Fontibón' },
      { nombre: 'Centro de Desarrollo Agroempresarial', ciudad: 'Chía', direccion: 'Vía Chía - Cajicá' },
      { nombre: 'Centro Agroecológico y Empresarial', ciudad: 'Fusagasugá', direccion: 'Diagonal 16 # 2-35' },
      { nombre: 'Centro de Desarrollo Agroindustrial y Turístico del Alto Magdalena', ciudad: 'Girardot', direccion: 'Calle 19 # 10-10' }
    ]
  },
  // 15. DISTRITO CAPITAL
  {
    id: 'dc',
    nombre: 'Regional Distrito Capital',
    capital: 'Bogotá D.C.',
    coberturaDepartamentos: ['Bogotá D.C.'],
    totalCentros: 15,
    zona: 'Andina',
    coordenadas: { x: 290, y: 375 },
    directorRegional: 'Dirección Regional Distrito Capital',
    descripcion: 'Sede central institucional con 15 centros sectoriales altamente especializados en servicios financieros, tecnologías 4.0, electricidad, salud, artes gráficas y hotelería.',
    centros: [
      { nombre: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)', ciudad: 'Bogotá D.C.', direccion: 'Calle 52 # 13-65' },
      { nombre: 'Centro de Servicios Financieros', ciudad: 'Bogotá D.C.', direccion: 'Cra. 13 # 65-10' },
      { nombre: 'Centro de Gestión de Mercados, Logística y TI', ciudad: 'Bogotá D.C.', direccion: 'Calle 52 # 13-65' },
      { nombre: 'Centro de Formación en Actividad Física y Cultura', ciudad: 'Bogotá D.C.', direccion: 'Calle 63 # 59A-06' },
      { nombre: 'Centro de Tecnologías del Transporte', ciudad: 'Bogotá D.C.', direccion: 'Calle 15 Sur # 31-40' },
      { nombre: 'Centro de Formación de Talento Humano en Salud', ciudad: 'Bogotá D.C.', direccion: 'Calle 72 # 11-86' }
    ]
  },
  // 16. GUAINÍA
  {
    id: 'guainia',
    nombre: 'Regional Guainía',
    capital: 'Inírida',
    coberturaDepartamentos: ['Guainía'],
    totalCentros: 1,
    zona: 'Amazonía',
    coordenadas: { x: 485, y: 410 },
    directorRegional: 'Dirección Regional Guainía',
    descripcion: 'Formación adaptada a las cuencas de los ríos Inírida y Guaviare, ecoturismo biocultural en los Cerros de Mavecure y artesanías indígenas de fibra de chiquichiqui.',
    centros: [
      { nombre: 'Centro Ambiental y Ecoturístico del Nororiente Amazónico', ciudad: 'Inírida', direccion: 'Cra. 6 # 15-40' }
    ]
  },
  // 17. GUAVIARE
  {
    id: 'guaviare',
    nombre: 'Regional Guaviare',
    capital: 'San José del Guaviare',
    coberturaDepartamentos: ['Guaviare'],
    totalCentros: 1,
    zona: 'Amazonía',
    coordenadas: { x: 345, y: 465 },
    directorRegional: 'Dirección Regional Guaviare',
    descripcion: 'Transición entre el llano y la selva. Capacitación en pinturas rupestres protegidas, agroecología de frutos amazónicos (açaí, camu camu) y turismo regenerativo.',
    centros: [
      { nombre: 'Centro de Desarrollo Agroindustrial, Turístico y Tecnológico del Guaviare', ciudad: 'San José del Guaviare', direccion: 'Calle 22 # 20-30' }
    ]
  },
  // 18. HUILA
  {
    id: 'huila',
    nombre: 'Regional Huila',
    capital: 'Neiva',
    coberturaDepartamentos: ['Huila'],
    totalCentros: 5,
    zona: 'Andina',
    coordenadas: { x: 225, y: 450 },
    directorRegional: 'Dirección Regional Huila',
    descripcion: 'Primer productor de café especial de Colombia y líder en acuicultura de tilapia en la represa de Betania, agroindustria y arqueología.',
    centros: [
      { nombre: 'Centro de la Industria, la Empresa y los Servicios (CIES)', ciudad: 'Neiva', direccion: 'Calle 35 # 5-45' },
      { nombre: 'Centro de Formación Agropecuaria La Angostura', ciudad: 'Campoalegre', direccion: 'Km 38 Vía al Sur' },
      { nombre: 'Centro de Desarrollo Agroempresarial y Turístico del Huila', ciudad: 'La Plata', direccion: 'Cra. 4 # 10-20' },
      { nombre: 'Centro de Gestión y Desarrollo Sostenible Surcolombiano', ciudad: 'Pitalito', direccion: 'Km 1 Vía San Agustín' }
    ]
  },
  // 19. LA GUAJIRA
  {
    id: 'laguajira',
    nombre: 'Regional La Guajira',
    capital: 'Riohacha',
    coberturaDepartamentos: ['La Guajira'],
    totalCentros: 2,
    zona: 'Caribe',
    coordenadas: { x: 330, y: 70 },
    directorRegional: 'Dirección Regional La Guajira',
    descripcion: 'Punta norte de Suramérica con enorme potencial en energías eólica y solar fotovoltaica, minería de sal y carbón, y saberes ancestrales wayuu.',
    centros: [
      { nombre: 'Centro de Desarrollo Agroempresarial y Minero', ciudad: 'Fonseca', direccion: 'Calle 13 # 18-40' },
      { nombre: 'Centro Industrial y de Energías Alternativas', ciudad: 'Riohacha', direccion: 'Calle 21 # 15-30' }
    ]
  },
  // 20. MAGDALENA
  {
    id: 'magdalena',
    nombre: 'Regional Magdalena',
    capital: 'Santa Marta',
    coberturaDepartamentos: ['Magdalena'],
    totalCentros: 2,
    zona: 'Caribe',
    coordenadas: { x: 265, y: 105 },
    directorRegional: 'Dirección Regional Magdalena',
    descripcion: 'Territorio de la Sierra Nevada y el Mar Caribe. Énfasis en turismo de playa y naturaleza, agroindustria bananera y de palma, y logística portuaria.',
    centros: [
      { nombre: 'Centro de Logística y Promoción Ecoturística del Magdalena', ciudad: 'Santa Marta', direccion: 'Avenida Ferrocarril # 27-97' },
      { nombre: 'Centro Acuícola y Agroindustrial de Gaira', ciudad: 'Gaira / Santa Marta', direccion: 'Km 1 Vía Rodadero' }
    ]
  },
  // 21. META
  {
    id: 'meta',
    nombre: 'Regional Meta',
    capital: 'Villavicencio',
    coberturaDepartamentos: ['Meta'],
    totalCentros: 3,
    zona: 'Orinoquía',
    coordenadas: { x: 320, y: 405 },
    directorRegional: 'Dirección Regional Meta',
    descripcion: 'Corazón de los Llanos Orientales. Líder en agroindustria de gran escala (soya, maíz, palma), ganadería doble propósito y operación de hidrocarburos.',
    centros: [
      { nombre: 'Centro de Industria y Servicios del Meta', ciudad: 'Villavicencio', direccion: 'Calle 35 # 20A-05' },
      { nombre: 'Centro Agroindustrial del Meta - Sede Hachón', ciudad: 'Villavicencio', direccion: 'Km 12 Vía Puerto López' },
      { nombre: 'Centro Agroindustrial del Meta - Sede Los Naranjos', ciudad: 'San Juan de Arama', direccion: 'Vía Mesetas' }
    ]
  },
  // 22. NARIÑO
  {
    id: 'narino',
    nombre: 'Regional Nariño',
    capital: 'Pasto',
    coberturaDepartamentos: ['Nariño'],
    totalCentros: 3,
    zona: 'Pacífica',
    coordenadas: { x: 145, y: 520 },
    directorRegional: 'Dirección Regional Nariño',
    descripcion: 'Frontera sur con el Ecuador. Especialidades en café de alta montaña, agroindustria andina, puerto pesquero en Tumaco y artesanías de barniz de Pasto.',
    centros: [
      { nombre: 'Centro Internacional de Producción Limpia Lope', ciudad: 'Pasto', direccion: 'Calle 22 Oriente' },
      { nombre: 'Centro Sur Colombiano de Logística Internacional', ciudad: 'Ipiales', direccion: 'Cra. 6 # 14-20' },
      { nombre: 'Centro Agroindustrial y Pesquero de la Costa Pacífica', ciudad: 'Tumaco', direccion: 'Avenida Los Estudiantes' }
    ]
  },
  // 23. NORTE DE SANTANDER
  {
    id: 'nortedesantander',
    nombre: 'Regional Norte de Santander',
    capital: 'Cúcuta',
    coberturaDepartamentos: ['Norte de Santander'],
    totalCentros: 2,
    zona: 'Andina',
    coordenadas: { x: 335, y: 235 },
    directorRegional: 'Dirección Regional Norte de Santander',
    descripcion: 'Frontera dinámica colombo-venezolana con vocación en calzado y marroquinería, cerámica arquitectónica, comercio internacional y agroindustria.',
    centros: [
      { nombre: 'Centro de la Industria, la Empresa y los Servicios (CIES)', ciudad: 'Cúcuta', direccion: 'Calle 2N # 5-45 Barrio Pescadero' },
      { nombre: 'Centro de Formación para el Desarrollo Rural y Minero (CEDRUM)', ciudad: 'Cúcuta / El Zulia', direccion: 'Km 4 Vía San Faustino' }
    ]
  },
  // 24. PUTUMAYO
  {
    id: 'putumayo',
    nombre: 'Regional Putumayo',
    capital: 'Mocoa',
    coberturaDepartamentos: ['Putumayo'],
    totalCentros: 1,
    zona: 'Amazonía',
    coordenadas: { x: 185, y: 535 },
    directorRegional: 'Dirección Regional Putumayo',
    descripcion: 'Riqueza hídrica y de biodiversidad. Formación en pimienta gourmet, piscicultura amazónica, manejo agroforestal y turismo de cascadas.',
    centros: [
      { nombre: 'Centro Agroforestal y Acuícola Arapaima', ciudad: 'Puerto Asís / Mocoa', direccion: 'Km 2 Vía Aeropuerto Puerto Asís' }
    ]
  },
  // 25. QUINDÍO
  {
    id: 'quindio',
    nombre: 'Regional Quindío',
    capital: 'Armenia',
    coberturaDepartamentos: ['Quindío'],
    totalCentros: 3,
    zona: 'Andina',
    coordenadas: { x: 200, y: 380 },
    directorRegional: 'Dirección Regional Quindío',
    descripcion: 'Paisaje Cultural Cafetero Patrimonio Unesco. Pionero en barismo, catación de cafés especiales, agroturismo, hotelería y construcción.',
    centros: [
      { nombre: 'Centro Agroindustrial', ciudad: 'Armenia', direccion: 'Avenida Centenario # 44 Norte' },
      { nombre: 'Centro de Comercio, Turismo y Hotelería', ciudad: 'Armenia', direccion: 'Calle 18 # 14-20' },
      { nombre: 'Centro para el Desarrollo Tecnológico de la Construcción y la Industria', ciudad: 'Armenia', direccion: 'Vía Aeropuerto El Edén' }
    ]
  },
  // 26. RISARALDA
  {
    id: 'risaralda',
    nombre: 'Regional Risaralda',
    capital: 'Pereira',
    coberturaDepartamentos: ['Risaralda'],
    totalCentros: 4,
    zona: 'Andina',
    coordenadas: { x: 198, y: 360 },
    directorRegional: 'Dirección Regional Risaralda',
    descripcion: 'Punto neurálgico del occidente colombiano. Líder en diseño de modas, desarrollo de software, agroindustria y metalmecánica avanzada.',
    centros: [
      { nombre: 'Centro de Diseño e Innovación Tecnológica Industrial (CDITI)', ciudad: 'Dosquebradas', direccion: 'Cra. 10 Calle 17' },
      { nombre: 'Centro de Atención al Sector Agropecuario', ciudad: 'Pereira', direccion: 'Cra. 8 # 26-79' },
      { nombre: 'Centro de Comercio y Servicios', ciudad: 'Pereira', direccion: 'Calle 19 # 8-50' }
    ]
  },
  // 27. SAN ANDRÉS Y PROVIDENCIA
  {
    id: 'sanandres',
    nombre: 'Regional San Andrés, Providencia y Santa Catalina',
    capital: 'San Andrés Isla',
    coberturaDepartamentos: ['San Andrés y Providencia'],
    totalCentros: 1,
    zona: 'Insular',
    coordenadas: { x: 70, y: 80 },
    directorRegional: 'Dirección Regional San Andrés',
    descripcion: 'Reserva de Biósfera Seaflower. Programas bilingües (inglés criollo raizal), buceo profesional, náutica, gastronomía isleña y hotelería de alto nivel.',
    centros: [
      { nombre: 'Centro de Formación Turística, Gente de Mar y Servicios', ciudad: 'San Andrés Isla', direccion: 'Avenida Francisco Newball' }
    ]
  },
  // 28. SANTANDER
  {
    id: 'santander',
    nombre: 'Regional Santander',
    capital: 'Bucaramanga',
    coberturaDepartamentos: ['Santander'],
    totalCentros: 5,
    zona: 'Andina',
    coordenadas: { x: 295, y: 265 },
    directorRegional: 'Dirección Regional Santander',
    descripcion: 'Gran dinamismo empresarial. Énfasis en petroquímica en Barrancabermeja, calzado en Bucaramanga, turismo de aventura en San Gil y metalmecánica.',
    centros: [
      { nombre: 'Centro Industrial y del Desarrollo Tecnológico', ciudad: 'Barrancabermeja', direccion: 'Calle 50 # 18-35' },
      { nombre: 'Centro de Servicios Empresariales y Turísticos', ciudad: 'Bucaramanga', direccion: 'Calle 16 # 27-37' },
      { nombre: 'Centro Industrial del Diseño y la Manufactura', ciudad: 'Floridablanca', direccion: 'Anillo Vial Km 2' },
      { nombre: 'Centro Agroturístico', ciudad: 'San Gil', direccion: 'Calle 10 # 9-40' }
    ]
  },
  // 29. SUCRE
  {
    id: 'sucre',
    nombre: 'Regional Sucre',
    capital: 'Sincelejo',
    coberturaDepartamentos: ['Sucre'],
    totalCentros: 1,
    zona: 'Caribe',
    coordenadas: { x: 215, y: 185 },
    directorRegional: 'Dirección Regional Sucre',
    descripcion: 'Sabana caribeña y Golfo de Morrosquillo. Enfoque en agroindustria láctea y cárnica, confecciones, artesanías de caña flecha y turismo náutico.',
    centros: [
      { nombre: 'Centro de la Innovación, la Agroindustria y la Aviación', ciudad: 'Sincelejo', direccion: 'Calle 25B # 31-250' }
    ]
  },
  // 30. TOLIMA
  {
    id: 'tolima',
    nombre: 'Regional Tolima',
    capital: 'Ibagué',
    coberturaDepartamentos: ['Tolima'],
    totalCentros: 3,
    zona: 'Andina',
    coordenadas: { x: 220, y: 395 },
    directorRegional: 'Dirección Regional Tolima',
    descripcion: 'Eje logístico y arrocero central. Capacitación en confección industrial, música y sonido, café especial de cordillera y mantenimiento de maquinaria.',
    centros: [
      { nombre: 'Centro de Industria y de la Construcción', ciudad: 'Ibagué', direccion: 'Avenida Ferrocarril Calle 42' },
      { nombre: 'Centro de Comercio y Servicios', ciudad: 'Ibagué', direccion: 'Cra. 5 # 43-40' },
      { nombre: 'Centro Agropecuario La Granja', ciudad: 'Espinal', direccion: 'Km 5 Vía Espinal - Ibagué' }
    ]
  },
  // 31. VALLE DEL CAUCA
  {
    id: 'valle',
    nombre: 'Regional Valle del Cauca',
    capital: 'Cali',
    coberturaDepartamentos: ['Valle del Cauca'],
    totalCentros: 10,
    zona: 'Pacífica',
    coordenadas: { x: 175, y: 420 },
    directorRegional: 'Dirección Regional Valle',
    descripcion: 'Poderosa plataforma exportadora y azucarera con puerto en Buenaventura. Destaca en automatización, logística internacional, salud y alimentos.',
    centros: [
      { nombre: 'Centro de Electricidad y Automatización Industrial (CEAI)', ciudad: 'Cali', direccion: 'Calle 73 # 2C-80' },
      { nombre: 'Centro Náutico Pesquero', ciudad: 'Buenaventura', direccion: 'Km 3 Vía al Mar' },
      { nombre: 'Centro de la Construcción', ciudad: 'Cali', direccion: 'Cra. 7 # 40-50' },
      { nombre: 'Centro de Gestión Tecnológica de Servicios', ciudad: 'Cali', direccion: 'Calle 52 # 2Bis-15' },
      { nombre: 'Centro Agropecuario de Buga', ciudad: 'Guadalajara de Buga', direccion: 'Vía La Habana' }
    ]
  },
  // 32. VAUPÉS
  {
    id: 'vaupes',
    nombre: 'Regional Vaupés',
    capital: 'Mitú',
    coberturaDepartamentos: ['Vaupés'],
    totalCentros: 1,
    zona: 'Amazonía',
    coordenadas: { x: 415, y: 515 },
    directorRegional: 'Dirección Regional Vaupés',
    descripcion: 'Selva alta del Vaupés con más de 25 pueblos indígenas. Formación en gobernanza ambiental, bilingüismo ancestral, ecoturismo y manejo forestal.',
    centros: [
      { nombre: 'Centro Agropecuario y de Servicios Ambientales Jirijirimo', ciudad: 'Mitú', direccion: 'Barrio Centro, Frente al Parque Principal' }
    ]
  },
  // 33. VICHADA
  {
    id: 'vichada',
    nombre: 'Regional Vichada',
    capital: 'Puerto Carreño',
    coberturaDepartamentos: ['Vichada'],
    totalCentros: 1,
    zona: 'Orinoquía',
    coordenadas: { x: 505, y: 300 },
    directorRegional: 'Dirección Regional Vichada',
    descripcion: 'Altillanura y confluencia de los ríos Orinoco y Meta. Capacitación en silvicultura, marañón, cacao silvestre, ganadería regenerativa y energías solares.',
    centros: [
      { nombre: 'Centro de Producción y Transformación Agroindustrial de la Orinoquía', ciudad: 'Puerto Carreño', direccion: 'Calle 18 # 10-40' }
    ]
  }
];
