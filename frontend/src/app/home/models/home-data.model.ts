import { KeyboardModel } from '../../models/keyboard.model';
import { MouseModel } from '../../models/mouse.model';
import { ScreenModel } from '../../models/screen.model';

export class HomeDataModel {
  constructor(private keyboards: KeyboardModel[], private mouses: MouseModel[], private screens: ScreenModel[]) { }

  getKeyboards() {
    return this.keyboards;
  }

  getMouses() {
    return this.mouses;
  }


  getScreens() {
    return this.screens;
  }
}

export class HomeTableModel {
  constructor(private id: string, private category: string, private name: string, private price: number, private company: string, private stock: number) {}
}
