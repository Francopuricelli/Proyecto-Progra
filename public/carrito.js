
let lista_carrito = [];


export function agregarAlCarrito(producto_id, lista_juegos) {

    const carritoGuardado = localStorage.getItem("carrito"); 
    if (carritoGuardado) {
        lista_carrito = JSON.parse(carritoGuardado);
    }

    const productoExistente = lista_juegos.find(p => p.id === producto_id); 
    if (!productoExistente) return;

    const productoEnCarrito = lista_carrito.find(p => p.id === producto_id);

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



function renderizarCarrito(){
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

        li.innerHTML = `
           <img src="${item.image_url}" />
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

    // Escuchar cambios en cantidad
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

    // Escuchar clicks en botones eliminar
    const botonesEliminar = divCarrito.querySelectorAll(".remove-btn");
    botonesEliminar.forEach((boton, index) => {
        boton.addEventListener("click", (e) => {
            if (lista_carrito[index].cantidad > 1) {
                lista_carrito[index].cantidad--; // Reducir cantidad
            } else {
                lista_carrito.splice(index, 1); // Eliminar del array
            }
        localStorage.setItem("carrito", JSON.stringify(lista_carrito)); // ACTUALIZAR siempre
        renderizarCarrito(); 
    });
});
    // Calcular el total
    let total = 0;
    lista_carrito.forEach(juego => {
        total += juego.precio * juego.cantidad;
    });
    totalElement.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
};

function recuperarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    lista_carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function limpiarCarrito() {
    lista_carrito = [];
    localStorage.removeItem("carrito");
    renderizarCarrito();
}
// Evento para limpiar el carrito


// Recuperar el carrito guardado al cargar la página
recuperarCarrito();
renderizarCarrito();