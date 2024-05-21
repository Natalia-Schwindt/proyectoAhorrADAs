const categoriasSelect = document.getElementById("categoriaSelect")

const cargarCategorias = (categorias) => {
    categorias.forEach((categoria) => {
        let nuevaCategoria = document.createElement("option");
        nuevaCategoria.value = categoria;
        nuevaCategoria.textContent = categoria;
        categoriasSelect.appendChild(nuevaCategoria);
    })
}

const cargarStorage = () => {
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
                    nuevasCategoriasArray.push(nuevaCategoria)
                }
            } else {
                nuevasCategoriasArray.push(nuevaCategoria);
                nuevaCategoria = "";
            }
        }
        cargarCategorias(nuevasCategoriasArray);
    };
}

cargarStorage()

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
const tableListadoBalance = document.getElementById('tableListadoBalance');

const cancelarOperacion = document.getElementById("cancelarOperacion")
const figure = document.getElementById('figure');
const imagenIndex = document.getElementById('imagenIndex');
const tituloParrafoOperaciones = document.getElementById('tituloParrafoOperaciones');

function crearFila(operacion, index){
    // Carga de datos en la tabla (fila individual)
    let fila = document.createElement('tr');
    fila.style.width = '100%'; 
    let columnaDescripcion = document.createElement('td');
    columnaDescripcion.textContent = operacion.descripcion;
    fila.appendChild(columnaDescripcion);
    let columnaCategoria = document.createElement('td');
    columnaCategoria.textContent = operacion.categoria;
    fila.appendChild(columnaCategoria);
    let columnaFecha = document.createElement('td');
    columnaFecha.textContent = operacion.fecha;
    fila.appendChild(columnaFecha);
    let columnaMonto = document.createElement('td');
    columnaMonto.textContent = operacion.monto;
    fila.appendChild(columnaMonto);
    let columnaEditar = document.createElement('button');
    columnaEditar.textContent = 'Editar';
    fila.appendChild(columnaEditar);
    let columnaEliminar = document.createElement('button');
    columnaEliminar.dataset.indice = index
    columnaEliminar.onclick = eliminar_operacion;
    columnaEliminar.textContent = 'Eliminar';
    fila.appendChild(columnaEliminar);
    listaNuevaOperacion.appendChild(fila);
}

function crearTabla(operaciones){
    listaNuevaOperacion.innerHTML = ''
    if (operaciones && operaciones.length > 0) {
        imagenIndex.style.display = 'none';
        tituloParrafoOperaciones.style.display = 'none';
        figure.style.display = 'none';
        
    } else {
        imagenIndex.style.display = 'flex';
        tituloParrafoOperaciones.style.display = 'flex';
        figure.style.display = 'flex';
        
        operaciones = [];
    }
    operaciones.forEach((op, index) => {
        crearFila(op, index);
    });
}

function cargarDatos(){
    operaciones_json = localStorage.getItem("operaciones");
    operaciones_array = JSON.parse(operaciones_json);
    crearTabla(operaciones_array)
}

// Crea cada operacion del form de 'nueva operacion' de balance
function crearOperacion() {
    // Objeto con los valores de cada opcion del form de nuevaOperacion
    let nuevaOperacion = {
        descripcion: descripcionNuevaOperacion.value,
        monto: montoNuevaOperacion.value,
        tipo: tipoNuevaOperacion.value,
        categoria: categoriaNuevaOperacion.value,
        fecha: fechaNuevaOperacion.value
    }

    operaciones_array.push(nuevaOperacion)
    localStorage.setItem("operaciones", JSON.stringify(operaciones_array))
    crearTabla(operaciones_array)
}

function eliminar_operacion(){
    indice = this.dataset.indice
    operaciones_array.splice(indice, 1)
    localStorage.setItem("operaciones", JSON.stringify(operaciones_array))
    crearTabla(operaciones_array)
}

const formMolesto = document.getElementById("formNuevaOperacion")
let listaNuevaOperacion = document.getElementById('listaNuevaOperacion');

formMolesto.addEventListener("submit", function (event) {
    console.log(event)
    event.preventDefault()
    event.stopImmediatePropagation()
    event.stopPropagation()
    crearOperacion()
    ventanaNuevaOperacion.style.display = 'none';
    operaciones.style.display = 'flex';
    balanceFiltros.style.display = 'flex';
})

cancelarOperacion.addEventListener('click', ()=>{
    ventanaNuevaOperacion.style.display = 'none';
    operaciones.style.display = 'flex';
    balanceFiltros.style.display = 'flex';
})

// cargar datos al iniciar pagina
cargarDatos();