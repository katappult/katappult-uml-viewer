import express from 'express';
import cors from 'cors';
import tabsRoutes from './routes/tabsRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', tabsRoutes);

export default app;
