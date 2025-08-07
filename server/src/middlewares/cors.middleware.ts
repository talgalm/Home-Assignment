import cors from 'cors';

export const corsMiddleware = cors({
  origin: '*', // You can restrict to specific domains
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
});