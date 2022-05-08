import './database';

import express from 'express';
import globalMiddlewares from './middlewares/globalMiddlewares';

import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import noteRoutes from './routes/noteRoutes';
import partRoutes from './routes/partRoutes';

const app = express();

app.use(globalMiddlewares);
app.use('/users/', userRoutes);
app.use('/tokens/', tokenRoutes);
app.use('/notes/', noteRoutes);
app.use('/parts/', partRoutes);

export default app;
