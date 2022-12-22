import express, { Application } from 'express';
import { appRouter } from './controllers/Router';

const app: Application = express();
app.use(express.json());

app.use('/api', appRouter);

export default app;
