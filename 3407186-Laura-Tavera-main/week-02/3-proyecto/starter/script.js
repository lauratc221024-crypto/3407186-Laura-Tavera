// ============================================
// PROYECTO SEMANA 02: Ficha de Datos del Dominio
// ============================================


// ============================================
// SECCIÓN 1: DATOS PRINCIPALES
// ============================================

const DOMAIN_NAME = "Sistema de Trazabilidad Agrícola";

const cropName = "Lote de Café Orgánico";   // string
const productionKg = 1_500;                 // number
const isHarvestReady = true;                // boolean
const harvestDate = null;                   // null


// ============================================
// SECCIÓN 2: MOSTRAR FICHA DE DATOS
// ============================================

console.log("===========================");
console.log(`FICHA DE DATOS: ${DOMAIN_NAME}`);
console.log("===========================");

console.log(`Nombre: ${cropName}`);
console.log(`Producción: ${productionKg} kg`);
console.log(`Listo para cosecha: ${isHarvestReady}`);


// ============================================
// SECCIÓN 3: VERIFICACIÓN DE TIPOS
// ============================================

console.log("--- Tipos de datos ---");

console.log("typeof cropName:", typeof cropName);
console.log("typeof productionKg:", typeof productionKg);
console.log("typeof isHarvestReady:", typeof isHarvestReady);


// ============================================
// SECCIÓN 4: CONVERSIONES
// ============================================

console.log("--- Conversiones ---");

const productionText = String(productionKg);

console.log("Producción como texto:", productionText);
console.log("typeof producción string:", typeof productionText);


// ============================================
// SECCIÓN 5: VALOR NULL
// ============================================

console.log("--- Valor nulo ---");

console.log("Fecha de cosecha:", harvestDate);
console.log("¿Es null?:", harvestDate === null);


// ============================================
// CIERRE
// ============================================

console.log("===========================");
console.log("FIN DE FICHA");
console.log("===========================");