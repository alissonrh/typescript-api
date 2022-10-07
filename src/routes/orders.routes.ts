import { Router } from 'express';
import OrdersController from '../controller/orders.controller';

const ordersController = new OrdersController();

const router = Router();

router.get('/', ordersController.getAll);

export default router;