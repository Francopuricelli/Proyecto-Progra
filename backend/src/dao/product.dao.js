import Product from '../models/product.js';

const ProductDao = {
  async getAll() {
    const products = await Product.findAll();
    return products;
  },

  async getById(id) {
    const product = await Product.findByPk(id);
    return product;
  },

  async create(producto) {
    const newProduct = await Product.create({producto});
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
    if (product) return null;
    await product.destroy();
    return true;
  }
};

export default ProductDao;