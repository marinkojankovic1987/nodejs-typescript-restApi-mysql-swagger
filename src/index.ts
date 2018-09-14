import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Request, Response } from "express";
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import routes from './routes';
import * as swaggerUi from 'swagger-ui-express';
import * as dotenv from "dotenv";
import { PORT, CORS_HEADER } from './configs/config';

const swaggerDocument = require('./swagger.json');

var app: express.Application = express()

http.createServer(app);
// logger
app.use(morgan('dev'));

// use cors
app.use(cors({
  exposedHeaders: CORS_HEADER
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// // app.use(middleware());

// // api router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', routes());
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: "Welcome to RestApi" });
});

app.set("port", PORT);

var httpServer = http.createServer(app);


httpServer.listen(PORT, (data) => {
  console.log(`Listening on port ${PORT}`)
});
