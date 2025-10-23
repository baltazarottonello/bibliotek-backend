import { Injectable } from '@nestjs/common';
import { CreationAttributes } from 'sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Journal } from 'src/database/models/journal.model';

@Injectable()
export class JournalsService extends BaseService<Journal> {
  constructor(protected readonly journalRepo: typeof Journal) {
    super(journalRepo);
  }
  async create(attributes: CreationAttributes<Journal>): Promise<Journal> {
    try {
      return await this.journalRepo.create(attributes);
    } catch (error) {
      throw new Error(`Error creating journal.` + (error as Error).message);
    }
  }
  async findAll(): Promise<Journal[]> {
    try {
      return await this.journalRepo.findAll();
    } catch (error) {
      throw new Error(`Error finding all journals.` + (error as Error).message);
    }
  }
  findById(id: string): Promise<Journal | null> {
    throw new Error('Method not implemented.');
  }
  update(id: string, item: Journal): Promise<Journal | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async findByTitle(title: string): Promise<Journal | null> {
    try {
      return await this.journalRepo.findOne({ where: { title } });
    } catch (error) {
      throw new Error(
        `Error finding journal by title.` + (error as Error).message,
      );
    }
  }
}
