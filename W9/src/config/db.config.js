import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  PORT: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  storage: './academic_db.sqlite', // for sqlite
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default dbConfig;
