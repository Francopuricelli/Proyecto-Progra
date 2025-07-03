import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequalize.js";
import Sale from "./sales.js";
import Product from "./product.js";

const SaleItem = sequelize.define("SaleItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
},
{
  tableName: 'salesItems', // nombre de la tabla real en MySQL
  timestamps: false,
});

// Relaciones
Sale.hasMany(SaleItem, {
  foreignKey: "saleId",
  as: "items" // sale.items
});

SaleItem.belongsTo(Sale, {
  foreignKey: "saleId",
  as: "sale"
});

Product.hasMany(SaleItem, {
  foreignKey: "productId",
  as: "saleItems"
});

SaleItem.belongsTo(Product, {
  foreignKey: "productId",
  as: "product"
});

export default SaleItem;