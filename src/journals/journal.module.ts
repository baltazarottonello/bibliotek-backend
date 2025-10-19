import { Module } from '@nestjs/common';
import { Journal } from '../database/models/journal.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Journal])],
  //   controllers: [JournalController],
  //   providers: [JournalService],
})
export class JournalModule {}
