import app from "./app";
import config from "./config/config";
import logging from "./config/logging";
// import http from 'http';

const NAMESPACE = "Server";

/** Server */
// const httpServer = http.createServer(app);
// httpServer.listen(config.server.port, () => logging.info(
//     NAMESPACE,
//     `Server is running ${config.server.hostname}:${config.server.port}`
// ));

app.listen(config.server.port, () => logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
));