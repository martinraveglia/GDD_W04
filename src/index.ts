import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { configAssociations, db } from './models';
import routes from './routes';

const sequalizeConnection = async () => {
  await db.sequelize.authenticate();
  configAssociations();
  console.log('Connection has been established successfully.');
};

const PORT = 3333;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/', routes);
app.use('/', (_, res) => {
  res.status(200);
  res.send(`
    <h1>Welcome to Sequelize Client</h1>
    <h2><strong>RR-DBIC</strong></h2>
  `);
});

const startApp = async () => {
  try {
    await sequalizeConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}!`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
