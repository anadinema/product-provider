import express from 'express';
import cors from 'cors';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import baseRouter from './router/base.router';
import { initializeRedis } from './helpers/cache.helper';
import { initializeDatabase } from './helpers/datasource.helper';

const app = express();

app.use(cors({
  credentials: true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

initializeDatabase();
initializeRedis();

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});

app.use('/', baseRouter());