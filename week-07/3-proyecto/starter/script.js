// ============================================
// PROYECTO SEMANA 07 — Librería de Funciones
// Dominio: Sistema de Trazabilidad Agrícola
// ============================================

// NOTA PARA EL APRENDIZ:
// Adapta este proyecto a tu dominio asignado.
// Todos los nombres genéricos (item, value, category, etc.)
// deben reemplazarse con nombres específicos de tu dominio.
//
// Ejemplos de adaptación:
// - Biblioteca: book, author, available, fine
// - Farmacia: medicine, price, stock, laboratory
// - Gimnasio: member, plan, active, bmi
// - Restaurante: dish, price, available, category
// - Banco: account, balance, interest, active
// - Hospital: patient, age, hasAppointment, doctor

"use strict"; // activa el modo estricto — mejores errores

// ============================================
// SECCIÓN 1: Constantes y datos del dominio
// ============================================

// TODO: Define las constantes globales de tu dominio
const DOMAIN_NAME = "Trazabilidad Agrícola";
const VALUE_LABEL = "costo"; // Ej: "precio", "cantidad", "duración"

// TODO: Define un array con al menos 5 elementos de tu dominio.
const items = [
  { id: 1, name: "Café", category: "Grano", value: 5000, active: true },
  { id: 2, name: "Papa", category: "Tubérculo", value: 2000, active: true },
  { id: 3, name: "Tomate", category: "Hortaliza", value: 3000, active: false },
  { id: 4, name: "Banano", category: "Fruta", value: 2500, active: true },
  { id: 5, name: "Maíz", category: "Cereal", value: 1800, active: false }
];

// ============================================
// SECCIÓN 2: Función de formato
// ============================================

const formatItem = (item) => {
  // TODO: Implementar usando template literals
  return `🌱 ${item.name} [${item.category}] — $${item.value}`;
};

// ============================================
// SECCIÓN 3: Función de cálculo (pura)
// ============================================

const calculateValue = (baseValue, factor = 1) => {
  // TODO: Implementar el cálculo relevante para tu dominio
  return baseValue * factor;
};

// ============================================
// SECCIÓN 4: Función de validación
// ============================================

const isValid = (item) => {
  // TODO: Implementar la condición de validez de tu dominio
  return item.active === true;
};

// ============================================
// SECCIÓN 5: Función con parámetro por defecto
// ============================================

const formatWithDefault = (value, label = VALUE_LABEL, currency = "COP") => {
  // TODO: Implementar con parámetros por defecto relevantes al dominio
  return currency
    ? `${label}: ${currency} ${value}`
    : `${label}: ${value}`;
};

// ============================================
// SECCIÓN 6: Reporte usando las funciones
// ============================================

console.log(`\n${"═".repeat(45)}`);
console.log(`   REPORTE — ${DOMAIN_NAME}`);
console.log(`${"═".repeat(45)}`);

// TODO: Reemplaza este código de ejemplo con la implementación real

if (items.length === 0) {
  console.log("\n⚠️  No hay elementos. Agrega datos en la Sección 1.");
} else {
  // --- Listado ---
  console.log("\n📋 Listado:");
  let lineNumber = 1;
  for (const item of items) {
    // TODO: Usa formatItem(item) para mostrar cada elemento
    console.log(`  ${lineNumber}. ${formatItem(item)}`);
    lineNumber++;
  }

  // --- Validación ---
  let validCount = 0;
  for (const item of items) {
    // TODO: Usa isValid(item) para contar los válidos
    if (isValid(item)) {
      validCount++;
    }
  }
  console.log(`\n✅ Elementos válidos: ${validCount} / ${items.length}`);

  // --- Cálculo ---
  let totalValue = 0;
  for (const item of items) {
    // TODO: Usa calculateValue() con las propiedades de tu item
    totalValue += calculateValue(item.value ?? 0);
  }
  console.log(formatWithDefault(totalValue, `Total ${VALUE_LABEL}`));
}

console.log(`\n${"═".repeat(45)}\n`);