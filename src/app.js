import './database';

import express from 'express';
import globalMiddlewares from './middlewares/globalMiddlewares';

import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';

const app = express();

app.use(globalMiddlewares);
app.use('/users/', userRoutes);
app.use('/tokens/', tokenRoutes);

export default app;
