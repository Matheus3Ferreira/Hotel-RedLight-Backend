import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import routes from "./routes";
import cors from 'cors';
require("dotenv").config();

const hostname = 'localhost';
const config: any = {
    "type": process.env.DB_DIALECT,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "synchronize": true,
    "logging": false,
    "entities": [
       "src/entity/*"
    ],
    "migrations": [
       "src/migration/**/*.ts"
    ],
    "subscribers": [
       "src/subscriber/**/*.ts"
    ],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
 }

const app = express()
createConnection(config)

app.use(cors())
app.use(express.json())
app.use("/api", routes)

app.listen(process.env.PORT || 3333, () => {
    console.log(`Server running at http://${hostname}:3333/ \"`);
});