import { DataTypes } from 'sequelize';
import sequelize from '../config/db-sequalize.js';


const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
   
  }

}, {
  tableName: 'users',
  timestamps: false
});

export default User