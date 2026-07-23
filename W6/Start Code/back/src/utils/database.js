import mysql from "mysql2/promise";
import dotenv from "dotenv";
 
dotenv.config();
 
// TODO
// Create the pool to connect to the database
// Use the database settings from the .env file
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'week6Db',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export { pool };
