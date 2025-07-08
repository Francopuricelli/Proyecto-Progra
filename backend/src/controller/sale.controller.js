import SaleDao from "../dao/sales.dao.js";
import User from '../models/user.js';
import SaleItem from '../models/salesItem.js';
import Product from '../models/product.js';

const SaleController = {
  async create(req, res) {
    try {
      const venta = await SaleDao.create(req.body);
      res.status(201).json(venta);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error guardando la venta" });
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
