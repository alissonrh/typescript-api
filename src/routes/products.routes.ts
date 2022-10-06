import { Router } from 'express';
import ProductsController from '../controller/products.controller';

const productsController = new ProductsController();

const router = Router();

router.get('/', productsController.getAll);

export default router;