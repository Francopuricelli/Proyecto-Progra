import Product from '../models/product.js';
import { Op } from "sequelize";


const ProductDao = {
  async getAllByPage(limite, offset, input = "", plataforma = "all", tipo = "all", rangoPrecio = "none") {
    const clausulas= {activo: true};
    
  if (rangoPrecio != "none"){
      const precio = rangoPrecio.split("-")
      const min = precio[0];
      const max = precio[1];
     
      clausulas.precio[Op.gte] = min;
      clausulas.precio[Op.lte] = max;
    }

  if (input && input != ""){
    clausulas.nombre = { [Op.substring]: `%${input}%`};
  }

  if (plataforma && plataforma != "all"){
    clausulas.plataforma = plataforma;
  }

  if (tipo && tipo != "all"){
    clausulas.tipo= tipo;
  }

    const products = await Product.findAll({limit: limite, offset : offset*limite, where: clausulas});
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