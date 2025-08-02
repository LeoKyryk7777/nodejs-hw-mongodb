import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import cors from 'cors';
import authRouter from './routers/auth.js';

import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { authenticate } from './middlewares/authenticate.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  // app.use(
  //   pino({
  //     transport: {
  //       targets: [
  //         {
  //           target: 'pino-pretty',
  //           options: { colorize: true },
  //         },
  //       ],
  //     },
  //   }),
  // );

  app.use(cookieParser());
  app.use('/auth', authRouter);
  app.use('/contacts', authenticate, contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }
    console.log(`Server is running on port ${PORT}`);
  });
}
