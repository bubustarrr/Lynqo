import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",     // or your DB host
  user: "root",          // your DB username
  password: "",          // your DB password
  database: "lynqo_db",  // your DB name
});

export default pool;
