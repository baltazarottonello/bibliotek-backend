import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/database/base/base.service';
import { PubType } from 'src/database/models/pub_type.model';

@Injectable()
export class PubTypesService extends BaseService<PubType> {
  constructor(@InjectModel(PubType) pubTypesRepo: typeof PubType) {
    super(pubTypesRepo);
  }

  async findByName(name: string, opts?: any): Promise<PubType | null> {
    try {
      return await super.findOne({ where: { name }, ...opts });
    } catch (error) {
      throw new Error(
        `Error finding pub type by name.` + (error as Error).message,
      );
    }
  }
}
