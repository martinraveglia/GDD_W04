import { DataTypes } from 'sequelize';

import { db } from '.';

export const MetodosPago = db.sequelize.define(
  'MetodosPago',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Metodo: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true },
);
