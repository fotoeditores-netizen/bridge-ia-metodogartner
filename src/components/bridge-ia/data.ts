// Cracks de IA — Simulador del Método GARTNER
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
      prompt: "Modelo de IA",
      options: [
        "Plataforma de software con interfaz conversacional que permite a los usuarios interactuar con tecnología de inteligencia artificial mediante mensajes de texto en tiempo real.",
        "El motor que corre por detrás de las interfaces. ChatGPT, Gemini y Claude son interfaces; GPT-4, Gemini 2.5 y Claude Sonnet son los modelos que procesan y generan las respuestas.",
        "Sistema de almacenamiento en la nube que guarda el historial de conversaciones y preferencias del usuario para personalizar las respuestas de inteligencia artificial.",
        "Protocolo de integración que permite conectar diferentes herramientas de inteligencia artificial con aplicaciones empresariales mediante interfaces de programación estandarizadas."
      ],
      correctIndex: 1,
      points: 10,
      feedback: "✅ ¡Exacto! El modelo es el motor real de la IA —no la interfaz que ves. Claude.ai, ChatGPT y Gemini son las interfaces (la 'pantalla'); Claude Sonnet, GPT-4 y Gemini 2.5 son los modelos que hacen el trabajo. Es una distinción clave para elegir la herramienta correcta.",
      bestPractice: "🏆 Mejor práctica: Cuando evalúes herramientas de IA para un cliente, pregunta siempre qué modelo corre por detrás. Dos interfaces distintas pueden usar el mismo modelo —y dos interfaces idénticas pueden dar resultados muy diferentes si usan modelos distintos.",
      tag: "Conceptos Base"
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
      prompt: "Gobernanza de IA",
      options: [
        "Sistema de administración de licencias de software de inteligencia artificial que regula el acceso y uso de herramientas por parte de empleados en organizaciones empresariales.",
        "Proceso de auditoría técnica de los modelos de IA para verificar la precisión de sus respuestas antes de implementarlos en entornos de producción empresarial.",
        "Marco de políticas, procesos y responsabilidades que una organización establece para el uso responsable, seguro y alineado con sus valores de los sistemas de inteligencia artificial.",
        "Protocolo de comunicación entre diferentes sistemas de inteligencia artificial para garantizar la interoperabilidad y el intercambio seguro de datos entre plataformas."
      ],
      correctIndex: 2,
      points: 10,
      feedback: "✅ ¡Correcto! La Gobernanza de IA es el conjunto de reglas, procesos y responsabilidades que una organización define para usar la IA de forma responsable. Incluye quién puede usar qué herramientas, qué datos pueden compartirse, cómo se revisan los outputs y quién responde por los errores.",
      bestPractice: "🏆 Mejor práctica: Toda firma consultora necesita una política de Gobernanza de IA antes de usar estas herramientas con clientes. Define: qué herramientas están aprobadas, qué datos del cliente pueden ingresarse, cómo se validan los outputs y cómo se comunica el uso de IA. Sin gobernanza, el riesgo reputacional y legal es alto.",
      tag: "Gobernanza"
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
      subtitle: "Caso: Empresa retail con 20 tiendas en Colombia quiere expandirse a ciudades intermedias en 2026.",
      options: [
        "«Dame información actualizada sobre el mercado retail en Colombia y dime cuáles son las ciudades con mayor potencial para abrir nuevas tiendas. Incluye los principales factores que debo considerar para tomar la mejor decisión de expansión del negocio.»",
        "«Actúa como experto en geomarketing y expansión retail en LATAM. La empresa tiene 20 tiendas en ciudades principales (Bogotá, Medellín, Cali, Barranquilla), factura $45M USD anuales, su ticket promedio es $85 USD y su cliente objetivo es NSE 3-4 (30-55 años). El objetivo es expandirse a 5 ciudades intermedias en 2026 con inversión de $2M por tienda.»",
        "«Necesito que realices un análisis completo del sector retail colombiano. Incluye las tendencias del mercado en los últimos años, el comportamiento del consumidor en diferentes regiones y las oportunidades de expansión más relevantes para una empresa establecida que busca crecer a nuevas ciudades.»",
        "«Analiza el mercado retail colombiano usando todas las fuentes de información disponibles. Identifica las ciudades con mayor potencial de crecimiento para nuevas tiendas, evalúa la competencia en cada mercado y proporciona una recomendación completa sobre dónde abrir las nuevas ubicaciones con la mayor probabilidad de éxito.»"
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
        "«Para el análisis, usa los datos de ventas históricos de la empresa y la información general disponible sobre el mercado colombiano. Considera los indicadores económicos más relevantes del sector retail y las tendencias de consumo en Colombia que puedan influir en la selección de ubicaciones para nuevas tiendas.»",
        "«Considera toda la información disponible en internet sobre las principales ciudades colombianas: población, desarrollo económico, presencia de centros comerciales y dinámica del comercio en cada zona. Con esta base de datos pública podrás identificar qué ciudades tienen las mejores condiciones para la expansión del negocio retail.»",
        "«Integra estas variables ponderadas: población total y crecimiento (15%), NSE 3-4 como % de hogares (25%), flujo peatonal por zona (20%), distancia al competidor más cercano (20%), acceso a transporte masivo (10%), costo promedio de arriendo comercial m² (10%). Fuentes: DANE 2023, Nielsen Retail, datos propios de la empresa.»",
        "«Usa Google Maps para analizar la distribución geográfica del comercio en cada ciudad candidata y combínalo con las estadísticas del DANE sobre población y nivel socioeconómico. Esta combinación de herramientas de fácil acceso permite hacer un análisis rápido y suficientemente preciso para tomar la decisión de expansión.»"
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
        "«Una vez finalizado el análisis, muéstrame los resultados en un formato claro y fácil de entender. Incluye las principales conclusiones y las ciudades recomendadas con su respectiva justificación, organizado de manera que pueda presentarse directamente a los tomadores de decisión de la empresa.»",
        "«Dame un listado de las mejores ciudades para abrir nuevas tiendas con su justificación respectiva. Para cada ciudad recomendada, explica brevemente por qué representa una buena oportunidad de expansión y qué factores la hacen atractiva para el perfil de clientes y el modelo de negocio de la empresa.»",
        "«Genera: 1) Ranking de top-10 ciudades con score ponderado 0-100, 2) Ficha técnica por cada ciudad Top-5: población, NSE, competidores, accesibilidad y riesgo, 3) Mapa de calor de oportunidades por región, 4) Proyección de ventas año 1-3 por ubicación, 5) Matriz de riesgos (político, regulatorio, logístico) por ciudad. Formato: informe ejecutivo de 8 páginas + tabla de decisión para junta directiva.»",
        "«Prepara un reporte ejecutivo con las principales recomendaciones del análisis de georreferenciación. El documento debe incluir las ciudades seleccionadas, los argumentos que sustentan cada recomendación y un resumen ejecutivo que permita al equipo directivo revisar y validar la decisión de expansión en la próxima reunión.»"
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
        "«Eres un asistente de inteligencia artificial con acceso a información amplia sobre múltiples temas, incluyendo negocios, economía y análisis de mercados. Tienes capacidad para procesar grandes volúmenes de información y generar análisis objetivos basados en los datos que se te proporcionen para este proyecto.»",
        "«Actúa como un consultor de negocios con experiencia en el sector retail y conocimiento del mercado latinoamericano. Analiza la situación de expansión de la empresa con criterio profesional, considera los factores más relevantes del mercado colombiano y proporciona recomendaciones basadas en las mejores prácticas del sector.»",
        "«Eres un experto en análisis de mercados con conocimiento en investigación de consumidores, evaluación de competencia y dinámica comercial en distintas regiones. Aplica tu conocimiento para evaluar el potencial de expansión retail en Colombia, considerando los factores de mercado más relevantes para el sector.»",
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
        "«Analiza el mercado retail colombiano y recomienda las 5 mejores ciudades para que una empresa con 20 tiendas en ciudades principales pueda expandirse. Considera los factores económicos y demográficos más importantes, y proporciona una justificación sólida para cada ciudad recomendada que permita tomar la decisión de expansión con confianza.»",
        "«Eres experto en geomarketing. Una empresa retail con 20 tiendas quiere expandirse a ciudades intermedias en Colombia. Usa datos del DANE y analiza los factores más relevantes como población, nivel socioeconómico y presencia de competidores. Con base en este análisis, genera un ranking de las mejores ciudades con la justificación de cada recomendación.»",
        "«Eres un consultor de geomarketing senior con experiencia en retail LATAM [Rol]. La empresa tiene 20 tiendas en ciudades principales, factura $45M, ticket promedio $85, cliente objetivo NSE 3-4 [Contexto]. Analiza estas variables ponderadas: NSE (25%), flujo peatonal (20%), distancia competidor (20%), población (15%), transporte (10%), arriendo (10%). Fuentes: DANE, Nielsen [Variables]. Genera: ranking Top-10 ciudades con score, fichas técnicas Top-5, proyección de ventas 3 años, y matriz de riesgos. Formato: informe ejecutivo para junta directiva [Entregable].»",
        "«Necesito un análisis completo de georreferenciación para identificar las mejores ubicaciones donde abrir nuevas tiendas en Colombia. Por favor incluye todos los factores que sean relevantes para este tipo de decisión, evalúa las principales alternativas disponibles y proporciona una recomendación final con una justificación detallada que respalde la decisión de expansión.»"
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
  subtitle: "El consultor en acción — situaciones reales",
  description: "Cuatro situaciones reales que enfrentan los consultores con IA. Elige la decisión más inteligente y profesional en cada escenario.",
  color: "amber",
  icon: "⚡",
  gartnerLetter: "E",
  gartnerWord: "Experimentar",
  maxPoints: 200,
  questions: [
    {
      id: "m5-01",
      prompt: "VERIFICACIÓN DE CIFRAS: La IA te entregó un informe con 47 datos cuantitativos. Tienes 2 horas antes de la presentación con el cliente. ¿Cuál es la estrategia de verificación más inteligente?",
      options: [
        "Verificar las 47 cifras una por una usando fuentes primarias: esta es una responsabilidad profesional no negociable. Presentar datos sin verificar podría comprometer la credibilidad de la firma y exponer al cliente a decisiones basadas en información incorrecta. El tiempo adicional invertido es una inversión en calidad que ningún cliente cuestiona.",
        "Identificar y verificar únicamente las 5 a 7 cifras que sostienen las conclusiones principales del análisis. Las cifras secundarias o de contexto pueden marcarse como 'estimaciones de referencia'. Esto concentra el esfuerzo donde mayor impacto tiene y permite entregar con integridad profesional en el tiempo disponible.",
        "Presentar el informe incluyendo una nota al pie que indique que los datos fueron generados por IA y están sujetos a verificación posterior. Esto gestiona la expectativa del cliente de forma transparente, no compromete el cronograma del proyecto y traslada la responsabilidad de validación al propio cliente si decide actuar con ellos.",
        "Solicitar a la misma IA que auto-verifique sus cifras consultando sus propias fuentes de entrenamiento. Si el modelo confirma los datos con alta confianza, el riesgo de error es bajo y la presentación puede proceder sin demoras. Es eficiente y aprovecha la capacidad de autocorrección de los modelos actuales."
      ],
      correctIndex: 1,
      points: 50,
      feedback: "✅ ¡Correcto! Verificar todas las 47 cifras es impracticable en 2 horas (opción A). Pedir a la IA que se auto-verifique es inútil —no tiene acceso a fuentes externas en tiempo real y no detecta sus propias alucinaciones (opción D). La nota al pie traslada el riesgo al cliente sin resolver el problema real (opción C). La estrategia correcta: verificar las cifras clave que sustentan tus conclusiones, priorizando por impacto en la decisión.",
      bestPractice: "🏆 Mejor práctica: Aplica el principio 80/20 a la verificación. El 20% de los datos —los que sostienen tus conclusiones principales— representa el 80% del riesgo. Verifica esos primero, siempre con fuentes primarias. Las cifras de contexto pueden indicarse como 'estimaciones de referencia' sin comprometer la integridad del análisis.",
      tag: "Verificación"
    },
    {
      id: "m5-02",
      prompt: "TRANSPARENCIA PROFESIONAL: En una reunión de avance, el Director General de tu cliente te pregunta directamente: '¿Están usando inteligencia artificial en este proyecto?' ¿Cómo respondes?",
      options: [
        "Responder que el equipo utiliza 'herramientas tecnológicas avanzadas de análisis de datos' que optimizan los tiempos de entrega. Esta formulación es técnicamente precisa, evita el debate sobre IA que podría generar desconfianza en el cliente, y permite continuar el proyecto sin comprometer la dinámica de la relación comercial con el cliente.",
        "Confirmar que sí se usa IA, pero aclarar que solo para tareas menores como formateo y búsqueda de información básica. De esta manera se gestiona la percepción sin revelar el alcance completo del uso, protegiendo el valor percibido de la consultoría y evitando preguntas incómodas sobre la tarifa cobrada versus el tiempo real invertido.",
        "Responder: 'Desde luego. Somos expertos en el uso responsable de IA y la integramos en nuestra metodología de trabajo. Esto nos permite ir más rápido y más profundo en el análisis, pero cada insight es validado y respaldado por nuestro criterio profesional y una metodología con gobernanza clara.'",
        "Explicar que por políticas de confidencialidad de la firma no se puede revelar las herramientas específicas que se usan en los proyectos, pero que los estándares de calidad y los entregables acordados están plenamente garantizados según los términos del contrato firmado con el cliente."
      ],
      correctIndex: 2,
      points: 50,
      feedback: "✅ ¡Correcto! La opción C es la única que responde con transparencia total, convierte el uso de IA en una fortaleza competitiva y mantiene la confianza del cliente. Las opciones A, B y D son evasivas o directamente engañosas —lo que hoy se llama 'AI-washing'. La transparencia con gobernanza no debilita tu posición como consultor; la fortalece y diferencia.",
      bestPractice: "🏆 Mejor práctica: La transparencia sobre el uso de IA es una ventaja competitiva, no una vulnerabilidad. Prepara una 'declaración de metodología IA' para tu firma: qué herramientas usan, cómo validan los outputs, qué garantías ofrecen. Los clientes sofisticados valoran el rigor metodológico y la honestidad; el secretismo genera desconfianza cuando eventualmente se descubre.",
      tag: "Ética Profesional"
    },
    {
      id: "m5-03",
      prompt: "IA COMO ESPEJO ESTRATÉGICO: Llevas 3 horas trabajando en una propuesta de estrategia para un cliente complejo y estás bloqueado: tienes los datos pero no logras armar un argumento coherente. ¿Cuál es el uso más inteligente de la IA en este momento?",
      options: [
        "Pedirle a la IA que genere la estrategia completa a partir de los datos disponibles. Así se rompe el bloqueo de inmediato: el modelo puede procesar toda la información y proponer una estructura lógica que el consultor luego puede refinar, ajustar al contexto del cliente y presentar con el juicio profesional como valor agregado.",
        "Pedirle a la IA que te formule las 5 preguntas más críticas que un cliente experto y exigente te haría sobre la propuesta que estás construyendo. Esto activa el pensamiento crítico, identifica los huecos en tu argumento y te obliga a fortalecer la lógica antes de seguir construyendo la propuesta.",
        "Buscar en bases de datos de consultoría estrategias similares aplicadas a clientes con características parecidas. Usar estos casos como referencia y adaptarlos con los datos específicos del cliente actual es una práctica estándar en el sector que acelera la producción sin comprometer la calidad del entregable.",
        "Pausar el trabajo individual y convocar una sesión de revisión con el equipo de proyecto. El bloqueo puede ser síntoma de que el enfoque analítico no es el correcto, y la perspectiva colectiva de otros consultores puede revelar ángulos que no se están considerando desde la visión individual del analista principal."
      ],
      correctIndex: 1,
      points: 50,
      feedback: "✅ ¡Correcto! La opción B usa la IA como 'espejo crítico' en lugar de como ejecutor. La pregunta clave —¿qué cuestionaría un cliente experto?— revela rápidamente los huecos en el razonamiento que el bloqueo estaba ocultando. La opción A genera dependencia intelectual y puede desprofesionalizar el entregable. Las opciones C y D pueden complementar, pero no resuelven el bloqueo estratégico central.",
      bestPractice: "🏆 Mejor práctica: Usa la IA como socio crítico, no como co-autor. 'Hazme las 5 preguntas más duras que un cliente exigente haría sobre esta propuesta' es uno de los prompts más poderosos en consultoría estratégica. Te da perspectiva externa instantánea y sin el sesgo de confirmación que acumulas tras horas trabajando en el mismo problema.",
      tag: "IA como Espejo"
    },
    {
      id: "m5-04",
      prompt: "EXPERTO GUÍA, IA POTENCIA: Tienes un proyecto de análisis sectorial complejo que requiere la participación de un especialista con 20 años de experiencia en el sector. ¿Cuál es la mejor manera de integrar la IA en este contexto?",
      options: [
        "Usar principalmente la IA para hacer el análisis más rápido y reducir el tiempo del especialista al mínimo indispensable. La IA puede acceder a más datos en menos tiempo que el experto, lo que maximiza el ROI del proyecto, reduce el costo por hora de consultoría y permite ofrecer tarifas más competitivas al cliente sin comprometer la profundidad del análisis.",
        "El experto lidera y estructura el análisis con su criterio y experiencia acumulada; la IA se usa para acelerar la recolección de información, sintetizar grandes volúmenes de datos y generar comparativos sectoriales. El juicio experto define qué es relevante e interpreta las conclusiones; la IA amplifica la capacidad de procesamiento.",
        "Que el especialista realice el análisis completo sin integrar IA, para preservar la integridad metodológica y el valor diferencial del conocimiento experto. La IA puede introducir ruido, sesgos y posibles alucinaciones que comprometerían la solidez de las conclusiones en un proyecto que exige el más alto nivel de rigor técnico.",
        "Dividir el trabajo en dos flujos paralelos independientes: el especialista hace su análisis usando su metodología tradicional, mientras la IA realiza un análisis separado con los mismos datos disponibles. Al final se comparan los outputs y se consolida el informe final con las coincidencias más relevantes y las diferencias más significativas entre ambos enfoques."
      ],
      correctIndex: 1,
      points: 50,
      feedback: "✅ ¡Correcto! La opción B es el modelo de 'consultor aumentado': el experto define el qué y el por qué; la IA acelera el cómo. Minimizar al experto (opción A) es un error crítico —su juicio es precisamente lo que da valor e irreplicabilidad al análisis. Excluir la IA (opción C) desperdicia capacidad disponible. Dos análisis paralelos (opción D) duplica el trabajo sin crear verdadera sinergia entre las partes.",
      bestPractice: "🏆 Mejor práctica: El modelo correcto es Experto + IA = 1+1 > 2. El experto define el marco analítico, las variables críticas y la interpretación final de los resultados. La IA maneja volumen, velocidad y comparativos exhaustivos. Este modelo entrega el rigor y credibilidad del especialista con la escala y velocidad de la IA —una combinación que ninguno puede lograr solo.",
      tag: "Colaboración Experto-IA"
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
