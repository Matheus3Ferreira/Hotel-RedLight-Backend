import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import routes from "./routes";
require("dotenv").config();


const hostname = 'localhost';
const port = 3333;
// const config: any = {
//     "type": process.env.DB_DIALECT,
//     "host": process.env.DB_HOST,
//     "port": process.env.DB_PORT,
//     "username": process.env.DB_USER,
//     "password": process.env.DB_PASS,
//     "database": process.env.DB_NAME,
//     "synchronize": true,
//     "logging": false,
//     "entities": [
//        "src/entity/*.ts"
//     ],
//     "migrations": [
//        "src/migration/**/*.ts"
//     ],
//     "subscribers": [
//        "src/subscriber/**/*.ts"
//     ],
//     "cli": {
//        "entitiesDir": "src/entity",
//        "migrationsDir": "src/migration",
//        "subscribersDir": "src/subscriber"
//     }
//  }

const app = express()
createConnection()

app.use(express.json())
app.use(routes)

app.listen(process.env.PORT || port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});