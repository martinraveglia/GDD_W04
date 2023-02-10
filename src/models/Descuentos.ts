import { DataTypes } from 'sequelize';

import { db } from '.';

export const Descuentos = db.sequelize.define(
  'Descuentos',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Porcentaje: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true },
);
