import { agregarAlCarrito } from "./carrito.js";


let catalogo = [];

const getData = async (url) => {
    let response = await fetch(url);
    const data = await response.json();
    catalogo = data;
    console.log(catalogo);
    renderCatalogo(catalogo);
}

getData('js/db.json');



function renderCatalogo(catalogo){

  const juegosDiv = document.getElementById("productCards");
  const dlcsDiv = document.getElementById("packCards");
  juegosDiv.innerHTML = "";
  dlcsDiv.innerHTML = "";

  catalogo.forEach((juego) => {
    const { id, nombre, tipo, plataforma, precio, imagen_url } = juego;

    const cardHtml = `
      <div class="col-6 col-md-4 col-lg-3 mb-4"> 
        <div class="card game-card text-white position-relative h-90 shadow">
          <img src="${imagen_url}" class="card-img" alt="${nombre}">
          <div class="card-img-overlay overlay-content d-flex flex-column justify-content-end p-3">
            <h5 class="card-title">${nombre}</h5>
            <div class="card-details">
              <p class="card-text"><strong>Tipo:</strong> ${tipo}</p>
              <p class="card-text"><strong>Consolas:</strong> ${plataforma}</p>
              <p class="card-text"><strong>Precio:</strong> $${precio}</p>
              <button class="btn btn-warning w-100 mt-2 agregar-carrito" data-id="${id}">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>`;

    if (tipo.toLowerCase() === "videojuego") {
      juegosDiv.insertAdjacentHTML("beforeend", cardHtml);
    } else if (tipo.toLowerCase() === "dlc" || tipo.toLowerCase() === "pack") {
      dlcsDiv.insertAdjacentHTML("beforeend", cardHtml);
    }
  });
}
    
    
    

//llamada a ids/clases
const searchInput = document.querySelector(".searchInput");
const platformSelect = document.getElementById("consola")


// AddEventListeners
searchInput.addEventListener("keyup", () => {
        filterByName(catalogo);
    });

platformSelect.addEventListener("change", () => {
  if (platformSelect.value != 'all') {
    filterByPlatform(catalogo); 
  }else{
    document.getElementById("productCards").innerHTML = "";
    renderCatalogo(catalogo)
    
  }
  });


  const toggle = document.getElementById("themeToggle");

  toggle.addEventListener("click", () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);


    toggle.innerHTML = nextTheme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });


  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    toggle.innerHTML = savedTheme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });
  
// evento para agregar al carrito
document.getElementById("productCards").addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
        const productoId = e.target.getAttribute("data-id");
        agregarAlCarrito(productoId, catalogo);
        mostrarAlerta("Producto agregado al carrito");
    }
});
document.getElementById("packCards").addEventListener("click", (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
        const productoId = e.target.getAttribute("data-id");
        agregarAlCarrito(productoId, catalogo);
        mostrarAlerta("Producto agregado al carrito");
    }
});





  //FUNCIONES FILTRAR
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

function filterByPlatform(juegos) {
    const plataforma = document.getElementById("consola").value;
    const resultadoFiltrado = filtrarAny(juegos, plataforma.toLowerCase(), "plataforma");
    document.getElementById("productCards").innerHTML = ""; 
    renderCatalogo(resultadoFiltrado);
} 

function filterByType(juegos) {
    const plataforma = document.getElementById("tipo").value;
    const resultadoFiltrado = filtrarAny(juegos, plataforma.toLowerCase(), "plataforma");
    document.getElementById("productCards").innerHTML = ""; 
    renderCatalogo(resultadoFiltrado);
} 


function mostrarAlerta(mensaje) {
  const contenedor = document.getElementById("alert-container");

  const alerta = document.createElement("div");
  alerta.className = "alert alert-success alert-dismissible fade-in";
  alerta.role = "alert";
  alerta.innerHTML = `
    <strong>✅</strong> ${mensaje}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  contenedor.appendChild(alerta);

  setTimeout(() => {
    alerta.classList.remove("fade-in");
    alerta.classList.add("fade-out");

    setTimeout(() => alerta.remove(), 500); 
  }, 3000);
}
