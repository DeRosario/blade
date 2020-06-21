// import { OptionsArgModalModel } from '../modal/modal.model';

export interface OptionsTableModel {
  columns: {
    name: string,
    key: string,
    align: string,
    width: string,
    icon: string,
    type?: string,
    sort?: boolean,
    enableFilter?: boolean,
    association?: {},
    wordBreak?: string,
    padding?: string
  }[];
  datas: {}[];
  clickRows: {
    clickable: boolean,
    type?: string,
    urlNavigation?: string,
    componentModal?: any,
    optionsModal?: any
  };
  colorRows: {
    peer: string;
    odd: string;
  };
  pagination: {
    showEntries?: boolean
    enabled: boolean,
    numberItemsByPage: number;
  };
  filter: {
    enable: boolean,
    numbersShow?: number[]
  };
  customButton?: string;
  defaultFilters?: any[];
  defaultSort?: {
    column: string,
    sortBy: string,
    type: string
  };
  businessView?: boolean;
  actions?: {
    editButton: {
      enable: boolean,
      icon?: string,
      text?: string,
      display?: string,
      color?: string
    },
    blockButton: {
      enable: boolean,
      icon?: string,
      text?: string,
      display?: string,
      color?: string
    },
    deleteButton: {
      enable: boolean,
      icon?: string,
      text?: string,
      display?: string,
      color?: string
    }
  };
}
