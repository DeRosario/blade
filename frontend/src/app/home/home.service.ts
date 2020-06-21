import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import {
  forkJoin,
  Subject
} from 'rxjs';
import {
  HomeTableModel
} from './models/home-data.model';
import {
  KeyboardDBInterface
} from '../models/keyboard.model';

@Injectable()
export class HomeService {

  data = new Subject < any > ();

  constructor(private http: HttpClient) {
    this.getAllData();
  }

  getAllData() {
    return forkJoin([
      this.getKeyboards(),
      this.getMouses(),
      this.getScreens()
    ]).subscribe(result => {
      for (let a = 0; a < result.length; a++) {
        for (let i = 0; i < result[a].length; i++) {
          result[a][i] = new HomeTableModel(result[a][i]._id, result[a][i].category, result[a][i].name, result[a][i].price, result[a][i].company, result[a][i].stock);
        }
      }

      let tableData = [];
      for (let i = 0; i < result.length; i++) {
        tableData = tableData.concat(result[i]);
      }
      this.data.next(tableData);
    });
  }

  getKeyboards() {
    return this.http.get < any > ('/api/keyboards');
  }

  getMouses() {
    return this.http.get < any > ('/api/mouses');
  }

  getScreens() {
    return this.http.get < any > ('/api/screens');
  }


}
