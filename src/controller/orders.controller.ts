import { Request, Response } from 'express';
import StatusCodes from '../../statusCodes';
import OrderService from '../service/orders.service';

export default class ProductsController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(StatusCodes.OK).json(orders);
  };

  public postOrder = async (req: Request, res: Response) => {
    const orders = await this.orderService.create(req.body);
    res.status(StatusCodes.CREATED).json(orders);
  };
}