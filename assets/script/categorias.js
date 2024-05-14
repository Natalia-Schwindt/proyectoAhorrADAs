const botonesEditar = document.querySelectorAll('.botonEditar');
const categorias = document.getElementById('categorias');
const editarCategoria = document.getElementById('editarCategoria');

botonesEditar.forEach(botonEditar => {
    botonEditar.addEventListener('click', () =>{
        categorias.style.display = 'none';
        editarCategoria.style.display = 'block';
    });
});