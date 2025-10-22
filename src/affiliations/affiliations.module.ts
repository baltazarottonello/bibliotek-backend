import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Affiliation } from 'src/database/models/affiliation.model';

@Module({
  imports: [SequelizeModule.forFeature([Affiliation])],
})
export class AffiliationsModule {}
