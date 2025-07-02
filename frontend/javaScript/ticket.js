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

async function descargarTicket() {
    const ticketDiv = document.querySelector(".recibo-main");

   if (!ticketDiv) {
      alert("El ticket no está visible o no está en el documento.");
      return;
    }

    const canvas = await html2canvas(ticketDiv, {
        scale: 2
    });

    const imgData = canvas.toDataURL("image/png");
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProperties = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ticket.pdf");
}


const nombreCliente = localStorage.getItem("username")

const nombreDiv= document.getElementById("nombreCliente");
nombreDiv.innerHTML = nombreCliente;

renderCompras();
