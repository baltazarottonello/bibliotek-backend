import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createHash } from 'crypto';
import { Optional } from 'sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Affiliation } from 'src/database/models/affiliation.model';

@Injectable()
export class AffiliationsService extends BaseService<Affiliation> {
  constructor(@InjectModel(Affiliation) affiliationRepo: typeof Affiliation) {
    super(affiliationRepo);
  }

  async findByName(name: string, opts?: any): Promise<Affiliation | null> {
    try {
      const nameHash = createHash('sha256')
        .update(name.trim().toLowerCase())
        .digest('hex');
      return super.findOne({
        where: { name_hash: nameHash },
        ...opts,
      });
    } catch (error) {
      throw new Error(
        `Error finding affiliation by name: ${name}` + (error as Error).message,
      );
    }
  }

  async create(
    attributes: Optional<any, string>,
    opts?: any,
  ): Promise<Affiliation> {
    try {
      // Generate the name_hash before creating the affiliation
      const nameHash = createHash('sha256')
        .update(attributes.name.trim().toLowerCase())
        .digest('hex');
      attributes.name_hash = nameHash;

      return super.create(attributes, opts);
    } catch (error) {
      throw new Error(
        `Error creating affiliation: ${JSON.stringify(attributes)}` +
          (error as Error).message,
      );
    }
  }
}
