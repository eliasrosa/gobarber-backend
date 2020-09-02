import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import routes from './routes';
import './database';
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use(routes);
routes.use(errorHandler);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333!');
});
