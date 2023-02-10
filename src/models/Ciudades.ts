import { DataTypes } from 'sequelize';

import { db } from '.';
import { Provincias } from './Provincias';

export const Ciudades = db.sequelize.define(
  'Ciudades',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
    },
    idProvincia: {
      type: DataTypes.INTEGER,
      references: {
        model: Provincias,
        key: 'id',
      },
    },
  },
  { timestamps: false, freezeTableName: true },
);
