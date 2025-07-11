import ProductDao from "../dao/product.dao.js";

const ProductController = {
  async getAllByPage(req, res) {
    const { limit, offset, input = "", plataforma = "all", tipo = "all", rangoPrecio = "none"} = req.query;

  try {
    const products = await ProductDao.getAllByPage(Number(limit), Number(offset), input, plataforma, tipo, rangoPrecio);
    const total = await ProductDao.countAll();

    res.status(200).json({products,total});

    } catch (err) {
      res.status(500).json({ error: "Error obteniendo productos" });
    }
  },

  async getAll(req, res) {
    try {
      const products = await ProductDao.getAll();
      res.status(200).json(products);
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
      const product = req.body;
      const newProduct = await ProductDao.create(product);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ error: "Error creando producto" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const product = req.body;
      const updatedProduct = await ProductDao.update(id, product);
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: "Error actualizando el producto" });
    }
  },
  async toggleEstado(req, res) {
  try {
    const { id } = req.params;
    const producto = await ProductDao.toggleEstado(id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ message: "Estado actualizado", producto });
  } catch (err) {
    res.status(500).json({ error: "Error actualizando estado" });
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