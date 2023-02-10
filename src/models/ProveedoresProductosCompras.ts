import { DataTypes } from 'sequelize';

import { db } from '.';
import { Compras } from './Compras';
import { ProveedoresProductos } from './ProveedoresProductos';

export const ProveedoresProductosCompras = db.sequelize.define(
  'ProveedoresProductosCompras',
  {
    idProveedoresProductos: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: ProveedoresProductos,
        key: 'id',
      },
    },
    idCompra: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: Compras,
        key: 'id',
      },
    },
    Cantidad: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true },
);
