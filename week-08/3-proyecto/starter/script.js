// ============================================
// SEMANA 08 — PROYECTO: Gestión de Inventario
// ============================================
// INSTRUCCIONES:
// 1. Reemplaza DOMAIN_NAME con el nombre de tu dominio asignado
// 2. Reemplaza VALUE_LABEL con la etiqueta de tu unidad de valor
// 3. Define tu array items con objetos de tu dominio
// 4. Completa cada TODO con la implementación contextualizada
// ============================================

// ---- CONFIGURA TU DOMINIO ----
const DOMAIN_NAME = "Trazabilidad Agrícola";
const VALUE_LABEL = "productos";

// ============================================
// 1. ARRAY INICIAL — Define tu inventario
// ============================================

const items = [
  { id: 1, name: "Café", category: "Grano", origin: "Finca A", value: 5000, active: true },
  { id: 2, name: "Papa", category: "Tubérculo", origin: "Finca B", value: 2000, active: true },
  { id: 3, name: "Tomate", category: "Hortaliza", origin: "Finca C", value: 3000, active: false },
  { id: 4, name: "Banano", category: "Fruta", origin: "Finca D", value: 2500, active: true },
  { id: 5, name: "Maíz", category: "Cereal", origin: "Finca E", value: 1800, active: false }
];

// ============================================
// 2. FUNCIONES DE GESTIÓN
// ============================================

const addItem = (newItem) => {
  items.push(newItem);
  console.log(`Agregado: ${newItem.name}`);
};

const removeLastItem = () => {
  const removed = items.pop();
  console.log(`Eliminado: ${removed.name}`);
  return removed;
};

const addPriorityItem = (priorityItem) => {
  items.unshift(priorityItem);
  console.log(`Elemento prioritario agregado: ${priorityItem.name}`);
};

const removeByIndex = (index) => {
  const removed = items.splice(index, 1);
  console.log(`Eliminado por índice: ${removed[0].name}`);
};

const getActiveItems = () => {
  return items.filter(item => item.active === true);
};

const findByName = (name) => {
  return items.find(item => item.name === name);
};

const formatItem = (item) => {
  return `[${item.id}] ${item.name} — ${item.category} — ${item.origin} — $${item.value}`;
};

// ============================================
// 3. REPORTE
// ============================================

console.log(`\n${"=".repeat(50)}`);
console.log(`📦 GESTIÓN DE ${DOMAIN_NAME.toUpperCase()}`);
console.log(`${"=".repeat(50)}\n`);

// Estado inicial
console.log(`📋 Inventario inicial (${items.length} ${VALUE_LABEL}):`);
items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Operaciones de mutación ---\n");

// Agregar nuevo producto
addItem({ id: 6, name: "Arroz", category: "Cereal", origin: "Finca F", value: 2200, active: true });

// Agregar prioritario
addPriorityItem({ id: 0, name: "Yuca", category: "Tubérculo", origin: "Finca G", value: 1500, active: true });

// Eliminar del medio
removeByIndex(2);

// Eliminar último
removeLastItem();

console.log("\n--- Inventario después de mutaciones ---\n");
items.forEach((item) => {
  console.log(`  ${formatItem(item)}`);
});

console.log("\n--- Búsqueda y filtrado ---\n");

// Buscar producto
const found = findByName("Café");
console.log("Buscar 'Café':", found);

// Filtrar activos
const activeItems = getActiveItems();
console.log(`Activos: ${activeItems.length}`);

// Spread operator
const snapshot = [...items, { id: 99, name: "Extra", category: "Otro", origin: "Demo", value: 1000, active: true }];
console.log("Snapshot (no modifica original):", snapshot.length);

console.log("\n--- Transformación con map ---\n");

// Solo nombres
const names = items.map(item => item.name);
console.log("Nombres:", names);

// Valores con aumento
const increasedValues = items.map(item => item.value * 1.1);
console.log("Valores +10%:", increasedValues);

console.log("\n--- Resumen final ---\n");
console.log(`Total en inventario: ${items.length} ${VALUE_LABEL}`);

const activeCount = getActiveItems().length;
console.log(`Activos: ${activeCount} | Inactivos: ${items.length - activeCount}`);

console.log(`\n${"=".repeat(50)}`);
console.log("✅ Reporte completado");
console.log(`${"=".repeat(50)}\n`);