import { Pool } from "pg";
import { config } from "../config/config";

const pool = new Pool({
  port: Number(config.db_port),
  user: config.user,
  database: config.database,
  password: config.password,
  host: config.host
});

pool.on('error', (error: Error) => {
  console.error(error.message)
});

export default pool;