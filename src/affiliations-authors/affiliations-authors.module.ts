import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AffiliationAuthor } from 'src/database/models/affiliation-author.model';

@Module({
  imports: [SequelizeModule.forFeature([AffiliationAuthor])],
})
export class AffiliationsAuthorsModule {}
