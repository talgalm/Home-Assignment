import express from 'express';
import moviesRoutes from './routes/movies.routes';
import { corsMiddleware } from './middlewares/cors.middleware';
import prisma from './db/prisma';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(corsMiddleware);
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

app.use('/api/movies', moviesRoutes);

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});