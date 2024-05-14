const botonNavHamburguesa = document.getElementById('boton-nav-hamburguesa');
const ulNavHeader = document.getElementById('ul-nav-header');

botonNavHamburguesa.addEventListener('click', () => {
    ulNavHeader.classList.toggle('hidden');
});