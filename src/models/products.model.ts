import { Pool, ResultSetHeader } from 'mysql2/promise';
import Products from '../interface/products.interface';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Products[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Products[];
  }

  public async create(product: Products): Promise<Products> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }

  public async update(productId: number, orderId: number): Promise<void> {
    const result = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';
    await this.connection.execute<ResultSetHeader>(
      result,
      [orderId, productId],
    );
  }
}