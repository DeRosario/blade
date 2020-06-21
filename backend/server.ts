import App from './app/app';
import KeyboardsController from './app/controllers/api/keyboards.controller';
import MousesController from './app/controllers/api/mouses.controller';
import ScreensController from './app/controllers/api/screens.controller';
import UsersController from './app/controllers/api/users.controller';
import IndexController from './app/controllers/index.controller';
import CreationDatabaseController from './app/controllers/api/creation-database.controller';

const app = new App([
  new KeyboardsController(),
  new MousesController(),
  new ScreensController(),
  new UsersController(),
  new CreationDatabaseController(),
  new IndexController()
], 5099);

app.listen();
