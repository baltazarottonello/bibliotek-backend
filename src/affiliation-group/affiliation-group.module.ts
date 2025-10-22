import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AffiliationGroup } from 'src/database/models/affiliation-group';

@Module({
  imports: [SequelizeModule.forFeature([AffiliationGroup])],
})
export class AffiliationGroupModule {}
