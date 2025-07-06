import { agregarAlCarrito } from "./carrito.js";

let catalogoCompleto = [];

let catalogoPaginado = [];
const limitePaginacion= 8;
let paginaActual = 1;
let totalProductos = 0;

const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  catalogoCompleto = data;
  console.log(catalogoCompleto);
  
};

const getPaginedData = async (pagina) => {
  const offset = pagina-1;
  const response = await fetch(`http://localhost:3000/api/products?limit=${limitePaginacion}&offset=${offset}`);
  const data = await response.json();

  catalogoPaginado = data.products;
  totalProductos = data.total; //
  paginaActual = pagina;

  //console.log(catalogoPaginado);

  renderCatalogo(catalogoPaginado);
  renderPaginacion();
}
getData(`http://localhost:3000/api/products/all`); 
getPaginedData(paginaActual); 

function renderCatalogo(catalogo){

  const juegosDiv = document.getElementById("productCards");
  
  juegosDiv.innerHTML = "";


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

      juegosDiv.insertAdjacentHTML("beforeend", cardHtml);
    
  });
}
    
function renderPaginacion() {
  const pagContainer = document.getElementById("paginacion");
  pagContainer.innerHTML = "";

  const totalPaginas = Math.ceil(totalProductos / limitePaginacion);


  
  if (paginaActual < totalPaginas) {
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "→";
    btnSiguiente.className = "btn btn-outline-light btn-sm me-2";
    btnSiguiente.onclick = () => getPaginedData(paginaActual + 1);
    pagContainer.appendChild(btnSiguiente);
  }

  // Botones numerados
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("btn", "btn-sm", "me-2", i === paginaActual ? "btn-warning" : "btn-outline-light");

    btn.addEventListener("click", () => {
      getPaginedData(i);
    });

    pagContainer.appendChild(btn);
  }

  // Botón anterior (último en la fila)
  if (paginaActual > 1) {
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "←";
    btnAnterior.className = "btn btn-outline-light btn-sm";
    btnAnterior.onclick = () => getPaginedData(paginaActual - 1);
    pagContainer.appendChild(btnAnterior); // !
  }
}



//llamada a ids/clases
const searchInput = document.querySelector(".searchInput");
const platformSelect = document.getElementById("consola");
const typeSelect = document.getElementById("tipo");
const priceSelect = document.getElementById("precio");
// AddEventListeners
searchInput.addEventListener("keyup", () => {
  filterByName(catalogoCompleto);
});

platformSelect.addEventListener("change", () => {
  if (platformSelect.value != 'all') {
    filterByPlatform(catalogoCompleto); 
  }else{
    document.getElementById("productCards").innerHTML = "";
    renderCatalogo(catalogoCompleto);
    
  }
});

// typeSelect.addEventListener("change", () => {
//   if (typeSelect.value != 'all') {
//     filterByType(catalogoCompleto);
//   } else {
//     document.getElementById("productCards").innerHTML = "";
//     renderCatalogo(catalogoCompleto);
//   }
// });

// priceSelect.addEventListener("change", () => {
//   if (priceSelect.value != 'all') {
//     filterByPrice(catalogoCompleto);
//   } else {
//     document.getElementById("productCards").innerHTML = "";
//     renderCatalogo(catalogoPaginado);
//   }
// });

const adminLink = document.querySelector('.admin-link');
adminLink.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'http://localhost:3000/api/views/admin-login';
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
        agregarAlCarrito(productoId, catalogoCompleto);
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
function filterByPrice(juegos) {
  const precio = document.getElementById("precio").value;
  let resultadoFiltrado = [];

  if (precio === "0-30") {
    resultadoFiltrado = juegos.filter(juego => juego.precio > 0 && juego.precio <= 30);
  } else if (precio === "30-70") {
    resultadoFiltrado = juegos.filter(juego => juego.precio > 30 && juego.precio <= 70);
  } else {
    resultadoFiltrado = juegos;
  }

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


