import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interface/user.interface';
import generateToken from '../jwt/generate.token';
import Login from '../interface/login.interface';
import validateLogin from './validation/login.validation';
import Error from '../interface/error.interface';

export default class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public login = async (username: string, password: string): Promise<Error> => {
    const user: Login = { username, password };
    
    const validate = validateLogin(user);
    if (validate.type === 400) return validate;    
    const userExists = await this.model.getByUsername(user.username);
    const validatePas = this.validPassword(userExists, user);
    if (validatePas.type === 401) return validatePas;

    const token = await generateToken(userExists);
    return { type: 200, message: token };
  };

  private validPassword = (userDb: User, userLogin: Login): Error => {
    if (!userDb || userDb.password !== userLogin.password) {
      return { type: 401, message: 'Username or password invalid' };
    }
    return { type: 200, message: '' };
  };
}