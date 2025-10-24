import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Affiliation } from 'src/database/models/affiliation.model';

@Injectable()
export class AffiliationsService extends BaseService<Affiliation> {
  constructor(@InjectModel(Affiliation) affiliationRepo: typeof Affiliation) {
    super(affiliationRepo);
  }

  async findByName(name: string, opts?: any): Promise<Affiliation | null> {
    try {
      return super.findOne({ where: { name }, ...opts });
    } catch (error) {
      throw new Error(`Error finding affiliation by name: ${name}`);
    }
  }
}
