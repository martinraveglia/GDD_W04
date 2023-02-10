import { DataTypes } from 'sequelize';

import { db } from '.';
import { Ciudades } from './Ciudades';
import { Productos } from './Productos';

export const CiudadesProductos = db.sequelize.define(
  'CiudadesProductos',
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
    idProductos: {
      type: DataTypes.INTEGER,
      references: {
        model: Productos,
        key: 'id',
      },
    },
    Precio: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false, freezeTableName: true },
);
