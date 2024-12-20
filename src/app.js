import cors from 'cors';
import express from 'express';
import routers from './routers/index.js';
import pino from 'pino-http';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  }),
);
const isDev = process.env.NODE_ENV !== 'production';
app.use(
  pino(
    isDev
      ? {
          transport: {
            target: 'pino-pretty',
            options: {
              colorize: true,
            },
          },
        }
      : undefined, // В production транспорт не используется
  ),
);
app.use('/photo', express.static(path.resolve('src/public/photo')));

app.use('/', routers);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
