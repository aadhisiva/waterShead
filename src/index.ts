/**
 * Name: Aadhi siva panjagala
 * Author: aadhisivapanjagala@gmail.com
 * File: main file of project
 * created: [2023-11-04]
 * Project: waterShead
 */
import "reflect-metadata";
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from "fs";
import cors from "cors";
import { AppDataSource } from './db/config';
import Logger from './loggers/winstonLogger';

//controllers
import { adminRouter, sectorRouter } from "./apiController";
import { userRouter } from './apiController/userControl';
import path from "path";

// for accessing env variables
dotenv.config();


// express adding sever to app
const app = express();

// setting port num from env
const port: any = process.env.PORT || 3000;

// used for body parsers in apis
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// cors setup for communication of sever and client
app.use(cors({ origin: ['http://103.138.197.145', 'http://localhost:8080', 'http://192.168.45.170:8080'] }));

//setting req headers and res headers 
app.use(function (req, res, next) {
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header("X-XSS-Protection", "1; mode=block'");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("strict-transport-security", "max-age=63072000; includeSubdomains; preload");
  res.header('Content-Security-Policy', '<policy-directive>; <policy-directive>')
  next();
})

// create for logs śad
app.use(morgan('common', {
  stream: fs.createWriteStream('./logs/application.log', { flags: 'a' })
}));

// Set directory to contain the templates ('views')
// app.set('views', __dirname);

// Set view engine to use
// app.set('view engine', 'ejs');
app.use(morgan('dev'));
// we are adding port connection here
// app.listen(port, '192.168.59.170', async () => {
AppDataSource.initialize().then(async (connection) => {
  Logger.info(`⚡️[Database]: Database connected....+++++++ ${port}`);
}).catch(error => {
  Logger.error("connection error :::::::", error);
  throw new Error("new Connection ERROR " + JSON.stringify(error));
})

app.use(express.static(path.resolve(__dirname, "../build"))); //assign web application build file here 
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
}); // it will keep path sync in every page

app.get("/run", (req, res) => {
  res.send("running")
})

// controllers
app.use('/sector', sectorRouter);
app.use('/login', userRouter);
app.use('/admin', adminRouter);

// app.listen(port, '192.168.45.170');
app.listen(port);


