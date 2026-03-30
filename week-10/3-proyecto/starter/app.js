// ============================================
// PROYECTO INTEGRADOR — ETAPA 0
// Semana 10 — JavaScript ES2023 Bootcamp
// ============================================

const DOMAIN_NAME = "AGRICULTURAL_TRACEABILITY";
const VALUE_LABEL = "productos";
const MAX_ITEMS = 1_000;

// ============================================
// SECCIÓN 2: Datos — Array Principal
// ============================================

const items = [
  { id: 1, name: "Café", value: 5000, active: true, category: "grano", origin: "Finca A", organic: true },
  { id: 2, name: "Papa", value: 2000, active: true, category: "tubérculo", origin: "Finca B" },
  { id: 3, name: "Tomate", value: 3000, active: false, category: "hortaliza", origin: "Finca C" },
  { id: 4, name: "Banano", value: 2500, active: true, category: "fruta", origin: "Finca D" },
  { id: 5, name: "Maíz", value: 1800, active: false, category: "cereal", origin: "Finca E" },
  { id: 6, name: "Arroz", value: 2200, active: true, category: "cereal", origin: "Finca F", notes: "Alta demanda" }
];

// ============================================
// SECCIÓN 3: Funciones CRUD
// ============================================

const addItem = (item) => {
  if (items.length >= MAX_ITEMS) {
    console.log("❌ No se pueden agregar más elementos");
    return;
  }
  items.push(item);
  console.log(`✅ Agregado: ${item.name}`);
};

const findById = (id) => {
  return items.find(item => item.id === id);
};

const getActive = () => {
  return items.filter(item => item.active === true);
};

const filterByField = (field, value) => {
  return items.filter(item => item[field] === value);
};

// ============================================
// SECCIÓN 4: Funciones de Análisis
// ============================================

const updateItem = (id, changes) => {
  return items.map(item =>
    item.id === id ? { ...item, ...changes } : item
  );
};

const calculateStats = (field) => {
  const values = items.map(i => i[field]);
  const total = values.reduce((acc, val) => acc + val, 0);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = total / values.length;

  return { min, max, avg, total };
};

// ============================================
// SECCIÓN 5: Funciones de Display
// ============================================

const formatItem = (item) => {
  return `${item.name.padEnd(10)} | ${item.category.padEnd(10)} | $${item.value} | ${item.active ? "Activo" : "Inactivo"} | ${item.notes ?? "Sin notas"}`;
};

const buildReport = () => {
  console.log(`\n📦 REPORTE DE ${DOMAIN_NAME}`);
  console.log("=".repeat(40));

  console.log("\n📋 Listado:");
  items.forEach(item => console.log(formatItem(item)));

  const active = getActive();
  console.log(`\nActivos: ${active.length} / ${items.length}`);

  const stats = calculateStats("value");
  console.log(`\n📊 Estadísticas:`);
  console.log(`Min: ${stats.min}`);
  console.log(`Max: ${stats.max}`);
  console.log(`Promedio: ${stats.avg.toFixed(2)}`);
  console.log(`Total: ${stats.total}`);

  console.log("\n🔍 Propiedades del primer elemento:");
  Object.entries(items[0]).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  console.log(`\nTotal final: ${items.length} ${VALUE_LABEL}`);
  console.log("=".repeat(40));
};

// ============================================
// SECCIÓN 6: Ejecución Principal
// ============================================

console.log("=".repeat(40));
console.log(`  ${DOMAIN_NAME}`);
console.log("=".repeat(40));
console.log(`Total de ${VALUE_LABEL}: ${items.length} / ${MAX_ITEMS}`);
console.log("");

// Paso 1
const found = findById(1);
console.log("Encontrado id=1:", found?.name ?? "no encontrado");
console.log("");

// Paso 2
const active = getActive();
console.log(`Activos: ${active.length}`);
active.forEach(item => console.log(" ", formatItem(item)));
console.log("");

// Paso 3
const filtered = filterByField("category", "cereal");
console.log(`Filtro category=cereal: ${filtered.length} resultados`);
console.log("");

// Paso 4
const updated = updateItem(1, { value: 9999 });
console.log(`Actualizado id=1: value=${updated.find(i => i.id === 1)?.value}`);
console.log("");

// Paso 5
const stats = calculateStats("value");
console.log(`Estadísticas: min=${stats.min} max=${stats.max} avg=${stats.avg.toFixed(2)}`);
console.log("");

// Paso 6
buildReport();

// Agregar nuevo elemento
addItem({ id: 7, name: "Yuca", value: 1700, active: true, category: "tubérculo", origin: "Finca G" });