import { DataTypes } from 'sequelize';

import { db } from '.';
import { Productos } from './Productos';
import { Proveedores } from './Proveedores';

export const ProveedoresProductos = db.sequelize.define(
  'ProveedoresProductos',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idProveedor: {
      type: DataTypes.INTEGER,
      references: {
        model: Proveedores,
        key: 'id',
      },
    },
    idProducto: {
      type: DataTypes.INTEGER,
      references: {
        model: Productos,
        key: 'id',
      },
    },
    Precio: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true },
);
