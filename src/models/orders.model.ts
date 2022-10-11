import { Pool, ResultSetHeader } from 'mysql2/promise';
import Orders from '../interface/orders.interface';
import ProductsModel from './products.model';

export default class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Orders[]> {
    const result = await this.connection
      .execute(`SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) AS "productsIds"
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON p.orderId = o.id
      GROUP BY o.id`);
    const [rows] = result;
    return rows as Orders[];
  }

  public async create(order: Orders): Promise<Orders> {
    const { userId, productsIds } = order;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    
    );
    
    const [dataInserted] = result;
    const { insertId } = dataInserted;

    const productModel = new ProductsModel(this.connection);
    const updateOrderIDs = productsIds
      .map((productId) => productModel.update(productId, insertId));

    await Promise.all(updateOrderIDs);

    return { userId, productsIds };
  }
}