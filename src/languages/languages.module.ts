import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Language } from 'src/database/models/language.model';

@Module({
  imports: [SequelizeModule.forFeature([Language])],
})
export class LanguagesModule {}
