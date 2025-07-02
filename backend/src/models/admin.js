import { DataTypes } from 'sequelize';
import sequelize from '../config/db-sequalize.js';


const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  user_password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'admins',
});

export default Admin