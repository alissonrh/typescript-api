import { Router } from 'express';
import OrdersController from '../controller/login.controller';

const ordersController = new OrdersController();

const router = Router();

router.post('/', ordersController.login);

export default router;