import "dotenv/config"
import { ConnectOptions } from "mongoose"

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB = process.env.MONGO_DB;
// const MONGO_COLLECTION = process.env.MONGO_COLLECTION || "";


const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    dbName: MONGO_DB
} as ConnectOptions


const MONGO = {
    host: MONGO_HOST,
    password: MONGO_PASSWORD,
    username: MONGO_USERNAME,
    options: MONGO_OPTIONS,
    // collection: MONGO_COLLECTION,
    url: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`,
};

const SERVER_PORT = process.env.SERVER_PORT || 8080;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";

const SERVER = {
    NODE_ENV: process.env.NODE_ENV,
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
};

const config = {
    mongo: MONGO,
    server: SERVER,
};
export default config;