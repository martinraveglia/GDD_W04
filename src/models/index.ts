import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  database: 'GDD_MRaveglia',
  username: 'root',
  password: 'Radium2022',
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

sequelize.sync();

export const db = { Sequelize, sequelize };

export * from './associations';
