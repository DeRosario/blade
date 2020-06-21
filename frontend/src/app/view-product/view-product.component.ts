import {
  Component,
  OnInit
} from '@angular/core';
import {
  ViewProductService
} from './view-product.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  ProductModel
} from './product.model';
import {
  KeyboardModel
} from '../models/keyboard.model';
import {
  MouseModel
} from '../models/mouse.model';
import {
  ScreenModel
} from '../models/screen.model';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
  providers: [ViewProductService]
})
export class ViewProductComponent implements OnInit {

  productInformations: ProductModel;

  removeSomeStock = 0;

  addSomeStock = 0;

  constructor(private route: ActivatedRoute, private viewProductService: ViewProductService) {}

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.route.queryParams.subscribe(params => {
      this.getProductData(params.category, params.id);
    });
  }

  getProductData(category: string, id: string) {
    this.viewProductService.getProduct(category, id).subscribe(product => {
      if (product.category === 'keyboards') {
        this.productInformations = new KeyboardModel(
          product._id,
          product.category,
          product.name,
          product.company,
          product.price,
          product.stock,
          product.description,
          product.type
        );
      } else if (product.category === 'mouses') {
        this.productInformations = new MouseModel(
          product._id,
          product.category,
          product.name,
          product.company,
          product.price,
          product.stock,
          product.description,
          product.buttons
        );
      } else if (product.category === 'screens') {
        this.productInformations = new ScreenModel(
          product._id,
          product.category,
          product.name,
          product.company,
          product.price,
          product.stock,
          product.description,
          product.inches,
          product.hz,
          product.connectors
        );
      }
    }, error => {
      console.log('error: fetch data product');
    });
  }

  getStockData(): string {
    if (this.productInformations.getStock() === 0) {
      return 'No stock for this product';
    } else if (this.productInformations.getStock() > 0) {
      let word = 'product';
      if (this.productInformations.getStock() > 1) {
        word += 's';
      }
      return `${this.productInformations.getStock()} ${word} available`;
    }
  }

  removeAll() {
    this.viewProductService.removeAllStock(this.productInformations.getCategory(), this.productInformations.getId()).subscribe((result: boolean) => {
      if (result) {
        this.productInformations.setStock(0);
      }
    }, (error) => {
      console.log('An error occured : Fail in removing all stock');
    });
  }

  removeSome() {
    const newStock = this.productInformations.getStock() - this.removeSomeStock;
    this.viewProductService.removeStock(this.productInformations.getCategory(), this.productInformations.getId(), newStock).subscribe((result: boolean) => {
      if (result) {
        this.productInformations.setStock(newStock);
        this.removeSomeStock = 0;
        this.addSomeStock = 0;
      }
    }, (error) => {
      console.log('An error occured : Fail in removing stock');
    });
  }

  addSome() {
    const newStock = this.productInformations.getStock() + this.addSomeStock;
    this.viewProductService.addStock(this.productInformations.getCategory(), this.productInformations.getId(), newStock).subscribe((result: boolean) => {
      if (result) {
        this.productInformations.setStock(newStock);
        this.addSomeStock = 0;
        this.removeSomeStock = 0;
      }
    }, (error) => {
      console.log('An error occured : Fail in adding stock');
    });
  }



}
