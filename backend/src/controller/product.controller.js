import ProductDao from "../dao/product.dao.js";

const ProductController = {
  async getAll(req, res) {
    try {
      const products = await ProductDao.getAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: "Error obteniendo productos" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductDao.getById(id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: "no se encontro el producto." });
      }
    } catch (err) {
      res.status(500).json({ error: "error encontrando el producto." });
    }
  },

  async create(req, res) {
    try {
      const  product  = req.body;
      const newProduct = await ProductDao.create(product);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: "Error creando producto" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { product } = req.body;
      const updatedProduct = await ProductDao.update(id, product);
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: "Error actualizando el producto" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await ProductDao.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Error eliminando el producto" });
    }
  }
};

export default ProductController;