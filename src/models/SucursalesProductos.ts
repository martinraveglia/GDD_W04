import { DataTypes } from 'sequelize';

import { db } from '.';
import { Productos } from './Productos';
import { Sucursales } from './Sucursales';

export const SucursalesProductos = db.sequelize.define(
  'SucursalesProductos',
  {
    idSucursal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Sucursales,
        key: 'id',
      },
    },
    idProducto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Productos,
        key: 'id',
      },
    },
    Stock: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true },
);
