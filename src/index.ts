/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * File: main file of project
 * created: [2023-11-04]
 * Project: waterShead
 */

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from "fs";
import cors from "cors";
import { AppDataSource } from './db/config';
import Logger from './loggers/winstonLogger';

//controllers
import {adminRouter, sectorRouter} from "./apiController";
import { userRouter } from './apiController/userControl';

// for acceessing env variables
dotenv.config();

// express adding sever to app
const app = express();

// setting port num from env
const port: any = process.env.PORT || 3000;

// used for body parsers in apis
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// cors setup for communication of sever and client
app.use(cors());

//setting req headers and res headers 
app.use(function (req, res, next) {
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header("X-XSS-Protection", "1; mode=block'");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("strict-transport-security", "max-age=63072000; includeSubdomains; preload");
  res.header('Content-Security-Policy', '<policy-directive>; <policy-directive>')
  next();
})

// create for logs 
app.use(morgan('common', {
  stream: fs.createWriteStream('./logs/application.log', { flags: 'a' })
}));

// Set directory to contain the templates ('views')
// app.set('views', __dirname);

// Set view engine to use
// app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.get("/run", (req, res) => {
  res.send("running")
})

// controllers
app.use('/sector', sectorRouter);
app.use('/login', userRouter);
app.use('/admin', adminRouter);

// we are adding port connection here
// app.listen(port, '192.168.59.170', async () => {
// app.listen(port, '10.96.112.198', async () => {
app.listen(port, async () => {
  let connection = await AppDataSource.initialize();
  if (connection instanceof Error) {
    Logger.error("connection error :::::::", connection);
    throw new Error(JSON.stringify(connection));
  } else {
    Logger.info(`⚡️[Database]: Database connected....`);
  }
  Logger.info(`⚡️[server]: Server is running at ${port}`);
});

