import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import Error from '../interface/error.interface';
import User from '../interface/user.interface';
import statusCodes from '../../statusCodes';

const validateLogin = (user: User): Error => {
  const USER = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
  });

  const { error } = USER.validate(user);
  if (error) {
    if (error.message.includes('must be')) {
      return { type: statusCodes.UN_ENTITY, message: error.message };
    }
    return { type: statusCodes.BAD_REQUEST, message: error.message };
  }
  return { type: 200, message: '' };
};

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const user = req.body;
  const { type, message } = validateLogin(user);
  
  if (type !== 200) {
    return res.status(type).json({ message });
  }

  next();
};