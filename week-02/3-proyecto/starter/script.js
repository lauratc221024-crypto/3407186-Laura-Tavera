// =====================================
// SISTEMA DE TRAZABILIDAD AGRÍCOLA
// =====================================

let lotes = [];
let textoBusqueda = "";

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("item-form");
    const btnLimpiar = document.getElementById("clear-inactive");
    const buscador = document.getElementById("search-input");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        registrarLote();
    });

    btnLimpiar.addEventListener("click", limpiarInactivos);

    buscador.addEventListener("input", function () {
        textoBusqueda = this.value.toLowerCase();
        actualizarVista();
    });

    actualizarVista();
});
    

// =====================================
// REGISTRAR LOTE
// =====================================

function registrarLote() {

    const codigo = document.getElementById("codigo").value.trim();
    const finca = document.getElementById("finca").value.trim();
    const fecha = document.getElementById("fecha").value;
    const categoria = document.getElementById("item-category").value;
    const prioridad = document.getElementById("item-priority").value;

    if (
        codigo === "" ||
        finca === "" ||
        fecha === "" ||
        categoria === "" ||
        prioridad === ""
    ) {
        alert("⚠️ Completa todos los campos correctamente");
        return;
    }

    const nuevoLote = {
        codigo,
        finca,
        fecha,
        categoria,
        prioridad,
        estado: "activo"
    };

    lotes.push(nuevoLote);

    document.getElementById("item-form").reset();

    actualizarVista();}

// =====================================
// ACTUALIZAR TODO
// =====================================

function actualizarVista() {

    const lista = document.getElementById("item-list");
    const total = document.getElementById("stat-total");
    const activos = document.getElementById("stat-active");
    const inactivos = document.getElementById("stat-inactive");
    const statsDetails = document.getElementById("stats-details");

    lista.innerHTML = "";
    statsDetails.innerHTML = "";

    let contadorActivos = 0;
    let contadorInactivos = 0;

    // Conteo por categoría
    let conteoCategorias = {};

    lotes.forEach((lote, index) => {

    // FILTRO DEL BUSCADOR
    if (
        !lote.codigo.toLowerCase().includes(textoBusqueda) &&
        !lote.finca.toLowerCase().includes(textoBusqueda) &&
        !lote.categoria.toLowerCase().includes(textoBusqueda)
    ) {
        return;
    }

        // Contar estados
        if (lote.estado === "activo") {
            contadorActivos++;
        } else {
            contadorInactivos++;
        }

        // Contar categorías
        if (!conteoCategorias[lote.categoria]) {
            conteoCategorias[lote.categoria] = 0;
        }
        conteoCategorias[lote.categoria]++;

        // Crear tarjeta
        const div = document.createElement("div");
        div.className = "task-item";

        div.innerHTML = `
            <div class="task-content">
                <h3>🌾 ${lote.codigo}</h3>
                <p><strong>Finca:</strong> ${lote.finca}</p>
                <p><strong>Fecha:</strong> ${lote.fecha}</p>
                <p><strong>Cultivo:</strong> ${lote.categoria}</p>
                <p><strong>Nivel:</strong> ${lote.prioridad}</p>
                <p><strong>Estado:</strong> ${lote.estado}</p>
            </div>
            <div class="task-actions">
                <button onclick="cambiarEstado(${index})">🔄</button>
            </div>
        `;

        lista.appendChild(div);
    });

    // Actualizar estadísticas básicas
    total.textContent = lotes.length;
    activos.textContent = contadorActivos;
    inactivos.textContent = contadorInactivos;

    // Estadísticas detalladas por categoría
    for (let categoria in conteoCategorias) {

        const card = document.createElement("div");
        card.className = "stat-card";

        card.innerHTML = `
            <h4>${categoria}</h4>
            <p>${conteoCategorias[categoria]}</p>
        `;

        statsDetails.appendChild(card);
    }
}


// =====================================
// CAMBIAR ESTADO
// =====================================

function cambiarEstado(index) {

    if (lotes[index].estado === "activo") {
        lotes[index].estado = "inactivo";
    } else {
        lotes[index].estado = "activo";
    }

    actualizarVista();
}


// =====================================
// LIMPIAR INACTIVOS
// =====================================

function limpiarInactivos() {

    lotes = lotes.filter(lote => lote.estado === "activo");

    actualizarVista();
}