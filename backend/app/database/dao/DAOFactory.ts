import MousesDAO from './dao/mouses.DAO';
import MousesDAOImpl from './mongodb/mouses.DAO.Impl';
import ScreensDAO from './dao/screens.DAO';
import ScreensDAOImpl from './mongodb/screens.DAO.Impl';
import KeyboardsDAO from './dao/keyboards.DAO';
import KeyboardsDAOImpl from './mongodb/keyboards.DAO.Impl';
import UsersDAO from './dao/users.DAO';
import UsersDAOImpl from './mongodb/users.DAO.Impl';
import ProductsDAO from './dao/products.DAO';
import Model from '../../models/model';

export default abstract class DAOFactory {

  static getKeyboardsDAO(): KeyboardsDAO {
    return new KeyboardsDAOImpl();
  }
  static getMousesDAO(): MousesDAO {
    return new MousesDAOImpl();
  }
  static getScreensDAO(): ScreensDAO {
    return new ScreensDAOImpl();
  }
  static getUsersDAO(): UsersDAO {
    return new UsersDAOImpl();
  }

  static getProductsDAO(category: string): ProductsDAO<Model> {
    switch (category) {
      case 'keyboards':
        return this.getKeyboardsDAO();
      case 'mouses':
        return this.getMousesDAO();
      default:
        return this.getScreensDAO();
    }
  }

}
