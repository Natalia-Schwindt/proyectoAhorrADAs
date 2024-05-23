let categorias_array = [];

const botonNavHamburguesa = document.getElementById('boton-nav-hamburguesa');
const ulNavHeader = document.getElementById('ul-nav-header');

botonNavHamburguesa.addEventListener('click', () => {
    ulNavHeader.classList.toggle('hidden');
});

const botonesEditar = document.querySelectorAll('.botonEditar');
const categorias = document.getElementById('categorias');
const editarCategoria = document.getElementById('editarCategoria');

botonesEditar.forEach(botonEditar => {
    botonEditar.addEventListener('click', () =>{
        categorias.style.display = 'none';
        editarCategoria.style.display = 'block';
    });
});
// -------------------------------------------------------------------------------------------------
const nombreNuevaCategoria = document.getElementById('nombre-nueva-categoria');
const botonAgregarNuevaCategoria = document.getElementById('boton-agregar-nueva-categoria');
let listaNuevaCategoria = document.getElementById('lista-nueva-categoria');

function crearFila(categoria, indice){
    // Carga de datos en la tabla (fila individual)
    let categoriaElemLi = document.createElement('li');
    categoriaElemLi.style.display = 'flex';
    categoriaElemLi.style.justifyContent = 'space-between';

    let categoriaElemP = document.createElement('p');
    categoriaElemP.textContent = categoria;
    categoriaElemP.style.width = '70%';
    categoriaElemP.style.textAlign = 'start';

    let botonEditarCategoria = document.createElement('button');
    botonEditarCategoria.textContent = 'Editar';
    // botonEditarCategoria.dataset.indice = indice;
    // botonEditarCategoria.onclick = editar_operacion;

    let botonEliminarCategoria = document.createElement('button');
    botonEliminarCategoria.textContent = 'Eliminar';
    botonEliminarCategoria.dataset.indice = indice;
    botonEliminarCategoria.onclick = eliminar_operacion;
    categoriaElemLi.appendChild(categoriaElemP);
    categoriaElemLi.appendChild(botonEditarCategoria);
    categoriaElemLi.appendChild(botonEliminarCategoria);

    listaNuevaCategoria.appendChild(categoriaElemLi);

};

function crearTabla(categorias){
    listaNuevaCategoria.innerHTML = '';
    categorias.forEach((categoria, indice) => {
        crearFila(categoria, indice);
    });
};

function cargarDatos(){
    // carga categorias
    categorias_storage = localStorage.getItem("categorias");
    if (!categorias_storage) {
        categorias_array = ["Comida", "Servicios", "Salidas", "Educacion", "Transporte", "Trabajo"];
        localStorage.setItem("categorias", categorias_array);
    } else {
        categorias_array = categorias_storage.split(',');
    }

    crearTabla(categorias_array);
};

// Crea cada operacion del form de 'nueva operacion' de balance
function crearOperacion() {
    // Objeto con los valores de cada opcion del form de nuevaOperacion
    let nuevaCategoria =  nombreNuevaCategoria.value
    nombreNuevaCategoria.value = '';

    categorias_array.push(nuevaCategoria);
    localStorage.setItem("categorias", categorias_array);
    crearTabla(categorias_array);
};

function eliminar_operacion(){
    indice = this.dataset.indice;
    categorias_array.splice(indice, 1);
    localStorage.setItem("categorias", JSON.stringify(categorias_array));
    crearTabla(categorias_array);
};

document.querySelector('#formulario-categoria').addEventListener("submit", function (event) {
    console.log(event);
    event.preventDefault();
    event.stopImmediatePropagation();
    event.stopPropagation();
    crearOperacion();
});


// inicio app
cargarDatos();