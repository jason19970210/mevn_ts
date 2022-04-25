import express, { Express, Response, Request, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors'
import routes from './routes/tasks.routes';
import mongoose from 'mongoose';
import logging from "./config/logging";
import config from "./config/config";
import swaggerUi from "swagger-ui-express";

const NAMESPACE = "Server";
const app: Express = express();
// const skipInit = config.server.NODE_ENV === "test"

mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info(NAMESPACE, "Mongo Connected");
    })
    .catch((error) => {
        logging.error(NAMESPACE, error.message, error);
    });


/** Logging */
app.use(morgan('dev'));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Handle JSON data */
app.use(express.json());
/** Handle CORS Request */
app.use(cors())

/** API RULES */
app.use((req: Request, res: Response, next: NextFunction) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST');
        return res.status(200).json({});
    }
    next();
});


/** Routes */
app.use('/', routes);
app.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import("../build/swagger.json"))
    );
});


/** Error handling */
app.use((_, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

export default app;