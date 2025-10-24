import { CreationAttributes } from 'sequelize';
import { Model } from 'sequelize';

export interface IBaseService<T extends Model> {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  create(attributes: CreationAttributes<T>, opts: any): Promise<T>;
  findAll(opts?: any): Promise<T[]>;
  findById(id: string, opts?: any): Promise<T | null>;
  update(id: string, item: T, opts?: any): Promise<T | null>;
  delete(id: string, opts?: any): Promise<boolean>;
}
