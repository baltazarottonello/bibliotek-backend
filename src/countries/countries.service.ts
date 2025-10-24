import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Country } from 'src/database/models/country.model';

@Injectable()
export class CountriesService extends BaseService<Country> {
  constructor(@InjectModel(Country) countryRepo: typeof Country) {
    super(countryRepo);
  }

  async findAll(): Promise<Country[]> {
    try {
      return await super.findAll();
    } catch (error) {
      throw new Error(
        `Error finding all countries.` + (error as Error).message,
      );
    }
  }

  async findByName(name: string, opts?: any): Promise<Country | null> {
    try {
      return await super.findOne({ where: { name }, ...opts });
    } catch (error) {
      throw new Error(
        `Error finding country by name.` + (error as Error).message,
      );
    }
  }
}
