import { DataTypes } from 'sequelize';

import { db } from '.';

export const Categorias = db.sequelize.define(
  'Categorias',
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
