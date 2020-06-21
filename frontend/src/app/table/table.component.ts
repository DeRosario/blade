import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
// import {
//   ModalService
// } from '../modal/modal.service';
// import {
//   OptionsArgModalModel
// } from '../modal/modal.model';
import {
  OptionsTableModel
} from './options-table.model';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Output() edit = new EventEmitter();
  @Output() block = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() customBtnClick = new EventEmitter();

  @Input() dataManager;
  @Input() set options(original) {
    if (original !== undefined || original.length > 0) {
      this._options = original;
      this.datas = original.datas.slice(0);
      if (this._options.filter && this._options.defaultFilters !== undefined && this._options.defaultFilters.length > 0) {
        this.filters = this._options.defaultFilters;
        this.operations = this._options.defaultFilters.slice(0);
        this.filter();
      } else {
        this.formatDatasDisplayed(this._options.datas.slice(0));
        if (this._options.columns[0] !== undefined) {
          this.loadFilter(0, true);
        }
      }
      if (this._options.defaultSort !== undefined) {
        this.updateSorts(this._options.defaultSort.column, this._options.defaultSort.sortBy, this._options.defaultSort.type);
      }
    }
  }
  @Output() outCheckedItems = new EventEmitter();
  @Input() isAsked;
  // tslint:disable-next-line: variable-name
  _options: OptionsTableModel;

  datas;
  datasDisplayed = [];
  datasPagination;
  numberOfPages;
  currentPage = 0;
  paginationBegin: number;
  paginationEnd: number;
  entriesStart = 1;
  entriesEnd = 0;
  pagination: number[];
  totalEntries;
  sortByColumns = {
    column: '',
    orderBy: '',
    type: ''
  };
  filters = [];
  operations = [];
  objectKeys = Object.keys;

  constructor(private router: Router) {}
  // private modalService: ModalService,

  ngOnInit() {
    if (this.dataManager !== undefined) {
      this.dataManager.datas.subscribe((datas) => {
        this._options.datas = datas;
        this.options = this._options;
        this.updateSorts(this.sortByColumns.column, this.sortByColumns.orderBy, this.sortByColumns.type);
      });
    }
    if (this.isAsked !== undefined) {
      this.isAsked.subscribe((value) => {
        if (value) {
          const checkedItems = [];
          for (let i = 0; i < this.datas.length; i++) {
            if (this.datas[i].check) {
              checkedItems.push(this.datas[i]);
            }
          }
          this.outCheckedItems.emit(checkedItems);
        }
      });
    }
  }

  clickLine(lineData) {
    // if (this._options.clickRows.clickable && this._options.clickRows.type === 'modal') {
    //   const optionsModal: OptionsArgModalModel = this._options.clickRows.optionsModal;
    //   this.modalService.openModal(this._options.clickRows.componentModal, optionsModal, lineData);
    // } else if (this._options.clickRows.clickable && this._options.clickRows.type === 'navigation') {
    // this.router.navigate([this._options.clickRows.urlNavigation], {
    //     queryParams: lineData.query
    //   });
    // }
      this.router.navigate([this._options.clickRows.urlNavigation], {
        queryParams: {
          category: lineData.category,
          id: lineData.id
        }
      });
  }

  formatDatasDisplayed(datas) {
    if (this._options.pagination.enabled) {
      if (this._options.pagination.numberItemsByPage !== undefined) {
        this.numberOfPages = datas.length / this._options.pagination.numberItemsByPage;
        this.totalEntries = datas.length;
        this.datasPagination = [];
        for (let i = 0; i < this.numberOfPages; i++) {
          this.datasPagination.push(datas.splice(0, this._options.pagination.numberItemsByPage));
        }
        this.changePages(this.currentPage);
        this.pagination = [];
        for (let i = 0; i < this.datasPagination.length - 1; i++) {
          this.pagination.push(i + 1);
        }
      }
      if (this.datasPagination.length > 0) {
        this.entriesEnd = this.datasPagination[0].length;
      }
    } else {
      this.datasDisplayed = datas;
    }
  }

  changePages(page) {
    if (this.datasPagination.length > 6) {
      if (page + 1 >= this.datasPagination.length - 3) {
        this.paginationBegin = this.datasPagination.length - 5;
        this.paginationEnd = this.datasPagination.length;
      } else if (page + 1 >= 5) {
        this.paginationBegin = page - 2;
        this.paginationEnd = page + 3;
        if (page < this.datasPagination.length - 3) {
          this.paginationBegin++;
          this.paginationEnd--;
        }
      } else {
        this.paginationBegin = 1;
        this.paginationEnd = 5;
      }
    } else {
      this.paginationBegin = 1;
      this.paginationEnd = this.datasPagination.length - 1;
    }
    this.currentPage = page;
    this.datasDisplayed = this.datasPagination[page];
    this.updateNumberOfEntries(page);
  }

  onNext() {
    if (this.currentPage !== this.datasPagination.length - 1) {
      this.changePages(this.currentPage + 1);
    }
  }

  onPrevious() {
    if (this.currentPage !== 0) {
      this.changePages(this.currentPage - 1);
    }
  }

  updateNumberOfEntries(page) {
    this.entriesStart = ((page) * this._options.pagination.numberItemsByPage) + 1;
    if (page + 1 === this.datasPagination.length) {
      this.entriesEnd = ((page) * this._options.pagination.numberItemsByPage) + this.datasPagination[this.datasPagination.length - 1].length;
    } else {
      this.entriesEnd = (page + 1) * this._options.pagination.numberItemsByPage;
    }
  }

  updateSorts(column, sortBy, type) {
    this.sortByColumns.column = column;
    this.sortByColumns.orderBy = sortBy;
    this.sortByColumns.type = type;
    this.datas.sort((a, b) => {
      if (a[column] === 'N/A') {
        return 1;
      } else if (b[column] === 'N/A') {
        return -1;
      }
      if (type === 'string') {
        if (sortBy === 'ASC') {
          if (a[column].toUpperCase() < b[column].toUpperCase()) {
            return -1;
          }
          return 1;
        } else if (sortBy === 'DESC') {
          if (a[column].toUpperCase() < b[column].toUpperCase()) {
            return 1;
          }
          return -1;
        }
      } else if (type === 'date') {
        try {
          if (sortBy === 'ASC') {
            return new Date(a[column]).getTime() - new Date(b[column]).getTime();
          } else if (sortBy === 'DESC') {
            return new Date(b[column]).getTime() - new Date(a[column]).getTime();
          }
        } catch (e) {
          return 0;
        }
      } else if (type === 'number') {
        if (sortBy === 'ASC') {
          return a[column] - b[column];
        } else if (sortBy === 'DESC') {
          return b[column] - a[column];
        }
      } else if (type === 'check') {
        if (sortBy === 'ASC') {
          return (a[column] === b[column]) ? 0 : a[column] ? -1 : 1;
        } else if (sortBy === 'DESC') {
          return (a[column] === b[column]) ? 0 : a[column] ? 1 : -1;
        }
      }
      return 0;
    });
    this.formatDatasDisplayed(this.datas.slice(0));
  }

  onEdit(item, i) {
    this.edit.emit({
      item,
      i
    });
  }

  onBlock(item) {
    this.block.emit(item);
  }

  onDelete(item, i) {
    this.delete.emit({
      item,
      i
    });
  }

  onChangeFilterColumn(index, filter) {
    this.loadFilter(index, false, filter);
  }

  loadFilter(column, push, filter ? ) {
    const temp = {
      column: this._options.columns[column].key,
      type: this._options.columns[column].type,
      value: undefined,
      operator: undefined,
      operatorTitle: undefined,
      association: undefined
    };
    if (this._options.columns[column].association !== undefined) {
      temp.association = this._options.columns[column].association;
    }
    if (this._options.columns[column].type === 'string') {
      temp.value = '';
      temp.operator = 'equal';
      temp.operatorTitle = 'equal';
    } else if (this._options.columns[column].type === 'number') {
      temp.value = 0;
      temp.operator = 'equal';
      temp.operatorTitle = 'equal';
    } else if (this._options.columns[column].type === 'date') {
      temp.value = new Date();
      temp.operator = 'equal';
      temp.operatorTitle = 'equal';
    } else if (this._options.columns[column].type === 'boolean') {
      temp.value = true;
      temp.operator = 'exist';
      temp.operatorTitle = 'exist';
    }
    if (temp.association !== undefined) {
      temp.value = Object.keys(temp.association)[0];
    }
    if (push) {
      this.filters.push(temp);
    } else {
      this.filters[filter].column = temp.column;
      this.filters[filter].type = temp.type;
      this.filters[filter].operator = temp.operator;
      this.filters[filter].value = temp.value;
      this.filters[filter].association = temp.association;
    }
  }

  onValidateFilter(filter, index) {
    for (let i = 0; i < this._options.columns.length; i++) {
      if (this._options.columns[i].key === filter.column) {
        filter.name = this._options.columns[i].name;
      }
    }
    if (this.operations[index] === undefined) {
      this.operations.push(Object.assign({}, filter));
    } else {
      this.operations[index] = Object.assign({}, filter);
    }
    this.filter();
  }

  onChangeOperator(filter, operator, title) {
    this.filters[filter].operator = operator;
    this.filters[filter].operatorTitle = title;
    this.onValidateFilter(this.filters[filter], filter);
  }

  addItem() {
    this.loadFilter(0, true);
  }

  filter() {
    const temp = this._options.datas.slice(0);
    let i = 0;
    while (temp[i] !== undefined) {
      let isValid = true;
      for (let j = 0; j < this.filters.length; j++) {
        let valueToCheck: Date;
        if (this.filters[j].type === 'date') {
          if (temp[i][this.filters[j].column] !== 'N/A' && temp[i][this.filters[j].column] !== '' && temp[i][this.filters[j].column] !== undefined) {
            valueToCheck = new Date(temp[i][this.filters[j].column].split(' ')[0]);
            valueToCheck.setHours(0, 0, 0);
          } else {
            isValid = false;
            break;
          }
        }
        if (this.filters[j].operator === 'equal' && (this.filters[j].type === 'string' || this.filters[j].type === 'number' || this.filters[j].type === 'date')) {
          if (this.filters[j].type !== 'date' && (this.filters[j].type === 'number' ? +this.filters[j].value : this.filters[j].value) !== temp[i][this.filters[j].column]) {
            isValid = false;
            break;
          } else if (this.filters[j].type === 'date' && valueToCheck.getTime() !== this.filters[j].value.getTime()) {
            isValid = false;
            break;
          }
        } else if (this.filters[j].operator === 'include' && this.filters[j].type === 'string' && !temp[i][this.filters[j].column].includes(this.filters[j].value)) {
          isValid = false;
          break;
        } else if (this.filters[j].operator === 'supOrEq' && (this.filters[j].type === 'date' || this.filters[j].type === 'number')) {
          if (this.filters[j].type === 'date' && !(this.filters[j].value.getTime() <= valueToCheck.getTime())) {
            isValid = false;
            break;
          } else if (this.filters[j].type === 'number' && !(+this.filters[j].value <= temp[i][this.filters[j].column])) {
            isValid = false;
            break;
          }
        } else if (this.filters[j].operator === 'infOrEq' && (this.filters[j].type === 'date' || this.filters[j].type === 'number')) {
          if (this.filters[j].type === 'date' && !(this.filters[j].value.getTime() >= valueToCheck.getTime())) {
            isValid = false;
            break;
          } else if (this.filters[j].type === 'number' && !(+this.filters[j].value >= temp[i][this.filters[j].column])) {
            isValid = false;
            break;
          }
        } else if (this.filters[j].operator === 'sup' && (this.filters[j].type === 'date' || this.filters[j].type === 'number')) {
          if (this.filters[j].type === 'date' && !(valueToCheck.getTime() > this.filters[j].value.getTime())) {
            isValid = false;
            break;
          } else if (this.filters[j].type === 'number' && !(+this.filters[j].value < temp[i][this.filters[j].column])) {
            isValid = false;
            break;
          }
        } else if (this.filters[j].operator === 'inf' && (this.filters[j].type === 'date' || this.filters[j].type === 'number')) {
          if (this.filters[j].type === 'date' && !(valueToCheck.getTime() < this.filters[j].value.getTime())) {
            isValid = false;
            break;
          } else if (this.filters[j].type === 'number' && !(+this.filters[j].value > temp[i][this.filters[j].column])) {
            isValid = false;
            break;
          }
        } else if (this.filters[j].operator === 'exist' && this.filters[j].type === 'boolean' || this.filters[j].type === 'image') {
          if (this.filters[j].value === 'yes') {
            if (temp[i][this.filters[j].column] === undefined || temp[i][this.filters[j].column].length === 0) {
              isValid = false;
              break;
            }
          } else {
            if (temp[i][this.filters[j].column] !== undefined || temp[i][this.filters[j].column].length !== 0) {
              isValid = false;
              break;
            }
          }
        }
      }
      if (!isValid) {
        temp.splice(i, 1);
      } else {
        i++;
      }
    }
    this.datas = temp.slice(0);
    this.formatDatasDisplayed(temp);
  }

  removeFilter(index: number) {
    this.filters.splice(index, 1);
    this.operations.splice(index, 1);
    this.filter();
    if (this.filters.length === 0) {
      this.loadFilter(0, true);
    }
  }

  resetFilter() {
    this.operations = [];
    this.filters = [];
    this.loadFilter(0, true);
    this.formatDatasDisplayed(this._options.datas.slice(0));
  }

  changeNbRowByPage(nbRows) {
    this._options.pagination.numberItemsByPage = nbRows;
    this.formatDatasDisplayed(this._options.datas.slice(0));
  }

  onClickCustomBtn() {
    this.customBtnClick.emit();
  }

  changeDate(filter, event, index) {
    if (event !== '') {
      const date = new Date(event);
      date.setHours(0, 0, 0);
      filter.value = date;
      this.onValidateFilter(filter, index);
    }
  }

  onChangeValueAssociation(value, index) {
    this.filters[index].value = value;
    this.onValidateFilter(this.filters[index], index);
  }

  onToggle(event) {
    event.check = !event.check;
  }
}
