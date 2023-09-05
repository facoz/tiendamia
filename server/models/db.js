const cors = require("cors");
const express = require("express");
const pool = require("mysql2/promise");

class db {
    constructor() {
        this.expressInstance = express();
        this.dbInstance = pool.createPool({
            host: "mysql", 
            user: "root",
            password: "admin",
            database: "tiendamia",
            port: 3306
        });

        this.expressInstance.use(cors());
        this.expressInstance.use(express.json());
        this.expressInstance.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send("Something went wrong!");
        });
    }

    getExpress() {
    return this.expressInstance;
    }

    getDB() {
        return this.dbInstance;
    }
}

const dbInstance = new db();

module.exports = dbInstance;
