import express from 'express';
import https from 'https';
import path from 'path';
import fs from 'fs';
import Controller from './controllers/controller';
import CookieSessionMiddleware from './middlewares/cookie-session.middleware';
import helmet from 'helmet';
import csrf from 'csurf';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

export default class App {

  app: express.Application;

  constructor(controllers: Controller[], private port: number) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.app.use('/', express.static(path.join(__dirname, './public')));
    this.app.use('/*', controllers[controllers.length - 1].router);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.urlencoded({
      limit: '50mb',
      extended: true
    }));
    this.app.use(express.json({
      limit: '50mb'
    }));
    this.app.use(helmet());
    this.app.disable('x-powered-by');

    const MongoStore = connectMongo(session);
    const sessionStore = new MongoStore({
      url: 'mongodb://blade-db-container:27017/bladeSessions'
    });

    const cookieOptions = {
      name: 'BLADE',
      secret: 'bladeTest',
      store: sessionStore,
      cookie: {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: true
      },
      proxy: false,
      resave: false,
      saveUninitialized: false
    };
    this.app.use(session(cookieOptions));
    this.app.use(cookieParser());

    this.app.use(csrf({
      cookie: true
    }));

    this.app.use((req, res, next) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      next();
    });

    const logsFolder = path.join(__dirname, './logs');
    if (!fs.existsSync(logsFolder)) {
      fs.mkdirSync(logsFolder);
    }

    this.app.use(morgan('combined', {
      stream: fs.createWriteStream(path.join(logsFolder, '/web.log'), {
        flags: 'a'
      })
    }));

    this.app.use('/api/*', CookieSessionMiddleware.check);
  }

  listen() {
    if (fs.existsSync(path.join(__dirname, './keys/file.crt')) && fs.existsSync(path.join(__dirname, './keys/file.pem'))) {
      const credentials = {
        key: fs.readFileSync(path.join(__dirname, './keys/file.pem')),
        cert: fs.readFileSync(path.join(__dirname, './keys/file.crt'))

      };
      https.createServer(credentials, this.app).listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    } else {
      console.error('Impossible de récupérer les certificats');
    }
  }

}
