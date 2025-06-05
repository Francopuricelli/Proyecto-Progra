const btn = document.getElementsByClassName('scroll-btn');

catalogo = [];

const getData = async (url) => {
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
        <div class="col-6 col-md-4 col-lg-3 mb-4"> 
          <div class="card game-card text-white position-relative h-90 shadow">
            <img src="${imagen_url}" class="card-img" alt="${nombre}">
            <div class="card-img-overlay overlay-content d-flex flex-column justify-content-end p-3">
              <h5 class="card-title">${nombre}</h5>
              <div class="card-details">
                <p class="card-text"><strong>Tipo:</strong> ${tipo}</p>
                <p class="card-text"><strong>Consolas:</strong> ${plataforma}</p>
                <p class="card-text"><strong>Precio:</strong> $${precio}</p>
                <button class="btn btn-warning w-100 mt-2">Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>
      `;
    
      
      document.getElementById("productCards").insertAdjacentHTML("beforeend", cardHtml);

 });
}


    getData('http://localhost:3000/catalogo');

const searchInput = document.querySelector(".searchInput");
    searchInput.addEventListener("keyup", () => {
        filterByName(catalogo);
    });

function filtrarAny(arr, filtro,key) {
    return arr.filter((p) =>
        p[key].toLowerCase().includes(filtro) 
    );
}

function filterByName(juegos){
    const filtro = document.querySelector(".searchInput").value.toLowerCase();
    const resultadoFiltrado = filtrarAny(juegos, filtro, "nombre");
    document.getElementById("productCards").innerHTML = ""; 
    renderCatalogo(resultadoFiltrado);
}


