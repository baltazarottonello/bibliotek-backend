import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Author } from 'src/database/models/author.model';

@Injectable()
export class AuthorsService extends BaseService<Author> {
  constructor(@InjectModel(Author) authorRepo: typeof Author) {
    super(authorRepo);
  }

  async findByName(name: string, opts?: any): Promise<Author | null> {
    try {
      return super.findOne({ where: { name }, ...opts });
    } catch (error) {
      throw new Error(`Error finding author by name: ${name}`);
    }
  }

  async findByOrcid(orcid: string, opts?: any): Promise<Author | null> {
    try {
      return super.findOne({ where: { orcid }, ...opts });
    } catch (error) {
      throw new Error(`Error finding author by ORCID: ${orcid}`);
    }
  }
}
