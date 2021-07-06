import * as http from 'http';
import express from 'express';
import { getMainRouter } from '../routes/routing';

export function getServer() {

    const app = express();

    // configure handling body of requests
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())

    // enable cross-origin requests
    app.use('/', function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        next();
    });

    // set routes
    app.use("/", getMainRouter());

    const server = http.createServer(app);
    return server;
}