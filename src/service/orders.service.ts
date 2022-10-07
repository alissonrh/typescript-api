import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import Orders from '../interface/orders.interface';

export default class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public async getAll(): Promise<Orders[]> {
    const products = await this.model.getAll();
    return products;
  }
}