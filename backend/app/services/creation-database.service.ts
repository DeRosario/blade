import DAOFactory from '../database/dao/DAOFactory';

export default abstract class CreationDatabaseService {

  static checkDatabase(): Promise < {
    ok: boolean,
    status: number,
    message: string
  } > {
    return Promise.all([
      (async () => {
        return await DAOFactory.getKeyboardsDAO().getAll();
      })(),
      (async () => {
        return await DAOFactory.getMousesDAO().getAll();
      })(),
      (async () => {
        return await DAOFactory.getScreensDAO().getAll();
      })()
    ]).then((datas) => {
      if (datas[0].length > 0 && datas[1].length > 0 && datas[2].length > 0) {
        return {
          ok: false,
          status: 200,
          message: 'Database is already setup'
        };
      } else if (datas[0].length === 0 && datas[1].length === 0 && datas[2].length === 0) {
        return {
          ok: true,
          status: 200,
          message: 'Database is empty'
        };
      } else {
        return {
          ok: false,
          status: 500,
          message: 'Some weird fail in insertion database. Check the collections'
        };
      }
    }, (error) => {
      console.log(error);
      return {
        ok: false,
        status: 500,
        message: 'An error occured, fail to GET databases when creation database.'
      };
    });

  }
}
