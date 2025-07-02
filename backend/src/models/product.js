import { DataTypes } from 'sequelize';
import sequelize from '../config/db-sequalize.js';

const Product = sequelize.define('product', {
 id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  plataforma: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  desarrollador: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  genero: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  lanzamiento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  idioma: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  imagen_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  stock: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
},
{
  tableName: 'products', // nombre de la tabla real en MySQL
});

export default Product;