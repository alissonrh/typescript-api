import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../../statusCodes';

const tokenSecret: string = process.env.JWT_SECRET || 'senha';

export default (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
    }
    jwt.verify(token as string, tokenSecret);

    next();
  } catch (err) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};