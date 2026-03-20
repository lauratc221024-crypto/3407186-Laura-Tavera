// ============================================
// PROYECTO SEMANA 06: Reporte con Bucles
// Dominio: Trazabilidad Agrícola
// ============================================

// ============================================
// SECCIÓN 1: Datos del dominio
// ============================================

const items = [
  { name: "Lote de café", category: "grano", value: 500 },
  { name: "Lote de arroz", category: "grano", value: 800 },
  { name: "Lote de maíz", category: "grano", value: 650 },
  { name: "Cultivo de tomate", category: "hortaliza", value: 300 },
  { name: "Cultivo de lechuga", category: "hortaliza", value: 200 },
  { name: "Cosecha de fresa", category: "fruta", value: 150 }
];

const categories = [
  "grano",
  "hortaliza",
  "fruta"
];

const valueLabel = "kg producidos";

// ============================================
// SECCIÓN 2: Listado completo con for...of
// ============================================
console.log("=== LISTADO COMPLETO ===");

let lineNumber = 0;

for (const item of items) {
  lineNumber++;
  console.log(`${lineNumber}. ${item.name} — ${item.category} — ${valueLabel}: ${item.value}`);
}

console.log("");

// ============================================
// SECCIÓN 3: Contadores por categoría
// ============================================
console.log("=== CONTEO POR CATEGORÍA ===");

for (const category of categories) {
  let count = 0;

  for (const item of items) {
    if (item.category === category) count++;
  }

  console.log(`${category}: ${count} elemento(s)`);
}

console.log("");

// ============================================
// SECCIÓN 4: Totales y promedio (acumulador)
// ============================================
console.log("=== ESTADÍSTICAS ===");

let totalValue = 0;

for (const item of items) {
  totalValue += item.value;
}

const averageValue = items.length > 0 ? totalValue / items.length : 0;

console.log(`Total ${valueLabel}: ${totalValue}`);
console.log(`Promedio ${valueLabel}: ${averageValue.toFixed(1)}`);

console.log("");

// ============================================
// SECCIÓN 5: Máximo y mínimo
// ============================================
console.log("=== MÁXIMO Y MÍNIMO ===");

let maxItem = items[0] ?? null;
let minItem = items[0] ?? null;

if (items.length > 0) {
  for (const item of items) {
    if (item.value > maxItem.value) maxItem = item;
    if (item.value < minItem.value) minItem = item;
  }

  console.log(`Mayor ${valueLabel}: ${maxItem?.name} (${maxItem?.value})`);
  console.log(`Menor ${valueLabel}: ${minItem?.name} (${minItem?.value})`);
}

console.log("");

// ============================================
// SECCIÓN EXTRA: Verificación con while
// ============================================
console.log("=== VERIFICACIÓN CON WHILE ===");

let index = 0;

while (index < items.length) {
  if (items[index].value < 200) {
    console.log(`${items[index].name} tiene baja producción`);
  }
  index++;
}

console.log("");

// ============================================
// SECCIÓN 6: Reporte numerado con for clásico
// ============================================
console.log("=== REPORTE DETALLADO ===");

for (let i = 0; i < items.length; i++) {
  const item = items[i];

  const comparison = item.value >= averageValue
    ? "sobre el promedio"
    : "bajo el promedio";

  console.log(`${i + 1}. ${item.name} — ${comparison}`);
}

console.log("");
console.log("=== FIN DEL REPORTE ===");