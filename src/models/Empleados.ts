import { DataTypes } from 'sequelize';

import { db } from '.';
import { Sucursales } from './Sucursales';
import { Turnos } from './Turnos';

export const Empleados = db.sequelize.define(
  'Empleados',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    Apellido: {
      type: DataTypes.STRING,
    },
    Telefono: {
      type: DataTypes.STRING,
    },
    mail: {
      type: DataTypes.STRING,
    },
    idSucursal: {
      type: DataTypes.INTEGER,
      references: {
        model: Sucursales,
        key: 'id',
      },
    },
    idTurno: {
      type: DataTypes.INTEGER,
      references: {
        model: Turnos,
        key: 'id',
      },
    },
  },
  { timestamps: false, freezeTableName: true },
);
