const categoriasSelect = document.getElementById("categoriaSelect")
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
    const categorias = localStorage.getItem("categorias");
    const operaciones = localStorage.getItem("operaciones");
    if (!categorias) {
        const categoriasDefault = ["Comida", "Servicios", "Salidas", "Educacion", "Transporte", "Trabajo"];
        localStorage.setItem("categorias", categoriasDefault);
        cargarCategorias(categoriasDefault);
    } else {
        let nuevaCategoria = "";
        let nuevasCategoriasArray = [];
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i] !== ",") {
                nuevaCategoria += categorias[i];
                if (i === categorias.length - 1) {
                    nuevasCategoriasArray.push(nuevaCategoria);
                }
            } else {
                nuevasCategoriasArray.push(nuevaCategoria);
                nuevaCategoria = "";
            }
        }
        cargarCategorias(nuevasCategoriasArray);
    };
};

cargarStorage();

const botonNavHamburguesa = document.getElementById('boton-nav-hamburguesa');
const ulNavHeader = document.getElementById('ul-nav-header');

botonNavHamburguesa.addEventListener('click', () => {
    ulNavHeader.classList.toggle('hidden');
});

const ocultarFiltros = document.getElementById('ocultarFiltros');
const formFiltros = document.getElementById('formFiltros');

ocultarFiltros.addEventListener('click', () => {
    formFiltros.classList.toggle('hidden');
});

const nuevaOperacion = document.getElementById('botonNuevaOperacion');
const ventanaNuevaOperacion = document.getElementById('ventanaNuevaOperacion');
const balanceFiltros = document.getElementById('balanceFiltros');
const operaciones = document.getElementById('operaciones');

nuevaOperacion.addEventListener('click', () => {
    ventanaNuevaOperacion.style.display = 'block';
    balanceFiltros.style.display = 'none';
    operaciones.style.display = 'none';
});

/* Funciones para cargar y listar Nueva Operacion */
const descripcionNuevaOperacion = document.getElementById("nuevaOperacion-descripcion");
const montoNuevaOperacion = document.getElementById("nuevaOperacion-monto");
const tipoNuevaOperacion = document.getElementById("nuevaOperacion-tipo");
const categoriaNuevaOperacion = document.getElementById("nuevaOperacion-categoria");
const fechaNuevaOperacion = document.getElementById("nuevaOperacion-fecha");

// Pasa a objeto y carga datos
const cancelarOperacion = document.getElementById("cancelarOperacion")
const figure = document.getElementById('figure');
const imagenIndex = document.getElementById('imagenIndex');
const tituloParrafoOperaciones = document.getElementById('tituloParrafoOperaciones');

const tableListadoBalance = document.getElementById('table-listado-balance');
const seccionEditarOperacion = document.getElementById('seccion-editar-operacion');
function crearFila(operacion, index){
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
    // Editar
    let columnaEditar = document.createElement('button');
    columnaEditar.textContent = 'Editar';
    columnaBotones.appendChild(columnaEditar);

    columnaEditar.addEventListener('click', ()=> {
        seccionEditarOperacion.style.display = 'flex';
        operaciones.style.display = 'none';
        balanceFiltros.style.display = 'none';
    });

    // Eliminar
    let columnaEliminar = document.createElement('button');
    columnaEliminar.dataset.indice = index
    columnaEliminar.onclick = eliminar_operacion;
    columnaEliminar.textContent = 'Eliminar';
    columnaBotones.appendChild(columnaEliminar);

    listaNuevaOperacion.appendChild(fila);
};

function crearTabla(operaciones){
    listaNuevaOperacion.innerHTML = ''
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

function cargarDatos(){
    operaciones_json = localStorage.getItem("operaciones");
    operaciones_array = JSON.parse(operaciones_json);
    if (operaciones_array===null){
        operaciones_array=[];
    }
    crearTabla(operaciones_array);
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

function eliminar_operacion(){
    indice = this.dataset.indice;
    operaciones_array.splice(indice, 1);
    localStorage.setItem("operaciones", JSON.stringify(operaciones_array));
    crearTabla(operaciones_array);
};

const formNuevaOperacion = document.getElementById("formNuevaOperacion");
let listaNuevaOperacion = document.getElementById('listaNuevaOperacion');

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
    // tableListadoBalance.style.display = 'none';
});

// cargar datos al iniciar pagina
cargarDatos();

//Filtros
const filtroTipo = document.getElementById('tipo');

//Filtro por gasto
function filtrarOperaciones() {
    const tipo = filtroTipo.value;
    
    let operacionesFiltradas = operaciones_array;

    if (tipo !== 'todos') {
        operacionesFiltradas = operacionesFiltradas.filter(op => op.tipo === tipo);
    }

    crearTabla(operacionesFiltradas);
}

filtroTipo.addEventListener('change', filtrarOperaciones);

cargarDatos();