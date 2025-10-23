import { CreationAttributes } from 'sequelize';
import { Model } from 'sequelize';

export interface IBaseService<T extends Model> {
  create(attributes: CreationAttributes<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(id: string, item: T): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
