import { Injectable } from '@nestjs/common';
import { CreationAttributes } from 'sequelize';
import { BaseService } from 'src/database/base/base.service';
import { Country } from 'src/database/models/country.model';

@Injectable()
export class CountriesService extends BaseService<Country> {
  constructor(protected readonly countryRepo: typeof Country) {
    super(countryRepo);
  }

  async create(attributes: CreationAttributes<Country>): Promise<Country> {
    try {
      return await super.create(attributes);
    } catch (error) {
      throw new Error(`Error creating country.` + (error as Error).message);
    }
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

  async findByName(name: string): Promise<Country | null> {
    try {
      return await super.findOne({ where: { name } });
    } catch (error) {
      throw new Error(
        `Error finding country by name.` + (error as Error).message,
      );
    }
  }
}
