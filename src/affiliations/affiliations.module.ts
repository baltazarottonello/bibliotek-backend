import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Affiliation } from 'src/database/models/affiliation.model';
import { AffiliationsService } from './affiliations.service';

@Module({
  imports: [SequelizeModule.forFeature([Affiliation])],
  providers: [AffiliationsService],
  exports: [AffiliationsService],
})
export class AffiliationsModule {}
