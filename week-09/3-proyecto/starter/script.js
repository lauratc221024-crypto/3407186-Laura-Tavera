// ============================================
// PROYECTO SEMANA 09: Catálogo de Elementos
// ============================================
//
// INSTRUCCIONES:
// 1. Define tu dominio en DOMAIN_NAME y VALUE_LABEL
// 2. Completa el array `items` con datos de tu dominio
// 3. Implementa cada función siguiendo los TODOs
// 4. Ejecuta con: node script.js
//
// Tu catálogo debe tener:
//   - Mínimo 6 objetos con al menos 5 propiedades cada uno
//   - Al menos 1 propiedad numérica, 1 booleana y 1 opcional
// ============================================

// ============================================
// CONFIGURACIÓN DEL DOMINIO
// ============================================

const DOMAIN_NAME = "Trazabilidad Agrícola";
const VALUE_LABEL = "productos";

// ============================================
// DATOS DEL CATÁLOGO
// ============================================

const items = [
  { id: 1, name: "Café", category: "Grano", origin: "Finca A", value: 5000, active: true, organic: true },
  { id: 2, name: "Papa", category: "Tubérculo", origin: "Finca B", value: 2000, active: true },
  { id: 3, name: "Tomate", category: "Hortaliza", origin: "Finca C", value: 3000, active: false, organic: false },
  { id: 4, name: "Banano", category: "Fruta", origin: "Finca D", value: 2500, active: true },
  { id: 5, name: "Maíz", category: "Cereal", origin: "Finca E", value: 1800, active: false },
  { id: 6, name: "Arroz", category: "Cereal", origin: "Finca F", value: 2200, active: true }
];

// ============================================
// INSPECCIÓN CON Object.*
// ============================================

const inspectItem = (item) => {
  console.log(`\n📋 Detalle de: ${item.name}`);
  Object.entries(item).forEach(([key, value]) => {
    console.log(`${key.padEnd(12)}: ${value}`);
  });
};

const calculateStats = (numericKey) => {
  const values = items.map(item => item[numericKey]);
  const total = values.reduce((acc, val) => acc + val, 0);
  const avg = total / values.length;
  const max = Math.max(...values);
  const min = Math.min(...values);

  console.log(`\n📊 Estadísticas (${numericKey}):`);
  console.log(`Total: ${total}`);
  console.log(`Promedio: ${avg}`);
  console.log(`Máximo: ${max}`);
  console.log(`Mínimo: ${min}`);
};

// ============================================
// VERIFICACIÓN CON Object.hasOwn()
// ============================================

const showWithOptionals = (item) => {
  console.log(`\n→ ${item.name}`);
  console.log(`Categoría: ${item.category}`);
  console.log(`Origen: ${item.origin}`);
  console.log(`Costo: ${item.value}`);

  if (Object.hasOwn(item, "organic")) {
    console.log(`Orgánico: ${item.organic}`);
  }
};

// ============================================
// ITERACIÓN CON for...in
// ============================================

const printAllProperties = (item) => {
  console.log(`\n🔍 Propiedades de "${item.name}":`);
  for (const key in item) {
    if (Object.hasOwn(item, key)) {
      console.log(`${key}: ${item[key]}`);
    }
  }
};

// ============================================
// SPREAD OPERATOR
// ============================================

const updateItem = (item, changes) => {
  return { ...item, ...changes };
};

// ============================================
// OPERACIONES CON EL ARRAY
// ============================================

const getAvailable = () => {
  return items.filter(item => item.active === true);
};

const findById = (id) => {
  return items.find(item => item.id === id);
};

const addCalculatedProp = () => {
  return items.map(item => ({
    ...item,
    valueWithTax: item.value * 1.1
  }));
};

const sortByNumericProp = (ascending = true) => {
  return [...items].sort((a, b) => 
    ascending ? a.value - b.value : b.value - a.value
  );
};

// ============================================
// REPORTE FINAL
// ============================================

const buildReport = () => {
  console.log("\n" + "=".repeat(50));
  console.log(`📦 CATÁLOGO: ${DOMAIN_NAME.toUpperCase()}`);
  console.log("=".repeat(50));

  console.log(`Total productos: ${items.length}`);

  const available = getAvailable().length;
  console.log(`Activos: ${available} | Inactivos: ${items.length - available}`);

  calculateStats("value");

  console.log("\n📋 Listado ordenado:");
  sortByNumericProp().forEach(item => {
    console.log(`${item.name} — $${item.value}`);
  });

  const sorted = sortByNumericProp();
  console.log(`\nMayor valor: ${sorted[sorted.length - 1].name}`);
  console.log(`Menor valor: ${sorted[0].name}`);

  console.log("=".repeat(50));
};

// ============================================
// EJECUCIÓN PRINCIPAL
// ============================================

console.log(`\n🚀 Iniciando catálogo: ${DOMAIN_NAME}`);
console.log(`   Total de ${VALUE_LABEL}: ${items.length}`);

inspectItem(items[0]);
calculateStats("value");
items.forEach(showWithOptionals);
printAllProperties(items[0]);

const updated = updateItem(items[0], { value: 6000 });
console.log("\nActualización inmutable:", updated);

console.log("\nDisponibles:", getAvailable());

console.log("\nBuscar ID 1:", findById(1));
console.log("Buscar ID 99:", findById(99));

console.log("\nCon propiedad calculada:", addCalculatedProp());

console.log("\nOrdenados:", sortByNumericProp());

buildReport();