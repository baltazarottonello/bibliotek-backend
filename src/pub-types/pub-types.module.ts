import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PubType } from 'src/database/models/pub_type.model';

@Module({
  imports: [SequelizeModule.forFeature([PubType])],
})
export class PubTypesModule {}
