import Sale from "../models/sales.js"
import SaleItem from "../models/salesItem.js";



const SaleDao = {
    async create(saleData){

        const {userId, total, productos} = saleData;
        const sale= await Sale.create({ userId, total });
        for (const product of productos) {
            await SaleItem.create({
                saleId: sale.id,
                productId: product.id,
                cantidad: product.cantidad,
                subtotal: product.precio * product.cantidad,
                stock: product.stock - 1
            });
        };
        return sale;

    },
    async getAll(){
        return await Sale.findAll({ include: SaleItem})
    }


};

export default SaleDao;