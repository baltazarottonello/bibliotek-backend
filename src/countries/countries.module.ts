import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Country } from 'src/database/models/country.model';
import { CountriesService } from './countries.service';

@Module({
  imports: [SequelizeModule.forFeature([Country])],
  providers: [CountriesService],
})
export class CountriesModule {}
