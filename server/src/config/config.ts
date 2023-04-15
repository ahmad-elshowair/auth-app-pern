import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT),
  db_port: Number(process.env.PGPORT),
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  pepper: process.env.PEPPER,
  salt_round: Number(process.env.SALTROUND),
  jwt_secret_access: String(process.env.JWTSECRET),
  jwt_secret_refresh: String(process.env.JWTSECRETREFRESH),
  expire_access: String(process.env.EXPIREACCESS),
  expire_refresh: String(process.env.EXPIREREFRESH)
}