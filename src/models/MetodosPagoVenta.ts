import { DataTypes } from 'sequelize';

import { db } from '.';
import { Cuotas } from './Cuotas';
import { Descuentos } from './Descuentos';
import { MetodosPago } from './MetodosPago';

export const MetodosPagoVenta = db.sequelize.define(
  'MetodosPagoVenta',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idMetodoPago: {
      type: DataTypes.INTEGER,
      references: {
        model: MetodosPago,
        key: 'id',
      },
    },
    idDescuento: {
      type: DataTypes.INTEGER,
      references: {
        model: Descuentos,
        key: 'id',
      },
    },
    idCuotas: {
      type: DataTypes.INTEGER,
      references: {
        model: Cuotas,
        key: 'id',
      },
    },
  },
  { timestamps: false, freezeTableName: true },
);
