import connection from '../models/connection';
import UserModel from '../models/user.model';
import User from '../interface/user.interface';
import Token from '../interface/token.interface';
import generateToken from '../jwt/generate.token';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<Token> {
    const { username, password } = await this.model.create(user);
    const token = await generateToken({ username, password });    
    return { token };
  }
}