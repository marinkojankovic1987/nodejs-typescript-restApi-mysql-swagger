import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Request, Response } from "express";
import * as express from 'express';
import * as http from 'http';
import * as morgan from 'morgan';
import routes from './routes';
import * as swaggerUi from 'swagger-ui-express';

const config = require('./configs/config.json');
const swaggerDocument = require('./swagger.json');

var app: express.Application = express()


http.createServer(app);

// logger
app.use(morgan('dev'));

// use cors
app.use(cors({
  exposedHeaders: (<any>config).corsHeaders
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

app.set("port", (<any>config).port);

var httpServer = http.createServer(app);

httpServer.listen((<any>config).port, (data) => {
  console.log(`Listening on port ${(<any>config).port}`)
});
