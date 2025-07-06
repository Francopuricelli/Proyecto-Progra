import Product from '../models/product.js';

const ProductDao = {
  async getAllByPage(limite, offset) {

    
    const products = await Product.findAll({limit: limite, offset : offset*limite});
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