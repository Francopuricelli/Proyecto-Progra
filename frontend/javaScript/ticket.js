let lista_comprados= [];

function renderCompras(){
    document.getElementById("fechaCompra").textContent = new Date().toLocaleDateString("es-AR");
    

    const carritoGuardado = localStorage.getItem("carrito"); 
    if (carritoGuardado) {
        lista_comprados = JSON.parse(carritoGuardado);
    }    
    
    
    const contenedor = document.getElementById("detalleTicket");

    const totalContenedor = document.getElementById("totalTicket");
    
    let total = 0;

    lista_comprados.forEach(producto => {
        const fila = document.createElement("tr")
        let subtotal = producto.precio * producto.cantidad
        fila.innerHTML=`
        <td class="col">${producto.nombre}</td>
        <td class="col">${producto.cantidad}</td>
        <td class="col">$ ${subtotal}</td>

        `
        total = total + subtotal;
        totalContenedor.innerHTML=`$ ${total}`

        console.log(producto.nombre);
        console.log(producto.cantidad); 
        console.log(producto.precio);
    
        contenedor.appendChild(fila);
        
        

    });

}
renderCompras();
