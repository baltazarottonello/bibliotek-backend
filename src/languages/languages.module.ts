import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Language } from 'src/database/models/language.model';
import { LanguagesService } from './languages.service';

@Module({
  imports: [SequelizeModule.forFeature([Language])],
  providers: [LanguagesService],
  exports: [LanguagesService],
})
export class LanguagesModule {}
