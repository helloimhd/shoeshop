import { IShoeModel } from 'app/shared/model/shoe-model.model';

export interface IShop {
  id?: number;
  name?: string;
  shoeModels?: IShoeModel[];
}

export const defaultValue: Readonly<IShop> = {};
