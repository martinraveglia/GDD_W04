import { DataTypes } from 'sequelize';

import { db } from '.';
import { Ciudades } from './Ciudades';

export const Sucursales = db.sequelize.define(
  'Sucursales',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCiudad: {
      type: DataTypes.INTEGER,
      references: {
        model: Ciudades,
        key: 'id',
      },
    },
  },
  { timestamps: false, freezeTableName: true },
);
