// ============================================
// PROYECTO SEMANA 04: Generador de Mensajes
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// Nombre del dominio
const DOMAIN_NAME = "Sistema de Trazabilidad Agrícola";

// Nombre de la entidad principal
const rawEntityName = "  lote de maiz amarillo  ";

// Categoría o tipo
const entityCategory = "Cultivo agrícola";

// Código identificador
const entityCode = "LOT-001";

// Descripción corta
const entityDescription = "Lote agrícola registrado en el sistema de trazabilidad para control de producción y calidad.";

// Dato numérico relevante
const mainValue = 1500;

// Estado booleano
const isActive = true;


// ============================================
// SECCIÓN 2: Transformaciones de string
// ============================================

// Limpiar el nombre
const entityName = rawEntityName.trim();

// Nombre en mayúsculas
const entityNameUpper = entityName.toUpperCase();

// Nombre en minúsculas
const entityNameLower = entityName.toLowerCase();

// Prefijo del código
const codePrefix = entityCode.slice(0, 3);


// ============================================
// SECCIÓN 3: Validaciones con búsqueda
// ============================================

// Verificar si el código empieza con el prefijo
const hasValidPrefix = entityCode.startsWith(codePrefix);

// Verificar si la descripción contiene una palabra clave
const descriptionIsRelevant = entityDescription.includes("trazabilidad");

// Verificar si el código termina con los dígitos
const hasValidSuffix = entityCode.endsWith("001");


// ============================================
// SECCIÓN 4: Generación de la ficha principal
// ============================================

const separator = "=".repeat(45);
const subSeparator = "-".repeat(45);

const mainCard = `
${separator}
  ${DOMAIN_NAME.toUpperCase()} — FICHA DE ENTIDAD
${separator}
Nombre:      ${entityNameUpper}
Categoría:   ${entityCategory}
Código:      ${entityCode}
Prefijo:     ${codePrefix}
Valor:       ${mainValue}
Estado:      ${isActive ? "Activo" : "Inactivo"}

${subSeparator}
Descripción:
${entityDescription}
${separator}
`;

console.log(mainCard);


// ============================================
// SECCIÓN 5: Validaciones
// ============================================

console.log("--- Validaciones ---");

console.log(`¿Código empieza con '${codePrefix}'?: ${hasValidPrefix}`);
console.log(`¿Descripción contiene 'trazabilidad'?: ${descriptionIsRelevant}`);
console.log(`¿Código termina con '001'?: ${hasValidSuffix}`);

console.log("");


// ============================================
// SECCIÓN 6: Mensaje de notificación corto
// ============================================

console.log("--- Notificación ---");

const notification = `📢 Nuevo lote registrado: ${entityName} (${entityCode})`;

console.log(notification);
console.log("");