import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../../statusCodes';
import User from '../interface/user.interface';

const tokenSecret: string = process.env.JWT_SECRET || 'senha';

const getIdByToken = (token: string) => jwt.verify(token, tokenSecret); 

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    const decode = getIdByToken(token) as { payload: User };

    req.body.userId = decode.payload.id;
    
    next();
  } catch (err) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

/* {
  payload: {
    id: 2,
    username: 'vyrion',
    classe: 'Inventor',
    level: 8,
    password: 'pagandodividas'
  },
  iat: 1665414363
} */
