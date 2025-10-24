import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Journal } from 'src/database/models/journal.model';

@Injectable()
export class JournalsService extends BaseService<Journal> {
  constructor(@InjectModel(Journal) journalRepo: typeof Journal) {
    super(journalRepo);
  }

  async findByTitle(title: string, opts?: any): Promise<Journal | null> {
    try {
      return await super.findOne({ where: { title }, ...opts });
    } catch (error) {
      throw new Error(
        `Error finding journal by title.` + (error as Error).message,
      );
    }
  }
}
