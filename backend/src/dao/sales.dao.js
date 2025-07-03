import Sale from "../models/sales.js";
import User from "../models/user.js";
import SaleItem from "../models/salesItem.js";
import Product from "../models/product.js";

const SaleDao = {
  async create(saleData) {
    const { userId, total, productos } = saleData;

    const sale = await Sale.create({ userId, total });

    for (const product of productos) {
      await SaleItem.create({
        saleId: sale.id,
        productId: product.product_id,
        cantidad: product.cantidad,
        subtotal: product.precio * product.cantidad
      });
    }

    return sale;
  },
  
   async getById(id) {
    return await Sale.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ['username']
        },
        {
          model: SaleItem,
          as: "items",
          include: [  {
            model: Product,
            as: "product" 
          }
        ]
          
        }
      ]
    });
  },
  async getAll() {
    return await Sale.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username']  
        },
        {
          model: SaleItem,
          as: 'saleItems' 
        }
      ]
    });
  }
};

export default SaleDao;
