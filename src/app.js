import './database';

import express from 'express';
import globalMiddlewares from './middlewares/globalMiddlewares';

import userRoutes from './routes/userRoutes';

const app = express();

app.use(globalMiddlewares);
app.use('/users/', userRoutes);

export default app;
