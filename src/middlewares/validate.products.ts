import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Error from '../interface/error.interface';
import Products from '../interface/products.interface';
import statusCodes from '../../statusCodes';

const validateLogin = (product: Products): Error => {
  const PRODUCTS = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });

  const { error } = PRODUCTS.validate(product);
  if (error) {
    if (error.message.includes('must be')) {
      return { type: 422, message: error.message };
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