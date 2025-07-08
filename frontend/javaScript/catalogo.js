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

const getDataPaginada = async (pagina) => {
  const offset = pagina-1;
  const response = await fetch(`http://localhost:3000/api/products?limit=${limitePaginacion}&offset=${offset}`);
  const data = await response.json();

  catalogoPaginado = data.products;
  totalProductos = data.total; //
  paginaActual = pagina;

  renderCatalogo(catalogoPaginado);
  renderPaginacion();
}
getData(`http://localhost:3000/api/products/all`); 
getDataPaginada(paginaActual); 

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
  const pagContenedor = document.getElementById("paginacion");
  pagContenedor.innerHTML = "";

  const totalPaginas = Math.ceil(totalProductos / limitePaginacion);


  
  if (paginaActual < totalPaginas) {

    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "→";
    btnSiguiente.className = "btn-paginacion btn-sm me-2";
    btnSiguiente.onclick = () => getDataPaginada(paginaActual + 1);
    pagContenedor.appendChild(btnSiguiente);
  }

  // Botones numerados
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("btn-paginacion");

     if (i === paginaActual) {
    btn.style.backgroundColor = "var(--color-boton)";
    btn.style.color = "#fff";
    btn.style.border = "none";
  }

    btn.addEventListener("click", () => {
      getDataPaginada(i);
    });

    pagContenedor.appendChild(btn);
  }

  // Botón anterior (último en la fila)
  if (paginaActual > 1) {
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "←";
    btnAnterior.className = "btn-paginacion btn-sm";
    btnAnterior.onclick = () => getDataPaginada(paginaActual - 1);
    pagContenedor.appendChild(btnAnterior); // !
  }
}



//llamada a ids/clases
const inputBuscar = document.querySelector(".searchInput");
const platformSelect = document.getElementById("consola");
const typeSelect = document.getElementById("tipo");
const priceSelect = document.getElementById("precio");
// AddEventListeners
inputBuscar.addEventListener("keyup", () => {
  filtrarPorNombre(catalogoCompleto);
});

platformSelect.addEventListener("change", () => {
  if (platformSelect.value != 'all') {
    filtrarPorPlataforma(catalogoCompleto); 
  }else{
    document.getElementById("productCards").innerHTML = "";
    renderCatalogo(catalogoCompleto);
    
  }
});

// typeSelect.addEventListener("change", () => {
//   if (typeSelect.value != 'all') {
//     filtrarPorTipo(catalogoCompleto);
//   } else {
//     document.getElementById("productCards").innerHTML = "";
//     renderCatalogo(catalogoCompleto);
//   }
// });

// priceSelect.addEventListener("change", () => {
//   if (priceSelect.value != 'all') {
//     filtrarPorPrecio(catalogoCompleto);
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

  const alternarTema = document.getElementById("themeToggle");

  alternarTema.addEventListener("click", () => {
    const html = document.documentElement;
    const temaActual = html.getAttribute("data-theme") || "light";
    const siguienteTema = temaActual === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", siguienteTema);
    localStorage.setItem("theme", siguienteTema);


    alternarTema.innerHTML = siguienteTema === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  });


  window.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", temaGuardado);
    alternarTema.innerHTML = temaGuardado === "dark"
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
function filtrar(arr, filtro,key) {
    return arr.filter((p) =>
        p[key].toLowerCase().includes(filtro) 
    );
}

function filtrarPorNombre(juegos){
    const filtro = document.querySelector(".searchInput").value.toLowerCase();
    const resultadoFiltrado = filtrar(juegos, filtro, "nombre");
    document.getElementById("productCards").innerHTML = ""; 
    renderCatalogo(resultadoFiltrado);
}

function filtrarPorPlataforma(juegos) {
    const plataforma = document.getElementById("consola").value;
    const resultadoFiltrado = filtrar(juegos, plataforma.toLowerCase(), "plataforma");
    document.getElementById("productCards").innerHTML = ""; 
    renderCatalogo(resultadoFiltrado);
} 

function filtrarPorTipo(juegos) {
    const plataforma = document.getElementById("tipo").value;
    const resultadoFiltrado = filtrar(juegos, plataforma.toLowerCase(), "plataforma");
    document.getElementById("productCards").innerHTML = ""; 
    renderCatalogo(resultadoFiltrado);
} 
function filtrarPorPrecio(juegos) {
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

document.getElementById("toggleBarraLateral").addEventListener("click", () => {
  document.getElementById("barraLateral").classList.add("open");
});

document.getElementById("cerrarBarraLateral").addEventListener("click", () => {
  document.getElementById("barraLateral").classList.remove("open");
});

const inputRango = document.getElementById("rangoPrecio");
const valorPrecio = document.getElementById("valorPrecio");

inputRango.addEventListener("input", () => {
  valorPrecio.textContent = `$${inputRango.value}`;
});

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


