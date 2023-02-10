import { DataTypes } from 'sequelize';

import { db } from '.';
import { Categorias } from './Categorias';

export const Productos = db.sequelize.define(
  'Productos',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      references: {
        model: Categorias,
        key: 'id',
      },
    },
  },
  { timestamps: false, freezeTableName: true },
);
