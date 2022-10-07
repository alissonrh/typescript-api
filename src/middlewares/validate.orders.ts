import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Error from '../interface/error.interface';
import statusCodes from '../../statusCodes';
import Orders from '../interface/orders.interface';

const validateLogin = (orders: Orders): Error => {
  const PRODUCTS = Joi.object({
    productsIds: Joi.array().items(Joi.number().required()).required(),
  });

  const { error } = PRODUCTS.validate(orders);
  if (error) {
    if (error.message.includes('must')) {
      return { type: statusCodes.UN_ENTITY, message: error.message };
    }
    return { type: statusCodes.BAD_REQUEST, message: error.message };
  }
  return { type: 200, message: '' };
};

export default (req: Request, res: Response, next: NextFunction) => {
  const product = req.body;
  const { type, message } = validateLogin(product);
  
  if (type !== 200) {
    return res.status(type).json({ message });
  }

  next();
};