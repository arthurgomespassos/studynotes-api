import 'dotenv/config';
import express from 'express';
import globalMiddlewares from './middlewares/globalMiddlewares';
import testRoutes from './routes/testRoutes';

const app = express();

app.use(globalMiddlewares);
app.use('/tests/', testRoutes);

export default app;
