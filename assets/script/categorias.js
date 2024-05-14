const botonesEditar = document.querySelectorAll('.botonEditar');
const categorias = document.getElementById('categorias');
const editarCategoria = document.getElementById('editarCategoria');
const botonNavHamburguesa = document.getElementById('boton-nav-hamburguesa');
const ulNavHeader = document.getElementById('ul-nav-header');

botonNavHamburguesa.addEventListener('click', () => {
    ulNavHeader.classList.toggle('hidden');
});

botonesEditar.forEach(botonEditar => {
    botonEditar.addEventListener('click', () =>{
        categorias.style.display = 'none';
        editarCategoria.style.display = 'block';
    });
});