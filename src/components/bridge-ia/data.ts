// BRIDGE·IA — Simulador del Método GARTNER
// Datos completos del juego: 5 módulos, 38 preguntas, 615 puntos máximos

export interface GameQuestion {
  id: string;
  prompt: string;          // Término, escenario o pregunta mostrada al usuario
  subtitle?: string;       // Contexto adicional (ej. ejemplo de prompt)
  options: string[];       // 4 opciones de respuesta
  correctIndex: number;    // Índice de la respuesta correcta (0-3)
  secondBestIndex?: number;// Para puntuación parcial en Módulo 3
  points: number;          // Puntos por respuesta correcta
  partialPoints?: number;  // Puntos por segunda mejor opción (Módulo 3)
  feedback: string;        // Explicación mostrada tras responder
  bestPractice: string;    // Mejor práctica o tip profesional
  tag?: string;            // Etiqueta visual del módulo
}

export interface GameModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;           // Clase de color Tailwind para acento
  icon: string;            // Emoji icono
  gartnerLetter: string;   // Letra del acrónimo GARTNER que desbloquea
  gartnerWord: string;     // Palabra del acrónimo
  maxPoints: number;
  questions: GameQuestion[];
}

// ─────────────────────────────────────────────
// MÓDULO 1 — Terminología (130 pts, 13 preguntas × 10 pts)
// ─────────────────────────────────────────────
export const module1: GameModule = {
  id: "module1",
  title: "Terminología IA",
  subtitle: "Match Concept",
  description: "Empareja cada concepto con su definición correcta. Demuestra que dominas el vocabulario de la IA.",
  color: "blue",
  icon: "🔤",
  gartnerLetter: "G",
  gartnerWord: "Generar",
  maxPoints: 130,
  questions: [
    {
      id: "m1-01",
      prompt: "IA Generativa",
      options: [
        "Sistemas de IA que pueden crear contenido nuevo —texto, imágenes, código— basándose en patrones aprendidos durante su entrenamiento.",
        "Sistema que clasifica imágenes y texto usando reglas lógicas predefinidas por programadores.",
        "Técnica de recuperación de registros en bases de datos relacionales mediante consultas SQL.",
        "Proceso de validación automática de datos numéricos en sistemas de contabilidad empresarial."
      ],
      correctIndex: 0,
      points: 10,
      feedback: "✅ ¡Correcto! La IA Generativa es el corazón de Claude, ChatGPT y Gemini. A diferencia de la IA tradicional —que clasifica o predice—, la IA Generativa CREA contenido nuevo.",
      bestPractice: "🏆 Mejor práctica: En consultoría, usa IA Generativa para primeros borradores de informes, propuestas y análisis. Siempre revisa el output antes de entregarlo al cliente.",
      tag: "Conceptos Base"
    },
    {
      id: "m1-02",
      prompt: "RAG (Retrieval-Augmented Generation)",
      options: [
        "Tipo de red neuronal especializada en reconocimiento de patrones visuales en imágenes médicas.",
        "Técnica que combina recuperación de documentos externos con generación de texto, permitiendo que el modelo acceda a información actualizada o privada.",
        "Proceso de compresión de archivos de texto para reducir el almacenamiento en servidores.",
        "Método de autenticación multifactor para sistemas de gestión de identidades corporativas."
      ],
      correctIndex: 1,
      points: 10,
      feedback: "✅ ¡Exacto! RAG es la solución cuando un LLM no tiene acceso a información reciente o confidencial. En lugar de reentrenar el modelo, le 'inyectas' los documentos relevantes antes de generar.",
      bestPractice: "🏆 Mejor práctica: Para proyectos con bases de conocimiento propias (manuales, políticas, casos pasados), RAG es la arquitectura más costo-efectiva vs. Fine-tuning.",
      tag: "Arquitecturas"
    },
    {
      id: "m1-03",
      prompt: "Fine-tuning",
      options: [
        "Ajuste de parámetros de red WiFi para optimizar la velocidad de conexión en oficinas.",
        "Proceso de análisis estadístico para identificar anomalías en series de datos financieros.",
        "Proceso de entrenamiento adicional de un modelo base con datos específicos de un dominio para mejorar su desempeño en tareas concretas.",
        "Técnica de edición de video para mejorar la calidad de grabaciones corporativas."
      ],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Correcto! El Fine-tuning es como darle a un consultor generalista una inmersión profunda de 6 meses en tu industria específica. El resultado: un modelo especializado en tu contexto.",
      bestPractice: "🏆 Mejor práctica: El Fine-tuning requiere inversión significativa. Evalúa primero si un buen prompt engineering con RAG resuelve tu caso —generalmente es suficiente y mucho más económico.",
      tag: "Entrenamiento"
    },
    {
      id: "m1-04",
      prompt: "Alucinación",
      options: [
        "Estado alterado de conciencia en sistemas de IA que trabajan con datos sensoriales.",
        "Fenómeno donde un modelo de IA genera información falsa, inexacta o inventada con aparente confianza y coherencia.",
        "Técnica de visualización de datos complejos mediante representaciones gráficas tridimensionales.",
        "Error de compilación en código Python cuando se usa una librería de machine learning incorrecta."
      ],
      correctIndex: 1,
      points: 10,
      feedback: "✅ ¡Correcto! Las alucinaciones son el principal riesgo operacional de los LLMs. El modelo presenta información incorrecta con total confianza —sin señales de incertidumbre.",
      bestPractice: "🏆 Mejor práctica: Para datos críticos (cifras, fechas, nombres, leyes), siempre pide al modelo que cite sus fuentes o indique su nivel de confianza. Verifica con fuentes primarias.",
      tag: "Riesgos"
    },
    {
      id: "m1-05",
      prompt: "Prompt",
      options: [
        "Instrucción o conjunto de instrucciones en lenguaje natural que se proporciona a un modelo de IA para obtener una respuesta específica.",
        "Protocolo de comunicación segura entre servidores para transferir datos empresariales cifrados.",
        "Software de gestión de proyectos basado en metodologías ágiles como Scrum o Kanban.",
        "Base de datos no relacional optimizada para almacenar grandes volúmenes de datos no estructurados."
      ],
      correctIndex: 0,
      points: 10,
      feedback: "✅ ¡Exacto! El prompt es el principal punto de control que tiene un consultor sobre la IA. La diferencia entre un entregable mediocre y uno de alta calidad empieza aquí.",
      bestPractice: "🏆 Mejor práctica: Trata el prompt como un brief ejecutivo: incluye el ROL del asistente, el CONTEXTO del cliente, las INSTRUCCIONES específicas y el FORMATO del entregable esperado.",
      tag: "Conceptos Base"
    },
    {
      id: "m1-06",
      prompt: "Token",
      options: [
        "Moneda digital descentralizada basada en tecnología blockchain para transacciones internacionales.",
        "Certificado digital de autenticación para acceso a plataformas SaaS empresariales.",
        "Unidad básica de procesamiento de texto en los modelos de IA; puede ser una palabra, parte de una palabra o un signo de puntuación.",
        "Protocolo de seguridad para cifrar comunicaciones en redes corporativas privadas."
      ],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Correcto! En promedio, 1 token ≈ 0.75 palabras en español. Un informe de 10 páginas usa ~3,500 tokens. Esto impacta directamente el costo de las APIs y los límites de contexto.",
      bestPractice: "🏆 Mejor práctica: Para proyectos con uso intensivo de API, monitorea el consumo de tokens. Optimiza prompts para ser concisos sin perder claridad —cada token innecesario tiene un costo.",
      tag: "Técnico"
    },
    {
      id: "m1-07",
      prompt: "Embeddings",
      options: [
        "Técnica de compresión de imágenes para optimizar el almacenamiento en plataformas de contenido digital.",
        "Representaciones matemáticas de texto en forma de vectores numéricos que capturan el significado semántico de las palabras y frases.",
        "Proceso de integración de módulos externos en aplicaciones de gestión empresarial (ERP).",
        "Formato de archivo para almacenar presentaciones ejecutivas con elementos multimedia interactivos."
      ],
      correctIndex: 1,
      points: 10,
      feedback: "✅ ¡Exacto! Los embeddings permiten búsqueda por SIGNIFICADO, no solo por palabras exactas. Son la base técnica del RAG y los sistemas de búsqueda inteligente en documentos corporativos.",
      bestPractice: "🏆 Mejor práctica: Si construyes un sistema de búsqueda sobre documentos internos, los embeddings te permiten encontrar información relevante aunque el usuario use términos diferentes a los del documento.",
      tag: "Técnico"
    },
    {
      id: "m1-08",
      prompt: "LLM (Large Language Model)",
      options: [
        "Sistema de licencias de software multinivel para distribución de aplicaciones empresariales.",
        "Protocolo de comunicación de baja latencia para transferencia de datos en redes industriales.",
        "Laboratorio de lenguajes de marcado para el diseño de interfaces web responsivas.",
        "Modelo de lenguaje de gran escala entrenado con enormes cantidades de texto, capaz de comprender y generar lenguaje natural de forma sofisticada."
      ],
      correctIndex: 3,
      points: 10,
      feedback: "✅ ¡Correcto! Claude, GPT-4, Gemini son LLMs. Es fundamental entender que son predictores estadísticos de texto —no 'piensan' lógicamente. Esto explica tanto sus fortalezas como sus limitaciones.",
      bestPractice: "🏆 Mejor práctica: En presentaciones a clientes, explica los LLMs como 'expertos en síntesis de conocimiento que saben mucho pero pueden cometer errores'. Siempre incluye un paso de revisión humana.",
      tag: "Conceptos Base"
    },
    {
      id: "m1-09",
      prompt: "Temperatura (en modelos de IA)",
      options: [
        "Parámetro de configuración que controla el nivel de creatividad y aleatoriedad en las respuestas (0 = determinista/preciso, valores altos = más creativo/variado).",
        "Métrica de rendimiento que mide la velocidad de procesamiento de un modelo en inferencias por segundo.",
        "Indicador del consumo energético de los centros de datos que alojan modelos de inteligencia artificial.",
        "Sistema de control de calidad que evalúa la precisión de los outputs generados por modelos de IA."
      ],
      correctIndex: 0,
      points: 10,
      feedback: "✅ ¡Exacto! La temperatura es la 'dosis de creatividad'. Para análisis financieros o jurídicos: temperatura 0 (máxima consistencia). Para brainstorming o copywriting: temperatura 0.8+ (más variedad).",
      bestPractice: "🏆 Mejor práctica: En la API de Claude, configura temperatura baja (0-0.3) para tareas de análisis y extracción de datos, y más alta (0.7-1.0) para generación creativa de contenido.",
      tag: "Técnico"
    },
    {
      id: "m1-10",
      prompt: "Agente Autónomo",
      options: [
        "Representante comercial que utiliza herramientas digitales para gestionar cuentas de clientes empresariales.",
        "Software de monitoreo que registra automáticamente el comportamiento de usuarios en plataformas web.",
        "Sistema de IA que puede planificar, tomar decisiones y ejecutar acciones de forma secuencial para completar objetivos complejos sin supervisión humana constante.",
        "Chatbot de servicio al cliente programado con respuestas predefinidas para consultas frecuentes."
      ],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Correcto! Los agentes no solo responden —actúan. Pueden navegar webs, ejecutar código, consultar APIs y encadenar tareas. Son el siguiente nivel de automatización en consultoría.",
      bestPractice: "🏆 Mejor práctica: Implementa agentes para flujos repetitivos de alto volumen: validación de propuestas, extracción de datos de múltiples fuentes, generación mensual de reportes estandarizados.",
      tag: "Aplicaciones"
    },
    {
      id: "m1-11",
      prompt: "Multimodal",
      options: [
        "Estrategia de distribución de contenido a través de múltiples plataformas digitales simultáneamente.",
        "Sistema de transporte que integra diferentes medios (metro, bus, bicicleta) en una sola aplicación.",
        "Capacidad de un modelo de IA para procesar y generar diferentes tipos de datos en una misma interacción: texto, imágenes, audio o video.",
        "Metodología de análisis estadístico que combina datos cuantitativos y cualitativos en investigaciones."
      ],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Exacto! La multimodalidad expande radicalmente las posibilidades. Un modelo multimodal puede analizar gráficos de Excel, interpretar fotografías de campo, leer planos técnicos o transcribir entrevistas.",
      bestPractice: "🏆 Mejor práctica: Aprovecha la multimodalidad para análisis de informes con tablas e imágenes, revisión de contratos escaneados, o análisis de evidencia fotográfica en auditorías de campo.",
      tag: "Capacidades"
    },
    {
      id: "m1-12",
      prompt: "Context Window",
      options: [
        "Interfaz gráfica que muestra el historial de cambios en un repositorio de control de versiones.",
        "Panel de configuración para ajustar los parámetros visuales de una pantalla de computador.",
        "Función de búsqueda contextual en bases de datos que filtra resultados por fecha y relevancia.",
        "Cantidad máxima de texto (en tokens) que un modelo de IA puede procesar y recordar en una sola conversación o solicitud."
      ],
      correctIndex: 3,
      points: 10,
      feedback: "✅ ¡Correcto! El context window es la 'memoria de trabajo' del modelo. Claude tiene ~200K tokens (~150,000 palabras), permitiendo analizar contratos extensos o múltiples documentos en una sola consulta.",
      bestPractice: "🏆 Mejor práctica: Aprovecha el context window amplio cargando todos los documentos relevantes de un proyecto en una sola sesión. Esto da al modelo visión completa para análisis más coherentes.",
      tag: "Técnico"
    },
    {
      id: "m1-13",
      prompt: "Chain-of-Thought (Cadena de Pensamiento)",
      options: [
        "Red de colaboración entre consultores senior para compartir mejores prácticas y casos de estudio.",
        "Sistema de registro de transacciones en cadena para auditorías financieras corporativas.",
        "Técnica de prompting que instruye al modelo a razonar paso a paso antes de dar una respuesta final, mejorando la precisión en tareas complejas.",
        "Protocolo de comunicación encadenada entre múltiples sistemas de inteligencia artificial distribuidos."
      ],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Exacto! El Chain-of-Thought activa patrones de razonamiento más rigurosos. Al pedir al modelo que 'piense en voz alta', mejora significativamente la precisión en análisis complejos.",
      bestPractice: "🏆 Mejor práctica: Añade 'Razona paso a paso antes de responder' o 'Muestra tu proceso de análisis' a prompts de evaluación, diagnóstico o recomendaciones estratégicas complejas.",
      tag: "Técnicas"
    }
  ]
};

// ─────────────────────────────────────────────
// MÓDULO 2A — Principios de Prompting (50 pts, 5 preguntas × 10 pts)
// ─────────────────────────────────────────────
export const module2a: GameModule = {
  id: "module2a",
  title: "Principios del Prompting",
  subtitle: "Lenguaje como superpoder — Parte I",
  description: "Identifica el principio de prompting correcto para cada descripción. Fórmula: Prompt = Instrucciones + Tarea + Persona.",
  color: "purple",
  icon: "✍️",
  gartnerLetter: "A",
  gartnerWord: "Alinear",
  maxPoints: 50,
  questions: [
    {
      id: "m2a-01",
      prompt: "«Actúa como consultor senior de transformación digital con 15 años de experiencia en el sector financiero latinoamericano. Tu tono debe ser estratégico y orientado a C-level.»",
      subtitle: "¿Qué principio de prompting aplica este fragmento?",
      options: ["Iteración", "Claridad", "Rol (Persona)", "Contexto"],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Correcto! Este es el principio de ROL (Persona). Define la identidad y experiencia del asistente para calibrar su perspectiva, nivel técnico y tono de respuesta.",
      bestPractice: "🏆 Mejor práctica: El ROL es el primer elemento de la fórmula Prompt = Instrucciones + Tarea + PERSONA. Un rol bien definido puede cambiar completamente la calidad de la respuesta sin modificar nada más.",
      tag: "Principios"
    },
    {
      id: "m2a-02",
      prompt: "«La empresa cliente tiene 500 empleados, opera en 3 países (Colombia, México y Perú), factura $80M USD anuales y enfrenta una auditoría ISO 27001 en los próximos 60 días.»",
      subtitle: "¿Qué principio de prompting aplica este fragmento?",
      options: ["Claridad", "Contexto", "Instrucciones", "Iteración"],
      correctIndex: 1,
      points: 10,
      feedback: "✅ ¡Exacto! Este es el principio de CONTEXTO. Proporcionar información de fondo relevante (quién, qué, cuándo, por qué) permite al modelo adaptar su respuesta a las particularidades reales del caso.",
      bestPractice: "🏆 Mejor práctica: Sin contexto, el modelo asume el caso más genérico. Regla: incluye QUIÉN es el cliente, QUÉ está pasando, CUÁNDO ocurre y POR QUÉ importa. Más contexto = mejor output.",
      tag: "Principios"
    },
    {
      id: "m2a-03",
      prompt: "«Primero, identifica los 3 principales riesgos de ciberseguridad. Luego, propón una acción mitigadora específica para cada uno. Finalmente, presenta todo en una tabla con columnas: Riesgo | Impacto | Acción | Responsable.»",
      subtitle: "¿Qué principio de prompting aplica este fragmento?",
      options: ["Instrucciones", "Rol", "Contexto", "Claridad"],
      correctIndex: 0,
      points: 10,
      feedback: "✅ ¡Correcto! Este es el principio de INSTRUCCIONES. Indicar los pasos, restricciones y formato esperado es el corazón del prompting efectivo. Los verbos imperativos (identifica, propón, presenta) guían la estructura del output.",
      bestPractice: "🏆 Mejor práctica: Las instrucciones específicas eliminan la ambigüedad. Especifica: ¿cuántos ítems? ¿en qué orden? ¿con qué formato? ¿con qué restricciones? Cuantas más restricciones claras, mejor el resultado.",
      tag: "Principios"
    },
    {
      id: "m2a-04",
      prompt: "«En lugar de 'dame información sobre gestión del cambio', escribe: Resume los 5 factores críticos de éxito para gestión del cambio organizacional en una empresa de manufactura con sindicato activo, usando ejemplos de Colombia.»",
      subtitle: "¿Qué principio de prompting ilustra esta comparación?",
      options: ["Iteración", "Instrucciones", "Rol", "Claridad"],
      correctIndex: 3,
      points: 10,
      feedback: "✅ ¡Exacto! Este es el principio de CLARIDAD. Usar lenguaje preciso, especificar la audiencia, el sector, la cantidad de ítems y las restricciones geográficas elimina toda ambigüedad en la solicitud.",
      bestPractice: "🏆 Mejor práctica: Si tu prompt puede interpretarse de dos formas, el modelo elegirá la más probable según sus patrones —que puede no ser la que necesitas. Sé específico: número, sector, audiencia, geografía, formato.",
      tag: "Principios"
    },
    {
      id: "m2a-05",
      prompt: "«La respuesta anterior fue demasiado general. Concéntrate específicamente en el sector logístico colombiano, usa datos de 2023-2024, y agrega un apartado de riesgos regulatorios.»",
      subtitle: "¿Qué principio de prompting aplica este mensaje de seguimiento?",
      options: ["Claridad", "Contexto", "Rol", "Iteración"],
      correctIndex: 3,
      points: 10,
      feedback: "✅ ¡Correcto! Este es el principio de ITERACIÓN. El prompting efectivo es un proceso de refinamiento progresivo. Cada ajuste basado en el output anterior es una inversión que mejora la calidad del resultado.",
      bestPractice: "🏆 Mejor práctica: Los mejores consultores con IA no obtienen la respuesta perfecta en el primer intento —la construyen en 2-4 iteraciones. Guarda tus mejores prompts iterados como plantillas reutilizables.",
      tag: "Principios"
    }
  ]
};

// ─────────────────────────────────────────────
// MÓDULO 2B — Tipos de Prompts (60 pts, 6 preguntas × 10 pts)
// ─────────────────────────────────────────────
export const module2b: GameModule = {
  id: "module2b",
  title: "Tipos de Prompts",
  subtitle: "Lenguaje como superpoder — Parte II",
  description: "Lee cada ejemplo de prompt y clasifícalo en el tipo correcto. Cada tipo tiene un propósito estratégico diferente.",
  color: "violet",
  icon: "🎯",
  gartnerLetter: "R",
  gartnerWord: "Reconocer",
  maxPoints: 60,
  questions: [
    {
      id: "m2b-01",
      prompt: "«¿Cuáles son las principales oportunidades que la IA puede crear en el sector de consultoría de gestión en América Latina durante los próximos 3 años?»",
      subtitle: "Identifica el tipo de prompt",
      options: ["Generación", "Exploratorio", "Validación", "Decisión"],
      correctIndex: 1,
      points: 10,
      feedback: "✅ ¡Exacto! Es un prompt EXPLORATORIO. Invita al modelo a ampliar el horizonte de posibilidades antes de enfocarse en una solución. Ideal para la fase de descubrimiento al inicio de un proyecto.",
      bestPractice: "🏆 Mejor práctica: Usa prompts Exploratorios al arrancar un proyecto para mapear el espacio de posibilidades. Combínalos con el principio de Iteración para ir afinando hacia áreas específicas.",
      tag: "Tipos de Prompt"
    },
    {
      id: "m2b-02",
      prompt: "«Redacta una propuesta ejecutiva de 2 páginas para implementar un programa de capacitación en IA para el equipo directivo de una firma de abogados con 80 socios. Tono formal, estructura: Contexto → Solución → ROI → Próximos pasos.»",
      subtitle: "Identifica el tipo de prompt",
      options: ["Análisis", "Síntesis", "Generación", "Validación"],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Correcto! Es un prompt de GENERACIÓN. Produce un entregable tangible nuevo: en este caso, una propuesta ejecutiva. Es el tipo más usado en consultoría para crear borradores de documentos.",
      bestPractice: "🏆 Mejor práctica: Los prompts de Generación deben especificar: tipo de documento, extensión aproximada, audiencia, tono y estructura. Cuanto más específico, más usable es el primer borrador.",
      tag: "Tipos de Prompt"
    },
    {
      id: "m2b-03",
      prompt: "«Revisa este análisis de riesgo que preparé. Identifica: 1) supuestos cuestionables, 2) datos que necesitan verificación, 3) perspectivas de stakeholders que no estoy considerando, 4) posibles sesgos en mis conclusiones.»",
      subtitle: "Identifica el tipo de prompt",
      options: ["Validación", "Síntesis", "Decisión", "Exploratorio"],
      correctIndex: 0,
      points: 10,
      feedback: "✅ ¡Exacto! Es un prompt de VALIDACIÓN. Convierte al modelo en un revisor crítico de tu propio trabajo. Es fundamental para el control de calidad antes de presentar un entregable al cliente.",
      bestPractice: "🏆 Mejor práctica: Antes de entregar cualquier informe importante, pásalo por un prompt de Validación. Pide al modelo que 'haga de abogado del diablo' —encontrará huecos que tú no ves por sesgo de confirmación.",
      tag: "Tipos de Prompt"
    },
    {
      id: "m2b-04",
      prompt: "«Analiza estas 5 propuestas de proveedores de software ERP. Compara cada una en: precio total, tiempo de implementación, soporte post-venta, integraciones disponibles y referencias en el sector manufacturero.»",
      subtitle: "Identifica el tipo de prompt",
      options: ["Generación", "Análisis", "Decisión", "Exploratorio"],
      correctIndex: 1,
      points: 10,
      feedback: "✅ ¡Correcto! Es un prompt de ANÁLISIS. Descompone y compara información existente con criterios estructurados. Es el corazón de la consultoría basada en datos.",
      bestPractice: "🏆 Mejor práctica: Los prompts de Análisis son más poderosos cuando defines los criterios de evaluación explícitamente (como en este ejemplo) en lugar de pedir solo 'cuál es mejor'.",
      tag: "Tipos de Prompt"
    },
    {
      id: "m2b-05",
      prompt: "«Lee estas 10 entrevistas con stakeholders del proyecto de transformación digital. Genera un resumen ejecutivo que capture: los 3 principales consensos, las 2 principales tensiones, y las 5 necesidades más urgentes mencionadas.»",
      subtitle: "Identifica el tipo de prompt",
      options: ["Análisis", "Validación", "Síntesis", "Generación"],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Exacto! Es un prompt de SÍNTESIS. Condensa múltiples fuentes en insights accionables. Una de las tareas más valiosas de la IA en consultoría: procesar horas de información en segundos.",
      bestPractice: "🏆 Mejor práctica: La Síntesis brilla cuando tienes información dispersa (entrevistas, encuestas, reportes, notas de campo). Define siempre qué estructura quieres en el output para mayor utilidad.",
      tag: "Tipos de Prompt"
    },
    {
      id: "m2b-06",
      prompt: "«Dados estos 3 escenarios de expansión, con los criterios de: ROI mínimo del 15% en 3 años, tiempo de implementación máximo de 18 meses y riesgo regulatorio bajo — ¿cuál recomiendas y por qué?»",
      subtitle: "Identifica el tipo de prompt",
      options: ["Análisis", "Generación", "Síntesis", "Decisión"],
      correctIndex: 3,
      points: 10,
      feedback: "✅ ¡Correcto! Es un prompt de DECISIÓN. Estructura el razonamiento con criterios explícitos para comparar opciones y recomendar la mejor. Sin criterios claros, el modelo asumirá los más genéricos.",
      bestPractice: "🏆 Mejor práctica: En prompts de Decisión, siempre especifica los criterios con ponderación si es posible (ej. 'el ROI tiene el doble de peso que el tiempo de implementación'). Esto produce recomendaciones más alineadas con las prioridades del cliente.",
      tag: "Tipos de Prompt"
    }
  ]
};

// ─────────────────────────────────────────────
// MÓDULO 3 — Interfaces de IA (75 pts, 5 escenarios × 15 pts)
// ─────────────────────────────────────────────
export const module3: GameModule = {
  id: "module3",
  title: "Interfaces de IA",
  subtitle: "La herramienta correcta para cada reto",
  description: "Cada escenario de consultoría requiere una interfaz de IA diferente. Elige la más adecuada (15 pts si aciertas, 8 pts si eliges la segunda mejor opción).",
  color: "cyan",
  icon: "🛠️",
  gartnerLetter: "T",
  gartnerWord: "Traducir",
  maxPoints: 75,
  questions: [
    {
      id: "m3-01",
      prompt: "Un consultor necesita analizar 35 informes de auditoría (cada uno de 40+ páginas) para extraer patrones de riesgo y generar un diagnóstico consolidado en menos de 2 horas.",
      options: [
        "Chatbot estándar (Claude.ai / ChatGPT)",
        "NotebookLM",
        "API directa con script de Python",
        "Agente Autónomo"
      ],
      correctIndex: 1,
      secondBestIndex: 2,
      points: 15,
      partialPoints: 8,
      feedback: "✅ NotebookLM es ideal aquí. Está diseñado específicamente para cargar múltiples documentos extensos y hacer preguntas analíticas sobre el corpus completo. Puede generar un diagnóstico coherente entre todos los archivos simultáneamente.",
      bestPractice: "🏆 Mejor práctica: La API también funciona pero requiere desarrollo. NotebookLM es la solución 'zero-code' más efectiva para análisis multi-documento de alta fidelidad.",
      tag: "Multi-documento"
    },
    {
      id: "m3-02",
      prompt: "Tu firma está en un proyecto de transformación organizacional de 4 meses. Necesitas que la IA recuerde permanentemente el contexto del cliente, los acuerdos tomados, los documentos del proyecto y el historial de análisis previos.",
      options: [
        "Chatbot estándar (sesión nueva cada vez)",
        "Projects (Claude Projects / GPT Projects)",
        "NotebookLM",
        "Fine-tuning de un modelo base"
      ],
      correctIndex: 1,
      secondBestIndex: 2,
      points: 15,
      partialPoints: 8,
      feedback: "✅ Projects es la solución correcta. Permite crear un proyecto con contexto persistente: documentos del cliente, instrucciones de proyecto, historial de conversaciones anteriores y preferencias de formato, todo disponible en cada sesión.",
      bestPractice: "🏆 Mejor práctica: Crea un Project por cliente activo. Sube el brief del proyecto, los entregables acordados y el perfil del cliente. El modelo 'recuerda' este contexto en cada conversación sin necesidad de repetirlo.",
      tag: "Contexto Persistente"
    },
    {
      id: "m3-03",
      prompt: "El área de operaciones de tu cliente quiere integrar análisis de IA directamente en su CRM. Cada vez que llega una nueva solicitud de servicio, el sistema debe automáticamente clasificarla, priorizar y generar una respuesta borrador.",
      options: [
        "Chatbot estándar (proceso manual)",
        "NotebookLM",
        "API de IA (Claude API / OpenAI API)",
        "Agente Autónomo"
      ],
      correctIndex: 2,
      secondBestIndex: 3,
      points: 15,
      partialPoints: 8,
      feedback: "✅ La API es la respuesta correcta. Para integrar IA en sistemas existentes (CRM, ERP, plataformas web), la integración vía API es el único enfoque que permite automatización real sin intervención humana.",
      bestPractice: "🏆 Mejor práctica: Al proponer integraciones vía API a clientes, especifica: latencia esperada (<2s típicamente), costo por solicitud, y plan de manejo de errores. Los Agentes son una alternativa válida para flujos más complejos.",
      tag: "Integración de Sistemas"
    },
    {
      id: "m3-04",
      prompt: "Tu equipo tiene consultores en Bogotá, Ciudad de México y Lima. Necesitan colaborar con IA en tiempo real durante una sesión de co-creación estratégica: todos viendo el mismo workspace y contribuyendo simultáneamente.",
      options: [
        "Chatbot estándar (uso individual)",
        "Projects (uso asíncrono compartido)",
        "Claude Cowork",
        "API con interfaz personalizada"
      ],
      correctIndex: 2,
      secondBestIndex: 1,
      points: 15,
      partialPoints: 8,
      feedback: "✅ Claude Cowork es la herramienta diseñada para colaboración IA en tiempo real. Permite que múltiples usuarios trabajen simultáneamente en el mismo espacio de trabajo con la IA, ideal para talleres y sesiones de co-creación distribuidas.",
      bestPractice: "🏆 Mejor práctica: Para talleres de estrategia con equipos distribuidos, Cowork permite que todos los participantes vean y contribuyan al mismo hilo de análisis con la IA, eliminando la fragmentación de insights.",
      tag: "Colaboración"
    },
    {
      id: "m3-05",
      prompt: "Tu consultora debe generar 60 informes de desempeño mensuales para clientes. Cada uno requiere: extraer datos de 3 fuentes, calcular KPIs, redactar el análisis narrativo y enviarlo por email al contacto asignado.",
      options: [
        "Chatbot estándar (proceso manual por consultor)",
        "Projects (con plantillas predefinidas)",
        "API de IA con integración de datos",
        "Agentes Autónomos"
      ],
      correctIndex: 3,
      secondBestIndex: 2,
      points: 15,
      partialPoints: 8,
      feedback: "✅ Los Agentes Autónomos son la respuesta correcta. Este flujo requiere múltiples pasos encadenados (extraer → calcular → redactar → enviar) sin intervención humana. Los agentes pueden orquestar todo este proceso de extremo a extremo.",
      bestPractice: "🏆 Mejor práctica: Los Agentes Autónomos justifican su complejidad de implementación cuando el proceso es repetitivo, tiene 5+ pasos, y el volumen es alto. Para 60 informes/mes, el ROI es inmediato vs. el trabajo manual.",
      tag: "Automatización"
    }
  ]
};

// ─────────────────────────────────────────────
// MÓDULO 4 — Casos Prácticos (100 pts, 5 evaluaciones × 20 pts)
// ─────────────────────────────────────────────
export const module4: GameModule = {
  id: "module4",
  title: "Casos Prácticos",
  subtitle: "Evaluación de Prompts — Georreferenciación",
  description: "Una empresa retail necesita identificar las 5 mejores ubicaciones para nuevas tiendas en Colombia. Evalúa cada componente del prompt y selecciona la versión más efectiva.",
  color: "emerald",
  icon: "📍",
  gartnerLetter: "N",
  gartnerWord: "Navegar",
  maxPoints: 100,
  questions: [
    {
      id: "m4-01",
      prompt: "Componente de CONTEXTO: ¿Cuál versión proporciona el mejor contexto para el caso de georreferenciación retail?",
      subtitle: "Caso: Empresa retail con 20 tiendas en Colombia quiere expandirse a ciudades intermedias en 2025.",
      options: [
        "«Dame información sobre dónde abrir tiendas en Colombia.»",
        "«Actúa como experto en geomarketing y expansión retail en LATAM. La empresa tiene 20 tiendas en ciudades principales (Bogotá, Medellín, Cali, Barranquilla), factura $45M USD anuales, su ticket promedio es $85 USD y su cliente objetivo es NSE 3-4 (30-55 años). El objetivo es expandirse a 5 ciudades intermedias en 2025 con inversión de $2M por tienda.»",
        "«Necesito análisis de mercado para el sector retail colombiano.»",
        "«Analiza el mercado retail en Colombia y dime dónde hay oportunidades.»"
      ],
      correctIndex: 1,
      points: 20,
      feedback: "✅ ¡Correcto! El mejor contexto incluye: ROL del asistente, datos específicos del negocio (número de tiendas, facturación, ticket promedio), perfil del cliente objetivo, objetivo concreto y restricciones de inversión. Cada dato elimina una ambigüedad.",
      bestPractice: "🏆 Mejor práctica: El contexto es el 'brief' de consultoría que le das a la IA. La regla: incluye todos los datos que le darías a un analista junior en su primer día de trabajo en el proyecto.",
      tag: "Contexto"
    },
    {
      id: "m4-02",
      prompt: "Componente de VARIABLES Y FUENTES: ¿Qué versión especifica mejor las variables y fuentes de datos para el análisis de georreferenciación?",
      subtitle: "Caso: Selección de ubicaciones óptimas para retail en ciudades intermedias de Colombia.",
      options: [
        "«Usa datos de ventas e información general del mercado colombiano.»",
        "«Considera datos disponibles en internet sobre ciudades colombianas.»",
        "«Integra estas variables ponderadas: población total y crecimiento (15%), NSE 3-4 como % de hogares (25%), flujo peatonal por zona (20%), distancia al competidor más cercano (20%), acceso a transporte masivo (10%), costo promedio de arriendo comercial m² (10%). Fuentes: DANE 2023, Nielsen Retail, datos propios de la empresa.»",
        "«Usa Google Maps y estadísticas del DANE para el análisis.»"
      ],
      correctIndex: 2,
      points: 20,
      feedback: "✅ ¡Exacto! La versión correcta es superior porque: define variables CONCRETAS, les asigna PONDERACIÓN (lo que refleja prioridades del negocio), y especifica las FUENTES de datos. Esto permite al modelo estructurar un análisis real, no genérico.",
      bestPractice: "🏆 Mejor práctica: En análisis de georreferenciación (y cualquier análisis multi-variable), siempre pondéra las variables según su importancia para el negocio. La IA puede ayudarte a definir los pesos si no los tienes claros.",
      tag: "Variables"
    },
    {
      id: "m4-03",
      prompt: "Componente de ENTREGABLE FINAL: ¿Qué versión define mejor el entregable esperado para el análisis de georreferenciación?",
      subtitle: "Caso: El CEO necesita presentar la decisión de expansión a la junta directiva la próxima semana.",
      options: [
        "«Muéstrame los resultados del análisis en un formato claro.»",
        "«Dame las mejores ciudades con su justificación.»",
        "«Genera: 1) Ranking de top-10 ciudades con score ponderado 0-100, 2) Ficha técnica por cada ciudad Top-5: población, NSE, competidores, accesibilidad y riesgo, 3) Mapa de calor de oportunidades por región, 4) Proyección de ventas año 1-3 por ubicación, 5) Matriz de riesgos (político, regulatorio, logístico) por ciudad. Formato: informe ejecutivo de 8 páginas + tabla de decisión para junta directiva.»",
        "«Haz un reporte con las recomendaciones principales.»"
      ],
      correctIndex: 2,
      points: 20,
      feedback: "✅ ¡Correcto! El mejor entregable está especificado en: 1) número exacto de secciones, 2) qué incluye cada sección, 3) tipos de visualizaciones, 4) audiencia (junta directiva), 5) extensión aproximada. Esto elimina toda ambigüedad sobre qué producir.",
      bestPractice: "🏆 Mejor práctica: Define el entregable como si fuera el índice de un informe real. La IA producirá exactamente esa estructura, ahorrándote el 70% del tiempo de maquetación y organización.",
      tag: "Entregable"
    },
    {
      id: "m4-04",
      prompt: "Componente de ROL Y TONO: ¿Qué definición de rol es más efectiva para el análisis de expansión retail?",
      subtitle: "Caso: El análisis será presentado a inversores internacionales con experiencia en retail LATAM.",
      options: [
        "«Eres un asistente de inteligencia artificial general.»",
        "«Actúa como consultor.»",
        "«Eres experto en análisis de mercados.»",
        "«Eres un consultor senior de geomarketing especializado en expansión de retail en mercados emergentes de América Latina, con experiencia en análisis de localización para marcas con presencia en 10+ países. Tu análisis debe tener el rigor metodológico de un informe McKinsey y ser comprensible para una audiencia de inversores internacionales.»"
      ],
      correctIndex: 3,
      points: 20,
      feedback: "✅ ¡Exacto! El mejor rol incluye: especialización específica (geomarketing + retail LATAM), nivel de experiencia (senior), benchmark de calidad (McKinsey), y audiencia objetivo (inversores internacionales). Cada elemento calibra el output.",
      bestPractice: "🏆 Mejor práctica: El 'benchmark de calidad' (ej. 'rigor de McKinsey', 'claridad de Harvard Business Review') es un truco poderoso: activa en el modelo los patrones estilísticos de esos referentes sin necesidad de describirlos.",
      tag: "Rol"
    },
    {
      id: "m4-05",
      prompt: "PROMPT INTEGRADO: ¿Cuál de estos prompts completos es el más efectivo para el caso de georreferenciación retail?",
      subtitle: "Evalúa el prompt completo (Rol + Contexto + Variables + Instrucciones + Entregable).",
      options: [
        "«Analiza dónde debería expandirse una empresa de retail colombiana con 20 tiendas y recomienda 5 ciudades.»",
        "«Eres experto en geomarketing. Una empresa retail con 20 tiendas quiere expandirse. Usa datos del DANE y analiza factores como población, NSE y competencia. Dame un ranking de ciudades con justificación.»",
        "«Eres un consultor de geomarketing senior con experiencia en retail LATAM [Rol]. La empresa tiene 20 tiendas en ciudades principales, factura $45M, ticket promedio $85, cliente objetivo NSE 3-4 [Contexto]. Analiza estas variables ponderadas: NSE (25%), flujo peatonal (20%), distancia competidor (20%), población (15%), transporte (10%), arriendo (10%). Fuentes: DANE, Nielsen [Variables]. Genera: ranking Top-10 ciudades con score, fichas técnicas Top-5, proyección de ventas 3 años, y matriz de riesgos. Formato: informe ejecutivo para junta directiva [Entregable].»",
        "«Necesito un análisis de georreferenciación completo para decidir dónde abrir nuevas tiendas. Incluye todos los factores relevantes y dame una recomendación final con justificación detallada.»"
      ],
      correctIndex: 2,
      points: 20,
      feedback: "✅ ¡Correcto! El prompt C integra perfectamente todos los componentes: ROL específico, CONTEXTO con datos reales, VARIABLES con ponderación, FUENTES identificadas y ENTREGABLE con estructura y audiencia definidas. Es el estándar de un prompt profesional.",
      bestPractice: "🏆 Mejor práctica: El prompt A es el peor (vago). El B es mediocre (faltan ponderaciones y estructura del entregable). El D parece completo pero es ambiguo ('todos los factores relevantes' lo decide el modelo). El C es el estándar profesional.",
      tag: "Prompt Integrado"
    }
  ]
};

// ─────────────────────────────────────────────
// MÓDULO 5 — Decisión Estratégica (200 pts, 4 casos × 50 pts)
// ─────────────────────────────────────────────
export const module5: GameModule = {
  id: "module5",
  title: "Decisión Estratégica",
  subtitle: "Justifica el ROI de la IA en consultoría",
  description: "Cuatro casos de negocio reales. Elige la justificación estratégica más sólida para adoptar IA en cada escenario. Piensa como un director de consultoría.",
  color: "amber",
  icon: "⚡",
  gartnerLetter: "E",
  gartnerWord: "Experimentar",
  maxPoints: 200,
  questions: [
    {
      id: "m5-01",
      prompt: "PRODUCTIVIDAD: Tu consultora tarda 40 horas promedio en generar una propuesta comercial completa. Con IA, este tiempo se reduciría a 8 horas. El comité de inversión te pide una justificación financiera clara.",
      options: [
        "«La IA es una tecnología disruptiva que debemos adoptar para no quedar obsoletos frente a la competencia.»",
        "«Todos nuestros competidores ya están usando IA, por lo que no tenemos opción si queremos mantenernos relevantes.»",
        "«Reducir de 40h a 8h por propuesta (80% menos) libera 32h/propuesta por consultor. A $150/hora, eso es $4,800 en capacidad recuperada por propuesta. Con 15 propuestas al mes, la firma recupera $72,000 mensuales en capacidad — equivalente a contratar 3 consultores adicionales sin el costo fijo de $210,000 anuales.»",
        "«La tecnología siempre mejora la productividad y reduce errores, lo que se traduce en mejor calidad para los clientes.»"
      ],
      correctIndex: 2,
      points: 50,
      feedback: "✅ ¡Correcto! La justificación C es superior porque cuantifica el impacto en términos financieros concretos: horas ahorradas → valor por hora → dinero recuperado → equivalencia en recursos humanos. Esto es lo que convence a un comité de inversión.",
      bestPractice: "🏆 Mejor práctica: Siempre cuantifica el ROI de la IA. La fórmula: (Tiempo ahorrado × Costo/hora × Volumen mensual) = Capacidad recuperada. Compara con el costo de la herramienta. Los números concretos eliminan el debate filosófico sobre 'si la IA vale'.",
      tag: "Productividad"
    },
    {
      id: "m5-02",
      prompt: "VENTAJA COMPETITIVA: Un nuevo competidor lanza análisis predictivos con IA a precios 30% más bajos. Tu firma sigue usando métodos analíticos tradicionales y el cliente comienza a cuestionar el valor de tus tarifas.",
      options: [
        "«Tenemos 20 años de experiencia y relaciones con los clientes que ninguna herramienta de IA puede reemplazar.»",
        "«Debemos reducir nuestros precios para mantenernos competitivos en el mercado.»",
        "«Vamos a especializarnos en los nichos donde la IA todavía no puede competir con el juicio humano.»",
        "«Integrando IA en nuestros análisis, entregamos insights en 72 horas vs. 3 semanas del mercado tradicional, con modelos predictivos calibrados para cada sector. Esto convierte velocidad + especialización en nuestra ventaja diferencial frente a competidores genéricos que solo usan IA como commodity.»"
      ],
      correctIndex: 3,
      points: 50,
      feedback: "✅ ¡Exacto! La respuesta D es la única estrategia ofensiva. Combina la velocidad de la IA con la especialización humana para crear una propuesta de valor que el competidor low-cost no puede replicar. Las otras respuestas son posiciones defensivas o de rendición.",
      bestPractice: "🏆 Mejor práctica: La IA como ventaja competitiva no es solo sobre velocidad —es sobre la combinación única de herramienta + conocimiento experto + contexto del cliente. Eso es imposible de commoditizar.",
      tag: "Ventaja Competitiva"
    },
    {
      id: "m5-03",
      prompt: "TOMA DE DECISIONES: El comité directivo debe recomendar entre 3 propuestas estratégicas para un cliente. Tienen 90 minutos, datos incompletos y presión política entre los directivos involucrados.",
      options: [
        "«Presentar los datos disponibles y hacer una recomendación basada en la experiencia colectiva del equipo.»",
        "«Usar IA para: 1) sintetizar los datos disponibles en 10 minutos, 2) modelar 3 escenarios con sus probabilidades e impactos, 3) identificar los 5 datos faltantes más críticos y cómo obtenerlos en 20 minutos, 4) generar visualizaciones comparativas y 5) proponer criterios objetivos de evaluación para despolitizar la discusión. Decisión informada en 60 minutos, con 30 min libres para alinear.»",
        "«Posponer la decisión hasta tener datos completos y un análisis formal.»",
        "«Contratar un consultor externo especializado para hacer un diagnóstico independiente de las 3 propuestas.»"
      ],
      correctIndex: 1,
      points: 50,
      feedback: "✅ ¡Correcto! La opción B es la única que aprovecha la restricción de tiempo como una oportunidad. La IA no solo acelera el análisis —también introduce criterios objetivos que reducen la influencia política en la decisión, que es el verdadero obstáculo mencionado en el escenario.",
      bestPractice: "🏆 Mejor práctica: La IA en decisiones complejas tiene un segundo beneficio oculto: despolitizar. Cuando los criterios de evaluación los propone un análisis estructurado (no un directivo con agenda), la discusión se vuelve más objetiva.",
      tag: "Toma de Decisiones"
    },
    {
      id: "m5-04",
      prompt: "ESCALABILIDAD: Tu firma tiene 12 consultores y recibe el doble de solicitudes de las que puede atender. Contratar es lento (6 meses de onboarding) y costoso ($80K+ anuales por consultor). Los clientes esperan respuesta en 24h.",
      options: [
        "«Rechazar selectivamente los proyectos menos rentables para mantener la calidad de entrega.»",
        "«Subcontratar el exceso de trabajo a una red de freelancers verificados con experiencia en nuestros sectores.»",
        "«Aumentar los precios para reducir orgánicamente la demanda al nivel que podemos manejar.»",
        "«Implementar IA como 'capa de capacidad aumentada': cada consultor usa IA para manejar la fase de diagnóstico inicial, propuestas estándar y análisis preliminares. Esto permite que cada consultor gestione 2.5x más proyectos sin pérdida de calidad, escalando la firma de 12 a ~30 proyectos simultáneos con el mismo equipo. ROI: $0 en contratación vs. $960K en 12 consultores adicionales.»"
      ],
      correctIndex: 3,
      points: 50,
      feedback: "✅ ¡Exacto! La opción D es la única estrategia de escalabilidad real. Las otras 3 son estrategias de gestión de capacidad limitada (rechazar, subcontratar, filtrar por precio). La IA como multiplicador de capacidad es el pilar de la escalabilidad moderna en servicios profesionales.",
      bestPractice: "🏆 Mejor práctica: El marco de 'consultor aumentado por IA' redefine la unidad de producción. En lugar de medir capacidad en número de consultores, mídela en 'consultores × multiplicador de IA'. El multiplicador típico es 2-3x en tareas de análisis y redacción.",
      tag: "Escalabilidad"
    }
  ]
};

// ─────────────────────────────────────────────
// CONFIGURACIÓN GENERAL DEL JUEGO
// ─────────────────────────────────────────────
export const ALL_MODULES: GameModule[] = [module1, module2a, module2b, module3, module4, module5];

export const MAX_TOTAL_SCORE = 615;

export const MASTERY_LEVELS = [
  {
    level: "Explorador",
    min: 0,
    max: 199,
    color: "from-slate-600 to-slate-700",
    badge: "🧭",
    description: "Estás comenzando a descubrir el territorio de la IA. Tienes las bases conceptuales —ahora es momento de profundizar en la práctica y experimentar más con herramientas reales.",
    nextStep: "Participa en sesiones prácticas de prompting y prueba las herramientas de IA con casos de tu industria."
  },
  {
    level: "Integrador",
    min: 200,
    max: 399,
    color: "from-blue-600 to-purple-700",
    badge: "⚡",
    description: "Tienes una comprensión sólida del ecosistema de IA y puedes integrar herramientas en flujos de trabajo reales. Estás en el punto de inflexión: cada caso aplicado multiplica tu impacto.",
    nextStep: "Identifica los 3 procesos de mayor fricción en tu firma e implementa IA en uno de ellos esta semana."
  },
  {
    level: "Multiplicador",
    min: 400,
    max: 615,
    color: "from-amber-500 to-orange-600",
    badge: "🚀",
    description: "Dominas el Método GARTNER. Puedes diseñar estrategias de adopción de IA, evaluar herramientas con criterio técnico y comunicar el ROI con precisión. Eres un agente de transformación.",
    nextStep: "Lidera un proyecto piloto de IA en tu organización y comparte los resultados para inspirar a otros."
  }
];

export const GARTNER_ACRONYM = [
  { letter: "G", word: "Generar", description: "Genera ideas y posibilidades con IA", module: "module1" },
  { letter: "A", word: "Alinear", description: "Alinea prompts con objetivos estratégicos", module: "module2a" },
  { letter: "R", word: "Reconocer", description: "Reconoce el tipo de herramienta adecuada", module: "module2b" },
  { letter: "T", word: "Traducir", description: "Traduce necesidades en prompts efectivos", module: "module3" },
  { letter: "N", word: "Navegar", description: "Navega casos prácticos con criterio", module: "module4" },
  { letter: "E", word: "Experimentar", description: "Experimenta y toma decisiones estratégicas", module: "module5" },
  { letter: "R", word: "Resultados", description: "Genera resultados medibles con IA", module: "results" }
];
