import { DataTypes } from 'sequelize';

import { db } from '.';
import { MetodosPagoVenta } from './MetodosPagoVenta';
import { Sucursales } from './Sucursales';

export const Ventas = db.sequelize.define(
  'Ventas',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idSucursal: {
      type: DataTypes.INTEGER,
      references: {
        model: Sucursales,
        key: 'id',
      },
    },
    idMetodoPagoVenta: {
      type: DataTypes.INTEGER,
      references: {
        model: MetodosPagoVenta,
        key: 'id',
      },
    },
    timeStamp: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false, freezeTableName: true },
);
