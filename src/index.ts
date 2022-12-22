import dotenv from 'dotenv';
import { startSequelize } from './models';
import app from './app';
import * as admin from 'firebase-admin';

dotenv.config();
const DB_HOSTNAME = <string>process.env.DB_HOSTNAME;
const DB_NAME = <string>process.env.DB_NAME;
const DB_PASS = <string>process.env.DB_PASS;
const DB_USER = <string>process.env.DB_USER;
const PORT = process.env.PORT;

admin.initializeApp();

try {
  const sequelize = async () => {
    await startSequelize(DB_HOSTNAME, DB_NAME, DB_PASS, DB_USER);
  };

  sequelize().then(() => {
    app.listen(PORT, async () => {
      console.info('DB and Express server is up and running!!!!');
    });
  });
} catch (error) {
  console.error(error);
  process.abort();
}
