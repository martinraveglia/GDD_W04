import { DataTypes } from 'sequelize';

import { db } from '.';

export const Provincias = db.sequelize.define(
  'Provincias',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false, freezeTableName: true },
);
