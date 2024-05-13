const nuevaOperacion = document.getElementById('botonNuevaOperacion');
const ventanaNuevaOperacion = document.getElementById('ventanaNuevaOperacion');
const balanceFiltros = document.getElementById('balanceFiltros');
const operaciones = document.getElementById('operaciones');
const botonNavHamburguesa = document.getElementById('boton-nav-hamburguesa');
const ulNavHeader = document.getElementById('ul-nav-header');

botonNavHamburguesa.addEventListener('click', () => {
    ulNavHeader.classList.toggle('hidden');
});

nuevaOperacion.addEventListener('click', () => {
    ventanaNuevaOperacion.style.display = 'block';
    balanceFiltros.style.display = 'none';
    operaciones.style.display = 'none';
});