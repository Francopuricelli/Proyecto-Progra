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
  
};

//llamada a ids/clases
const inputBuscar = document.querySelector(".searchInput");
const platformSelect = document.getElementById("consola");
const typeSelect = document.getElementById("tipo");
const priceSelect = document.getElementById("precio");


const getDataPaginada = async (pagina) => {
  const offset = pagina-1;

  const input = inputBuscar.value.trim();
  const plataforma = platformSelect.value === "default" ? "all" : platformSelect.value;
  const tipo = typeSelect.value === "default" ? "all" : typeSelect.value;
  const rangoPrecio = priceSelect.value === "default" ? "none" : priceSelect.value;

  const response = await fetch(`http://localhost:3000/api/products?limit=${limitePaginacion}&offset=${offset}&input=${encodeURIComponent(input)}&plataforma=${plataforma}&tipo=${tipo}&rangoPrecio=${rangoPrecio}`);
  const data = await response.json();

  catalogoPaginado = data.products;
  totalProductos = data.total;
  paginaActual = pagina;

  renderCatalogo(catalogoPaginado);
  renderPaginacion();
}

 
getDataPaginada(paginaActual); 

function renderCatalogo(catalogo){

  const juegosDiv = document.getElementById("productCards");
  
  juegosDiv.innerHTML = "";


  catalogo.forEach((juego) => {
    const { id, nombre, tipo, plataforma, precio, imagen_url } = juego;

    const cardHtml = `
      <div class="col-6 col-md-4 col-lg-3 mb-4"> 
        <div class="card game-card text-white position-relative h-90 shadow">
          <img src="http://localhost:3000/img/${imagen_url}" class="card-img" alt="${nombre}">
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



// AddEventListeners

inputBuscar.addEventListener("keyup", aplicarFiltrosCombinados);

platformSelect.addEventListener("change", aplicarFiltrosCombinados);

typeSelect.addEventListener("change", aplicarFiltrosCombinados);

priceSelect.addEventListener("change", aplicarFiltrosCombinados);



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
    
    let producto = catalogoPaginado.find(p => p.id == productoId);
    if (!producto) {
      
      producto = catalogoCompleto.find(p => p.id == productoId);
    }
    if (producto) {
      agregarAlCarrito(productoId, [producto]);
      mostrarAlerta("Producto agregado al carrito");
    } else {
      mostrarAlerta("No se encontró el producto");
    }
  }
});






  //FUNCIONES FILTRAR
function filtrarAny(arr, filtro,key) {
    return arr.filter((p) =>
        p[key].toLowerCase().includes(filtro.toLowerCase()) 
    );
}

function aplicarFiltrosCombinados() {

  getDataPaginada(1);
  const nombreFiltro = inputBuscar.value.trim().toLowerCase();
  const plataformaFiltro = platformSelect.value;
  const tipoFiltro = typeSelect.value;
  const precioFiltro = priceSelect.value;

  const sinNombre = !nombreFiltro
  const sinPlataforma = plataformaFiltro === "default" || plataformaFiltro === "all";
  const sinTipo = tipoFiltro === "default" || tipoFiltro === "all";
  const sinPrecio = precioFiltro === "default" || precioFiltro === "none";

 
  if (sinNombre && sinPlataforma && sinTipo && sinPrecio) {
    getDataPaginada(paginaActual);
    return;
  }

 
  let juegosFiltrados = catalogoCompleto;

  if (!sinNombre) {
    juegosFiltrados = filtrarAny(juegosFiltrados, nombreFiltro, 'nombre');
  }

  if (!sinPlataforma) {
    juegosFiltrados = filtrarAny(juegosFiltrados, plataformaFiltro, 'plataforma');
  }

  if (!sinTipo) {
    juegosFiltrados = filtrarAny(juegosFiltrados, tipoFiltro, 'tipo');
  }

  if (!sinPrecio) {
    if (precioFiltro === '0-30') {
      juegosFiltrados = juegosFiltrados.filter(j => j.precio > 0 && j.precio <= 30);
    } else if (precioFiltro === '30-100') {
      juegosFiltrados = juegosFiltrados.filter(j => j.precio > 30 && j.precio <= 100);
    }
  }

 
  renderCatalogo(juegosFiltrados);
  document.getElementById("paginacion").innerHTML = "";
}



const botonMenu = document.getElementById("toggleBarraLateral");
const barraLateral = document.getElementById("barraLateral");
const cerrarBarraLateral = document.getElementById("cerrarBarraLateral");

botonMenu.addEventListener("click", () => {
  barraLateral.classList.toggle("open");
});
cerrarBarraLateral.addEventListener("click", () => {
  barraLateral.classList.remove("open");
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




