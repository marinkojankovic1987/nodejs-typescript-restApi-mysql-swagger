import * as dotenv from 'dotenv';
// let path = `${__dirname}/../../.env`;
// dotenv.config({path:path});
// // let path;
// // switch (process.env.NODE_ENV) {
// //   case "test":
// //     path = `${__dirname}/../../.env.test`;
// //     break;
// //   case "production":
// //     path = `${__dirname}/../../.env.production`;
// //     break;
// //   default:
// //     path = `${__dirname}/../../.env`;
// // }

dotenv.config();

export const PORT = process.env.PORT;
export const CORS_HEADER = process.env.CORS_HEADER;
export const JWT_SECRET = process.env.JWT_SECRET;

export const DB_CONNECTION = process.env.DB_CONNECTION;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;

export const MAIL_DRIVER = process.env.MAIL_DRIVER;
export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = process.env.MAIL_PORT;
export const MAIL_USERNAME = process.env.MAIL_USERNAME;
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
export const MAIL_ENCRYPTION = process.env.MAIL_ENCRYPTION;



