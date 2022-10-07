import { Request, Response } from 'express';
import StatusCodes from '../../statusCodes';
import UserService from '../service/user.service';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const newUser = await this.userService.create(req.body);

    res.status(StatusCodes.CREATED).json(newUser);
  };
}