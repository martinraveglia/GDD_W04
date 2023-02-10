import { DataTypes } from 'sequelize';

import { db } from '.';
import { CiudadesProductos } from './CiudadesProductos';
import { Ventas } from './Ventas';

export const CiudadesProductosVentas = db.sequelize.define(
  'CiudadesProductosVentas',
  {
    idCiudadesProductos: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: CiudadesProductos,
        key: 'id',
      },
    },
    idVenta: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: Ventas,
        key: 'id',
      },
    },
    Cantidad: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true },
);
