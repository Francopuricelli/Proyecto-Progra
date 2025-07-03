import SaleDao from "../dao/sales.dao.js";

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
  }
};

export default SaleController;
