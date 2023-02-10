import { DataTypes } from 'sequelize';

import { db } from '.';

export const Turnos = db.sequelize.define(
  'Turnos',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Descripcion: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true },
);
