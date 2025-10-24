import { Injectable } from '@nestjs/common';
import { CreationAttributes, FindOptions, Model } from 'sequelize';
import { IBaseService } from './ibase.service';
import type { Repository } from 'sequelize-typescript';

@Injectable()
export class BaseService<T extends Model> implements IBaseService<T> {
  constructor(private readonly genericRepo: Repository<T>) {}

  async create(attributes: CreationAttributes<T>, opts?: any): Promise<T> {
    try {
      return await this.genericRepo.create<T>(attributes, opts);
    } catch (error) {
      throw new Error(`Error creating article.` + (error as Error).message);
    }
  }

  async findOne(options: FindOptions<T>): Promise<T | null> {
    try {
      return await this.genericRepo.findOne(options);
    } catch (error) {
      throw new Error(`Error finding article.` + (error as Error).message);
    }
  }

  async findAll(opts?: any): Promise<T[]> {
    try {
      return await this.genericRepo.findAll(opts);
    } catch (error) {
      throw new Error(`Error finding articles.` + (error as Error).message);
    }
  }
  async findById(id: string, opts?: any): Promise<T | null> {
    try {
      return await this.genericRepo.findByPk(id, opts);
    } catch (error) {
      throw new Error(
        `Error finding article by id.` + (error as Error).message,
      );
    }
  }
  async update(id: string, item: T, opts?: any): Promise<T | null> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.genericRepo.update(item, { where: { id }, ...opts });
      return this.findById(id);
    } catch (error) {
      throw new Error(`Error updating article.` + (error as Error).message);
    }
  }
  async delete(id: string, opts?: any): Promise<boolean> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const result = await this.genericRepo.destroy({ where: { id }, ...opts });
      return result > 0;
    } catch (error) {
      throw new Error(`Error deleting article.` + (error as Error).message);
    }
  }
}
