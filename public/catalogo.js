

const btn = document.getElementById('btn-catalogo');

const getdata = async (url) => {
    let response = await fetch(url);
    const data = await response.json();
    catalogo = data;
    console.log(catalogo);
    renderCatalogo(catalogo);
}

function renderCatalogo(catalogo) {
    let container = document.getElementById('juegos-container');
    const ul = createElement('ul');
    ul.className = 'list-juegos';
    container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos elementos
    catalogo.forEach((juego) => {
        const item = createElement('li');
        item.className = 'list-group-item';
        item.innerHTML = `
            <h5>${juego.nombre}</h5>
            <p>Precio: $${juego.precio}</p>
            <p>Descripción: ${juego.lanzamiento}</p>
            <img src="${juego.imagen}" alt="${juego.nombre}" class="img-fluid">
        `;
        ul.appendChild(item);
    });

    container.appendChild(ul);
}


//
btn.addEventListener('click', () => {
    getdata("http://localhost:3000/catalogo");

});