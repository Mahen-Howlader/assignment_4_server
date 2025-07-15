import  {  Request, Response } from "express";
import config from "./config";
import { Server } from "http"
import mongoose from "mongoose";
import { app } from "./app";
const port = config.port;
let server: Server;

async function main() {
    try {
        if (!config.database_url) {
            throw new Error("Database URL not found!");
        }

        await mongoose.connect(config.database_url);
        console.log("Mongodb conected")
        server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.error(`Server error ${error}`)
    }
}
main();