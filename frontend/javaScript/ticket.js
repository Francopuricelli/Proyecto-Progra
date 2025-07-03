let lista_comprados= [];

async function renderCompras() {
  const ventaId = new URLSearchParams(window.location.search).get("ventaId");

  if (!ventaId) {
    alert("Venta no encontrada");
    return;
  }

  const response = await fetch(`/api/sales/${ventaId}`);
  const data = await response.json();

  const { user, productos } = data;
  document.getElementById("nombreCliente").textContent = user.username;
  document.getElementById("fechaCompra").textContent = new Date().toLocaleDateString("es-AR");

  let total = 0;
  const ticketbody = document.getElementById("detalleTicket");
  const totalContenedor = document.getElementById("totalTicket");

  productos.forEach((item) => {
    const fila = document.createElement("tr");
    const subtotal = item.subtotal;

    fila.innerHTML = `
      <td>${item.producto.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${subtotal.toFixed(2)}</td>
    `;

    total += subtotal;
    ticketbody.appendChild(fila);
  });

  totalContenedor.textContent = `$${total.toFixed(2)}`;
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

renderCompras();
