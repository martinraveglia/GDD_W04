import { DataTypes } from 'sequelize';

import { db } from '.';
import { MetodosPagoCompra } from './MetodosPagoCompra';
import { Sucursales } from './Sucursales';

export const Compras = db.sequelize.define(
  'Compras',
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
    idMetodoPagoCompra: {
      type: DataTypes.INTEGER,
      references: {
        model: MetodosPagoCompra,
        key: 'id',
      },
    },
    time: {
      type: DataTypes.DATE,
    },
  },
  { timestamps: false, freezeTableName: true },
);
