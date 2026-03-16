// ============================================
// PROYECTO SEMANA 03: Calculadora de Dominio
// Sistema de Trazabilidad Agrícola
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

// Constantes del sistema agrícola
// Precio por kilo del producto
const PRICE_PER_KG = 3_000;

// Producción del lote en kilos
const LOT_KG = 1_000;

// Capacidad máxima del almacén
const MAX_STORAGE = 5_000;


// ============================================
// SECCIÓN 2: Operaciones aritméticas
// ============================================
console.log("=== Operaciones básicas ===");

// Calcular el valor total del lote cosechado
const totalValue = PRICE_PER_KG * LOT_KG;
console.log("Valor total del lote:", totalValue);

// Calcular espacio restante en el almacén
const remainingStorage = MAX_STORAGE - LOT_KG;
console.log("Espacio restante:", remainingStorage);

// Calcular promedio de producción en 5 parcelas
const averageProduction = LOT_KG / 5;
console.log("Promedio por parcela:", averageProduction);

// Calcular kilos sobrantes al empacar en cajas de 200 kg
const remainingKg = LOT_KG % 200;
console.log("Kilos sobrantes:", remainingKg);

console.log("");


// ============================================
// SECCIÓN 3: Asignación compuesta
// ============================================
console.log("=== Asignación compuesta ===");

// Ingresos acumulados por venta de lotes
let totalRevenue = 0;

totalRevenue += 3_000_000;
console.log("Ingreso después del primer lote:", totalRevenue);

totalRevenue += 2_500_000;
console.log("Ingreso después del segundo lote:", totalRevenue);

// Aplicar descuento del 5%
totalRevenue *= 0.95;
console.log("Ingreso con descuento:", totalRevenue);

console.log("");


// ============================================
// SECCIÓN 4: Comparación estricta
// ============================================
console.log("=== Validaciones con === ===");

// Estado del lote en el sistema
const lotStatus = "registrado";

// Verificar si el lote está registrado en el sistema
const isRegistered = lotStatus === "registrado";
console.log("¿Lote registrado?", isRegistered);

// Verificar si la producción es mayor a 800 kg
const highProduction = LOT_KG > 800;
console.log("¿Producción alta?", highProduction);

console.log("");


// ============================================
// SECCIÓN 5: Operadores lógicos
// ============================================
console.log("=== Condiciones lógicas ===");

// Condiciones del lote
const hasCertification = true;
const passedInspection = true;

// Puede exportarse si tiene certificación y pasó inspección
const canExport = hasCertification && passedInspection;
console.log("¿Puede exportarse?", canExport);

// Puede venderse si cumple al menos una condición
const canSell = hasCertification || passedInspection;
console.log("¿Puede venderse?", canSell);

// Negación
const noCertification = !hasCertification;
console.log("¿No tiene certificación?", noCertification);

console.log("");


// ============================================
// SECCIÓN 6: Resumen final
// ============================================
console.log("=== Resumen ===");

console.log("Producción del lote:", LOT_KG);
console.log("Valor del lote:", totalValue);
console.log("Ingresos acumulados:", totalRevenue);
console.log("Espacio disponible:", remainingStorage);

console.log("");