import Controller from '../controller';
import express from 'express';
import DAOFactory from '../../database/dao/DAOFactory';
import { ObjectID } from 'mongodb';

export default abstract class ProductsController extends Controller {

  constructor(private category: string) {
    super(`/api/${category}`);
    this.router.get(this.path, this.getCategoryProducts.bind(this));
    this.router.get(`${this.path}/:id`, this.getCategoryProduct.bind(this));
    this.router.put(`${this.path}/:id`, this.updateStockCategoryProduct.bind(this));
  }

  getCategoryProducts(request: express.Request, response: express.Response) {
    DAOFactory.getProductsDAO(this.category).getAll().then((result) => {
      return response.status(200).json(result);
    }).catch((reason) => {
      console.log(reason);
      return response.status(500).json({message: `An error occured : getting ${this.category} products`});
    });
  }

  getCategoryProduct(request: express.Request, response: express.Response) {
    DAOFactory.getProductsDAO(this.category).getOne(new ObjectID(request.params.id)).then((result) => {
      return response.status(200).json(result);
    }).catch((reason) => {
      console.log(reason);
      return response.status(500).json({ message: `An error occured : getting ${this.category} product` });
    });
  }

  updateStockCategoryProduct(request: express.Request, response: express.Response) {
    DAOFactory.getProductsDAO(this.category).changeStock(request.params.id, request.body.stock).then((result) => {
      return response.status(200).json(result);
    }).catch((reason) => {
      console.log(reason);
      return response.status(500).json({ message: 'An error occured, please try later.' });
    });
  }
}
