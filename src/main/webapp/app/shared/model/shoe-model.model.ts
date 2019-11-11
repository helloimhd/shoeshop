import { IShop } from 'app/shared/model/shop.model';

export interface IShoeModel {
  id?: number;
  name?: string;
  brand?: string;
  price?: number;
  shop?: IShop;
  shop?: IShop;
}

export const defaultValue: Readonly<IShoeModel> = {};
