import { Router } from 'express';
import ProductsController from '../controller/products.controller';
import productsMiddlewares from '../middlewares/validate.products';

const productsController = new ProductsController();

const router = Router();

router.get('/', productsController.getAll);
router.post('/', productsMiddlewares, productsController.create);

export default router;