import { Request, Response } from 'express';
import LoginService from '../service/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    console.log('ENNNNTROU');
    
    const { username, password } = req.body;
    const { type, message, message: token } = await this.loginService.login(username, password);

    if (type === 200) {
      return res.status(type).json({ token });
    }

    return res.status(type).json({ message });
  };
}