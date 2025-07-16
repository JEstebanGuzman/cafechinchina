import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { env } from '@/config/env';
import { connectDB } from '@/config/database';
import authRoutes from '@/api/auth/auth.routes';
import productosRoutes from '@/api/productos/productos.routes';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';

const app = express();
const PORT = env.PORT;

// Middleware
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());

// API Routes
app.get('/api/health', (req: Request, res: Response) => res.json({ status: 'UP' }));
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();