// ============================================
// PROYECTO SEMANA 05: Clasificador
// Condicionales — if/else, ternario, switch, ??, ?.
// ============================================


// ============================================
// SECCIÓN 1: Datos del elemento de tu dominio
// ============================================

const elementName = "Lote de tomate organico";
const elementStatus = "active";
const elementValue = 650;
const elementType = "hortaliza";

const elementInfo = {
  detail: "Produccion registrada en finca agricola",
  location: "Cundinamarca"
};


// ============================================
// SECCIÓN 2: Clasificación con if / else if / else
// ============================================

let classification;

if (elementValue >= 800) {
  classification = "Produccion alta";
} else if (elementValue >= 400) {
  classification = "Produccion media";
} else {
  classification = "Produccion baja";
}


// ============================================
// SECCIÓN 3: Estado binario con operador ternario
// ============================================

const statusLabel = elementStatus === "active" ? "Activo" : "Inactivo";


// ============================================
// SECCIÓN 4: Tipo con switch
// ============================================

let typeLabel;

switch (elementType) {
  case "hortaliza":
    typeLabel = "Cultivo de hortalizas";
    break;

  case "fruta":
    typeLabel = "Cultivo frutal";
    break;

  case "cereal":
    typeLabel = "Cultivo de cereal";
    break;

  default:
    typeLabel = "Tipo desconocido";
}


// ============================================
// SECCIÓN 5: Valor por defecto con ??
// ============================================

const displayName = elementName ?? "Sin nombre";
const infoDetail = elementInfo?.detail ?? "Sin información adicional";


// ============================================
// SECCIÓN 6: Acceso seguro con ?.
// ============================================

const safeProperty = elementInfo?.location ?? "Ubicación no especificada";


// ============================================
// SECCIÓN 7: Ficha de salida
// ============================================

console.log("=".repeat(40));
console.log("FICHA DE CLASIFICACIÓN");
console.log("=".repeat(40));

console.log(`Nombre: ${displayName}`);
console.log(`Estado: ${statusLabel}`);
console.log(`Clasificación: ${classification}`);
console.log(`Tipo: ${typeLabel}`);
console.log(`Detalle: ${infoDetail}`);
console.log(`Propiedad adicional: ${safeProperty}`);

console.log("=".repeat(40));