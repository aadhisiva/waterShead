/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * File: for db connection
 * created: [2023-11-04]
 * Project: waterShead
 */

import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { entities } from "../entityManager";

dotenv.config();

export const AppDataSource= new DataSource({
  type: "mssql",
  // host: "LAPTOP-D97QEO1R",
  host: String(process.env.PRO_DB_HOST),
  port: Number(process.env.PRO_DB_PORT),
  username: process.env.PRO_DB_USERNAME,
  password: process.env.PRO_DB_PASSWORD,
  database: process.env.PRO_DB_DATABASE,
  entities: entities(),
  logging: false,
  synchronize: true,
  options: {
      encrypt: false,
      useUTC: true,
  },
  pool: {
      max: 100,
      min: 0,
      idleTimeoutMillis: 3600000,
  },
});




