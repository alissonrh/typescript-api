import express from 'express';
import productsRoutes from './routes/products.routes';
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);
app.use('/users', userRoutes);

export default app;
