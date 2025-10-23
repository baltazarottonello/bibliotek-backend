import { Module } from '@nestjs/common';
import { Journal } from '../database/models/journal.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { JournalsService } from './journals.service';

@Module({
  imports: [SequelizeModule.forFeature([Journal])],
  providers: [JournalsService],
})
export class JournalModule {}
