import Product from '../models/product.js';
import { Op } from "sequelize";


const ProductDao = {
  async getAllByPageWithCount(limit, offset, input = "", plataforma = "all", tipo = "all", rangoPrecio = "none") {
    const clausulas = { activo: true }; 

    if (rangoPrecio !== "none") {
      const [min, max] = rangoPrecio.split("-");
      clausulas.precio = {
        [Op.gte]: parseFloat(min),
        [Op.lte]: parseFloat(max)
      };
    }

    if (input && input !== "") {
      clausulas.nombre = { [Op.substring]: input };  // No uses % con Op.substring
    }

    if (plataforma !== "all") {
      clausulas.plataforma = plataforma;
    }

    if (tipo !== "all") {
      clausulas.tipo = tipo;
    }

    // Obtener productos paginados
    const rows = await Product.findAll({where: clausulas,limit,offset,order: [["id", "ASC"]]});

    // Obtener total para paginación
    const count = await Product.count({
      where: clausulas
    });

    return { rows, count };
  },

  async getAllByPage(limite, offset, input = "", plataforma = "all", tipo = "all", rangoPrecio = "none") {
    const clausulas = { activo: true };

    if (rangoPrecio !== "none") {
      const [min, max] = rangoPrecio.split("-");
      clausulas.precio = {
        [Op.gte]: parseFloat(min),
        [Op.lte]: parseFloat(max)
      };
    }

    if (input && input !== "") {
      clausulas.nombre = { [Op.substring]: `%${input}%` };
    }

    if (plataforma && plataforma !== "all") {
      clausulas.plataforma = plataforma;
    }

    if (tipo && tipo !== "all") {
      clausulas.tipo = tipo;
    }

    const products = await Product.findAll({ limit: limite, offset: offset * limite, where: clausulas });
    return products;
  },

  async getAll() {
    const products = await Product.findAll({ where: { activo: true } });
    return products;
  },

  async countAll() {
    return await Product.count({ where: { activo: true } });
  },

  async getById(id) {
    const product = await Product.findByPk(id);
    return product;
  },

  async create(producto) {
    const newProduct = await Product.create(producto);
    return newProduct;
  },

  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.update(data);
    return product;
  },

  async delete(id) {
    const product = await Product.findByPk(id);
    if (!product) return null;
    await product.destroy();
    return true;
  },

  async toggleEstado(id) {
  const product = await Product.findByPk(id);
  if (!product) return null;

  const nuevoEstado = !product.activo;
  await product.update({ activo: nuevoEstado });

  return product;
  }
};

export default ProductDao;