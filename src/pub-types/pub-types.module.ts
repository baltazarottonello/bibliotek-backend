import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PubType } from 'src/database/models/pub_type.model';
import { PubTypesService } from './pub-types.service';

@Module({
  imports: [SequelizeModule.forFeature([PubType])],
  providers: [PubTypesService],
  exports: [PubTypesService],
})
export class PubTypesModule {}
