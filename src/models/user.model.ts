import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import User from '../interface/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;

    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)', 
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }

  public async getByUsername(username: string): Promise<User> {
    const [[user]] = await this.connection
      .execute<(
    User & RowDataPacket)[]>('SELECT * FROM Trybesmith.Users WHERE username = ?',
      [username],
      );
    return user as User;
  }
}