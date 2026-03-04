import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './models/index.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';

dotenv.config();

// Connect to PostgreSQL
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reservations', reservationRoutes);
// app.use('/api/orders', orderRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

const PORT = process.env.PORT || 5001;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
