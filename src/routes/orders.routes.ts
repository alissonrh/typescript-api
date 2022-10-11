import { Router } from 'express';
import OrdersController from '../controller/orders.controller';
import validateToken from '../middlewares/validate.token';
import validateOrders from '../middlewares/validate.orders';

const ordersController = new OrdersController();

const router = Router();

router.get('/', ordersController.getAll);
router.post('/', validateToken, validateOrders, ordersController.postOrder);

export default router;