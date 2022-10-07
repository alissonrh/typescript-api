import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const tokenSecret: string = process.env.JWT_SECRET || 'senha';

const generateToken = async (payload: object) => jwt.sign(payload, tokenSecret);

export default generateToken;