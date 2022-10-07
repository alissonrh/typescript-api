import { Router } from 'express';
import UserController from '../controller/user.controller';
import userMiddleware from '../middlewares/validate.user';

const userController = new UserController();

const router = Router();

router.post('/', userMiddleware, userController.create);

export default router;
