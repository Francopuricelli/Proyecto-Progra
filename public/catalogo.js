
const btn = document.getElementsByClassName('scroll-btn');

const getdata = async (url) => {
    let response = await fetch(url);
    const data = await response.json();
    catalogo = data;
    console.log(catalogo);
    renderCatalogo(catalogo);
}

function renderCatalogo(catalogo){
    let cardHtml= ""

    
    catalogo.forEach((juego) =>{
        const { nombre, tipo, plataforma, precio, imagen_url } = juego;

    cardHtml = `
      <div class="col-md-4">
        <div class="card h-100 text-white bg-dark shadow">
          <img src="${imagen_url}" class="card-img-top" alt="${nombre}">
          <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text"><strong>Tipo:</strong> ${tipo}</p>
            <p class="card-text"><strong>Consolas:</strong> ${plataforma}</p>
            <p class="card-text"><strong>Precio:</strong> $${precio}</p>
          </div>
          <div class="card-footer bg-transparent border-top-0">
            <button class="btn btn-warning w-100">Agregar al carrito</button>
          </div>
        </div>
      </div>
      `;
      document.getElementById("productCards").insertAdjacentHTML("beforeend", cardHtml);

 });
}

getdata("http://localhost:3000/catalogo");


