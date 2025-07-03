let lista_carrito = [];

export function agregarAlCarrito(producto_id, lista_juegos) {
  console.log("funciona");
  console.log(producto_id);

  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    lista_carrito = JSON.parse(carritoGuardado);
    console.log("carrito cargado");
  }

  const productoExistente = lista_juegos.find(p => p.id === Number(producto_id));
  if (!productoExistente) return;

  const productoEnCarrito = lista_carrito.find(p => p.id === Number(producto_id));

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    const productoParaCarrito = {
      ...productoExistente,
      cantidad: 1
    };
    lista_carrito.push(productoParaCarrito);
  }

  localStorage.setItem("carrito", JSON.stringify(lista_carrito));
  renderizarCarrito();
}

function renderizarCarrito() {
  const divCarrito = document.getElementById("cart-items");
  const totalElement = document.querySelector(".total-container");
  if (!divCarrito) return;

  const ul = document.createElement("ul");
  divCarrito.innerHTML = "";

  if (lista_carrito.length === 0) {
    divCarrito.innerHTML = "<p>No hay elementos en el carrito.</p>";
    totalElement.innerHTML = "<h3>Total: $0.00</h3>";
    return;
  }

  lista_carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "li-items";

    li.innerHTML = `
      <img class="cart-img" src="${item.imagen_url}" />
      <div class="item-info">
        <h3>${item.nombre}</h3>
        <p>Plataforma: ${item.plataforma}</p>
        <p>Precio: $${(item.precio * item.cantidad).toFixed(2)}</p>
      </div>
      <div class="item-actions">
        <input type="number" min="1" value="${item.cantidad}" data-index="${index}" />
        <span class="subtotal">$${(item.precio * item.cantidad).toFixed(2)}</span>
        <button class="remove-btn" data-index="${index}">✕</button>
      </div>
    `;

    ul.appendChild(li);
  });

  divCarrito.appendChild(ul);

  const inputsCantidad = divCarrito.querySelectorAll("input[type='number']");
  inputsCantidad.forEach(input => {
    input.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      const nuevaCantidad = parseInt(e.target.value);
      if (nuevaCantidad > 0) {
        lista_carrito[index].cantidad = nuevaCantidad;
        lista_carrito[index].subtotal = lista_carrito[index].precio * nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(lista_carrito));
        renderizarCarrito();
      }
    });
  });

  const botonesEliminar = divCarrito.querySelectorAll(".remove-btn");
  botonesEliminar.forEach((boton, index) => {
    boton.addEventListener("click", () => {
      if (lista_carrito[index].cantidad > 1) {
        lista_carrito[index].cantidad--;
      } else {
        lista_carrito.splice(index, 1);
      }
      localStorage.setItem("carrito", JSON.stringify(lista_carrito));
      renderizarCarrito();
    });
  });

  let total = 0;
  lista_carrito.forEach(juego => {
    total += juego.precio * juego.cantidad;
  });
  totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

function recuperarCarrito() {
  const carritoGuardado = localStorage.getItem("carrito");
  lista_carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

async function confirmarCompra() {
  if (lista_carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const user_id = 1;
  let total = 0;
  for(const producto of lista_carrito) {
    total += producto.precio * producto.cantidad;
  }

  const venta = {
    userId: user_id,
    total: total,
    productos: lista_carrito.map((producto) => ({
      product_id: producto.id,
      cantidad: producto.cantidad,
      precio: producto.precio
    }))
  };

  try {
    const response = await fetch("/api/sales/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(venta)
    });

    const data = await response.json();
    if (response.ok) {
      alert("Compra realizada con éxito!");
      limpiarCarrito();
      window.location.href = `/ticket.html?ventaId=${data.id}`;
    } else {
      const data = await response.json();
      alert("Error al registrar la compra: " + (data.error || "Desconocido"));
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("Error de red al intentar registrar la compra.");
  }
}


function limpiarCarrito() {
  lista_carrito = [];
  localStorage.removeItem("carrito");
  renderizarCarrito();
}

// Inicializar
recuperarCarrito();
renderizarCarrito();


const botonConfirmar = document.getElementById("botonConfirmar");
if (botonConfirmar) {
  botonConfirmar.addEventListener("click", confirmarCompra);
}
