import { DataTypes } from "sequelize";
import User from "../models/user.js"
import sequelize from "../config/db-sequalize.js";

const Sale = sequelize.define("Sale", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
   userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
},
{
  tableName: 'sales', // nombre de la tabla real en MySQL
  timestamps: true,
});


Sale.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'            
});

User.hasMany(Sale, {
  foreignKey: 'userId',
  as: 'sales'          
});

export default Sale;


