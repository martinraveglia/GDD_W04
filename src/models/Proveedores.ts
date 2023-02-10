import { DataTypes } from 'sequelize';

import { db } from '.';
import { Ciudades } from './Ciudades';

export const Proveedores = db.sequelize.define(
  'Proveedores',
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
    Nombre: {
      type: DataTypes.STRING,
    },
    Apellido: {
      type: DataTypes.STRING,
    },
    RazonSocial: {
      type: DataTypes.STRING,
    },
    Telefono: {
      type: DataTypes.STRING(10),
    },
    Mail: {
      type: DataTypes.STRING,
    },
    Notas: {
      type: DataTypes.TEXT('medium'),
    },
  },
  { timestamps: false, freezeTableName: true },
);
