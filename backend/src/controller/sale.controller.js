import SaleDao from "../dao/sales.dao.js";
import User from '../models/user.js';
import SaleItem from '../models/salesItem.js';
import Product from '../models/product.js';

const SaleController = {
  async create(req, res) {
    try {
    const { userId, total, productos } = req.body;

    // Validar que productos sea un array
    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: "La lista de productos es inválida o está vacía." });
    }

    
    for (const product of productos) {
      const producto = await Product.findByPk(product.product_id);

      if (!producto) {
        return res.status(404).json({ error: `Producto con ID ${product.product_id} no encontrado.` });
      }

      if (producto.stock < product.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para el producto ${producto.nombre}. Stock disponible: ${producto.stock}` });
      }
    }


    const venta = await SaleDao.create(req.body);

   
    for (const product of productos) {
      const producto = await Product.findByPk(product.product_id);
      producto.stock -= product.cantidad;
      await producto.save();
    }

    res.status(201).json(venta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error guardando la venta." });
  }
},

  async getAll(req, res) {
    try {
      const ventas = await SaleDao.getAll();
      res.json(ventas);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener ventas" });
    }
  },

  async getById(req, res) {
  const { id } = req.params;

  const venta = await SaleDao.getById(id, {
    include: [
      { model: User, attributes: ['username'] },
      {
        model: SaleItem,
        include: [{ model: Product, attributes: ['nombre'] }]
      }
    ]
  });

  if (!venta) return res.status(404).json({ error: "Venta no encontrada" });

  res.json({
    usuario: venta.user,
    productos: venta.items.map(item => ({
      producto: item.product,
      cantidad: item.cantidad,
      subtotal: item.subtotal
    }))
  });
}
};



export default SaleController;
