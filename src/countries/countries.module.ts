import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from 'src/database/models/country.model';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
})
export class CountriesModule {}
