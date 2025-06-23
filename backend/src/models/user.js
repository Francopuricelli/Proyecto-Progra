import { DataTypes } from 'sequelize';
import sequelize from '../config/db-sequalize.js';

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'users', // nombre de la tabla real en MySQL
});

export default User;