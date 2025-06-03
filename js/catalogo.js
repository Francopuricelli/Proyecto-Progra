const btn = document.getElementById('btn-catalogo');



const getdata = async (url) => {
    let response = await fetch(url);
    const catalogo = await response.json();
    renderCatalogo(catalogo);
}


// Llamada a la función para obtener los datos del catálogo
function renderCatalogo(catalogo) {
    let container = document.getElementById('juegos-container');
    container.innerHTML = catalogo.map(juego => `
        <div class="juego">
            <img src="${juego.imagen}" alt="${juego.nombre}">
            <h2>${juego.nombre}</h2>
            <p>Precio: $${juego.precio}</p>
        </div>`
    ).join('');
}


//
btn.addEventListener('click', () => {
    getdata('http://localhost:3000/catalogo');

});