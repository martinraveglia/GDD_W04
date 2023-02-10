import { DataTypes } from 'sequelize';

import { db } from '.';

export const Cuotas = db.sequelize.define(
  'Cuotas',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Cantidad: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true },
);
