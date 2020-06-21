import express from 'express';
import connectMongo from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'express-session';
import csrf from 'csurf';

export default abstract class CookieSessionMiddleware {

  static async initializeCookieSession(app: express.Application) {
    const MongoStore = connectMongo(session);
    const sessionStore = new MongoStore({
      url: 'mongodb://dev-blade-db-container:27017/bladeSessions'
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
    app.use(session(cookieOptions));
    app.use(cookieParser());
  }

  static check(request: express.Request, response: express.Response, next: express.NextFunction) {
    if (request.session !== undefined) {
      if (request.session.connected) {
        next();
      } else {
        response.status(401).json({
          message: 'you re not connected'
        });
      }
    } else {
      response.status(401).json({
        message: 'you re not connected'
      });
    }
  }

}
