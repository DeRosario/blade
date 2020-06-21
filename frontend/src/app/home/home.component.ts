import {
  Component,
  OnInit
} from '@angular/core';
import {
  OptionsTableModel
} from '../table/options-table.model';
import {
  HomeService
} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  listOptions: OptionsTableModel;

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.data.subscribe(datas => {
      this.listOptions = {
        columns: [{
            width: '6vw',
            align: '',
            name: 'Category',
            key: 'category',
            icon: '',
            sort: true,
            type: 'string',
            enableFilter: true
          },
          {
            width: '10vw',
            align: '',
            name: 'Title',
            key: 'name',
            icon: '',
            sort: true,
            type: 'string',
            enableFilter: true
          },
          {
            width: '10vw',
            align: '',
            name: 'Brand',
            key: 'company',
            icon: '',
            sort: true,
            type: 'string',
            enableFilter: true
          },
          {
            width: '10vw',
            align: '',
            name: 'Price (€)',
            key: 'price',
            icon: '',
            sort: true,
            type: 'number',
            enableFilter: true
          },
          {
            width: '7vw',
            align: '',
            name: 'Stock',
            key: 'stock',
            icon: '',
            sort: true,
            type: 'number',
            enableFilter: true
          }
        ],
        datas,
        clickRows: {
          clickable: true,
          type: 'navigation',
          urlNavigation: '/product'
        },
        defaultSort: {
          column: 'stock',
          sortBy: 'ASC',
          type: 'number'
        },
        colorRows: {
          peer: 'white',
          odd: '#f4f4f4'
        },
        pagination: {
          enabled: true,
          numberItemsByPage: 10
        },
        filter: {
          enable: true,
          numbersShow: [10, 25, 50]
        }
      };
    }, (error) => {
      console.log('Error in getting all data', error);
    });
  }
}
