const nuevaOperacion = document.getElementById('botonNuevaOperacion');
const ventanaNuevaOperacion = document.getElementById('ventanaNuevaOperacion');
const balanceFiltros = document.getElementById('balanceFiltros');
const operaciones = document.getElementById('operaciones');

nuevaOperacion.addEventListener('click', () => {
    ventanaNuevaOperacion.style.display = 'block';
    balanceFiltros.style.display = 'none';
    operaciones.style.display = 'none';
});