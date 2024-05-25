const botonNavHamburguesa = document.getElementById('boton-nav-hamburguesa');
const ulNavHeader = document.getElementById('ul-nav-header');

botonNavHamburguesa.addEventListener('click', () => {
    ulNavHeader.classList.toggle('hidden');
});

const ocultarImgTexto = document.getElementsByClassName('ocultar-img-texto');
const reportesSection = document.getElementById('reportes');
const imagenReportes = document.getElementById('imagen-reportes');

function ocultarImgYTexto() {
    for (let i = 0; i < ocultarImgTexto.length; i++) {
        ocultarImgTexto[i].classList.add('hidden');
    }
    imagenReportes.classList.add('hidden');
    reportesSection.classList.remove('hidden');
}

function mostrarReportes(operaciones) {
    if (operaciones.length === 0) {
        return;
    }

    const reportes = calcularReportes(operaciones);

    document.getElementById('categoria-mayor-ganancia').textContent = `Categoría con mayor ganancia: ${reportes.categoriaMayorGanancia}`;
    document.getElementById('categoria-mayor-gasto').textContent = `Categoría con mayor gasto: ${reportes.categoriaMayorGasto}`;
    document.getElementById('categoria-mayor-balance').textContent = `Categoría con mayor balance: ${reportes.categoriaMayorBalance}`;
    document.getElementById('mes-mayor-ganancia').textContent = `Mes con mayor ganancia: ${reportes.mesMayorGanancia}`;
    document.getElementById('mes-mayor-gasto').textContent = `Mes con mayor gasto: ${reportes.mesMayorGasto}`;

    // Actualizar tabla de categorías
    const tablaCategorias = document.getElementById('tabla-categorias');
    tablaCategorias.innerHTML = '';

    for (let [categoria, { ganancia, gasto }] of Object.entries(reportes.categorias)) {
        let balance = ganancia - gasto;
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td class="border px-4 py-2 border-none">${categoria}</td>
            <td class="border px-4 py-2 border-none">+$${ganancia.toFixed(2)}</td>
            <td class="border px-4 py-2 border-none">-$${gasto.toFixed(2)}</td>
            <td class="border px-4 py-2 border-none">${balance >= 0 ? '+' : ''}$${balance.toFixed(2)}</td>
        `;
        tablaCategorias.appendChild(fila);
    }
}

function calcularReportes(operaciones) {
    let categorias = {};
    let meses = {};

    operaciones.forEach(op => {
        let { categoria, monto, tipo, fecha } = op;
        monto = parseFloat(monto);
        let mes = fecha.slice(0, 7); // Obtener año y mes en formato YYYY-MM

        if (!categorias[categoria]) {
            categorias[categoria] = { ganancia: 0, gasto: 0 };
        }
        if (!meses[mes]) {
            meses[mes] = { ganancia: 0, gasto: 0 };
        }

        if (tipo === 'ganancia') {
            categorias[categoria].ganancia += monto;
            meses[mes].ganancia += monto;
        } else if (tipo === 'gasto') {
            categorias[categoria].gasto += monto;
            meses[mes].gasto += monto;
        }
    });

    let categoriaMayorGanancia = { nombre: '', monto: 0 };
    let categoriaMayorGasto = { nombre: '', monto: 0 };
    let categoriaMayorBalance = { nombre: '', monto: 0 };
    let mesMayorGanancia = { nombre: '', monto: 0 };
    let mesMayorGasto = { nombre: '', monto: 0 };

    for (let [nombre, { ganancia, gasto }] of Object.entries(categorias)) {
        let balance = ganancia - gasto;
        if (ganancia > categoriaMayorGanancia.monto) {
            categoriaMayorGanancia = { nombre, monto: ganancia };
        }
        if (gasto > categoriaMayorGasto.monto) {
            categoriaMayorGasto = { nombre, monto: gasto };
        }
        if (balance > categoriaMayorBalance.monto) {
            categoriaMayorBalance = { nombre, monto: balance };
        }
    }

    for (let [nombre, { ganancia, gasto }] of Object.entries(meses)) {
        if (ganancia > mesMayorGanancia.monto) {
            mesMayorGanancia = { nombre, monto: ganancia };
        }
        if (gasto > mesMayorGasto.monto) {
            mesMayorGasto = { nombre, monto: gasto };
        }
    }

    return {
        categorias,
        categoriaMayorGanancia: `${categoriaMayorGanancia.nombre} (+$${categoriaMayorGanancia.monto.toFixed(2)})`,
        categoriaMayorGasto: `${categoriaMayorGasto.nombre} (-$${categoriaMayorGasto.monto.toFixed(2)})`,
        categoriaMayorBalance: `${categoriaMayorBalance.nombre} (+$${categoriaMayorBalance.monto.toFixed(2)})`,
        mesMayorGanancia: `${mesMayorGanancia.nombre} (+$${mesMayorGanancia.monto.toFixed(2)})`,
        mesMayorGasto: `${mesMayorGasto.nombre} (-$${mesMayorGasto.monto.toFixed(2)})`
    };
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Obtener las operaciones del localStorage y mostrar los reportes
function cargarOperacionesYMostrarReportes() {
    const operaciones_json = localStorage.getItem("operaciones");
    const operaciones_array = JSON.parse(operaciones_json) || [];
    if (operaciones_array.length > 0) {
        ocultarImgYTexto();
        mostrarReportes(operaciones_array);
    }
}

document.addEventListener('DOMContentLoaded', cargarOperacionesYMostrarReportes);

