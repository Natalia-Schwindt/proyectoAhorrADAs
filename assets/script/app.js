const categoriasSelect = document.getElementById("categoria");
let operaciones_array = [];

function cargarCategorias(categorias) {
    categorias.forEach((categoria) => {
        let nuevaCategoria = document.createElement("option");
        nuevaCategoria.value = categoria;
        nuevaCategoria.textContent = categoria;
        categoriasSelect.appendChild(nuevaCategoria);
    });
};

function cargarStorage() {
    categorias_storage = localStorage.getItem("categorias");
    if (!categorias_storage) {
        categorias_array = ["Comida", "Servicios", "Salidas", "Educacion", "Transporte", "Trabajo"];
        localStorage.setItem("categorias", categorias_array);
    } else {
        categorias_array = categorias_storage.split(',')
    }
    cargarCategorias(categorias_array);
};

cargarStorage();

const botonNavHamburguesa = document.getElementById('boton-nav-hamburguesa');
const ulNavHeader = document.getElementById('ul-nav-header');

botonNavHamburguesa.addEventListener('click', () => {
    ulNavHeader.classList.toggle('hidden');
});

const ocultarFiltros = document.getElementById('ocultar-filtros');
const formFiltros = document.getElementById('form-filtros');

ocultarFiltros.addEventListener('click', () => {
    formFiltros.classList.toggle('hidden');
});

const nuevaOperacion = document.getElementById('boton-nueva-operacion');
const ventanaNuevaOperacion = document.getElementById('ventanaNueva-operacion');
const balanceFiltros = document.getElementById('balance-filtros');
const operaciones = document.getElementById('operaciones');

nuevaOperacion.addEventListener('click', () => {
    ventanaNuevaOperacion.style.display = 'block';
    balanceFiltros.style.display = 'none';
    operaciones.style.display = 'none';
});

/* Funciones para cargar y listar Nueva Operacion */
const tableListadoBalance = document.getElementById('table-listado-balance');
const descripcionNuevaOperacion = document.getElementById("nuevaOperacion-descripcion");
const montoNuevaOperacion = document.getElementById("nuevaOperacion-monto");
const tipoNuevaOperacion = document.getElementById("nuevaOperacion-tipo");
const categoriaNuevaOperacion = document.getElementById("nuevaOperacion-categoria");
const fechaNuevaOperacion = document.getElementById("nuevaOperacion-fecha");

const cancelarOperacion = document.getElementById("cancelar-operacion");
const figure = document.getElementById('figure');
const imagenIndex = document.getElementById('imagen-index');
const tituloParrafoOperaciones = document.getElementById('titulo-parrafo-operaciones');

const seccionEditarOperacion = document.getElementById('seccion-editar-operacion');

function crearFila(operacion, indice){
    // Carga de datos en la tabla (fila individual)
    let fila = document.createElement('tr');
    fila.style.width = '100%'; 
    let columnaDescripcion = document.createElement('td');
    columnaDescripcion.textContent = operacion.descripcion;
    columnaDescripcion.style.textAlign = 'center';
    fila.appendChild(columnaDescripcion);
    let columnaCategoria = document.createElement('td');
    columnaCategoria.textContent = operacion.categoria;
    columnaCategoria.style.textAlign = 'center';
    fila.appendChild(columnaCategoria);
    let columnaFecha = document.createElement('td');
    columnaFecha.textContent = operacion.fecha;
    columnaFecha.style.textAlign = 'center';
    fila.appendChild(columnaFecha);
    let columnaMonto = document.createElement('td');
    columnaMonto.textContent = operacion.monto;
    columnaMonto.style.textAlign = 'center';
    fila.appendChild(columnaMonto);
    // Td para los botones
    let columnaBotones = document.createElement('td');
    columnaBotones.style.textAlign = 'center';
    columnaBotones.style.display = 'flex';
    columnaBotones.style.justifyContent = 'space-evenly';
    fila.appendChild(columnaBotones);
    // Boton Editar
    let columnaEditar = document.createElement('button');
    columnaEditar.textContent = 'Editar';
    columnaBotones.appendChild(columnaEditar);
    // Evento Mostar Formulario Editar
    columnaEditar.dataset.indice = indice;
    columnaEditar.onclick = editar_operacion;
    // Boton Eliminar
    let columnaEliminar = document.createElement('button');
    columnaEliminar.dataset.indice = indice;
    columnaEliminar.onclick = eliminar_operacion;
    columnaEliminar.textContent = 'Eliminar';
    columnaBotones.appendChild(columnaEliminar);

    listaNuevaOperacion.appendChild(fila);
};

function crearTabla(operaciones){
    listaNuevaOperacion.innerHTML = '';
    if (operaciones && operaciones.length > 0) {
        imagenIndex.style.display = 'none';
        tituloParrafoOperaciones.style.display = 'none';
        figure.style.display = 'none';
        tableListadoBalance.style.display = 'table-header-group';
    } else {
        imagenIndex.style.display = 'flex';
        tituloParrafoOperaciones.style.display = 'flex';
        figure.style.display = 'flex';
        tableListadoBalance.style.display = 'none';
        
        operaciones = [];
    };
    operaciones.forEach((op, index) => {
        crearFila(op, index);
    });
};

// Crea cada operacion del form de 'nueva operacion' de balance
function crearOperacion() {
    // Objeto con los valores de cada opcion del form de nuevaOperacion
    let nuevaOperacion = {
        descripcion: descripcionNuevaOperacion.value,
        monto: montoNuevaOperacion.value,
        tipo: tipoNuevaOperacion.value,
        categoria: categoriaNuevaOperacion.value,
        fecha: fechaNuevaOperacion.value
    };

    operaciones_array.push(nuevaOperacion);
    localStorage.setItem("operaciones", JSON.stringify(operaciones_array));
    crearTabla(operaciones_array);
};

function cargarDatos(){
    operaciones_json = localStorage.getItem("operaciones");
    operaciones_array = JSON.parse(operaciones_json);
    if (operaciones_array===null){
        operaciones_array=[];
    }
    crearTabla(operaciones_array);
};

let editarDescripcion = document.getElementById('editar-descripcion');
let editarMonto = document.getElementById('editar-monto');
let editarTipo = document.getElementById('editar-tipo');
let editarCategoria = document.getElementById('editar-categoria');
let editarFecha = document.getElementById('editar-fecha');
let indiceInput = document.getElementById("indice-input")

function editar_operacion(){
    seccionEditarOperacion.style.display = 'flex';
    operaciones.style.display = 'none';
    balanceFiltros.style.display = 'none';
    indice = this.dataset.indice;

    indiceInput.value = indice;
    operacion = operaciones_array[indice];
    editarDescripcion.value = operacion.descripcion;
    editarMonto.value = operacion.monto;
    editarTipo.value = operacion.tipo;
    editarCategoria.value = operacion.categoria;
    editarFecha.value = operacion.fecha;

    localStorage.setItem("operaciones", JSON.stringify(operaciones_array));
    crearTabla(operaciones_array);
};

function eliminar_operacion(){
    indice = this.dataset.indice;
    operaciones_array.splice(indice, 1);
    localStorage.setItem("operaciones", JSON.stringify(operaciones_array));
    crearTabla(operaciones_array);
};

const formNuevaOperacion = document.getElementById("form-nueva-operacion");
const formularioEditar = document.getElementById("formulario-editar");
let listaNuevaOperacion = document.getElementById('lista-nueva-operacion');

formNuevaOperacion.addEventListener("submit", function (event) {
    console.log(event);
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    crearOperacion();
    ventanaNuevaOperacion.style.display = 'none';
    operaciones.style.display = 'flex';
    balanceFiltros.style.display = 'flex';
});

cancelarOperacion.addEventListener('click', ()=>{
    ventanaNuevaOperacion.style.display = 'none';
    operaciones.style.display = 'flex';
    balanceFiltros.style.display = 'flex';
});

formularioEditar.addEventListener("submit", function (event) {
    console.log(event);
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();

    indice = indiceInput.value;
    operacion = operaciones_array[indice];

    operacion.descripcion = editarDescripcion.value;
    operacion.monto = editarMonto.value;
    operacion.tipo = editarTipo.value;
    operacion.categoria = editarCategoria.value;
    operacion.fecha = editarFecha.value;

    localStorage.setItem("operaciones", JSON.stringify(operaciones_array));
    crearTabla(operaciones_array);

    seccionEditarOperacion.style.display = 'none';
    operaciones.style.display = 'flex';
    balanceFiltros.style.display = 'flex';
});

// cargar datos al iniciar pagina
cargarDatos();

//Filtros
const filtroTipo = document.getElementById('tipo');
const filtroCategoria = document.getElementById('categoria');
const filtroDesde = document.getElementById('desde');
const filtroOrdenarPor = document.getElementById('ordenar-por');

//Filtro por tipo, categoría y fecha
function filtrarOperaciones() {
    const tipo = filtroTipo.value;
    const categoria = filtroCategoria.value;
    const desde = filtroDesde.value;
    const ordenarPor = filtroOrdenarPor.value;
    
    let operacionesFiltradas = operaciones_array;

    if (tipo !== 'todos') {
        operacionesFiltradas = operacionesFiltradas.filter(op => op.tipo === tipo);
    }

    if (categoria !== 'todas') {
        operacionesFiltradas = operacionesFiltradas.filter(op => op.categoria === categoria);
    }

    if (desde) {
        operacionesFiltradas = operacionesFiltradas.filter(op => new Date(op.fecha) >= new Date(desde));
    }

    switch (ordenarPor) {
        case 'masReciente':
            operacionesFiltradas.sort((primeraOp, segundaOp) => new Date(segundaOp.fecha) - new Date(primeraOp.fecha));
            break;
        case 'menosReciente':
            operacionesFiltradas.sort((primeraOp, segundaOp) => new Date(primeraOp.fecha) - new Date(segundaOp.fecha));
            break;
        case 'mayorMonto':
            operacionesFiltradas.sort((primeraOp, segundaOp) => segundaOp.monto - primeraOp.monto);
            break;
        case 'menorMonto':
            operacionesFiltradas.sort((primeraOp, segundaOp) => primeraOp.monto - segundaOp.monto);
            break;
        case 'aZ':
            operacionesFiltradas.sort((primeraOp, segundaOp) => primeraOp.descripcion.localeCompare(segundaOp.descripcion));
            break;
        case 'zA':
            operacionesFiltradas.sort((primeraOp, segundaOp) => segundaOp.descripcion.localeCompare(primeraOp.descripcion));
            break;
    }

    crearTabla(operacionesFiltradas);
}

filtroTipo.addEventListener('change', filtrarOperaciones);
filtroCategoria.addEventListener('change', filtrarOperaciones);
filtroDesde.addEventListener('change', filtrarOperaciones);
filtroOrdenarPor.addEventListener('change', filtrarOperaciones);

cargarDatos();