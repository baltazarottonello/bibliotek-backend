import { Injectable } from '@nestjs/common';
import { CreationAttributes, FindOptions, Model } from 'sequelize';
import { IBaseService } from './ibase.service';
import type { Repository } from 'sequelize-typescript';

@Injectable()
export class BaseService<T extends Model> implements IBaseService<T> {
  constructor(private readonly genericRepo: Repository<T>) {}
  async create(attributes: CreationAttributes<T>): Promise<T> {
    try {
      return await this.genericRepo.create(attributes);
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

  async findAll(): Promise<T[]> {
    try {
      return await this.genericRepo.findAll();
    } catch (error) {
      throw new Error(`Error finding articles.` + (error as Error).message);
    }
  }
  async findById(id: string): Promise<T | null> {
    try {
      return await this.genericRepo.findByPk(id);
    } catch (error) {
      throw new Error(
        `Error finding article by id.` + (error as Error).message,
      );
    }
  }
  async update(id: string, item: T): Promise<T | null> {
    try {
      //@ts-expect-error ignore
      await this.genericRepo.update(item, { where: { id } });
      return this.findById(id);
    } catch (error) {
      throw new Error(`Error updating article.` + (error as Error).message);
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      //@ts-expect-error ignore
      const result = await this.genericRepo.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      throw new Error(`Error deleting article.` + (error as Error).message);
    }
  }
}
