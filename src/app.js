import './database';

import { resolve } from 'path';
import express from 'express';
import globalMiddlewares from './middlewares/globalMiddlewares';

import userRoutes from './routes/userRoutes';
import tokenRoutes from './routes/tokenRoutes';
import noteRoutes from './routes/noteRoutes';
import partRoutes from './routes/partRoutes';
import photoRoutes from './routes/photoRoutes';

const app = express();

app.use(globalMiddlewares);
app.use('/users/', userRoutes);
app.use('/tokens/', tokenRoutes);
app.use('/notes/', noteRoutes);
app.use('/parts/', partRoutes);
app.use('/photos/', photoRoutes);
app.use('/images/', express.static(resolve(__dirname, '..', 'uploads', 'images')));

export default app;
