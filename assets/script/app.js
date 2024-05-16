const categoriasSelect = document.getElementById("categoriaSelect")

function cargarCategorias(categorias) {
    categorias.forEach((categoria) => {
        let nuevaCategoria = document.createElement("option")
        nuevaCategoria.value = categoria;
        nuevaCategoria.textContent = categoria
        categoriasSelect.appendChild(nuevaCategoria)
    })
}

const cargarStorage = () => {
    const categorias = localStorage.getItem("categorias")
    const operaciones = localStorage.getItem("operaciones")
    console.log(operaciones)
    if (!categorias) {
        const categoriasDefault = ["Comida", "Servicios", "Salidas", "Educacion", "Transporte", "Trabajo"]
        localStorage.setItem("categorias", categoriasDefault)
        cargarCategorias(categoriasDefault)
    } else {
        let nuevaCategoria = ""
        let nuevasCategoriasArray = []
        for (let i = 0; i < categorias.length; i++) {
            if (categorias[i] !== ",") {
                nuevaCategoria += categorias[i]
                if (i === categorias.length - 1) {
                    nuevasCategoriasArray.push(nuevaCategoria)
                }
            } else {
                nuevasCategoriasArray.push(nuevaCategoria)
                nuevaCategoria = ""
            }
        }
        cargarCategorias(nuevasCategoriasArray)
    }
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