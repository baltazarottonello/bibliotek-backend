import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Language } from 'src/database/models/language.model';

@Injectable()
export class LanguagesService extends BaseService<Language> {
  constructor(@InjectModel(Language) languageRepo: typeof Language) {
    super(languageRepo);
  }

  async findByName(name: string, opts?: any): Promise<Language | null> {
    try {
      return super.findOne({ where: { name }, ...opts });
    } catch (error) {
      throw new Error(`Error finding language by name: ${name}`);
    }
  }
}
