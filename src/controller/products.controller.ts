import { Request, Response } from 'express';
import StatusCodes from '../../statusCodes';
import ProductsService from '../service/products.service';

export default class ProductsController {
  constructor(private productService = new ProductsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(StatusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const newProduct = await this.productService.create(req.body);
    res.status(StatusCodes.CREATED).json(newProduct);
  };
}